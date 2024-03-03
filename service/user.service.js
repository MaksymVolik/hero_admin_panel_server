import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { sendActivationMail } from "./mail.service.js";
import {
  generateTokens,
  saveToken,
  removeToken,
  validateRefreshToken,
  validateAccessToken,
  findToken,
} from "./token.service.js";
import { UserDto } from "../dtos/user.dto.js";
import { ApiError } from "../exceptions/api.error.js";

export async function regUser(username, email, password) {
  if (!username || !email || !password)
    throw ApiError.BadRequest("Name, email and password required");

  const { rowCount } = await sql`SELECT * FROM users WHERE email = ${email};`;

  if (!rowCount === 0) {
    throw ApiError.BadRequest(
      `User with email address ${email} already exists`
    );
  }

  const cashPassword = await bcrypt.hash(password, 3);
  const activationLink = uuidv4();

  const { rows: user } =
    await sql`INSERT INTO users (username, email, password, link) 
                VALUES (${username}, ${email}, ${cashPassword}, ${activationLink})
                RETURNING *;`;

  await sendActivationMail(
    email,
    `${process.env.API_URL}/api/activate/${activationLink}`
  );

  const userDto = new UserDto(user[0]);

  const tokens = generateTokens({ ...userDto });
  await saveToken(userDto.userId, tokens.refreshToken);

  return { ...tokens, user: userDto };
}

export async function activateUser(activationLink) {
  const { rowCount } = await sql`UPDATE users 
                SET is_activated=true 
                WHERE link=${activationLink};`;

  if (!rowCount || rowCount === 0) {
    throw ApiError.BadRequest(`Incorrect activation link`);
  }
}

export async function loginUser(email, password) {
  const { rowCount, rows: user } =
    await sql`SELECT * FROM users WHERE email = ${email} ;`;

  if (rowCount === 0) {
    throw ApiError.BadRequest(
      `User with email address ${email} not found or password is incorrect`
    );
  }

  const isPassEquals = await bcrypt.compare(password, user[0].password);
  if (!isPassEquals) {
    throw ApiError.BadRequest(
      `User with email address ${email} not found or password is incorrect`
    );
  }
  const userDto = new UserDto(user[0]);

  const tokens = generateTokens({ ...userDto });
  await saveToken(userDto.userId, tokens.refreshToken);

  return { ...tokens, user: userDto };
}

export async function logoutUser(refreshToken) {
  const token = await removeToken(refreshToken);
  return token;
}

export async function refreshUser(refreshToken) {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }

  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await findToken(refreshToken);

  if (!userData || !tokenFromDb) {
    throw ApiError.UnauthorizedError();
  }

  const { rows: user } =
    await sql`SELECT * FROM users WHERE user_id=${userData.userId}`;
  const userDto = new UserDto(user[0]);

  const tokens = generateTokens({ ...userDto });
  await saveToken(userDto.userId, tokens.refreshToken);

  return { ...tokens, user: userDto };
}

export async function getAllUsers() {
  const { rows } = await sql`SELECT * FROM users;`;
  return rows;
}
