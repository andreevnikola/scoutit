import { Router } from "express";
let router: Router = Router();
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

router.post("/users/register", (req: string, res: any) => { register(req, res) });
router.post("/users/login", (req: string, res: any) => { login(req, res) });
router.get("/users/logout/:key", (req: string, res: any) => { logout(req, res) });
router.get("/users/authenticate/:key", (req: string, res: any) => { authenticate(req, res) });

module.exports = router;