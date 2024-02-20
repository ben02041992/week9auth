const { Router } = require("express");

const userRouter = Router();

const { signupUser, getAllUsers, login } = require("./controllers");
const { hashPass, comparePass } = require("../mid/auth");

userRouter.post("/users/signup", hashPass, signupUser);

userRouter.post("/users/login", comparePass, login);

userRouter.get("/users/getAllUsers", getAllUsers);

module.exports = userRouter;
