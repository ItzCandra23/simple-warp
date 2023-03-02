"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.send = void 0;
const name = "SimpleWarp";
/**Send message to player or console. */
var send;
(function (send) {
    /**Send error message. */
    function error(message, actor) {
        if (actor)
            actor.sendMessage(`§c${message.replace(/&r/g, "§r§a").replace(/&f/g, "§r")}`);
        else
            console.log(`[${name}] Error! ${message.replace(/&r/g, "").replace(/&f/g, "")}`.red);
    }
    send.error = error;
    /**Send success message. */
    function success(message, actor) {
        if (actor)
            actor.sendMessage(`§a${message.replace(/&r/g, "§r§a").replace(/&f/g, "§r").replace(/&e/g, "§e")}`);
        else
            console.log(`[${name}] ${message.replace(/&r/g, "").replace(/&f/g, "").replace(/&e/g, "")}`.green);
    }
    send.success = success;
    /**Send normal message. */
    function msg(message, actor) {
        if (actor)
            actor.sendMessage(message.replace(/&r/g, "§r").replace(/&f/g, "§r").replace(/&a/g, "§a").replace(/&e/g, "§e"));
        else
            console.log(`[${name}] ${message.replace(/&r/g, "").replace(/&f/g, "").replace(/&a/g, "").replace(/&e/g, "")}`);
    }
    send.msg = msg;
})(send = exports.send || (exports.send = {}));
/**Send message to player or console. */
class sendMessage {
    constructor(actor) {
        this.actor = actor;
    }
    /**Send error message. */
    error(message) {
        if (this.actor)
            this.actor.sendMessage(`§c${message.replace(/&r/g, "§r§a").replace(/&f/g, "§r")}`);
        else
            console.log(`[${name}] Error! ${message.replace(/&r/g, "").replace(/&f/g, "")}`.red);
    }
    /**Send success message. */
    success(message) {
        if (this.actor)
            this.actor.sendMessage(`§a${message.replace(/&r/g, "§r§a").replace(/&f/g, "§r").replace(/&e/g, "§e")}`);
        else
            console.log(`[${name}] ${message.replace(/&r/g, "").replace(/&f/g, "").replace(/&e/g, "")}`.green);
    }
    /**Send normal message. */
    msg(message) {
        if (this.actor)
            this.actor.sendMessage(message.replace(/&r/g, "§r").replace(/&f/g, "§r").replace(/&a/g, "§a").replace(/&e/g, "§e"));
        else
            console.log(`[${name}] ${message.replace(/&r/g, "").replace(/&f/g, "").replace(/&a/g, "").replace(/&e/g, "")}`);
    }
}
exports.sendMessage = sendMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDO0FBRTFCLHdDQUF3QztBQUN4QyxJQUFpQixJQUFJLENBa0JwQjtBQWxCRCxXQUFpQixJQUFJO0lBQ2pCLHlCQUF5QjtJQUN6QixTQUFnQixLQUFLLENBQUMsT0FBZSxFQUFFLEtBQW9CO1FBQ3ZELElBQUksS0FBSztZQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzs7WUFDcEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksWUFBWSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUhlLFVBQUssUUFHcEIsQ0FBQTtJQUVELDJCQUEyQjtJQUMzQixTQUFnQixPQUFPLENBQUMsT0FBZSxFQUFFLEtBQW9CO1FBQ3pELElBQUksS0FBSztZQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztZQUN6RyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtB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