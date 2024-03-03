import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { sendActivationMail } from "./mail.service.js";
import { generateTokens, saveToken } from "./token.service.js";
import { UserDto } from "../dtos/user.dto.js";

export async function regUser(username, email, password) {
  if (!username || !email || !password)
    throw new Error("Name, email and password required");

  const { rowCount } = await sql`SELECT * FROM users WHERE email = ${email} ;`;

  if (rowCount > 0) {
    throw new Error(`User with email address ${email} already exists`);
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
