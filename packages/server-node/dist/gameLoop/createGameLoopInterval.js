"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (zone, tickRate) => setInterval(() => {
    for (const mob in zone.entities.mobile) {
        zone.entities.mobile[mob].move();
    }
    console.log(zone.entities.mobile);
}, tickRate);
