import { Router } from "express";
let router: Router = Router();
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

router.get("/users/authenticate/:name/:pass", (req: string, res: any) => { Authenticate(req, res) });

module.exports = router ;