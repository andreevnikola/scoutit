const DB__ = require("./../../db");

async function Logout(req: any, res: any){
    const users = await new DB__("scoutit", "users");
    try {
        let { key } = req.params;
        key = parseInt(key);
        const registered_user: any = await users.Read({
            keys: key,
        });
        if(registered_user){
            await users.Update({
                keys: key
            }, {
                $pull: {
                    keys: key
                }
            });
            res.status(200).send();
            return;
        }
        res.status(403).send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports = {Logout};