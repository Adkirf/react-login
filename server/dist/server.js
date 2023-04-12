"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const Login_1 = require("./Login");
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.listen(3000, () => {
    console.log("Server running on Port 3000");
});
app.put("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const login = new Login_1.Login();
        const users = yield login.getUsers();
        let isAvailable = true;
        users.forEach((user) => {
            if (user.username === req.body.username) {
                console.log("already");
                isAvailable = false;
            }
        });
        if (isAvailable) {
            const user = yield login.signinUser(req.body.username, req.body.password);
            res.status(200).json(user);
        }
        else {
            res.status(300).json({ msg: "username already exists" });
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
app.put("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const login = new Login_1.Login();
        const user = yield login.getUser(req.body.username, req.body.password);
        const jwtToken = jwt.sign(user, process.env.JWT_SECRET);
        console.log(jwtToken);
        res.status(200).json(jwtToken);
    }
    catch (err) {
        console.log(err);
        res.status(300).json(err);
    }
}));
