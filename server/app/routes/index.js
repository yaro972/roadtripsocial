var Router = require('express');

/*var adminRoutes = require("./admin.route");
var apiRoutes = require("./api.route");
var chatRoute = require("./chat.route");
var publicRoute = require("./public.route");
var userRoutes = require("./user.route");*/
const userApi = require("./user.route");
const api = require("./api.route");
const admin = require("./admin.route");
const chat = require("./chat.route");

const router = Router();

router.use('/api/user', userApi);
router.use('/api', api);
router.use('/admin', admin);
router.use('/chat', chat);

export const Controllers = router;
