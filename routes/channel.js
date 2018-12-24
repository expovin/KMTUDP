var express = require('express');
var router = express.Router();
const KMT = require('../lib/KMTClass');


m = new KMT('192.168.0.6',12345);


router.route('/')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m.getStatus()});
})

router.route('/retrive')
.get( function(req, res, next) {
    m.retrivePortStatus();
    res.status(200).json({result:'OK', message: "Port status retrived"});
})

//req.params.companyID
router.route('/:channel')
.put( function (req, res, next){
    m.switchON(req.params.channel); 
    res.status(200).json({result:'OK', message:'Channel '+req.params.channel+" ON"});
})
.delete( function (req, res, next){
  m.switchOFF(req.params.channel); 
  res.status(200).json({result:'OK', message:'Channel '+req.params.channel+" OFF"});
})

module.exports = router;
