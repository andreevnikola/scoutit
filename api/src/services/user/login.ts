const bcrypt_ = require("bcryptjs");
const DB_ = require("./../../db");

async function Login(req: any, res: any){
    const users = await new DB_("scoutit", "users");
    try {
        const { name_or_phone, pass, type } = req.body;
        const registered_user: any = await users.Read({
            $or: [
                { username: name_or_phone },
                { phone: name_or_phone }
            ],
            type: type
        });
        if(registered_user && (await bcrypt_.compare(pass, registered_user.password))){
            const key: number = Math.floor(Math.random() * 999999999999) + 1;
            await users.Update({
                $or: [
                    { username: name_or_phone },
                    { phone: name_or_phone }
                ],
                type: type
            }, {
                $push: {
                    keys: key
                }
            });
            res.status(200).send({
                key: key,
                name: registered_user.name,
                phone: registered_user.phone,
                mail: registered_user.mail
            });
            return;
        }
        res.status(403).send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports = {Login};