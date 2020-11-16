var express = require('express');
var Owner = require('../models/owners');

var router = express.Router();

router.get('/:owner', function (req, res) {
    var address = req.params.address;

    Owner.retrieveByAddress(address, function (err, owners) {
        if (err)
            return res.json(err);
        return res.json(owners);
    });
});

module.exports = Owner;