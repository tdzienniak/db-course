var config = require('../config.json');
var sql = require('mssql');

module.exports = {
    get: function (callback) {
        var connection = new sql.Connection(config.db, function (err) {
            return callback(err, connection);
        })
    }
}