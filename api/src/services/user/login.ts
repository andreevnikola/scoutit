const bcrypt_ = require("bcryptjs");
const DB_ = require("./../../db");

async function Login(req: any, res: any){
    const users = await new DB_("scoutit", "users");
    try {
        const { phone, pass, type } = req.body;
        const registered_user: any = await users.Read({
            phone: phone,
            type: type
        });
        if(registered_user && (await bcrypt_.compare(pass, registered_user.password))){
            const key: number = Math.floor(Math.random() * 999999999999) + 1;
            await users.Update({
                phone: phone,
                type: type
            }, {
                $push: {
                    keys: key
                }
            });
            if(registered_user.keys.length > 4){
                await users.Update({
                    phone: phone,
                    type: type
                }, {
                    $pull: {
                        keys: registered_user.keys[0]
                    }
                });
            }
            res.status(200).send({
                key: key,
                name: registered_user.username,
                firstname: registered_user.fullname.split(" ")[0],
                lastname: registered_user.fullname.split(" ")[1],
                phone: registered_user.phone,
                mail: registered_user.mail,
                id: registered_user._id.toString(),
                profile_picture: registered_user.profile_picture ? registered_user.profile_picture : null,
                verified: registered_user.verified
            });
            return;
        }
        res.status(409).send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports = {Login};