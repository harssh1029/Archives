'use strict';
var userHandlers = require('../middlewares/authentication.js');
// // module.exports = function(app) {
// //     var userHandlers = require('../middlewares/authentication.js');
// //     // todoList Routes
//     app.route('/tasks')
//         .post(userHandlers.loginRequired, userHandlers.profile);
// //     app.route('/auth/register')
// //         .post(userHandlers.register);
// //    app.route('/auth/sign_in')
// //         .post(userHandlers.sign_in);
// // };

const express = require("express")
const userRouter = express.Router();


userRouter.route('/tasks')
    .post(userHandlers.loginRequired, userHandlers.profile);
userRouter.route('/auth/register')
    .post(userHandlers.register);
userRouter.route('/auth/sign_in')
    .post(userHandlers.sign_in);

module.exports = {userRouter}


