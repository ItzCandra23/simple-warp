"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleWarpAPI = exports.dimensionString = exports.config = void 0;
const actor_1 = require("bdsx/bds/actor");
const blockpos_1 = require("bdsx/bds/blockpos");
const event_1 = require("bdsx/event");
const fs_1 = require("fs");
exports.config = {
    "title": "§l§2Simple§e-§dWarp",
    "content": "Hi §e%player%§r, This is WarpUI you can teleport to warp position",
    "button": "§l§2%warp%§r\n§7Click to teleport",
    "cancel_button": "§l§8[ §cCANCEL §8]§r"
};
let warps = {};
try {
    exports.config = require(__dirname + "../../../config.json");
}
catch (e) {
    console.log(`[Simple-Warp] config.json not found!`);
}
try {
    warps = require(__dirname + "../../../warps.json");
}
catch (e) {
    console.log(`[Simple-Warp] warps.json not found!`);
}
function dimensionString(dimension) {
    if (dimension === actor_1.DimensionId.Overworld)
        return "Overworld";
    if (dimension === actor_1.DimensionId.Nether)
        return "Nether";
    if (dimension === actor_1.DimensionId.TheEnd)
        return "TheEnd";
    return "Undefined";
}
exports.dimensionString = dimensionString;
class SimpleWarpAPI {
    /**warps. */
    static warps() {
        return warps;
    }
    /**Add warp. */
    static addWarp(name, pos, dimension, player) {
        if (name === "") {
            player === null || player === void 0 ? void 0 : player.sendMessage(`§cInvalid name.`);
            return false;
        }
        if (warps.hasOwnProperty(name)) {
            player === null || player === void 0 ? void 0 : player.sendMessage(`§cWarp alredy.`);
            return false;
        }
        warps[name] = {
            "blockpos": pos,
            "dimension": dimension
        };
        player === null || player === void 0 ? void 0 : player.sendMessage(`§aAdded §5[§r${name}§r§7, §8[§e${pos.x}§7, §e${pos.y}§7, §e${pos.z}§8]§7, §2${dimensionString(dimension)}§5]`);
        return true;
    }
    /**Edit warp position. */
    static editWarp(name, pos, dimension, player) {
        if (warps.hasOwnProperty(name) === false) {
            player === null || player === void 0 ? void 0 : player.sendMessage(`§cWarp not found.`);
            return false;
        }
        player === null || player === void 0 ? void 0 : player.sendMessage(`§aEdie §5[§r${name}§r§7, §8[§e${warps[name].blockpos.x}§7, §e${warps[name].blockpos.y}§7, §e${warps[name].blockpos.z}§8]§7, §2${dimensionString(warps[name].dimension)}§5] §ato §5[§r${name}§r§7, §8[§e${pos.x}§7, §e${pos.y}§7, §e${pos.z}§8]§7, §2${dimensionString(dimension)}§5]`);
        warps[name].blockpos = pos;
        warps[name].dimension = dimension;
        return true;
    }
    /**Remove warp. */
    static removeWarp(name, player) {
        if (warps.hasOwnProperty(name) === false) {
            player === null || player === void 0 ? void 0 : player.sendMessage(`§cWarp not found.`);
            return false;
        }
        else {
            player === null || player === void 0 ? void 0 : player.sendMessage(`§aRemove §5[§r${name}§r§7, §8[§e${warps[name].blockpos.x}§7, §e${warps[name].blockpos.y}§7, §e${warps[name].blockpos.z}§8]§7, §2${dimensionString(warps[name].dimension)}§5]`);
            delete warps[name];
            return true;
        }
    }
    /**WriteConfigFile. */
    static writeConfigFile(actor) {
        (0, fs_1.writeFile)(__dirname + "../../../config.json", JSON.stringify(exports.config), (err) => {
            if (err) {
                console.log(`[Simple-Warp] config.json Error: \n${err}`);
                actor === null || actor === void 0 ? void 0 : actor.sendMessage(`[Simple-Warp] config.json Faild to save! Error: \n${err}`);
            }
            else {
                console.log(`[Simple-Warp] config.json Saved!`);
                actor === null || actor === void 0 ? void 0 : actor.sendMessage(`[Simple-Warp] config.json Success to save!`);
            }
        });
    }
    /**WriteWarpsFile. */
    static writeWarpsFile(actor) {
        (0, fs_1.writeFile)(__dirname + "../../../warps.json", JSON.stringify(warps), (err) => {
            if (err) {
                console.log(`[Simple-Warp] warps.json Error: \n${err}`);
                actor === null || actor === void 0 ? void 0 : actor.sendMessage(`[Simple-Warp] warps.json Faild to save! Error: \n${err}`);
            }
            else {
                console.log(`[Simple-Warp] warps.json Saved!`);
                actor === null || actor === void 0 ? void 0 : actor.sendMessage(`[Simple-Warp] warps.json Success to save!`);
            }
        });
    }
    /**WriteAllFile. */
    static writeFile(actor) {
        this.writeConfigFile(actor);
        this.writeWarpsFile(actor);
    }
    /**Teleport player to warp. */
    static teleport(player, warp) {
        if (warps.hasOwnProperty(warp) === false) {
            player.sendMessage(`§cWarp not found.`);
            return false;
        }
        const data = warps[warp];
        player.teleport(blockpos_1.Vec3.create(data.blockpos.x + 0.5, data.blockpos.y + 0.5, data.blockpos.z + 0.5), data.dimension, blockpos_1.Vec3.create(data.blockpos.x, data.blockpos.y, player.getRotation().y));
        player.sendMessage(`§aTeleport to §e${warp}`);
        return true;
    }
}
exports.SimpleWarpAPI = SimpleWarpAPI;
event_1.events.serverStop.on(() => {
    SimpleWarpAPI.writeFile();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQ0FBNkM7QUFDN0MsZ0RBQW1EO0FBRW5ELHNDQUFvQztBQUNwQywyQkFBK0I7QUFPcEIsUUFBQSxNQUFNLEdBQUc7SUFDaEIsT0FBTyxFQUFFLHFCQUFxQjtJQUM5QixTQUFTLEVBQUUsbUVBQW1FO0lBQzlFLFFBQVEsRUFBRSxtQ0FBbUM7SUFDN0MsZUFBZSxFQUFFLHNCQUFzQjtDQUMxQyxDQUFDO0FBRUYsSUFBSSxLQUFLLEdBRUwsRUFBRSxDQUFDO0FBRVAsSUFBSTtJQUFFLGNBQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLHNCQUFzQixDQUFDLENBQUE7Q0FBRTtBQUFDLE9BQU0sQ0FBQyxFQUFFO0lBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFBO0NBQUU7QUFDN0gsSUFBSTtJQUFFLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLENBQUE7Q0FBRTtBQUFDLE9BQU0sQ0FBQyxFQUFFO0lBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFBO0NBQUU7QUFFMUgsU0FBZ0IsZUFBZSxDQUFDLFNBQXNCO0lBQ2xELElBQUksU0FBUyxLQUFLLG1CQUFXLENBQUMsU0FBUztRQUFFLE9BQU8sV0FBVyxDQUFDO0lBQzVELElBQUksU0FBUyxLQUFLLG1CQUFXLENBQUMsTUFBTTtRQUFFLE9BQU8sUUFBUSxDQUFDO0lBQ3RELElBQUksU0FBUyxLQUFLLG1CQUFXLENBQUMsTUFBTTtRQUFFLE9BQU8sUUFBUSxDQUFDO0lBQ3RELE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFMRCwwQ0FLQztBQUVELE1BQWEsYUFBYTtJQUN0QixZQUFZO0lBQ1osTUFBTSxDQUFDLEtBQUs7UUFDUixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0QsZUFBZTtJ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