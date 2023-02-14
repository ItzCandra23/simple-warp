"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleWarp = void 0;
const blockpos_1 = require("bdsx/bds/blockpos");
const event_1 = require("bdsx/event");
const message_1 = require("./src/utils/message");
const src_1 = require("./src");
const fs = require("fs");
const path = require("path");
let warps = {};
const warpsPath = path.join(__dirname, "warps.json");
try {
    warps = require(warpsPath);
}
catch (e) { }
/**SimpleWarp */
var SimpleWarp;
(function (SimpleWarp) {
    /**Get all warps. */
    function getWarps() {
        return Object.keys(warps);
    }
    SimpleWarp.getWarps = getWarps;
    /**Get warp data. */
    function getWarp(warp) {
        if (warps.hasOwnProperty(warp))
            return warps[warp];
        return null;
    }
    SimpleWarp.getWarp = getWarp;
    /**Add warp. */
    function addWarp(name, pos, dimension, actor) {
        if (name === "" || name.includes("§") || name.includes(" ")) {
            message_1.send.error(`Invalid name!`, actor);
            return false;
        }
        if (warps.hasOwnProperty(name)) {
            message_1.send.error(`Warp alredy!`, actor);
            return false;
        }
        const posFix = blockpos_1.Vec3.create(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z));
        warps[name] = {
            blockpos: posFix,
            dimension: dimension,
        };
        message_1.send.success(`Success added &e${name}&r to new warps.`, actor);
        return true;
    }
    SimpleWarp.addWarp = addWarp;
    /**Edit warp position. */
    function editWarp(name, pos, dimension, actor) {
        if (!warps.hasOwnProperty(name)) {
            message_1.send.error(`Warp not found.`, actor);
            return false;
        }
        const posFix = blockpos_1.Vec3.create(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z));
        warps[name].blockpos = posFix;
        warps[name].dimension = dimension;
        message_1.send.success(`Success edit &e${name}&r in warps.`, actor);
        return true;
    }
    SimpleWarp.editWarp = editWarp;
    /**Remove warp. */
    function removeWarp(name, actor) {
        if (!warps.hasOwnProperty(name)) {
            message_1.send.error(`Warp not found.`, actor);
            return false;
        }
        else {
            delete warps[name];
            message_1.send.success(`Success remove &e${name}&r in warps.`, actor);
            return true;
        }
    }
    SimpleWarp.removeWarp = removeWarp;
    /**Save warps.json file. */
    function save(message = false, actor) {
        fs.writeFile(warpsPath, JSON.stringify(warps), (err) => {
            if (message) {
                if (err) {
                    message_1.send.error(`warps.json ${err}`, actor);
                    throw err;
                }
                else
                    message_1.send.success(`warps.json Saved!`, actor);
            }
        });
    }
    SimpleWarp.save = save;
    /**Teleport player to warp. */
    function teleport(player, warp) {
        if (warps.hasOwnProperty(warp) === false) {
            player.sendMessage(`§cWarp not found.`);
            return false;
        }
        const data = warps[warp];
        const pos = data.blockpos;
        const posFix = blockpos_1.Vec3.create(Math.floor(pos.x) + 0.5, Math.floor(pos.y) + 0.5, Math.floor(pos.z) + 0.5);
        player.teleport(posFix);
        player.sendMessage(`§aTeleport to §e${warp}`);
        return true;
    }
    SimpleWarp.teleport = teleport;
})(SimpleWarp = exports.SimpleWarp || (exports.SimpleWarp = {}));
event_1.events.serverOpen.on(() => {
    require("./src");
    require("./src/commands");
    message_1.send.success("Started!");
});
event_1.events.serverClose.on(() => {
    src_1.WarpConfig.save(true);
    SimpleWarp.save(true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxnREFBeUM7QUFDekMsc0NBQW9DO0FBQ3BDLGlEQUEyQztBQUMzQywrQkFBbUM7QUFDbkMseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQVE3QixJQUFJLEtBQUssR0FBVSxFQUFFLENBQUM7QUFFdEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDckQsSUFBSTtJQUFFLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7Q0FBRTtBQUFDLE9BQU0sQ0FBQyxFQUFFLEdBQUU7QUFHOUMsZ0JBQWdCO0FBQ2hCLElBQWlCLFVBQVUsQ0F5RjFCO0FBekZELFdBQWlCLFVBQVU7SUFFdkIsb0JBQW9CO0lBQ3BCLFNBQWdCLFFBQVE7UUFDcEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFGZSxtQkFBUSxXQUV2QixDQUFBO0lBRUQsb0JBQW9CO0lBQ3BCLFNBQWdCLE9BQU8sQ0FBQyxJQUFZO1FBQ2hDLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBSGUsa0JBQU8sVUFHdEIsQ0FBQTtJQUVELGVBQWU7SUFDZixTQUFnQixPQUFPLENBQUMsSUFBWSxFQUFFLEdBQVMsRUFBRSxTQUFzQixFQUFFLEtBQW9CO1FBQ3pGLElBQUksSUFBSSxLQUFLLEVBQUUsSUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckQsY0FBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENB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