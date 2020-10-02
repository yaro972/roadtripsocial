'use strict';

var express = require('express');
var router = express.Router();

const adminControllers = require('./V1/admin');
const apiControllers = require('./V1/api');
const chatControllers = require('./V1/chat');
const publicControllers = require('./V1/public');
const userControllers = require('./V1/user');


router.bind([
    adminControllers,
    apiControllers,
    chatControllers,
    publicControllers,
    userControllers
])

module.export = router;
