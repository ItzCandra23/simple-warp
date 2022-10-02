"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actor_1 = require("bdsx/bds/actor");
const blockpos_1 = require("bdsx/bds/blockpos");
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const event_1 = require("bdsx/event");
const nativetype_1 = require("bdsx/nativetype");
const api_1 = require("../api");
const form_1 = require("../form");
event_1.events.serverOpen.on(() => {
    command_2.command.register(`warp`, `Warps to a defined warp.`)
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        pl.sendMessage(`§6Warps: §7${Object.keys(api_1.SimpleWarpAPI.warps())}`);
    }, {})
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        api_1.SimpleWarpAPI.teleport(pl, p.warp);
    }, {
        warp: nativetype_1.CxxString
    });
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
    command_2.command.register(`addwarp`, `Create a warp.`, command_1.CommandPermissionLevel.Operator)
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        api_1.SimpleWarpAPI.addWarp(p.name, blockpos_1.BlockPos.create(pl.getPosition()), pl.getDimensionId(), pl);
    }, {
        name: nativetype_1.CxxString
    })
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        api_1.SimpleWarpAPI.addWarp(p.name, blockpos_1.BlockPos.create(blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z)), pl.getDimensionId(), pl);
    }, {
        name: nativetype_1.CxxString,
        pos: command_1.CommandPosition
    })
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        if (p.dimension === "overworld") {
            api_1.SimpleWarpAPI.addWarp(p.name, blockpos_1.BlockPos.create(blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z)), actor_1.DimensionId.Overworld, pl);
        }
        if (p.dimension === "nether") {
            api_1.SimpleWarpAPI.addWarp(p.name, blockpos_1.BlockPos.create(blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z)), actor_1.DimensionId.Nether, pl);
        }
        if (p.dimension === "theend") {
            api_1.SimpleWarpAPI.addWarp(p.name, blockpos_1.BlockPos.create(blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z)), actor_1.DimensionId.TheEnd, pl);
        }
    }, {
        name: nativetype_1.CxxString,
        pos: command_1.CommandPosition,
        dimension: command_2.command.enum("CommandDimension", "overworld", "nether", "theend")
    });
    command_2.command.register(`removewarp`, `Remove a warp.`, command_1.CommandPermissionLevel.Operator)
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        api_1.SimpleWarpAPI.removeWarp(p.warp, pl);
    }, {
        warp: nativetype_1.CxxString
    });
    command_2.command.register(`editwarp`, `Edit a warp position and dimension.`, command_1.CommandPermissionLevel.Operator)
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        api_1.SimpleWarpAPI.editWarp(p.warp, blockpos_1.BlockPos.create(pl.getPosition()), pl.getDimensionId(), pl);
    }, {
        warp: nativetype_1.CxxString
    })
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        api_1.SimpleWarpAPI.editWarp(p.warp, blockpos_1.BlockPos.create(blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z)), pl.getDimensionId(), pl);
    }, {
        warp: nativetype_1.CxxString,
        pos: command_1.CommandPosition
    })
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        if (p.dimension === "overworld") {
            api_1.SimpleWarpAPI.editWarp(p.name, blockpos_1.BlockPos.create(blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z)), actor_1.DimensionId.Overworld, pl);
        }
        if (p.dimension === "nether") {
            api_1.SimpleWarpAPI.editWarp(p.name, blockpos_1.BlockPos.create(blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z)), actor_1.DimensionId.Nether, pl);
        }
        if (p.dimension === "theend") {
            api_1.SimpleWarpAPI.editWarp(p.name, blockpos_1.BlockPos.create(blockpos_1.Vec3.create(p.pos.x, p.pos.y, p.pos.z)), actor_1.DimensionId.TheEnd, pl);
        }
    }, {
        name: nativetype_1.CxxString,
        pos: command_1.CommandPosition,
        dimension: command_2.command.enum("CommandDimension", "overworld", "nether", "theend")
    });
    command_2.command.register("warpsave", "Save a simple-warp plugin.", command_1.CommandPermissionLevel.Operator)
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        api_1.SimpleWarpAPI.writeFile(pl);
    }, {})
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        api_1.SimpleWarpAPI.writeConfigFile(pl);
    }, {
        config: command_2.command.enum("warpsave_config", "config")
    })
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        api_1.SimpleWarpAPI.writeWarpsFile(pl);
    }, {
        warps: command_2.command.enum("warpsave_warps", "warps")
    })
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        api_1.SimpleWarpAPI.writeFile(pl);
    }, {
        all: command_2.command.enum("warpsave_all", "all")
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUE2QztBQUM3QyxnREFBbUQ7QUFDbkQsOENBQTJFO0FBQzNFLDBDQUF1QztBQUN2QyxzQ0FBb0M7QUFDcEMsZ0RBQTRDO0FBQzVDLGdDQUF1QztBQUN2QyxrQ0FBdUM7QUFFdkMsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFO0lBQzFCLGlCQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSwwQkFBMEIsQ0FBQztTQUNuRCxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDZixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0IsSUFBSSxNQUFNLEtBQUssSUFBSTtZQUFFLE9BQU87UUFDNUIsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEQsSUFBSSxFQUFFLEtBQUssSUFBSTtZQUFFLE9BQU87UUFFeEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxjQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ0wsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2YsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzdCLElBQUksTUFBTSxLQUFLLElBQUk7WUFBRSxPQUFPO1FBQzVCLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BELElBQUksRUFBRSxLQUFLLElBQUk7WUFBRSxPQUFPO1FBRXhCLG1CQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxD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