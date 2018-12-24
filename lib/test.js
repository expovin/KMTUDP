const KMT = require('./KMTClass');


m = new KMT('192.168.0.6',12345);
m.switchON("02");
setTimeout(function(){console.log(m.getStatus())},500)