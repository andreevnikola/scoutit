const __DB__ = require("./../../db");
const _bcrypt = require("bcryptjs");
const cloudinary_ = require("./../../cloudinary.js");

async function Settings(req: any, res: any){
    const users = await new __DB__("scoutit", "users");
    const salt = await _bcrypt.genSalt(4);
    try {
        let { key } = req.params;
        const { phone, pass, mail, fullname, username } = req.body;
        key = parseInt(key);
        const registered_user: any = await users.Read({
            keys: key,
        });
        const thereIsRegistered = await users.ReadMany({
            $or: [
                { username: username },
                { mail: mail },
                { phone: phone }
            ]
        });
        let taken: string[] = [];
        thereIsRegistered?.some((thereIsRegistered: any) => {
            if(!thereIsRegistered._id.equals(registered_user._id)){
                if(thereIsRegistered.username === username){ taken.push("username") }
                if(thereIsRegistered.mail === mail){ taken.push("mail") }
                if(thereIsRegistered.phone === phone){ taken.push("phone") }
                res.status(409).send({
                    taken: taken
                });
                return;
            }
        });
        if(taken.length > 0){ return; }
        if(!registered_user){
            res.status(401).send();
            return;
        }
        let upload;
        if(req.file?.path){
            upload = await cloudinary_.v2.uploader.upload(req.file.path);
            if(registered_user.profile_picture && !registered_user.profile_picture.startsWith("https://avatars.dicebear")){
                cloudinary_.uploader.destroy(registered_user.profile_picture.split("/")[7].replace(".jpg", "").replace(".png", ""));
            }
        }
        const hashedPass: string = pass !== "unknown" ? await _bcrypt.hash(pass, salt) : registered_user.password;
        await users.Update({
            keys: key
        }, {    
            $set: {
                username: username,
                phone: phone,
                password: hashedPass,
                mail: mail,
                fullname: fullname,
                verified: registered_user.verified && registered_user.mail === mail ? true : false,
                profile_picture: upload ? upload.secure_url : registered_user.profile_picture ? registered_user.profile_picture : null
            }
        });
        res.status(200).send({ 
            url: upload ? upload.secure_url : null
        });
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports = { Settings };