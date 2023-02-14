import { ServerPlayer } from "bdsx/bds/player";

const name = "SimpleWarp";

/**Send message to player or console. */
export namespace send {
    /**Send error message. */
    export function error(message: string, actor?: ServerPlayer): void {
        if (actor) actor.sendMessage(`§c${message.replace(/&r/g, "§r§a").replace(/&f/g, "§r")}`);
        else console.log(`[${name}] Error! ${message.replace(/&r/g, "").replace(/&f/g, "")}`.red);
    }

    /**Send success message. */
    export function success(message: string, actor?: ServerPlayer): void {
        if (actor) actor.sendMessage(`§a${message.replace(/&r/g, "§r§a").replace(/&f/g, "§r").replace(/&e/g, "§e")}`);
        else console.log(`[${name}] ${message.replace(/&r/g, "").replace(/&f/g, "").replace(/&e/g, "")}`.green);
    }

    /**Send normal message. */
    export function msg(message: string, actor?: ServerPlayer): void {
        if (actor) actor.sendMessage(message.replace(/&r/g, "§r").replace(/&f/g, "§r").replace(/&a/g, "§a").replace(/&e/g, "§e"));
        else console.log(`[${name}] ${message.replace(/&r/g, "").replace(/&f/g, "").replace(/&a/g, "").replace(/&e/g, "")}`);
    }
}

/**Send message to player or console. */
export class sendMessage {
    private actor?: ServerPlayer;
    constructor(actor?: ServerPlayer) {
        this.actor=actor;
    }

    /**Send error message. */
    error(message: string): void {
        if (this.actor) this.actor.sendMessage(`§c${message.replace(/&r/g, "§r§a").replace(/&f/g, "§r")}`);
        else console.log(`[${name}] Error! ${message.replace(/&r/g, "").replace(/&f/g, "")}`.red);
    }

    /**Send success message. */
    success(message: string): void {
        if (this.actor) this.actor.sendMessage(`§a${message.replace(/&r/g, "§r§a").replace(/&f/g, "§r").replace(/&e/g, "§e")}`);
        else console.log(`[${name}] ${message.replace(/&r/g, "").replace(/&f/g, "").replace(/&e/g, "")}`.green);
    }

    /**Send normal message. */
    msg(message: string): void {
        if (this.actor) this.actor.sendMessage(message.replace(/&r/g, "§r").replace(/&f/g, "§r").replace(/&a/g, "§a").replace(/&e/g, "§e"));
        else console.log(`[${name}] ${message.replace(/&r/g, "").replace(/&f/g, "").replace(/&a/g, "").replace(/&e/g, "")}`);
    }
}
