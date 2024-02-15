import { sql } from "@vercel/postgres";

export async function getAll(req, res) {
  try {
    const { rows } = await sql`SELECT * FROM filters;`;
    return res.status(200).json({
      message: `Filtres received successfully.`,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function create(req, res) {
  try {
    const { name, title, className } = req.body;

    if (!name || !title || !className)
      throw new Error("Name, title and element required");

    const { rows } = await sql`INSERT INTO filters (name, title, className) 
                VALUES (${name}, ${title}, ${className})
                RETURNING *;`;
    return res.status(201).json({
      message: `A filter has been created.`,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
