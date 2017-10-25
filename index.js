
var SerialPort = require('serialport');

this.config = {};
this.currentPort;
var portList = [];

this.initPort = (cb) => {
    var port = new SerialPort(this.currentPort, {
        baudRate: this.config.baudRate,
        dataBits: 8,
        parity: "none",
        stopBits: 1
    });
    port.on('open', function() {
        console.log("Port opened");
        cb(port);
    });
    port.on('close', function(err) {
        console.log("Port closed");
    });
    port.on('data', function(data) {
        console.log(data.toString("hex"));
    })
    port.on('error', function(err) {
        console.log('Error:', err.message);
    });
};

var listPorts = (cb) => {
    SerialPort.list((err, ports) => {
        portList = [];
        ports.forEach((port) => {
            portList.push(port.comName);
        });
        cb(portList);
    });
}



module.exports = {
    config: (c, cb) => {
        console.log("Configuring", c.name);
        this.config = c;
        listPorts((ports) => {
            ports = ports;
            if (ports.length === 1) {
                this.currentPort = ports[0];
            }
            cb();
        })
        
    },
    list: (cb) => {
        return listPorts(cb);
    },
    setPort: (comm, cb) => {
        this.currentPort = portList.filter((p) => {
            if (p === comm) {
                return true;
            }
        })[0];
        cb();
    },
    off: (cb) => {
        this.initPort((port) => {
            port.write(this.config["off"], function (data) {
                setTimeout(() => {
                    port.close();
                    cb();
                },2000);
            });
        });
    },
    on: (cb) => {
        this.initPort((port) => {
            port.write(this.config["on"], function (data) {
                setTimeout(() => {
                    port.close();
                    cb();
                },2000);
            });
        });
    }
};



