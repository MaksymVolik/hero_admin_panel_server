import { sql } from "@vercel/postgres";

export const getAllFilters = async () => {
  const { rows } = await sql`SELECT * FROM filters;`;
  return rows;
};

export const createFilter = async (name, title, className) => {
  const { rows } = await sql`INSERT INTO filters (name, title, className) 
                VALUES (${name}, ${title}, ${className})
                RETURNING *;`;
  return rows;
};
