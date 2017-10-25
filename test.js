var controller = require("./index.js");

var command = process.argv[2];

controller.config({
    name: "NEC",
    baudRate: 38400,
    on: [0x02, 0x00, 0x00, 0x00, 0x00, 0x02],
    off: [0x02, 0x01, 0x00, 0x00, 0x00, 0x03],
    settings: [0x00, 0x85, 0x00, 0x00, 0x01, 0x00, 0x86]  // 00h 85h 00h 00h 01h 00h 86h
}, () => {
    controller[command]((success) => {
        return;
    });
});

