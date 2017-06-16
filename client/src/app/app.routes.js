"use strict";
var router_1 = require("@angular/router");
var listMembres_component_1 = require("./listMembres/listMembres.component");
var detailsMembres_component_1 = require("./detailsMembres/detailsMembres.component");
var register_component_1 = require("./register/register.component");
exports.routes = [
    { path: 'list-membres', component: listMembres_component_1.ListMembres },
    { path: 'details-membre', component: detailsMembres_component_1.DetailsMembres },
    { path: 'register', component: register_component_1.Register }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routes.js.map