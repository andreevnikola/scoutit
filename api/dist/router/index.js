"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let router = (0, express_1.Router)();
const { register, login, logout, authenticate } = require("./../services");
// const multer = require("multer");
// const uploader = multer({
//     storage: multer.diskStorage({}),
//     limits: { fileSize: 500000 }
//   });
// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + "-" + (Math.floor(Math.random() * 100000)).toString());
//   },
// });
// const upload = multer({ storage });
router.post("/users/register", (req, res) => { register(req, res); });
router.post("/users/login", (req, res) => { login(req, res); });
router.get("/users/logout/:key", (req, res) => { logout(req, res); });
router.get("/users/authenticate/:key", (req, res) => { authenticate(req, res); });
module.exports = router;
//# sourceMappingURL=index.js.map