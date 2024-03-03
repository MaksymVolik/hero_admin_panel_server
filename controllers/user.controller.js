import { regUser } from "../service/user.service.js";

export async function registration(req, res, next) {
  try {
    const { username, email, password } = req.body;
    const UserData = await regUser(username, email, password);
    res.cookie("refreshToken", UserData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });
    res.json(UserData);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
}
export async function login(req, res, next) {
  try {
  } catch (e) {}
}
export async function logout(req, res, next) {
  try {
  } catch (e) {}
}
export async function refresh(req, res, next) {
  try {
  } catch (e) {}
}
export async function activate(req, res, next) {
  try {
  } catch (e) {}
}
export async function getUsers(req, res, next) {
  try {
    res.json(["123", "456"]);
  } catch (e) {}
}
