const _DB__ = require("./../../db");
const Mail_ = require("./../../reuseble/mail").mail;

async function verifyMail(req: any, res: any){
    const users = await new _DB__("scoutit", "users");
    try {
        let { key, code } = req.params;
        key = parseInt(key);
        const registered_user: any = await users.Read({
            keys: key,
        });
        if(!registered_user){
            res.status(403).send();
            return;
        }
        if(registered_user.verification_code.toString() !== code){
            res.status(403).send();
            return;
        }
        await users.Update({
            keys: key
        }, {
            $set: {
                verified: true
            }
        });
        Mail_(registered_user.mail, 'ScoutIT! E-MAIL has been CONFIRMED 📧', `
        <h1><span style="color: green;">ScoutIT</span> Your mail has been confirmed for account <strong>${registered_user.username}</strong> 📩</h1>
        <p>Your E-MAIL address has been confirmed so now your accout is visible for everyone! 👀</p>
        `);
        res.status(200).send({
            firstname: registered_user.fullname.split(" ")[0],
            id: registered_user._id.toString()
        });
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports = { verifyMail };