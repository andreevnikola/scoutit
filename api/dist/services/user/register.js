"use strict";
const bcrypt = require("bcryptjs");
const DB = require("./../../db");
async function Register(req, res) {
    const salt = await bcrypt.genSalt(4);
    const users = await new DB("scoutit", "users");
    try {
        const { username, pass, fullname, mail, phone, type } = req.body;
        const registered_users = await users.ReadMany({
            $or: [
                { username: username },
                { mail: mail },
                { phone: phone }
            ],
            type: type
        });
        let errors = [];
        registered_users?.some((user) => {
            if (user.username === username) {
                errors.push("username is taken");
            }
            if (user.mail === mail) {
                errors.push("mail is taken");
            }
            if (user.phone === phone) {
                errors.push("phone number is taken");
            }
        });
        if (registered_users?.length) {
            res.status(409).send({
                error: JSON.stringify(errors),
            });
            return;
        }
        const hashedPass = await bcrypt.hash(pass, salt);
        const key = Math.floor(Math.random() * 999999999999) + 1;
        const registered = await users.Create({
            username: username,
            fullname: fullname,
            mail: mail,
            phone: phone,
            type: type,
            password: hashedPass,
            verified: false,
            keys: [key]
        });
        res.status(200).send({
            key: key,
            id: registered.insertedId
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}
module.exports = { Register };
//# sourceMappingURL=register.js.map