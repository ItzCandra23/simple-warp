import { ServerPlayer } from "bdsx/bds/player";
import { send } from "./utils/message";
import * as fs from "fs";
import * as path from "path";

let config: {
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

const configPath = path.join(__dirname, "..", "config.json");

try { config = require(configPath) } catch(e) {}

export namespace WarpConfig {
    export function getTitle(): string {
        return config.title;
    }
    export function getContent(): string {
        return config.content;
    }
    export function getTeleportButton(): string {
        return config.button;
    }
    export function getCancelButton(): string {
        return config.cancel_button;
    }
    export function save(message: boolean = false, actor?: ServerPlayer): void {
        fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    send.error(`config.json ${err}`, actor);
                    throw err;
                }
                else send.success(`config.json Saved!`, actor);
            }
        });
    }
}
