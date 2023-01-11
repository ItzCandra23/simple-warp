"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleWarpUI = void 0;
const form_1 = require("bdsx/bds/form");
const warps_1 = require("./warps");
class SimpleWarpUI {
    /**Open WarpsUI for teleport */
    static warps(player) {
        var _a, _b;
        const b = [];
        const data = warps_1.SimpleWarp.getWarps();
        data.forEach(v => {
            var _a;
            b.push(new form_1.FormButton((_a = warps_1.config.button.replace("%warp%", v)) !== null && _a !== void 0 ? _a : v));
        });
        new form_1.SimpleForm((_a = warps_1.config.title) !== null && _a !== void 0 ? _a : "§l§2Simple§e-§dWarp", (_b = warps_1.config.content.replace("%player%", player.getName())) !== null && _b !== void 0 ? _b : "", b)
            .sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null)
                return;
            warps_1.SimpleWarp.teleport(player, data[r]);
        });
    }
}
exports.SimpleWarpUI = SimpleWarpUI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0NBQXVFO0FBRXZFLG1DQUE2QztBQUU3QyxNQUFhLFlBQVk7SUFDckIsK0JBQStCO0lBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBb0I7O1FBQzdCLE1BQU0sQ0FBQyxHQUFpQixFQUFFLENBQUM7UUFDM0IsTUFBTSxJQUFJLEdBQUcsa0JBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVuQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFOztZQUNiLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBVSxDQUFDLE1BQUEsY0FBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxtQ0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxpQkFBVSxDQUFDLE1BQUEsY0FBTSxDQUFDLEtBQUssbUNBQUkscUJBQXFCLEVBQUUsTUFBQSxjQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLG1DQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDbkgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxJQUFJO2dCQUFFLE9BQU87WUFDdkIsa0JBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBakJELG9DQWlCQyJ9