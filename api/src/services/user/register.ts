const bcrypt = require("bcryptjs");
const DB = require("./../../db");

async function Register(req: any, res: any){
    const salt = await bcrypt.genSalt(4);
    const users = await new DB("scoutit", "users");
    try {
        const { username, pass, fullname, mail, phone, type } = req.body;
        const registered_users: null | any[] = await users.ReadMany({
            $or: [
                { username: username },
                { mail: mail },
                { phone: phone }
            ],
            type: type
        });
        registered_users?.some((user) => {
            if(user.username === username){
                res.status(409).send({
                    error: "username is taken"
                });
                return;
            }
            else if(user.mail === mail){
                res.status(409).send({
                    error: "mail is taken"
                });
                return;
            }
            else if(user.phone === phone){
                res.status(409).send({
                    error: "phone number is taken"
                });
                return;
            }
        });
        if( registered_users?.length ){ return }
        const hashedPass: string = await bcrypt.hash(pass, salt);
        const key: number = Math.floor(Math.random() * 999999999999) + 1
        await users.Create({
            username: username,
            fullname: fullname,
            mail: mail,
            phone: phone,
            type: type,
            password: hashedPass,
            verified: false,
            keys: [ key ]
        });
        res.status(200).send({
            key: key
        });
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports = {Register};