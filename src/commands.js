"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actor_1 = require("bdsx/bds/actor");
const blockpos_1 = require("bdsx/bds/blockpos");
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const nativetype_1 = require("bdsx/nativetype");
const warps_1 = require("./warps");
const form_1 = require("./form");
//warp command
command_2.command.register(`warp`, `Warps to a defined warp.`)
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    pl.sendMessage(`§6Warps: §7${warps_1.SimpleWarp.getWarps()}`);
}, {})
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    warps_1.SimpleWarp.teleport(pl, p.warp);
}, {
    warp: warps_1.WarpsCommandSelector,
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
    warps_1.SimpleWarp.addWarp(p.name, pl.getPosition(), pl.getDimensionId(), pl);
}, {
    name: nativetype_1.CxxString,
})
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        warps_1.SimpleWarp.addWarp(p.name, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), actor_1.DimensionId.Overworld);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    warps_1.SimpleWarp.addWarp(p.name, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), pl.getDimensionId(), pl);
}, {
    name: nativetype_1.CxxString,
    pos: command_1.CommandPosition
})
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        warps_1.SimpleWarp.addWarp(p.name, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), p.dimensionId);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    warps_1.SimpleWarp.addWarp(p.name, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), p.dimensionId, pl);
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
        warps_1.SimpleWarp.removeWarp(p.warp);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    warps_1.SimpleWarp.removeWarp(p.warp, pl);
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
    warps_1.SimpleWarp.editWarp(p.warp, pl.getPosition(), pl.getDimensionId(), pl);
}, {
    warp: nativetype_1.CxxString,
})
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        warps_1.SimpleWarp.editWarp(p.warp, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), actor_1.DimensionId.Overworld);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    warps_1.SimpleWarp.editWarp(p.warp, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), pl.getDimensionId(), pl);
}, {
    warp: nativetype_1.CxxString,
    pos: command_1.CommandPosition,
})
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        warps_1.SimpleWarp.editWarp(p.warp, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), p.dimensionId);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    warps_1.SimpleWarp.editWarp(p.warp, blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z), p.dimensionId, pl);
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
        warps_1.SimpleWarp.save(true);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    warps_1.SimpleWarp.save(true, pl);
}, {})
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        if (p.config === "warps")
            warps_1.SimpleWarp.configSave(true);
        if (p.config === "config")
            warps_1.SimpleWarp.warpsSave(true);
        if (p.config === "all")
            warps_1.SimpleWarp.save(true);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    if (p.config === "warps")
        warps_1.SimpleWarp.configSave(true, pl);
    if (p.config === "config")
        warps_1.SimpleWarp.warpsSave(true, pl);
    if (p.config === "all")
        warps_1.SimpleWarp.save(true, pl);
}, {
    config: command_2.command.enum("WarpSaveSelector", "config", "warps", "all"),
})
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        if (p.config === "warps")
            warps_1.SimpleWarp.configSave(p.sendMessage);
        if (p.config === "config")
            warps_1.SimpleWarp.warpsSave(p.sendMessage);
        if (p.config === "all")
            warps_1.SimpleWarp.save(p.sendMessage);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    if (p.config === "warps")
        warps_1.SimpleWarp.configSave(p.sendMessage, pl);
    if (p.config === "config")
        warps_1.SimpleWarp.warpsSave(p.sendMessage, pl);
    if (p.config === "all")
        warps_1.SimpleWarp.save(p.sendMessage, pl);
}, {
    config: command_2.command.enum("WarpSaveSelector", "config", "warps", "all"),
    sendMessage: nativetype_1.bool_t,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21tYW5kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUE2QztBQUM3QyxnREFBbUQ7QUFDbkQsOENBQTJFO0FBQzNFLDBDQUF1QztBQUV2QyxnREFBb0Q7QUFDcEQsbUNBQTJEO0FBQzNELGlDQUFzQztBQUd0QyxjQUFjO0FBQ2QsaUJBQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLDBCQUEwQixDQUFDO0tBQ25ELFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNmLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixJQUFJLE1BQU0sS0FBSyxJQUFJO1FBQUUsT0FBTztJQUM1QixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwRCxJQUFJLEVBQUUsS0FBSyxJQUFJO1FBQUUsT0FBTztJQUV4QixFQUFFLENBQUMsV0FBVyxDQUFDLGNBQWMsa0JBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUQsQ0FBQyxFQUFFLEVBQUUsQ0FBQztLQUNMLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNmLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixJQUFJLE1BQU0sS0FBSyxJQUFJO1FBQUUsT0FBTztJQUM1QixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwRCxJQUFJLEVBQUUsS0FBSyxJQUFJO1FBQUUsT0FBTztJQUV4QixrQkFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLENBQUMsRUFBRTtJQUNDLElBQUksRUFBRSw0QkFBb0I7Q0FDN0Is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