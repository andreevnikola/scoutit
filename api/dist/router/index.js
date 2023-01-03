"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let router = (0, express_1.Router)();
const Authenticate = require("./../services").Authenticate;
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
router.get("/users/authenticate/:name/:pass", (req, res) => { Authenticate(req, res); });
module.exports = router;
//# sourceMappingURL=index.js.map