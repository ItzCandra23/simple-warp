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
        fs.writeFile(warpsPath, JSON.stringify(warps, null, 2), (err) => {
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
        const hasTimeoutMode = src_1.WarpConfig.getTimeout();
        if (hasTimeoutMode) {
            let oldPos = player.getPosition().toJSON();
            const playerTag = "inTeleporting";
            const timeout = setTimeout(() => {
                const newPos = player.getPosition().toJSON();
                if (newPos.x === oldPos.x && newPos.y === oldPos.y && newPos.z === oldPos.z) {
                    player.teleport(posFix);
                    player.sendMessage(`§aTeleported to §e${warp}`);
                }
                else {
                    player.sendMessage(`§cTeleport has cancelled!`);
                }
                player.removeTag(playerTag);
            }, hasTimeoutMode * 1000);
            event_1.events.playerLeft.on((ev) => {
                if (ev.player === player)
                    clearTimeout(timeout);
            });
            if (player.hasTag(playerTag)) {
                clearTimeout(timeout);
                player.removeTag(playerTag);
                player.sendMessage(`§cTeleport has cancelled!`);
                return false;
            }
            else {
                player.addTag(playerTag);
                player.sendMessage(`§aTeleporting in ${hasTimeoutMode}s`);
                player.sendMessage(`§aPlease don't move!`);
            }
            return true;
        }
        player.teleport(posFix);
        player.sendMessage(`§aTeleported to §e${warp}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxnREFBeUM7QUFDekMsc0NBQW9DO0FBQ3BDLGlEQUEyQztBQUMzQywrQkFBbUM7QUFFbkMseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQVE3QixJQUFJLEtBQUssR0FBVSxFQUFFLENBQUM7QUFFdEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDckQsSUFBSTtJQUFFLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7Q0FBRTtBQUFDLE9BQU0sQ0FBQyxFQUFFLEdBQUU7QUFHOUMsZ0JBQWdCO0FBQ2hCLElBQWlCLFVBQVUsQ0E4SDFCO0FBOUhELFdBQWlCLFVBQVU7SUFFdkIsb0JBQW9CO0lBQ3BCLFNBQWdCLFFBQVE7UUFDcEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFGZSxtQkFBUSxXQUV2QixDQUFBO0lBRUQsb0JBQW9CO0lBQ3BCLFNBQWdCLE9BQU8sQ0FBQyxJQUFZO1FBQ2hDLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBSGUsa0JBQU8sVUFHdEIsQ0FBQTtJQUVELGVBQWU7SUFDZixTQUFnQixPQUFPLENBQUMsSUFBWSxFQUFFLEdBQVMsRUFBRSxTQUFzQixFQUFFLEtBQW9CO1FBQ3pGLElBQUksSUFBSSxLQUFLLEVBQUUsSUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckQsY0FBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENB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