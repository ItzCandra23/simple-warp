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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBdUM7QUFDdkMseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUU3QixJQUFJLE1BQU0sR0FLTjtJQUNBLEtBQUssRUFBRSxxQkFBcUI7SUFDNUIsT0FBTyxFQUFFLG1FQUFtRTtJQUM1RSxNQUFNLEVBQUUsbUNBQW1DO0lBQzNDLGFBQWEsRUFBRSxzQkFBc0I7Q0FDeEMsQ0FBQztBQUVGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztBQUU3RCxJQUFJO0lBQUUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtDQUFFO0FBQUMsT0FBTSxDQUFDLEVBQUUsR0FBRTtBQUVoRCxJQUFpQixVQUFVLENBd0IxQjtBQXhCRCxXQUFpQixVQUFVO0lBQ3ZCLFNBQWdCLFFBQVE7UUFDcEIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFGZSxtQkFBUSxXQUV2QixDQUFBO0lBQ0QsU0FBZ0IsVUFBVTtRQUN0QixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJQUZlLHFCQUFVLGFBRXpCLENBQUE7SUFDRCxTQUFnQixpQkFBaUI7UUFDN0IsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFGZSw0QkFBaUIsb0JBRWhDLENBQUE7SUFDRCxTQUFnQixlQUFlO1FBQzNCLE9BQU8sTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUNoQyxDQUFDO0lBRmUsMEJBQWUsa0JBRTlCLENBQUE7SUFDRCxTQUFnQixJQUFJLENBQUMsVUFBbUIsS0FBSyxFQUFFLEtBQW9CO1FBQy9ELEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN0RSxJQUFJLE9BQU8sRUFBRTtnQkFDVCxJQUFJLEdBQUcsRUFBRTtvQkFDTCxjQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3hDLE1BQU0sR0FBRyxDQUFDO2lCQUNiOztvQkFDSSxjQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2xEO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBVmUsZUFBSSxPQVVuQixDQUFBO0FBQ0wsQ0FBQyxFQXhCZ0IsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUF3QjFCIn0=