"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const path = __importStar(require("path"));
const Datastore = require("nedb");
class Login {
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "user.db"),
            autoload: true
        });
    }
    getUsers() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, users) => {
                if (err) {
                    console.log(err);
                    reject({ msg: "error in db" });
                }
                else {
                    resolve(users);
                }
            });
        });
    }
    getUser(username, password) {
        return new Promise((resolve, reject) => {
            this.db.find({ username: username }, (err, user) => {
                if (user.length > 0) {
                    if (password === user[0].password) {
                        const { username } = user[0];
                        resolve(username);
                    }
                    else {
                        console.log("username or password not valid");
                        reject({ msg: "username or password not valid" });
                    }
                }
                else {
                    console.log("username or password not valid");
                    reject({ msg: "user not found" });
                }
            });
        });
    }
    signinUser(username, password) {
        return new Promise((resolve, reject) => {
            this.db.insert({ username: username, password: password }, (err, user) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(user.username);
                }
            });
        });
    }
}
exports.Login = Login;
