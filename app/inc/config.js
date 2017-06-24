'use strict';

module.exports = {
    db: {
        // url: 'mongodb://vps354082.ovh.net/rskdb',
        // url: 'mongodb://192.168.0.104/rskdb:27017',
        address: 'localhost',        
        dbName: 'rskdb',        
        user: '',
        pass: '',
        port: 27017,
        connString: function () {
            let connStr = 'mongodb://';
            if (this.user.length && this.pass.length) {
                connStr += this.user + ":" + this.pass + '@';
            }
            connStr += this.address + ':' + this.port + '/' + this.dbName;
            return connStr;
        }
    },
    srv: {
        port: 3000
    },
    security: {
        salt: '',
        hash: '',
    },
    passport: {
        secret:'secret'
    }
};
