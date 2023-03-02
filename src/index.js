"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarpConfig = void 0;
const message_1 = require("./utils/message");
const fs = require("fs");
const path = require("path");
let config = {
    title: "§l§2Simple§e-§dWarp",
    content: "Hi §e%player%§r, This is WarpUI you can teleport to warp position",
    button: "§l§2%warp%§r\n§7Click to teleport",
    cancel_button: "§l§8[ §cCANCEL §8]§r",
    timeout: 3,
};
const configPath = path.join(__dirname, "..", "config.json");
try {
    config = require(configPath);
}
catch (e) { }
var WarpConfig;
(function (WarpConfig) {
    function getTitle() {
        return config.title;
    }
    WarpConfig.getTitle = getTitle;
    function getContent() {
        return config.content;
    }
    WarpConfig.getContent = getContent;
    function getTeleportButton() {
        return config.button;
    }
    WarpConfig.getTeleportButton = getTeleportButton;
    function getCancelButton() {
        return config.cancel_button;
    }
    WarpConfig.getCancelButton = getCancelButton;
    function getTimeout() {
        if (!config.timeout || config.timeout < 1)
            return null;
        else
            return config.timeout;
    }
    WarpConfig.getTimeout = getTimeout;
    function setWarpTimeout(seconds) {
        config.timeout = seconds;
    }
    WarpConfig.setWarpTimeout = setWarpTimeout;
    function save(message = false, actor) {
        fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    message_1.send.error(`config.json ${err}`, actor);
                    throw err;
                }
                else
                    message_1.send.success(`config.json Saved!`, actor);
            }
        });
    }
    WarpConfig.save = save;
})(WarpConfig = exports.WarpConfig || (exports.WarpConfig = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBdUM7QUFDdkMseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUU3QixJQUFJLE1BQU0sR0FNTjtJQUNBLEtBQUssRUFBRSxxQkFBcUI7SUFDNUIsT0FBTyxFQUFFLG1FQUFtRTtJQUM1RSxNQUFNLEVBQUUsbUNBQW1DO0lBQzNDLGFBQWEsRUFBRSxzQkFBc0I7SUFDckMsT0FBTyxFQUFFLENBQUM7Q0FDYixDQUFDO0FBRUYsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBRTdELElBQUk7SUFBRSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0NBQUU7QUFBQyxPQUFNLENBQUMsRUFBRSxHQUFFO0FBRWhELElBQWlCLFVBQVUsQ0ErQjFCO0FBL0JELFdBQWlCLFVBQVU7SUFDdkIsU0FBZ0IsUUFBUTtRQUNwQixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUZlLG1CQUFRLFdBRXZCLENBQUE7SUFDRCxTQUFnQixVQUFVO1FBQ3RCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUMxQixDQUFDO0lBRmUscUJBQVUsYUFFekIsQ0FBQTtJQUNELFNBQWdCLGlCQUFpQjtRQUM3QixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUZlLDRCQUFpQixvQkFFaEMsQ0FBQTtJQUNELFNBQWdCLGVBQWU7UUFDM0IsT0FBTyxNQUFNLENBQUMsYUFBYSxDQUFDO0lBQ2hDLENBQUM7SUFGZSwwQkFBZSxrQkFFOUIsQ0FBQTtJQUNELFNBQWdCLFVBQVU7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7O1lBQ2xELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUMvQixDQUFDO0lBSGUscUJBQVUsYUFHekIsQ0FBQTtJQUNELFNBQWdCLGNBQWMsQ0FBQyxPQUFnQjtRQUMzQyxNQUFNLENBQUMsT0FBTyxHQUFDLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRmUseUJBQWMsaUJBRTdCLENBQUE7SUFDRCxTQUFnQixJQUFJLENBQUMsVUFBbUIsS0FBSyxFQUFFLEtBQW9CO1FBQy9ELEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN0RSxJQUFJLE9BQU8sRUFBRTtnQkFDVCxJQUFJLEdBQUcsRUFBRTtvQkFDTCxjQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3hDLE1BQU0sR0FBRyxDQUFDO2lCQUNiOztvQkFDSSxjQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2xEO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBVmUsZUFBSSxPQVVuQixDQUFBO0FBQ0wsQ0FBQyxFQS9CZ0IsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUErQjFCIn0=