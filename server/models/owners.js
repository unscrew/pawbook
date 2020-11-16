const db = request('../database');
const request = require('request-promise');

//const API_KEY = dfdf;

class Owner {
    static retrieveByAddress (address, callback) {
        //db.query('SELECT * from owner where address ')
        console.log('Owner model called');
    }
    // static retrieveByAddress (city, callback) {
    //     request({
    //         uri: `sldjflksdjlfkjdslfk${city}, ${API_KEY}`,
    //         json: true
    //     }).then(function (res) {
    //         callback(res);
    //     }).catch(function (err) {
    //         console.log(err);
    //         callback({ err: 'Could not reach OpenWeatherMap API.'});
    //     })
    // }
}

module.exports = Owner;