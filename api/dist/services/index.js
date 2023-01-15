"use strict";
const register = require("./user/register.js").Register;
const login = require("./user/login.js").Login;
const logout = require("./user/logout.js").Logout;
const authenticate = require("./user/authenticate.js").Authenticate;
const confirmmail = require("./user/confirmMail.js").confirmMail;
const verifymail = require("./user/verifyMail.js").verifyMail;
const settings = require("./user/settings.js").Settings;
const loadprofile = require("./profile/load.js").LoadProfile;
const updateaccdata = require("./profile/UpdateAccData.js").UpdateAccData;
module.exports = {
    register,
    login,
    logout,
    authenticate,
    confirmmail,
    verifymail,
    settings,
    loadprofile,
    updateaccdata
};
//# sourceMappingURL=index.js.map