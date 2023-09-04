import { DimensionId } from "bdsx/bds/actor";
import { Player } from "bdsx/bds/player";
import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { events } from "bdsx/event";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { FormButton, SimpleForm } from "bdsx/bds/form";
import { send } from "./src/utils/message";
import * as fs from "fs";
import * as path from "path";

export interface WarpData {
    name: string;
    pos: BlockPos;
    dimension: DimensionId;
}

interface WarpUI {
    title: string;
    description: string;
    warp: string;
    cancel: string;
    image?: {
        type: "path"|"url";
        src: string;
    };
}

interface warp_data {
    pos: BlockPos,
    dimension: DimensionId,
}

const teleporting = new Map<NetworkIdentifier, Player>();

let config: {
    timeout?: number;
    warpui: WarpUI;
} = {
    timeout: 3,
    warpui: {
        title: "§l§2Simple§e-§dWarp",
        description: "Hi §e{player}§r, This is WarpUI you can teleport to warp position",
        warp: "§l§2{warp}§r\n§8Click to teleport",
        cancel: "§l§8[ §cCANCEL §8]§r",
    },
};

let warps: Record<string, warp_data> = {};

const configPath = path.join(__dirname, "config.json");
const warpsPath = path.join(__dirname, "warps.json");

try {
    config = require(configPath);
    warps = require(warpsPath);
} catch(err) {}

/**SimpleWarp */
export namespace SimpleWarp {

    /**Get Teleport Timeout */
    export function getTimeout(): number|undefined {
        if (!config.timeout) return undefined;
        if (config.timeout < 0||config.timeout === 0) return undefined;
        return config.timeout;
    }

    /**Get all warps */
    export function getWarps(): string[] {
        return Object.keys(warps);
    }

    /**Get warp data */
    export function getWarp(warp: string): warp_data|null {
        if (warps.hasOwnProperty(warp)) return warps[warp];
        return null;
    }

    /**Has warp added */
    export function hasWarp(name: string): boolean {
        return warps.hasOwnProperty(name);
    }

    /**Add warp */
    export async function addWarp(name: string, pos: Vec3, dimension: DimensionId): Promise<WarpData> {
        return new Promise((resolve, reject) => {
            const textPattern = /^[A-Za-z0-9]+$/;
            if (!textPattern.test(name)||name === "") {
                reject(`Invalid name!`);
                return;
            }
            if (hasWarp(name)) {
                reject(`Warp alredy!`);
                return;
            }

            const posFix = BlockPos.create(pos);
            warps[name] = {
                pos: posFix,
                dimension: dimension,
            };

            resolve({ name: name, pos: posFix, dimension: dimension });
        });
    }

    /**Remove warp */
    export async function removeWarp(name: string): Promise<WarpData> {
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

    /**Set warp position */
    export async function setWarp(name: string, pos: Vec3, dimension: DimensionId): Promise<[WarpData, WarpData]> {
        return new Promise((resolve, reject) => {
            const warp = getWarp(name);
            if (!warp) {
                reject(`Warp not found!`);
                return;
            }

            const posFix = BlockPos.create(pos);
            warps[name].pos=posFix;
            warps[name].dimension=dimension;

            resolve([{ name: name, pos: warp.pos, dimension: warp.dimension }, { name: name, pos: posFix, dimension: dimension }]);
        });
    }

    /**Save */
    export function save(message: boolean = false): void {
        fs.writeFile(configPath, JSON.stringify(config, null, 4), (err) => {
            if (message) {
                if (err) {
                    send.error(`config.json ${err}`);
                    throw err;
                }
                else send.success(`config.json Saved!`);
            }
        });
        fs.writeFile(warpsPath, JSON.stringify(warps, null, 4), (err) => {
            if (message) {
                if (err) {
                    send.error(`warps.json ${err}`);
                    throw err;
                }
                else send.success(`warps.json Saved!`);
            }
        });
    }

    /**Teleport player to warp */
    export function teleport(player: Player, warp: string): boolean {
        if (!hasWarp(warp)) {
            player.sendMessage(`§cWarp not found!`);
            return false;
        }

        const data = warps[warp];
        const pos = data.pos;
        const posFix = Vec3.create(Math.floor(pos.x)+0.5, Math.floor(pos.y)+0.5, Math.floor(pos.z)+0.5);

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
            }, timeout*1000);

            events.playerLeft.on((ev) => {
                if (ev.player === player) clearTimeout(wait);
            });

            return true;
        }

        player.sendMessage(`§aTeleporting to §r${warp}`);
        player.teleport(posFix);
        player.sendMessage(`§aTeleported!`);
        return true;
    }
}

/**WarpUI contents */
export namespace WarpUI {

    /**Get WarpUI Title */
    export function getTitle(): string {
        return config.warpui.title;
    }

    /**Get WarpUI Description */
    export function getDescription(): string {
        return config.warpui.description;
    }

    /**Get WarpUI Button */
    export function getWarpButton(warp: string, pos: BlockPos, dimensionId: DimensionId): string {
        return textReplace(config.warpui.warp, [["{warp}", warp], ["{dimension}", DimensionId[dimensionId]], ["{x}", pos.x.toString()], ["{y}", pos.y.toString()], ["{z}", pos.z.toString()]]);
    }

    /**Get WarpUI Cancel Button */
    export function getWarpCancel(): string {
        return config.warpui.cancel;
    }

    /**Get WarpUI Image */
    export function getImage() {
        return config.warpui.image;
    }

    /**Send WarpUI */
    export function sendTo(player: Player) {
        let buttons: FormButton[] = [];

        const warps_ = SimpleWarp.getWarps();
        warps_.forEach((name) => {
            const img = getImage();
            const warp = warps[name];
            const button = getWarpButton(name, warp.pos, warp.dimension);

            buttons.push(new FormButton(button, img?.type, img?.src));
        });
        buttons.push(new FormButton(getWarpCancel()));

        const form = new SimpleForm(getTitle(), textReplace(getDescription(), ["{player}", player.getName()]), buttons);
        form.sendTo(player.getNetworkIdentifier(), (res) => {
            const r = res.response;
            const isCancel = warps_.length;

            if (r === isCancel||r === null) return;
            SimpleWarp.teleport(player, warps_[r]);
        });
    }
}

function isArrayOfTuples(obj: any): obj is [string, string][] {
    return Array.isArray(obj) && obj.every(item => Array.isArray(item) && item.length === 2 && typeof item[0] === 'string' && typeof item[1] === 'string');
}

function textReplace(text: string, replace: [string, string]|[string, string][]): string {
    if (isArrayOfTuples(replace)) {
        replace.forEach(([v, w]) => {
            const reg = new RegExp(v, "g");
            text=text.replace(reg, w);
        });
    }
    else {
        const reg = new RegExp(replace[0], "g");
        text=text.replace(reg, replace[1]);
    }

    return text;
}

const movingCanceling = setInterval(() => {
    const players = Array.from(teleporting.entries());
    for (let i = 0; i < players.length; i++) {
        const [netId, player] = players[i];
        if (!player.isMoving()) return;

        teleporting.delete(netId);
        player.sendMessage(`§cTeleport §4Cancelled!`);
    }
}, 1);

events.playerLeft.on((data) => {
    if (teleporting.has(data.player.getNetworkIdentifier())) teleporting.delete(data.player.getNetworkIdentifier());
});

events.serverStop.on(() => {
    clearInterval(movingCanceling);
});

events.serverOpen.on(() => {
    require("./src");
    send.success("Started!");
});

events.serverClose.on(() => {
    SimpleWarp.save(true);
});