"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let router = (0, express_1.Router)();
const { register, login, logout, authenticate, confirmmail, verifymail, settings, loadprofile, updateaccdata, updatelinks, likeProfile, updatebonusdata } = require("./../services");
const multer = require("multer");
const uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 }
});
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "-" + (Math.floor(Math.random() * 100000)).toString());
    },
});
const upload = multer({ storage });
router.post("/users/register", (req, res) => { register(req, res); });
router.post("/users/login", (req, res) => { login(req, res); });
router.post("/users/settings/:key", uploader.single("file"), (req, res) => { settings(req, res); });
router.get("/users/logout/:key", (req, res) => { logout(req, res); });
router.get("/users/authenticate/:key", (req, res) => { authenticate(req, res); });
router.get("/users/confirm/:key", (req, res) => { confirmmail(req, res); });
router.get("/users/verify/:key/:code", (req, res) => { verifymail(req, res); });
router.get("/profile/load/:id", (req, res) => { loadprofile(req, res); });
router.post("/profile/update/:key", (req, res) => { updateaccdata(req, res); });
router.post("/profile/updatelinks/:key", (req, res) => { updatelinks(req, res); });
router.get("/profile/likeProfile/:id/:key", (req, res) => { likeProfile(req, res); });
router.post("/profile/updateBonusData/:key", (req, res) => { updatebonusdata(req, res); });
module.exports = router;
//# sourceMappingURL=index.js.map