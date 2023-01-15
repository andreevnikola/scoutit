const ObjectId = require('mongodb').ObjectId;
const __DB_ = require("./../../db");

async function LoadProfile(req: any, res: any){
    const usersDb = await new __DB_("scoutit", "users");
    try {
        const { id } = req.params;
        const convertedId = new ObjectId(id);
        const user: any = await usersDb.Read({
            _id: convertedId,
            verified: true
        });
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports = { LoadProfile };