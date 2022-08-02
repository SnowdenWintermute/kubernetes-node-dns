"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("@permadeath/game/dist/base/Point");
const MobileEntity_1 = require("@permadeath/game/dist/entities/MobileEntity");
const dist_1 = require("@permadeath/utils/dist");
function fillZoneWithTestMobileEntities(numberOfEntities, zone) {
    const { territory } = zone;
    const { origin } = territory;
    const bottomRightCorner = new Point_1.Point(origin.x + territory.width, origin.y + territory.height);
    for (let i = numberOfEntities; i > 0; i--)
        zone.entities.mobile[i] = new MobileEntity_1.MobileEntity("entity " + i, new Point_1.Point((0, dist_1.randomInt)(origin.x, bottomRightCorner.x), (0, dist_1.randomInt)(origin.y, bottomRightCorner.y)), (0, dist_1.randomInt)(1, 5), (pos, speed) => {
            pos.x += Math.random() >= 0.5 ? 1 : -1 * speed;
            pos.y += Math.random() >= 0.5 ? 1 : -1 * speed;
        });
}
exports.default = fillZoneWithTestMobileEntities;
