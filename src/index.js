"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actor_1 = require("bdsx/bds/actor");
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const nativetype_1 = require("bdsx/nativetype");
const __1 = require("..");
const message_1 = require("./utils/message");
/**Warp Command */
command_2.command.register(`warp`, `Warps to a defined warp.`)
    .overload((p, o) => {
    var _a, _b;
    const pl = (_b = (_a = o.getEntity()) === null || _a === void 0 ? void 0 : _a.getNetworkIdentifier().getActor()) !== null && _b !== void 0 ? _b : undefined;
    message_1.send.msg(`§aWarps: §r\n§6- §r${__1.SimpleWarp.getWarps()}`.replace("[", "").replace("]", ""), pl, [",", "\n§6- §r"]);
}, {})
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    __1.SimpleWarp.teleport(pl, p.warp);
}, {
    warp: nativetype_1.CxxString,
});
/**WarpUI Command */
command_2.command.register(`warpui`, `Open the warps ui.`)
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    __1.WarpUI.sendTo(pl);
}, {});
// Create new warp command
command_2.command.register(`addwarp`, `Create a warp.`, command_1.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    __1.SimpleWarp.addWarp(p.name, pl.getPosition(), pl.getDimensionId())
        .then((res) => {
        message_1.send.success(`Success to create §e${res.name}§a warp §r[ ${res.pos.x}, ${res.pos.y}, ${res.pos.z}, ${actor_1.DimensionId[res.dimension]} ]`, pl);
    })
        .catch((err) => {
        if (err)
            message_1.send.error(err, pl);
    });
}, {
    name: nativetype_1.CxxString,
})
    .overload((p, o) => {
    var _a, _b, _c;
    const pl = (_b = (_a = o.getEntity()) === null || _a === void 0 ? void 0 : _a.getNetworkIdentifier().getActor()) !== null && _b !== void 0 ? _b : undefined;
    __1.SimpleWarp.addWarp(p.name, p.pos.getPosition(o), (_c = pl === null || pl === void 0 ? void 0 : pl.getDimensionId()) !== null && _c !== void 0 ? _c : actor_1.DimensionId.Overworld)
        .then((res) => {
        message_1.send.success(`Success to create §e${res.name}§a warp §r[ ${res.pos.x}, ${res.pos.y}, ${res.pos.z}, ${actor_1.DimensionId[res.dimension]} ]`, pl);
    })
        .catch((err) => {
        if (err)
            message_1.send.error(err, pl);
    });
}, {
    name: nativetype_1.CxxString,
    pos: command_1.CommandPosition
})
    .overload((p, o) => {
    var _a, _b;
    const pl = (_b = (_a = o.getEntity()) === null || _a === void 0 ? void 0 : _a.getNetworkIdentifier().getActor()) !== null && _b !== void 0 ? _b : undefined;
    __1.SimpleWarp.addWarp(p.name, p.pos.getPosition(o), p.dimensionId)
        .then((res) => {
        message_1.send.success(`Success to create §e${res.name}§a warp §r[ ${res.pos.x}, ${res.pos.y}, ${res.pos.z}, ${actor_1.DimensionId[res.dimension]} ]`, pl);
    })
        .catch((err) => {
        if (err)
            message_1.send.error(err, pl);
    });
}, {
    name: nativetype_1.CxxString,
    pos: command_1.CommandPosition,
    dimensionId: command_2.command.enum("DimensionId", actor_1.DimensionId),
});
// Remove warp command
command_2.command.register(`removewarp`, `Remove a warp.`, command_1.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    var _a, _b;
    const pl = (_b = (_a = o.getEntity()) === null || _a === void 0 ? void 0 : _a.getNetworkIdentifier().getActor()) !== null && _b !== void 0 ? _b : undefined;
    __1.SimpleWarp.removeWarp(p.warp)
        .then((res) => {
        message_1.send.success(`Success to delete §e${res.name}§a warp §r[ ${res.pos.x}, ${res.pos.y}, ${res.pos.z}, ${actor_1.DimensionId[res.dimension]} ]`, pl);
    })
        .catch((err) => {
        if (err)
            message_1.send.error(err, pl);
    });
}, {
    warp: nativetype_1.CxxString,
});
// Set warp command
command_2.command.register(`setwarp`, `Change a warp position and dimension.`, command_1.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    __1.SimpleWarp.setWarp(p.warp, pl.getPosition(), pl.getDimensionId())
        .then((res) => {
        message_1.send.success(`Success to change §e${p.warp}§a warp from §r[ ${res[0].pos.x}, ${res[0].pos.y}, ${res[0].pos.z}, ${actor_1.DimensionId[res[0].dimension]} ]§a to §r[ ${res[1].pos.x}, ${res[1].pos.y}, ${res[1].pos.z}, ${actor_1.DimensionId[res[1].dimension]} ]`, pl);
    })
        .catch((err) => {
        if (err)
            message_1.send.error(err, pl);
    });
}, {
    warp: nativetype_1.CxxString,
})
    .overload((p, o) => {
    var _a, _b, _c;
    const pl = (_b = (_a = o.getEntity()) === null || _a === void 0 ? void 0 : _a.getNetworkIdentifier().getActor()) !== null && _b !== void 0 ? _b : undefined;
    __1.SimpleWarp.setWarp(p.warp, p.pos.getPosition(o), (_c = pl === null || pl === void 0 ? void 0 : pl.getDimensionId()) !== null && _c !== void 0 ? _c : actor_1.DimensionId.Overworld)
        .then((res) => {
        message_1.send.success(`Success to change §e${p.warp}§a warp from §r[ ${res[0].pos.x}, ${res[0].pos.y}, ${res[0].pos.z}, ${actor_1.DimensionId[res[0].dimension]} ]§a to §r[ ${res[1].pos.x}, ${res[1].pos.y}, ${res[1].pos.z}, ${actor_1.DimensionId[res[1].dimension]} ]`, pl);
    })
        .catch((err) => {
        if (err)
            message_1.send.error(err, pl);
    });
}, {
    warp: nativetype_1.CxxString,
    pos: command_1.CommandPosition,
})
    .overload((p, o) => {
    var _a, _b;
    const pl = (_b = (_a = o.getEntity()) === null || _a === void 0 ? void 0 : _a.getNetworkIdentifier().getActor()) !== null && _b !== void 0 ? _b : undefined;
    __1.SimpleWarp.setWarp(p.warp, p.pos.getPosition(o), p.dimensionId)
        .then((res) => {
        message_1.send.success(`Success to change §e${p.warp}§a warp from §r[ ${res[0].pos.x}, ${res[0].pos.y}, ${res[0].pos.z}, ${actor_1.DimensionId[res[0].dimension]} ]§a to §r[ ${res[1].pos.x}, ${res[1].pos.y}, ${res[1].pos.z}, ${actor_1.DimensionId[res[1].dimension]} ]`, pl);
    })
        .catch((err) => {
        if (err)
            message_1.send.error(err, pl);
    });
}, {
    warp: nativetype_1.CxxString,
    pos: command_1.CommandPosition,
    dimensionId: command_2.command.enum("DimensionId", actor_1.DimensionId),
});
// command.register("warptimeout", "Set warp timeout.", CommandPermissionLevel.Operator)
// .overload((p, o) => {
//     const entity = o.getEntity();
//     if (entity === null) {
//         WarpConfig.setWarpTimeout(p.seconds);
//         return;
//     }
//     const pl = entity.getNetworkIdentifier().getActor();
//     if (pl === null) return;
//     WarpConfig.setWarpTimeout(p.seconds);
// }, {
//     seconds: int32_t,
// })
// .overload((p, o) => {
//     const entity = o.getEntity();
//     if (entity === null) {
//         WarpConfig.setWarpTimeout(undefined);
//         return;
//     }
//     const pl = entity.getNetworkIdentifier().getActor();
//     if (pl === null) return;
//     WarpConfig.setWarpTimeout(undefined);
// }, {
//     disable: command.enum("WarpTimeoutDisable", "disable"),
// });
//Save
// command.register("warpsave", "Save a simple-warp plugin.", CommandPermissionLevel.Operator)
// .overload((p, o) => {
//     const entity = o.getEntity();
//     if (entity === null) {
//         SimpleWarp.save(true);
//         return;
//     }
//     const pl = entity.getNetworkIdentifier().getActor();
//     if (pl === null) return;
//     SimpleWarp.save(true, pl);
// }, {})
// .overload((p, o) => {
//     const entity = o.getEntity();
//     if (entity === null) {
//         if (p.config === "warps") SimpleWarp.save(true);
//         if (p.config === "config") WarpConfig.save(true);
//         if (p.config === "all") {
//             SimpleWarp.save(true);
//             WarpConfig.save(true);
//         }
//         return;
//     }
//     const pl = entity.getNetworkIdentifier().getActor();
//     if (pl === null) return;
//     if (p.config === "warps") SimpleWarp.save(true, pl);
//     if (p.config === "config") WarpConfig.save(true, pl);
//     if (p.config === "all") {
//         SimpleWarp.save(true, pl);
//         WarpConfig.save(true, pl);
//     }
// }, {
//     config: command.enum("WarpSaveSelector", "config", "warps", "all"),
// })
// .overload((p, o) => {
//     const entity = o.getEntity();
//     if (entity === null) {
//         if (p.config === "warps") SimpleWarp.save(p.sendMessage);
//         if (p.config === "config") WarpConfig.save(p.sendMessage);
//         if (p.config === "all") {
//             SimpleWarp.save(p.sendMessage);
//             WarpConfig.save(p.sendMessage);
//         }
//         return;
//     }
//     const pl = entity.getNetworkIdentifier().getActor();
//     if (pl === null) return;
//     if (p.config === "warps") SimpleWarp.save(p.sendMessage, pl);
//     if (p.config === "config") WarpConfig.save(p.sendMessage, pl);
//     if (p.config === "all") {
//         SimpleWarp.save(p.sendMessage, pl);
//         WarpConfig.save(p.sendMessage, pl);
//     }
// }, {
//     config: command.enum("WarpSaveSelector", "config", "warps", "all"),
//     sendMessage: bool_t,
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUE2QztBQUM3Qyw4Q0FBMkU7QUFDM0UsMENBQXVDO0FBQ3ZDLGdEQUE0QztBQUM1QywwQkFBd0M7QUFDeEMsNkNBQXVDO0FBRXZDLGtCQUFrQjtBQUNsQixpQkFBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsMEJBQTBCLENBQUM7S0FDbkQsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztJQUNmLE1BQU0sRUFBRSxHQUFHLE1BQUEsTUFBQSxDQUFDLENBQUMsU0FBUyxFQUFFLDBDQUFFLG9CQUFvQixHQUFHLFFBQVEsRUFBRSxtQ0FBSSxTQUFTLENBQUM7SUFFekUsY0FBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsY0FBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ3JILENBQUMsRUFBRSxFQUFFLENBQUM7S0FDTCxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDZixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsSUFBSSxNQUFNLEtBQUssSUFBSTtRQUFFLE9BQU87SUFDNUIsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEQsSUFBSSxFQUFFLEtBQUssSUFBSTtRQUFFLE9BQU87SUFFeEIsY0FBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLENBQUMsRUFBRTtJQUNDLElBQUksRUFBRSxzQkFB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