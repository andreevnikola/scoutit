"use strict";
const register = require("./user/register.js").Register;
const login = require("./user/login.js").Login;
const logout = require("./user/logout.js").Logout;
const authenticate = require("./user/authenticate.js").Authenticate;
module.exports = {
    register,
    login,
    logout,
    authenticate
};
//# sourceMappingURL=index.js.map