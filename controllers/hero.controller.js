import { sql } from "@vercel/postgres";

export async function getAll(req, res) {
  try {
    const { rows } = await sql`SELECT * FROM heroes;`;
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function create(req, res) {
  try {
    const name = req.query.name;
    const description = req.query.description;
    const element = req.query.element;
    if (!name || !description || !element)
      throw new Error("Name, description and element required");
    await sql`INSERT INTO heroes (name, description, element) VALUES (${name}, ${description}, ${element});`;
    return res
      .status(201)
      .json({ message: `A hero named ${name} has been created.` });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function deleteById(req, res) {
  try {
    const id = req.params.id;
    const { rows } = await sql`DELETE FROM heroes WHERE id=${id};`;

    if (!rows) {
      return res.status(404).json({ message: "Hero not found" });
    }

    return response.status(200).json({ message: `The hero has been deleted.` });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
