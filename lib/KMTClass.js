const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const getStatus = "FF0000";
const allOFF = "FFE000";
const allIN = "FFE0FF";

class KMT {

    constructor(host, port){
        this.host = host;
        this.port = port;
        this.ports = [];

        server.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
            server.close();
          });
          
          server.on('message', (msg, rinfo) => {
            //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
            this.ports = [];
            for(var i=0; i<msg.length; i++){
                if(msg[i] === 48)
                    this.ports.push(0);
                if(msg[i] === 49)
                    this.ports.push(1);                
            }
          });
          
          server.on('listening', () => {
            const address = server.address();
            console.log(`server listening ${address.address}:${address.port}`);
          });
          
          server.bind(41234);    
    }

    

    switchON(channel) {
        //console.log("Sending message "+"FF"+channel+"01 to Host "+this.host+" on port "+this.port);
        server.send("FF"+channel+"01",this.port,this.host, (err) =>{
            if(err) console.log("Error sending message ",err);
        }) 
    }

    switchOFF(channel){
        //console.log("Sending message "+"FF"+channel+"00 to Host "+this.host+" on port "+this.port);
        server.send("FF"+channel+"00",this.port,this.host, (err) =>{
            if(err) console.log("Error sending message ",err);
        })         
    }


    retrivePortStatus(){
        server.send(getStatus,this.port,this.host, (err) =>{
            if(err) console.log("Error sending message ",err);
        })         
    }

    getStatus() {
        return (this.ports);
    }
}

module.exports = KMT;