# projector-controller

*projector-controller* is an node NPM package that allows generic controller over display projectors that have an RS-223 serial interface and an API scheme.

## Example (using default COM port)

    var controller = require("./index.js");

    controller.config({
        name: "NEC",
        baudRate: 38400,
        on: [0x02, 0x00, 0x00, 0x00, 0x00, 0x02],
        off: [0x02, 0x01, 0x00, 0x00, 0x00, 0x03],
    }, () => {
        controller.on((success) => {
            return;
        });
    });


## Setting specific port

If you have multiple COM ports defined, you can specify which port yourself in code.

    var controller = require("./index.js");
    
    controller.config({
        name: "NEC",
        baudRate: 38400,
        on: [0x02, 0x00, 0x00, 0x00, 0x00, 0x02],
        off: [0x02, 0x01, 0x00, 0x00, 0x00, 0x03],
        settings: [0x00, 0x85, 0x00, 0x00, 0x01, 0x00, 0x86]  // 00h 85h 00h 00h 01h 00h 86h
    }, () => {
        controller.setPort("COM3", () => {
            controller.off((success) => {
                return;
            });
        });
    });

## Summary

Basically, you pass your particular projector's API specifications in JSON format and the projector-controller takes care of all the serial port communication.

## Help me

I welcome any and all pull requests. I specifically need help with unit testing and code structure (async, callback, promises).
