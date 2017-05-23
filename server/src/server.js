'use strict';

var port = process.env.PORT || 4200  ;

// var app = express();
var app = require('./app')

app.listen(port, function() {
  console.log('Serveur démarré sur le port : ' + port);
});
