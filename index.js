"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarpUI = exports.SimpleWarp = void 0;
const actor_1 = require("bdsx/bds/actor");
const blockpos_1 = require("bdsx/bds/blockpos");
const event_1 = require("bdsx/event");
const form_1 = require("bdsx/bds/form");
const message_1 = require("./src/utils/message");
const fs = require("fs");
const path = require("path");
const teleporting = new Map();
let config = {
    timeout: 3,
    warpui: {
        title: "§l§2Simple§e-§dWarp",
        description: "Hi §e{player}§r, This is WarpUI you can teleport to warp position",
        warp: "§l§2{warp}§r\n§8Click to teleport",
        cancel: "§l§8[ §cCANCEL §8]§r",
    },
};
let warps = {};
const configPath = path.join(__dirname, "config.json");
const warpsPath = path.join(__dirname, "warps.json");
try {
    config = require(configPath);
    warps = require(warpsPath);
}
catch (err) { }
/**SimpleWarp */
var SimpleWarp;
(function (SimpleWarp) {
    /**Get Teleport Timeout */
    function getTimeout() {
        if (!config.timeout)
            return undefined;
        if (config.timeout < 0 || config.timeout === 0)
            return undefined;
        return config.timeout;
    }
    SimpleWarp.getTimeout = getTimeout;
    /**Get all warps */
    function getWarps() {
        return Object.keys(warps);
    }
    SimpleWarp.getWarps = getWarps;
    /**Get warp data */
    function getWarp(warp) {
        if (warps.hasOwnProperty(warp))
            return warps[warp];
        return null;
    }
    SimpleWarp.getWarp = getWarp;
    /**Has warp added */
    function hasWarp(name) {
        return warps.hasOwnProperty(name);
    }
    SimpleWarp.hasWarp = hasWarp;
    /**Add warp */
    async function addWarp(name, pos, dimension) {
        return new Promise((resolve, reject) => {
            const textPattern = /^[A-Za-z0-9]+$/;
            if (!textPattern.test(name) || name === "") {
                reject(`Invalid name!`);
                return;
            }
            if (hasWarp(name)) {
                reject(`Warp alredy!`);
                return;
            }
            const posFix = blockpos_1.BlockPos.create(pos);
            warps[name] = {
                pos: posFix,
                dimension: dimension,
            };
            resolve({ name: name, pos: posFix, dimension: dimension });
        });
    }
    SimpleWarp.addWarp = addWarp;
    /**Remove warp */
    async function removeWarp(name) {
        return new Promise((resolve, reject) => {
            const warp = getWarp(name);
            if (!warp) {
                reject(`Warp not found!`);
                return;
            }
            delete warps[name];
            resolve({ name, pos: warp.pos, dimension: warp.dimension });
        });
    }
    SimpleWarp.removeWarp = removeWarp;
    /**Set warp position */
    async function setWarp(name, pos, dimension) {
        return new Promise((resolve, reject) => {
            const warp = getWarp(name);
            if (!warp) {
                reject(`Warp not found!`);
                return;
            }
            const posFix = blockpos_1.BlockPos.create(pos);
            warps[name].pos = posFix;
            warps[name].dimension = dimension;
            resolve([{ name: name, pos: warp.pos, dimension: warp.dimension }, { name: name, pos: posFix, dimension: dimension }]);
        });
    }
    SimpleWarp.setWarp = setWarp;
    /**Save */
    function save(message = false) {
        fs.writeFile(configPath, JSON.stringify(config, null, 4), (err) => {
            if (message) {
                if (err) {
                    message_1.send.error(`config.json ${err}`);
                    throw err;
                }
                else
                    message_1.send.success(`config.json Saved!`);
            }
        });
        fs.writeFile(warpsPath, JSON.stringify(warps, null, 4), (err) => {
            if (message) {
                if (err) {
                    message_1.send.error(`warps.json ${err}`);
                    throw err;
                }
                else
                    message_1.send.success(`warps.json Saved!`);
            }
        });
    }
    SimpleWarp.save = save;
    /**Teleport player to warp */
    function teleport(player, warp) {
        if (!hasWarp(warp)) {
            player.sendMessage(`§cWarp not found!`);
            return false;
        }
        const data = warps[warp];
        const pos = data.pos;
        const posFix = blockpos_1.Vec3.create(Math.floor(pos.x) + 0.5, Math.floor(pos.y) + 0.5, Math.floor(pos.z) + 0.5);
        const timeout = getTimeout();
        if (timeout) {
            player.sendMessage(`§aTeleporting to §r${warp}§a in §r${timeout}§a seaconds`);
            teleporting.set(player.getNetworkIdentifier(), player);
            const wait = setTimeout(() => {
                if (teleporting.has(player.getNetworkIdentifier())) {
                    teleporting.delete(player.getNetworkIdentifier());
                    player.teleport(posFix);
                    player.sendMessage(`§aTeleported!`);
                }
            }, timeout * 1000);
            event_1.events.playerLeft.on((ev) => {
                if (ev.player === player)
                    clearTimeout(wait);
            });
            return true;
        }
        player.sendMessage(`§aTeleporting to §r${warp}`);
        player.teleport(posFix);
        player.sendMessage(`§aTeleported!`);
        return true;
    }
    SimpleWarp.teleport = teleport;
})(SimpleWarp = exports.SimpleWarp || (exports.SimpleWarp = {}));
/**WarpUI contents */
var WarpUI;
(function (WarpUI) {
    /**Get WarpUI Title */
    function getTitle() {
        return config.warpui.title;
    }
    WarpUI.getTitle = getTitle;
    /**Get WarpUI Description */
    function getDescription() {
        return config.warpui.description;
    }
    WarpUI.getDescription = getDescription;
    /**Get WarpUI Button */
    function getWarpButton(warp, pos, dimensionId) {
        return textReplace(config.warpui.warp, [["{warp}", warp], ["{dimension}", actor_1.DimensionId[dimensionId]], ["{x}", pos.x.toString()], ["{y}", pos.y.toString()], ["{z}", pos.z.toString()]]);
    }
    WarpUI.getWarpButton = getWarpButton;
    /**Get WarpUI Cancel Button */
    function getWarpCancel() {
        return config.warpui.cancel;
    }
    WarpUI.getWarpCancel = getWarpCancel;
    /**Get WarpUI Image */
    function getImage() {
        return config.warpui.image;
    }
    WarpUI.getImage = getImage;
    /**Send WarpUI */
    function sendTo(player) {
        let buttons = [];
        const warps_ = SimpleWarp.getWarps();
        warps_.forEach((name) => {
            const img = getImage();
            const warp = warps[name];
            const button = getWarpButton(name, warp.pos, warp.dimension);
            buttons.push(new form_1.FormButton(button, img === null || img === void 0 ? void 0 : img.type, img === null || img === void 0 ? void 0 : img.src));
        });
        buttons.push(new form_1.FormButton(getWarpCancel()));
        const form = new form_1.SimpleForm(getTitle(), textReplace(getDescription(), ["{player}", player.getName()]), buttons);
        form.sendTo(player.getNetworkIdentifier(), (res) => {
            const r = res.response;
            const isCancel = warps_.length;
            if (r === isCancel || r === null)
                return;
            SimpleWarp.teleport(player, warps_[r]);
        });
    }
    WarpUI.sendTo = sendTo;
})(WarpUI = exports.WarpUI || (exports.WarpUI = {}));
function isArrayOfTuples(obj) {
    return Array.isArray(obj) && obj.every(item => Array.isArray(item) && item.length === 2 && typeof item[0] === 'string' && typeof item[1] === 'string');
}
function textReplace(text, replace) {
    if (isArrayOfTuples(replace)) {
        replace.forEach(([v, w]) => {
            const reg = new RegExp(v, "g");
            text = text.replace(reg, w);
        });
    }
    else {
        const reg = new RegExp(replace[0], "g");
        text = text.replace(reg, replace[1]);
    }
    return text;
}
const movingCanceling = setInterval(() => {
    const players = Array.from(teleporting.entries());
    for (let i = 0; i < players.length; i++) {
        const [netId, player] = players[i];
        if (!player.isMoving())
            return;
        teleporting.delete(netId);
        player.sendMessage(`§cTeleport §4Cancelled!`);
    }
}, 1);
event_1.events.playerLeft.on((data) => {
    if (teleporting.has(data.player.getNetworkIdentifier()))
        teleporting.delete(data.player.getNetworkIdentifier());
});
event_1.events.serverStop.on(() => {
    clearInterval(movingCanceling);
});
event_1.events.serverOpen.on(() => {
    require("./src");
    message_1.send.success("Started!");
});
event_1.events.serverClose.on(() => {
    SimpleWarp.save(true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQ0FBNkM7QUFFN0MsZ0RBQW1EO0FBQ25ELHNDQUFvQztBQUVwQyx3Q0FBdUQ7QUFDdkQsaURBQTJDO0FBQzNDLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUF3QjdCLE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxFQUE2QixDQUFDO0FBRXpELElBQUksTUFBTSxHQUdOO0lBQ0EsT0FBTyxFQUFFLENBQUM7SUFDVixNQUFNLEVBQUU7UUFDSixLQUFLLEVBQUUscUJBQXFCO1FBQzVCLFdBQVcsRUFBRSxtRUFBbUU7UUFDaEYsSUFBSSxFQUFFLG1DQUFtQztRQUN6QyxNQUFNLEVBQUUsc0JBQXNCO0tBQ2pDO0NBQ0osQ0FBQztBQUVGLElBQUksS0FBSyxHQUE4QixFQUFFLENBQUM7QUFFMUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDdkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFFckQsSUFBSTtJQUNBLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0IsS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUM5QjtBQUFDLE9BQU0sR0FBRyxFQUFFLEdBQUU7QUFFZixnQkFBZ0I7QUFDaEIsSUFBaUIsVUFBVSxDQTJJMUI7QUEzSUQsV0FBaUIsVUFBVTtJQUV2QiwwQkFBMEI7SUFDMUIsU0FBZ0IsVUFBVTtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFBRSxPQUFPLFNBQVMsQ0FBQztRQUN0QyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFFLE1BQU0sQ0FBQyxPQUFPLEtBQUssQ0FBQztZQUFFLE9BQU8sU0FBUyxDQUFDO1FB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