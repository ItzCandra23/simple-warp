import { DimensionId } from "bdsx/bds/actor";
import { ServerPlayer } from "bdsx/bds/player";
import { Vec3 } from "bdsx/bds/blockpos";
import { events } from "bdsx/event";
import { send } from "./src/utils/message";
import { WarpConfig } from "./src";
import * as fs from "fs";
import * as path from "path";

interface warp_data {
    blockpos: Vec3,
    dimension: DimensionId,
}

export type Warps = Record<string, warp_data>;
let warps: Warps = {};

const warpsPath = path.join(__dirname, "warps.json");
try { warps = require(warpsPath) } catch(e) {}


/**SimpleWarp */
export namespace SimpleWarp {

    /**Get all warps. */
    export function getWarps(): string[] {
        return Object.keys(warps);
    }

    /**Get warp data. */
    export function getWarp(warp: string): warp_data|null {
        if (warps.hasOwnProperty(warp)) return warps[warp];
        return null;
    }

    /**Add warp. */
    export function addWarp(name: string, pos: Vec3, dimension: DimensionId, actor?: ServerPlayer): boolean {
        if (name === ""||name.includes("§")||name.includes(" ")) {
            send.error(`Invalid name!`, actor);
            return false;
        }
        if (warps.hasOwnProperty(name)) {
            send.error(`Warp alredy!`, actor);
            return false;
        }

        const posFix = Vec3.create(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z));
        warps[name] = {
            blockpos: posFix,
            dimension: dimension,
        };

        send.success(`Success added &e${name}&r to new warps.`, actor);
        return true;
    }

    /**Edit warp position. */
    export function editWarp(name: string, pos: Vec3, dimension: DimensionId, actor?: ServerPlayer): boolean {
        if (!warps.hasOwnProperty(name)) {
            send.error(`Warp not found.`, actor);
            return false;
        }

        const posFix = Vec3.create(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z));
        warps[name].blockpos=posFix;
        warps[name].dimension=dimension;

        send.success(`Success edit &e${name}&r in warps.`, actor);
        return true;
    }

    /**Remove warp. */
    export function removeWarp(name: string, actor?: ServerPlayer): boolean {
        if (!warps.hasOwnProperty(name)) {
            send.error(`Warp not found.`, actor);
            return false;
        }
        else {
            delete warps[name];
            send.success(`Success remove &e${name}&r in warps.`, actor);
            return true;
        }
    }

    /**Save warps.json file. */
    export function save(message: boolean = false, actor?: ServerPlayer): void {
        fs.writeFile(warpsPath, JSON.stringify(warps, null, 2), (err) => {
            if (message) {
                if (err) {
                    send.error(`warps.json ${err}`, actor);
                    throw err;
                }
                else send.success(`warps.json Saved!`, actor);
            }
        });
    }

    /**Teleport player to warp. */
    export function teleport(player: ServerPlayer, warp: string): boolean {
        if (warps.hasOwnProperty(warp) === false) {
            player.sendMessage(`§cWarp not found.`);
            return false;
        }

        const data = warps[warp];
        const pos = data.blockpos;
        const posFix = Vec3.create(Math.floor(pos.x)+0.5, Math.floor(pos.y)+0.5, Math.floor(pos.z)+0.5);
        player.teleport(posFix);
        player.sendMessage(`§aTeleport to §e${warp}`);
        return true;
    }
}

events.serverOpen.on(() => {
    require("./src");
    require("./src/commands");
    send.success("Started!");
});

events.serverClose.on(() => {
    WarpConfig.save(true);
    SimpleWarp.save(true);
});