import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";

export function generateTokens(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30s",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
}

export function validateAccessToken(token) {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (e) {
    return null;
  }
}
export function validateRefreshToken(token) {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (e) {
    return null;
  }
}

export async function saveToken(userId, refreshToken) {
  const { rowCount, rows } = await sql`UPDATE tokens 
                SET refreshtoken=${refreshToken} 
                WHERE user_id=${userId} 
                RETURNING *;`;

  if (rowCount > 0) {
    return rows[0];
  }

  const { rows: row } = await sql`INSERT INTO tokens (user_id, refreshtoken) 
                VALUES (${userId}, ${refreshToken})
                RETURNING *;`;
  return row[0];
}

export async function findToken(refreshToken) {
  const { rowCount, rows } =
    await sql`SELECT * FROM tokens WHERE refreshtoken=${refreshToken};`;

  const tokenFromDb = rowCount === 0 ? null : rows[0];
  return tokenFromDb;
}

export async function removeToken(refreshToken) {
  const { rows } =
    await sql`DELETE FROM tokens WHERE refreshtoken=${refreshToken} RETURNING *;`;
  return rows[0];
}
