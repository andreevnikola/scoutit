import { Router } from "express";
let router: Router = Router();
const { register, login, logout, authenticate, confirmmail, verifymail, settings } = require("./../services");

const multer = require("multer");
const uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 }
  });

const storage = multer.diskStorage({
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + (Math.floor(Math.random() * 100000)).toString());
  },
});
const upload = multer({ storage });

router.post("/users/register", (req: string, res: any) => { register(req, res) });
router.post("/users/login", (req: string, res: any) => { login(req, res) });
router.post("/users/settings/:key", uploader.single("file"), (req: string, res: any) => { settings(req, res) });
router.get("/users/logout/:key", (req: string, res: any) => { logout(req, res) });
router.get("/users/authenticate/:key", (req: string, res: any) => { authenticate(req, res) });
router.get("/users/confirm/:key", (req: string, res: any) => { confirmmail(req, res) });
router.get("/users/verify/:key/:code", (req: string, res: any) => { verifymail(req, res) });

module.exports = router;