import { sql } from "@vercel/postgres";

export async function getAll(req, res) {
  try {
    const { rows } = await sql`SELECT * FROM heroes ORDER BY id;`;
    return res.status(200).json({
      message: `Heroes received successfully.`,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function getHeroById(req, res) {
  try {
    const id = req.params.id;
    const { rowCount, rows } = await sql`SELECT * FROM heroes WHERE id=${id};`;

    if (rowCount === 0) {
      return res.status(404).json({ message: "The hero not found." });
    }

    return res.status(200).json({
      message: `Hero received successfully.`,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function create(req, res) {
  try {
    const { name, description, element } = req.body;

    if (!name || !description || !element)
      throw new Error("Name, description and element required");

    const { rows } = await sql`INSERT INTO heroes (Name, Description, Element) 
                VALUES (${name}, ${description}, ${element})
                RETURNING *;`;
    return res.status(201).json({
      message: `A hero named ${name} has been created.`,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateById(req, res) {
  try {
    const id = req.params.id;
    const { name, description, element } = req.body;

    const { rowCount, rows } = await sql`UPDATE heroes 
                SET name=${name}, description=${description}, element=${element} 
                WHERE id=${id} 
                RETURNING *;`;

    if (!rowCount || rowCount === 0) {
      return res.status(404).json({ message: "The hero not found" });
    }

    return res.status(200).json({
      message: `The hero has been updated.`,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function deleteById(req, res) {
  try {
    const id = req.params.id;
    const { rowCount, rows } =
      await sql`DELETE FROM heroes WHERE id=${id} RETURNING *;`;

    if (!rowCount || rowCount === 0) {
      return res.status(404).json({ message: "The hero not found" });
    }

    return res.status(200).json({
      message: `The hero has been deleted.`,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
