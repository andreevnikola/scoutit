"use strict";
const bcrypt = require("bcryptjs");
const DB = require("./../../db");
async function Register(req, res) {
    const salt = await bcrypt.genSalt(4);
    const users = await new DB("roimmen", "users");
    try {
        const { name, pass } = req.params;
        if (name.length < 5) {
            req.status(200).send({
                error: "Invalid USERNAME"
            });
            return;
        }
        if (pass.length < 6) {
            res.status(200).send({
                error: "Invalid PASSWORD"
            });
            return;
        }
        let oldNames = await users.Read({
            name: name
        });
        if (oldNames) {
            res.status(409).send();
            return;
        }
        const hashedPass = await bcrypt.hash(pass, salt);
        const key = Math.floor(Math.random() * 100000000000);
        await users.Create({
            name: name,
            password: hashedPass,
            key: key
        });
        res.status(200).send({
            key: key
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}
module.exports = { Register };
//# sourceMappingURL=register.js.map