import { createFilter, getAllFilters } from "../service/filter.service.js";
import { ApiError } from "../exceptions/api.error.js";

export async function getAll(req, res, next) {
  try {
    const filters = await getAllFilters();
    return res.status(200).json({
      message: `Filtres received successfully.`,
      data: filters,
    });
  } catch (e) {
    next(e);
  }
}

export async function create(req, res, next) {
  try {
    const { name, title, className } = req.body;
    if (!name || !title || !className) {
      throw ApiError.BadRequest("Name, title and element required");
    }

    const filter = await createFilter(name, title, className);
    return res.status(201).json({
      message: `A filter has been created.`,
      data: filter,
    });
  } catch (e) {
    next(e);
  }
}
