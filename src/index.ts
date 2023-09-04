import { DimensionId } from "bdsx/bds/actor";
import { CommandPermissionLevel, CommandPosition } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { CxxString } from "bdsx/nativetype";
import { SimpleWarp, WarpUI } from "..";
import { send } from "./utils/message";

/**Warp Command */
command.register(`warp`, `Warps to a defined warp.`)
.overload((p, o) => {
    const pl = o.getEntity()?.getNetworkIdentifier().getActor() ?? undefined;

    send.msg(`§aWarps: §r\n§6- §r${SimpleWarp.getWarps()}`.replace("[", "").replace("]", ""), pl, [",", "\n§6- §r"]);
}, {})
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarp.teleport(pl, p.warp);
}, {
    warp: CxxString,
});

/**WarpUI Command */
command.register(`warpui`, `Open the warps ui.`)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    WarpUI.sendTo(pl);
}, {});

// Create new warp command
command.register(`addwarp`, `Create a warp.`, CommandPermissionLevel.Operator)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarp.addWarp(p.name, pl.getPosition(), pl.getDimensionId())
    .then((res) => {
        send.success(`Success to create §e${res.name}§a warp §r[ ${res.pos.x}, ${res.pos.y}, ${res.pos.z}, ${DimensionId[res.dimension]} ]`, pl);
    })
    .catch((err) => {
        if (err) send.error(err, pl);
    });
}, {
    name: CxxString,
})
.overload((p, o) => {
    const pl = o.getEntity()?.getNetworkIdentifier().getActor() ?? undefined;

    SimpleWarp.addWarp(p.name, p.pos.getPosition(o), pl?.getDimensionId() ?? DimensionId.Overworld)
    .then((res) => {
        send.success(`Success to create §e${res.name}§a warp §r[ ${res.pos.x}, ${res.pos.y}, ${res.pos.z}, ${DimensionId[res.dimension]} ]`, pl);
    })
    .catch((err) => {
        if (err) send.error(err, pl);
    });
}, {
    name: CxxString,
    pos: CommandPosition
})
.overload((p, o) => {
    const pl = o.getEntity()?.getNetworkIdentifier().getActor() ?? undefined;

    SimpleWarp.addWarp(p.name, p.pos.getPosition(o), p.dimensionId)
    .then((res) => {
        send.success(`Success to create §e${res.name}§a warp §r[ ${res.pos.x}, ${res.pos.y}, ${res.pos.z}, ${DimensionId[res.dimension]} ]`, pl);
    })
    .catch((err) => {
        if (err) send.error(err, pl);
    });
}, {
    name: CxxString,
    pos: CommandPosition,
    dimensionId: command.enum("DimensionId", DimensionId),
});

// Remove warp command
command.register(`removewarp`, `Remove a warp.`, CommandPermissionLevel.Operator)
.overload((p, o) => {
    const pl = o.getEntity()?.getNetworkIdentifier().getActor() ?? undefined;

    SimpleWarp.removeWarp(p.warp)
    .then((res) => {
        send.success(`Success to delete §e${res.name}§a warp §r[ ${res.pos.x}, ${res.pos.y}, ${res.pos.z}, ${DimensionId[res.dimension]} ]`, pl);
    })
    .catch((err) => {
        if (err) send.error(err, pl);
    });
}, {
    warp: CxxString,
});

// Set warp command
command.register(`setwarp`, `Change a warp position and dimension.`, CommandPermissionLevel.Operator)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarp.setWarp(p.warp, pl.getPosition(), pl.getDimensionId())
    .then((res) => {
        send.success(`Success to change §e${p.warp}§a warp from §r[ ${res[0].pos.x}, ${res[0].pos.y}, ${res[0].pos.z}, ${DimensionId[res[0].dimension]} ]§a to §r[ ${res[1].pos.x}, ${res[1].pos.y}, ${res[1].pos.z}, ${DimensionId[res[1].dimension]} ]`, pl);
    })
    .catch((err) => {
        if (err) send.error(err, pl);
    });
}, {
    warp: CxxString,
})
.overload((p, o) => {
    const pl = o.getEntity()?.getNetworkIdentifier().getActor() ?? undefined;

    SimpleWarp.setWarp(p.warp, p.pos.getPosition(o), pl?.getDimensionId() ?? DimensionId.Overworld)
    .then((res) => {
        send.success(`Success to change §e${p.warp}§a warp from §r[ ${res[0].pos.x}, ${res[0].pos.y}, ${res[0].pos.z}, ${DimensionId[res[0].dimension]} ]§a to §r[ ${res[1].pos.x}, ${res[1].pos.y}, ${res[1].pos.z}, ${DimensionId[res[1].dimension]} ]`, pl);
    })
    .catch((err) => {
        if (err) send.error(err, pl);
    });
}, {
    warp: CxxString,
    pos: CommandPosition,
})
.overload((p, o) => {
    const pl = o.getEntity()?.getNetworkIdentifier().getActor() ?? undefined;

    SimpleWarp.setWarp(p.warp, p.pos.getPosition(o), p.dimensionId)
    .then((res) => {
        send.success(`Success to change §e${p.warp}§a warp from §r[ ${res[0].pos.x}, ${res[0].pos.y}, ${res[0].pos.z}, ${DimensionId[res[0].dimension]} ]§a to §r[ ${res[1].pos.x}, ${res[1].pos.y}, ${res[1].pos.z}, ${DimensionId[res[1].dimension]} ]`, pl);
    })
    .catch((err) => {
        if (err) send.error(err, pl);
    });
}, {
    warp: CxxString,
    pos: CommandPosition,
    dimensionId: command.enum("DimensionId", DimensionId),
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