import { DimensionId } from "bdsx/bds/actor";
import { Vec3 } from "bdsx/bds/blockpos";
import { ServerPlayer } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { events } from "bdsx/event";
import * as fs from "fs";
import * as path from "path";
import { send } from "..";

interface warp_data {
    blockpos: Vec3,
    dimension: DimensionId,
}

export let config: {
    title: string;
    content: string;
    button: string;
    cancel_button: string;
} = {
    title: "§l§2Simple§e-§dWarp",
    content: "Hi §e%player%§r, This is WarpUI you can teleport to warp position",
    button: "§l§2%warp%§r\n§7Click to teleport",
    cancel_button: "§l§8[ §cCANCEL §8]§r",
};

export type Warps = Record<string, warp_data>;
let warps: Warps = {};

const configPath = path.join(__dirname, "..", "config.json");
const warpsPath = path.join(__dirname, "..", "warps.json");

try { config = require(configPath) } catch(e) {}
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

    /**Save config.json file. */
    export function configSave(message: boolean = false, actor?: ServerPlayer): void {
        fs.writeFile(configPath, JSON.stringify(config), (err) => {
            if (message) {
                if (err) send.error(`config.json ${err}`, actor);
                else send.success(`config.json Saved!`, actor);
            }
        });
    }

    /**Save warps.json file. */
    export function warpsSave(message: boolean = false, actor?: ServerPlayer): void {
        fs.writeFile(warpsPath, JSON.stringify(warps), (err) => {
            if (message) {
                if (err) send.error(`warps.json ${err}`, actor);
                else send.success(`warps.json Saved!`, actor);
            }
        });
    }

    /**Save all files. */
    export function save(message: boolean = false, actor?: ServerPlayer): void {
        configSave(message, actor);
        warpsSave(message, actor);
    }

    /**Teleport player to warp. */
    export function teleport(player: ServerPlayer, warp: string): boolean {
        if (warps.hasOwnProperty(warp) === false) {
            player.sendMessage(`§cWarp not found.`);
            return false;
        }

        const data = warps[warp];
        const pos = data.blockpos;
        const posFix = Vec3.create(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z));
        player.teleport(posFix);
        player.sendMessage(`§aTeleport to §e${warp}`);
        return true;
    }
}


events.serverOpen.on(() => SimpleWarp.save());
events.serverStop.on(() => SimpleWarp.save(true));
