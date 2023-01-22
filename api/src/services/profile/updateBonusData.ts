const DB_BD = require("./../../db");

async function updateBonusData(req: any, res: any){
    const usersDb = await new DB_BD("scoutit", "users");
    try {
        const { key } = req.params;
        const { quote, detailedDescription, websites } = req.body;
        const user: any = await usersDb.Update({
            keys: parseFloat(key)
        }, {
            $set: {
                quote: quote,
                detailedDescription: detailedDescription,
                websites: websites
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

module.exports = { updateBonusData };