import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";

export function generateTokens(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
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
