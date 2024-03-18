import { validationResult } from "express-validator";
import {
  getHeroes,
  getHero,
  createHero,
  updateHero,
  deleteHero,
} from "../service/hero.service.js";
import { ApiError } from "../exceptions/api.error.js";

export async function getAll(req, res, next) {
  try {
    const user_id = req.user.user_id;

    const heroes = await getHeroes(user_id);

    return res.status(200).json({
      message: `Heroes received successfully.`,
      data: heroes,
    });
  } catch (e) {
    next(e);
  }
}

export async function getHeroById(req, res, next) {
  try {
    const user_id = req.user.user_id;
    const hero_id = req.params.id;

    const hero = await getHero(hero_id, user_id);

    return res.status(200).json({
      message: `Hero received successfully.`,
      data: hero,
    });
  } catch (e) {
    next(e);
  }
}

export async function create(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Error in validation", errors.array()));
    }

    const user_id = req.user.user_id;

    const hero = await createHero(req.body, user_id);

    return res.status(201).json({
      message: `A hero named "${hero[0].name}" has been created.`,
      data: hero,
    });
  } catch (e) {
    next(e);
  }
}

export async function updateById(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Error in validation", errors.array()));
    }

    const user_id = req.user.user_id;
    const hero_id = req.params.id;

    const hero = await updateHero(req.body, hero_id, user_id);

    return res.status(200).json({
      message: `The hero has been updated.`,
      data: hero,
    });
  } catch (e) {
    next(e);
  }
}

export async function deleteById(req, res, next) {
  try {
    const user_id = req.user.user_id;
    const hero_id = req.params.id;

    const hero = await deleteHero(hero_id, user_id);

    return res.status(200).json({
      message: `The hero has been deleted.`,
      data: hero,
    });
  } catch (e) {
    next(e);
  }
}
