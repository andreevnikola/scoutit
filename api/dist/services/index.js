"use strict";
const register = require("./user/register.js").Register;
const login = require("./user/login.js").Login;
const logout = require("./user/logout.js").Logout;
const authenticate = require("./user/authenticate.js").Authenticate;
const confirmmail = require("./user/confirmMail.js").confirmMail;
const verifymail = require("./user/verifyMail.js").verifyMail;
module.exports = {
    register,
    login,
    logout,
    authenticate,
    confirmmail,
    verifymail
};
//# sourceMappingURL=index.js.map