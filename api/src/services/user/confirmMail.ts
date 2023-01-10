const _DB_ = require("./../../db");
const Mail = require("./../../reuseble/mail").mail;

async function confirmMail(req: any, res: any){
    const users = await new _DB_("scoutit", "users");
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
        const code = Math.floor(Math.random() * 999999999999) + 1;
        await users.Update({
            keys: parseFloat(key)
        }, {
            $set: {
                verification_code: code
            }
        });
        Mail(registered_user.mail, 'ScoutIT! Confirm E-MAIL 📩', `
        <h1><span style="color: green;">ScoutIT</span> Confirm MAIL for <strong>${registered_user.username}</strong>📩</h1>
        <p>Confirm your E-MAIL address to make your accout visible for everyone! 👀</p>
        <p>You have to click the button bellow to confirm your E-MAIL address</p>
        <p style="font-size: 10px; color: grey;">If the BUTTON do not work open this page in your browser: <strong>http://localhost:4200/auth/verify/${key}/${code}</strong></p>
        <br><br><a style="text-align:center; margin-top: 50px; background: blue; color: white; padding: 10px; font-size: 20px; text-decoration: none; font-weight: bold; border: 2px solid black; border-radius: 5px;" href="http://localhost:4200/auth/verify/${key}/${code}">Confirm MAIL</a>
        `);
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports = { confirmMail };