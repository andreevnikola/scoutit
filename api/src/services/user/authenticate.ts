const _DB = require("./../../db");

async function Authenticate(req: any, res: any){
    const users = await new _DB("scoutit", "users");
    try {
        let { key } = req.params;
        key = parseInt(key);
        const registered_user: any = await users.Read({
            keys: key,
        });
        if(!registered_user){
            res.status(403).send();
            return;
        }
        res.status(200).send({
            username: registered_user.username,
            mail: registered_user.mail,
            phone: registered_user.phone,
            fullname: registered_user.fullname, 
            id: registered_user._id.toString(),
            url: registered_user.profile_picture,
            verified: registered_user.verified
        });
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports = { Authenticate };