const __DB____ = require("./../../db");
const ObjectId_ = require('mongodb').ObjectId;

async function LikeProfile(req: any, res: any){
    const usersDb = await new __DB____("scoutit", "users");
    try {
        const { id, key } = req.params;
        const convertedId = new ObjectId_(id);
        let update: any = {
            $push: {
                following: convertedId
            }
        };
        const theUser = await usersDb.Read({
            keys: parseFloat(key)
        });
        const userId: any = theUser._id;
        let like: boolean =  true;
        theUser.following?.map((following: any) => {
            if(following.equals(convertedId)){
                like = false;
            }
        });
        if(!like){
            update = {
                $pull: {
                    following: convertedId
                }
            };
        }
        const user: any = await usersDb.Update({
            keys: parseFloat(key)
        }, update);
        if(user.matchedCount < 1){
            res.status(401).send();
            return;
        }
        let updateCounter: any = {
            $push: {
                followers: userId
            }
        }
        if(!like){
            updateCounter = {
                $pull: {
                    followers: userId
                }
            };
        }
        const profile: any = await usersDb.Update({
            _id: convertedId
        }, updateCounter);
        if(profile.matchedCount < 1){
            res.status(403).send();
            return;
        }
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports = { LikeProfile };