"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actor_1 = require("bdsx/bds/actor");
const blockpos_1 = require("bdsx/bds/blockpos");
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const nativetype_1 = require("bdsx/nativetype");
const form_1 = require("./form");
const __1 = require("..");
const _1 = require(".");
//warp command
command_2.command.register(`warp`, `Warps to a defined warp.`)
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    pl.sendMessage(`§6Warps: §7${__1.SimpleWarp.getWarps()}`);
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
//warp ui command
command_2.command.register(`warpui`, `Open the warps ui.`)
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    form_1.SimpleWarpUI.warps(pl);
}, {});
//create new warp command
command_2.command.register(`addwarp`, `Create a warp.`, command_1.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    __1.SimpleWarp.addWarp(p.name, pl.getPosition(), pl.getDimensionId(), pl);
}, {
    name: nativetype_1.CxxString,
})
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        __1.SimpleWarp.addWarp(p.name, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), actor_1.DimensionId.Overworld);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    __1.SimpleWarp.addWarp(p.name, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), pl.getDimensionId(), pl);
}, {
    name: nativetype_1.CxxString,
    pos: command_1.CommandPosition
})
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        __1.SimpleWarp.addWarp(p.name, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), p.dimensionId);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    __1.SimpleWarp.addWarp(p.name, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), p.dimensionId, pl);
}, {
    name: nativetype_1.CxxString,
    pos: command_1.CommandPosition,
    dimensionId: command_2.command.enum("DimensionId", actor_1.DimensionId),
});
//remove warp command
command_2.command.register(`removewarp`, `Remove a warp.`, command_1.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        __1.SimpleWarp.removeWarp(p.warp);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    __1.SimpleWarp.removeWarp(p.warp, pl);
}, {
    warp: nativetype_1.CxxString,
});
//edite warp command
command_2.command.register(`editwarp`, `Edit a warp position and dimension.`, command_1.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    __1.SimpleWarp.editWarp(p.warp, pl.getPosition(), pl.getDimensionId(), pl);
}, {
    warp: nativetype_1.CxxString,
})
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        __1.SimpleWarp.editWarp(p.warp, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), actor_1.DimensionId.Overworld);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    __1.SimpleWarp.editWarp(p.warp, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), pl.getDimensionId(), pl);
}, {
    warp: nativetype_1.CxxString,
    pos: command_1.CommandPosition,
})
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        __1.SimpleWarp.editWarp(p.warp, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), p.dimensionId);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    __1.SimpleWarp.editWarp(p.warp, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), p.dimensionId, pl);
}, {
    warp: nativetype_1.CxxString,
    pos: command_1.CommandPosition,
    dimensionId: command_2.command.enum("DimensionId", actor_1.DimensionId),
});
//Save
command_2.command.register("warpsave", "Save a simple-warp plugin.", command_1.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        __1.SimpleWarp.save(true);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    __1.SimpleWarp.save(true, pl);
}, {})
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        if (p.config === "warps")
            __1.SimpleWarp.save(true);
        if (p.config === "config")
            _1.WarpConfig.save(true);
        if (p.config === "all") {
            __1.SimpleWarp.save(true);
            _1.WarpConfig.save(true);
        }
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    if (p.config === "warps")
        __1.SimpleWarp.save(true, pl);
    if (p.config === "config")
        _1.WarpConfig.save(true, pl);
    if (p.config === "all") {
        __1.SimpleWarp.save(true, pl);
        _1.WarpConfig.save(true, pl);
    }
}, {
    config: command_2.command.enum("WarpSaveSelector", "config", "warps", "all"),
})
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        if (p.config === "warps")
            __1.SimpleWarp.save(p.sendMessage);
        if (p.config === "config")
            _1.WarpConfig.save(p.sendMessage);
        if (p.config === "all") {
            __1.SimpleWarp.save(p.sendMessage);
            _1.WarpConfig.save(p.sendMessage);
        }
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    if (p.config === "warps")
        __1.SimpleWarp.save(p.sendMessage, pl);
    if (p.config === "config")
        _1.WarpConfig.save(p.sendMessage, pl);
    if (p.config === "all") {
        __1.SimpleWarp.save(p.sendMessage, pl);
        _1.WarpConfig.save(p.sendMessage, pl);
    }
}, {
    config: command_2.command.enum("WarpSaveSelector", "config", "warps", "all"),
    sendMessage: nativetype_1.bool_t,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21tYW5kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUE2QztBQUM3QyxnREFBeUM7QUFDekMsOENBQTJFO0FBQzNFLDBDQUF1QztBQUN2QyxnREFBb0Q7QUFDcEQsaUNBQXNDO0FBQ3RDLDBCQUFnQztBQUNoQyx3QkFBK0I7QUFFL0IsY0FBYztBQUNkLGlCQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSwwQkFBMEIsQ0FBQztLQUNuRCxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDZixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsSUFBSSxNQUFNLEtBQUssSUFBSTtRQUFFLE9BQU87SUFDNUIsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEQsSUFBSSxFQUFFLEtBQUssSUFBSTtRQUFFLE9BQU87SUFFeEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxjQUFjLGNBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUQsQ0FBQyxFQUFFLEVBQUUsQ0FBQztLQUNMLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNmLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixJQUFJLE1BQU0sS0FBSyxJQUFJO1FBQUUsT0FBTztJQUM1QixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwRCxJQUFJLEVBQUUsS0FBSyxJQUFJO1FBQUUsT0FBTztJQUV4QixjQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxFQUFFO0lBQ0MsSUFBSSxFQUFFLHNC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