import { sql } from "@vercel/postgres";

export const getHeroes = async (user_id) => {
  const { rows } =
    await sql`SELECT * FROM heroes WHERE user_id = ${user_id} ORDER BY id;`;
  return rows;
};

export const getHero = async (hero_id, user_id) => {
  const { rowCount, rows } =
    await sql`SELECT * FROM heroes WHERE id=${hero_id} AND user_id = ${user_id};`;

  if (rowCount === 0) {
    throw ApiError.NotFound("The hero not found.");
  }
  return rows;
};

export const createHero = async ({ name, description, element }, user_id) => {
  const { rows } =
    await sql`INSERT INTO heroes (Name, Description, Element, user_id) 
                VALUES (${name}, ${description}, ${element}, ${user_id})
                RETURNING *;`;
  return rows;
};

export const updateHero = async (
  { name, description, element },
  hero_id,
  user_id
) => {
  const { rowCount, rows } = await sql`UPDATE heroes 
                SET name=${name}, description=${description}, element=${element} 
                WHERE id=${hero_id} AND user_id=${user_id} 
                RETURNING *;`;

  if (!rowCount || rowCount === 0) {
    throw ApiError.NotFound("The hero not found.");
  }
  return rows;
};

export const deleteHero = async (hero_id, user_id) => {
  const { rowCount, rows } =
    await sql`DELETE FROM heroes WHERE id=${hero_id} AND user_id=${user_id} RETURNING *;`;

  if (!rowCount || rowCount === 0) {
    throw ApiError.NotFound("The hero not found.");
  }
  return rows;
};
