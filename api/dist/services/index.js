"use strict";
const register = require("./user/register.js").Register;
const login = require("./user/login.js").Login;
const logout = require("./user/logout.js").Logout;
const authenticate = require("./user/authenticate.js").Authenticate;
const confirmmail = require("./user/confirmMail.js").confirmMail;
const verifymail = require("./user/verifyMail.js").verifyMail;
const settings = require("./user/settings.js").Settings;
const loadprofile = require("./profile/load.js").LoadProfile;
const updateaccdata = require("./profile/updateAccData.js").UpdateAccData;
const updatelinks = require("./profile/updateLinks.js").updateLinks;
const likeProfile = require("./profile/likeProfile.js").LikeProfile;
const updatebonusdata = require('./profile/updateBonusData.js').updateBonusData;
module.exports = {
    register,
    login,
    logout,
    authenticate,
    confirmmail,
    verifymail,
    settings,
    loadprofile,
    updateaccdata,
    updatelinks,
    likeProfile,
    updatebonusdata
};
//# sourceMappingURL=index.js.map