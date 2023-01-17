const ObjectId = require('mongodb').ObjectId;
const __DB_ = require("./../../db");
const axios = require('axios');

async function LoadProfile(req: any, res: any){
    const usersDb = await new __DB_("scoutit", "users");
    try {
        const { id } = req.params;
        const convertedId = new ObjectId(id);
        let user: any = await usersDb.Read({
            _id: convertedId,
        });
        if(user.github){ 
            await axios.get(`https://api.github.com/users/${user.github.split("/")[user.github.split("/").length - 1]}`)
                .then((profile: any) => { 
                    user.ghProfileData = profile.data;
                 });
        }
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports = { LoadProfile };