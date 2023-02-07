import { DimensionId } from "bdsx/bds/actor";
import { Vec3 } from "bdsx/bds/blockpos";
import { CommandPermissionLevel, CommandPosition } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { bool_t, CxxString } from "bdsx/nativetype";
import { SimpleWarpUI } from "./form";
import { SimpleWarp } from "..";
import { WarpConfig } from ".";

//warp command
command.register(`warp`, `Warps to a defined warp.`)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    pl.sendMessage(`§6Warps: §7${SimpleWarp.getWarps()}`);
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

//warp ui command
command.register(`warpui`, `Open the warps ui.`)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarpUI.warps(pl);
}, {});

//create new warp command
command.register(`addwarp`, `Create a warp.`, CommandPermissionLevel.Operator)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarp.addWarp(p.name, pl.getPosition(), pl.getDimensionId(), pl);
}, {
    name: CxxString,
})
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        SimpleWarp.addWarp(p.name, Vec3.create(p.pos.x, p.pos.y, p.pos.z), DimensionId.Overworld);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarp.addWarp(p.name, Vec3.create(p.pos.x, p.pos.y, p.pos.z), pl.getDimensionId(), pl);
}, {
    name: CxxString,
    pos: CommandPosition
})
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        SimpleWarp.addWarp(p.name, Vec3.create(p.pos.x, p.pos.y, p.pos.z), p.dimensionId);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarp.addWarp(p.name, Vec3.create(p.pos.x, p.pos.y, p.pos.z), p.dimensionId, pl);
}, {
    name: CxxString,
    pos: CommandPosition,
    dimensionId: command.enum("DimensionId", DimensionId),
});

//remove warp command
command.register(`removewarp`, `Remove a warp.`, CommandPermissionLevel.Operator)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        SimpleWarp.removeWarp(p.warp);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarp.removeWarp(p.warp, pl);
}, {
    warp: CxxString,
});

//edite warp command
command.register(`editwarp`, `Edit a warp position and dimension.`, CommandPermissionLevel.Operator)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarp.editWarp(p.warp, pl.getPosition(), pl.getDimensionId(), pl);
}, {
    warp: CxxString,
})
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        SimpleWarp.editWarp(p.warp, Vec3.create(p.pos.x, p.pos.y, p.pos.z), DimensionId.Overworld);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarp.editWarp(p.warp, Vec3.create(p.pos.x, p.pos.y, p.pos.z), pl.getDimensionId(), pl);
}, {
    warp: CxxString,
    pos: CommandPosition,
})
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        SimpleWarp.editWarp(p.warp, Vec3.create(p.pos.x, p.pos.y, p.pos.z), p.dimensionId);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarp.editWarp(p.warp, Vec3.create(p.pos.x, p.pos.y, p.pos.z), p.dimensionId, pl);
}, {
    warp: CxxString,
    pos: CommandPosition,
    dimensionId: command.enum("DimensionId", DimensionId),
});

//Save
command.register("warpsave", "Save a simple-warp plugin.", CommandPermissionLevel.Operator)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        SimpleWarp.save(true);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarp.save(true, pl);
}, {})
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        if (p.config === "warps") SimpleWarp.save(true);
        if (p.config === "config") WarpConfig.save(true);
        if (p.config === "all") {
            SimpleWarp.save(true);
            WarpConfig.save(true);
        }
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    if (p.config === "warps") SimpleWarp.save(true, pl);
    if (p.config === "config") WarpConfig.save(true, pl);
    if (p.config === "all") {
        SimpleWarp.save(true, pl);
        WarpConfig.save(true, pl);
    }
}, {
    config: command.enum("WarpSaveSelector", "config", "warps", "all"),
})
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) {
        if (p.config === "warps") SimpleWarp.save(p.sendMessage);
        if (p.config === "config") WarpConfig.save(p.sendMessage);
        if (p.config === "all") {
            SimpleWarp.save(p.sendMessage);
            WarpConfig.save(p.sendMessage);
        }
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    if (p.config === "warps") SimpleWarp.save(p.sendMessage, pl);
    if (p.config === "config") WarpConfig.save(p.sendMessage, pl);
    if (p.config === "all") {
        SimpleWarp.save(p.sendMessage, pl);
        WarpConfig.save(p.sendMessage, pl);
    }
}, {
    config: command.enum("WarpSaveSelector", "config", "warps", "all"),
    sendMessage: bool_t,
});