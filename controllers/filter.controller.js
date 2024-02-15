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
