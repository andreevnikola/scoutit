const __DB___ = require("./../../db");

async function UpdateAccData(req: any, res: any){
    const usersDb = await new __DB___("scoutit", "users");
    try {
        const { key } = req.params;
        const { description, address, city, country } = req.body;
        const user: any = await usersDb.Update({
            keys: parseFloat(key)
        }, {
            $set: {
                description: description,
                address: address,
                city: city,
                country: country
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

module.exports = { UpdateAccData };