import express from "express";
import {
  changePassword,
  deleteMessages,
  inserSql,
  login,
  registration,
  verifeEmail,
} from "../controller/auth/auth.controller";
import { loginValidation } from "../requestVlidations/auth/login.joy";
import { validateRegistration } from "../requestVlidations/auth/registration.joy";
import { changePasswordValidate } from "../requestVlidations/auth/changePassword.joy";

const authRouter = express.Router();

authRouter.post("/registration", validateRegistration, registration);

authRouter.post("/login", loginValidation, login);

authRouter.post("/change-password", changePasswordValidate, changePassword);

authRouter.get("/verife-email/:verifeKey", verifeEmail);

console.log("aqvar");
authRouter.post("/deleteMessages", deleteMessages);

authRouter.post("/inserSql", inserSql);
export default authRouter;
