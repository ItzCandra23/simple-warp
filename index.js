"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const event_1 = require("bdsx/event");
/**Send a message to Player or Console. */
var send;
(function (send) {
    /**Send error message. */
    function error(message, actor) {
        if (actor)
            actor.sendMessage(`§c${message.replace(/&e/g, "§e").replace(/&7/g, "§7").replace(/&r/g, "§r§c").replace(/&/g, "§")}`);
        else
            console.log(`[Simple-Warp] Error! ${message.replace(/&e/g, "").replace(/&7/g, "").replace(/&r/g, "").replace(/&/g, "")}`);
    }
    send.error = error;
    /**Send error message. */
    function success(message, actor) {
        if (actor)
            actor.sendMessage(`§a${message.replace(/&e/g, "§e").replace(/&7/g, "§7").replace(/&r/g, "§r§a").replace(/&/g, "§")}`);
        else
            console.log(`[Simple-Warp] ${message.replace(/&e/g, "").replace(/&7/g, "").replace(/&r/g, "").replace(/&/g, "")}`);
    }
    send.success = success;
    /**Send error message. */
    function msg(message, actor) {
        if (actor)
            actor.sendMessage(`${message.replace(/&/g, "§")}`);
        else
            console.log(`[Simple-Warp] ${message.replace(/&e/g, "").replace(/&7/g, "").replace(/&r/g, "").replace(/&/g, "")}`);
    }
    send.msg = msg;
})(send = exports.send || (exports.send = {}));
event_1.events.serverOpen.on(() => {
    require("./src");
    send.success("Started!");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzQ0FBb0M7QUFFcEMsMENBQTBDO0FBQzFDLElBQWlCLElBQUksQ0FnQnBCO0FBaEJELFdBQWlCLElBQUk7SUFDakIseUJBQXlCO0lBQ3pCLFNBQWdCLEtBQUssQ0FBQyxPQUFlLEVBQUUsS0FBb0I7UUFDdkQsSUFBSSxLQUFLO1lBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7WUFDNUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25JLENBQUM7SUFIZSxVQUFLLFFBR3BCLENBQUE7SUFDRCx5QkFBeUI7SUFDekIsU0FBZ0IsT0FBTyxDQUFDLE9BQWUsRUFBRSxLQUFvQjtRQUN6RCxJQUFJLEtBQUs7WUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztZQUM1SCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUgsQ0FBQztJQUhlLFlBQU8sVUFHdEIsQ0FBQTtJQUNELHlCQUF5QjtJQUN6QixTQUFnQixHQUFHLENBQUMsT0FBZSxFQUFFLEtBQW9CO1FBQ3JELElBQUksS0FBSztZQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7O1lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1SCxDQUFDO0lBSGUsUUFBRyxNQUdsQixDQUFBO0FBQ0wsQ0FBQyxFQWhCZ0IsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBZ0JwQjtBQUVELGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUN0QixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUMsQ0FBQyJ9