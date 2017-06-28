'use strict';

module.exports = {
    db: {
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
