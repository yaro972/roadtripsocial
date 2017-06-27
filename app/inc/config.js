'use strict';

module.exports = {
    db: {
        // url: 'mongodb://vps354082.ovh.net/rskdb',
        // url: 'mongodb://192.168.0.104/rskdb:27017',
        // address: 'localhost',        
        address: '192.168.0.116',   
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
        port: 3000,
        ip: '127.0.0.1'
    },
    security: {
        salt: '',
        hash: '',
    },
    passport: {
        secret:'secret'
    }
};
