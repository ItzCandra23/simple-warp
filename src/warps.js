"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleWarp = exports.WarpsCommandSelector = exports.config = void 0;
const blockpos_1 = require("bdsx/bds/blockpos");
const command_1 = require("bdsx/command");
const event_1 = require("bdsx/event");
const fs = require("fs");
const path = require("path");
const __1 = require("..");
exports.config = {
    title: "§l§2Simple§e-§dWarp",
    content: "Hi §e%player%§r, This is WarpUI you can teleport to warp position",
    button: "§l§2%warp%§r\n§7Click to teleport",
    cancel_button: "§l§8[ §cCANCEL §8]§r"
};
let warps = {};
const configPath = path.join(__dirname, "..", "config.json");
const warpsPath = path.join(__dirname, "..", "warps.json");
try {
    exports.config = require(configPath);
}
catch (e) { }
try {
    warps = require(warpsPath);
}
catch (e) { }
exports.WarpsCommandSelector = command_1.command.enum("WarpsCommandSelector", SimpleWarp.getWarps());
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
            __1.send.error(`Invalid name!`, actor);
            return false;
        }
        if (warps.hasOwnProperty(name)) {
            __1.send.error(`Warp alredy!`, actor);
            return false;
        }
        const posFix = blockpos_1.Vec3.create(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z));
        warps[name] = {
            blockpos: posFix,
            dimension: dimension,
        };
        __1.send.success(`Success added &e${name}&r to new warps.`, actor);
        return true;
    }
    SimpleWarp.addWarp = addWarp;
    /**Edit warp position. */
    function editWarp(name, pos, dimension, actor) {
        if (!warps.hasOwnProperty(name)) {
            __1.send.error(`Warp not found.`, actor);
            return false;
        }
        const posFix = blockpos_1.Vec3.create(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z));
        warps[name].blockpos = posFix;
        warps[name].dimension = dimension;
        __1.send.success(`Success edit &e${name}&r in warps.`, actor);
        return true;
    }
    SimpleWarp.editWarp = editWarp;
    /**Remove warp. */
    function removeWarp(name, actor) {
        if (!warps.hasOwnProperty(name)) {
            __1.send.error(`Warp not found.`, actor);
            return false;
        }
        else {
            delete warps[name];
            __1.send.success(`Success remove &e${name}&r in warps.`, actor);
            return true;
        }
    }
    SimpleWarp.removeWarp = removeWarp;
    /**Save config.json file. */
    function configSave(message = false, actor) {
        fs.writeFile(configPath, JSON.stringify(exports.config), (err) => {
            if (message) {
                if (err)
                    __1.send.error(`config.json ${err}`, actor);
                else
                    __1.send.success(`config.json Saved!`, actor);
            }
        });
    }
    SimpleWarp.configSave = configSave;
    /**Save warps.json file. */
    function warpsSave(message = false, actor) {
        fs.writeFile(warpsPath, JSON.stringify(warps), (err) => {
            if (message) {
                if (err)
                    __1.send.error(`warps.json ${err}`, actor);
                else
                    __1.send.success(`warps.json Saved!`, actor);
            }
        });
    }
    SimpleWarp.warpsSave = warpsSave;
    /**Save all files. */
    function save(message = false, actor) {
        configSave(message, actor);
        warpsSave(message, actor);
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
        const posFix = blockpos_1.Vec3.create(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z));
        player.teleport(posFix);
        player.sendMessage(`§aTeleport to §e${warp}`);
        return true;
    }
    SimpleWarp.teleport = teleport;
})(SimpleWarp = exports.SimpleWarp || (exports.SimpleWarp = {}));
event_1.events.serverOpen.on(() => SimpleWarp.save());
event_1.events.serverStop.on(() => SimpleWarp.save(true));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FycHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3YXJwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxnREFBeUM7QUFFekMsMENBQXVDO0FBQ3ZDLHNDQUFvQztBQUNwQyx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLDBCQUEwQjtBQU9mLFFBQUEsTUFBTSxHQUtiO0lBQ0EsS0FBSyxFQUFFLHFCQUFxQjtJQUM1QixPQUFPLEVBQUUsbUVBQW1FO0lBQzVFLE1BQU0sRUFBRSxtQ0FBbUM7SUFDM0MsYUFBYSxFQUFFLHNCQUFzQjtDQUN4QyxDQUFDO0FBR0YsSUFBSSxLQUFLLEdBQVUsRUFBRSxDQUFDO0FBRXRCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztBQUM3RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFFM0QsSUFBSTtJQUFFLGNBQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7Q0FBRTtBQUFDLE9BQU0sQ0FBQyxFQUFFLEdBQUU7QUFDaEQsSUFBSTtJQUFFLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7Q0FBRTtBQUFDLE9BQU0sQ0FBQyxFQUFFLEdBQUU7QUFFakMsUUFBQSxvQkFBb0IsR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUVoRyxnQkFBZ0I7QUFDaEIsSUFBaUIsVUFBVSxDQXNHMUI7QUF0R0QsV0FBaUIsVUFBVTtJQUV2QixvQkFBb0I7SUFDcEIsU0FBZ0IsUUFBUTtRQUNwQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUZlLG1CQUFRLFdBRXZCLENBQUE7SUFFRCxvQkFBb0I7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