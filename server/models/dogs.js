const db = require('../database');

class Dogs {
    static retrieveAll (callback) {
        db.query('SELECT name from dog', (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (name, callback) {
        db.query('INSERT INTO dog (name) VALUES ($1)', [name], (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }
}

module.exports = Dogs;