const express = require('express');
const router = express.Router();
const KMT = require('../lib/KMTClass');
const settings = require('../lib/settings');

m = new KMT(settings.KMTDevice.host,settings.KMTDevice.port, settings.listeningPort);


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
