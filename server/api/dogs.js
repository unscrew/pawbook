var express = require('express');
var Dogs = require('../models/dogs');

var router = express.Router();

router.get('/', function(req, res) {
    Dogs.retrieveAll((err, dogs) => {
        if (err)
            return res.json(err);
        return res.status(200).json(dogs);
    });
});

router.post('/', function(req, res) {
    var dog = req.body.dog;

    Dogs.insert(dog, (err, result) => {
        if (err)
            return res.json(err);
        return res.json(result);
    });
});

module.exports = router;