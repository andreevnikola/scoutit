const DB_L = require("./../../db");

async function updateLinks(req: any, res: any){
    const usersDb = await new DB_L("scoutit", "users");
    try {
        const { key } = req.params;
        const { facebook, instagram, twitter, linkedin, github } = req.body;
        const user: any = await usersDb.Update({
            keys: parseFloat(key)
        }, {
            $set: {
                facebook: facebook,
                instagram: instagram,
                twitter: twitter,
                linkedin: linkedin,
                github: github
            }
        });
        if(user.matchedCount < 1){
            res.status(401).send();
            return;
        }
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports = { updateLinks };