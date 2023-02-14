"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleWarpUI = void 0;
const form_1 = require("bdsx/bds/form");
const __1 = require("..");
const _1 = require(".");
class SimpleWarpUI {
    /**Open WarpsUI for teleport */
    static warps(player) {
        var _a, _b;
        const b = [];
        const data = __1.SimpleWarp.getWarps();
        data.forEach(v => {
            var _a;
            b.push(new form_1.FormButton((_a = _1.WarpConfig.getTeleportButton().replace("%warp%", v)) !== null && _a !== void 0 ? _a : v));
        });
        new form_1.SimpleForm((_a = _1.WarpConfig.getTitle()) !== null && _a !== void 0 ? _a : "§l§2Simple§e-§dWarp", (_b = _1.WarpConfig.getContent().replace("%player%", player.getNameTag())) !== null && _b !== void 0 ? _b : "", b)
            .sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null)
                return;
            __1.SimpleWarp.teleport(player, data[r]);
        });
    }
}
exports.SimpleWarpUI = SimpleWarpUI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0NBQXVEO0FBRXZELDBCQUFnQztBQUNoQyx3QkFBK0I7QUFFL0IsTUFBYSxZQUFZO0lBQ3JCLCtCQUErQjtJQUMvQixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQW9COztRQUM3QixNQUFNLENBQUMsR0FBaUIsRUFBRSxDQUFDO1FBQzNCLE1BQU0sSUFBSSxHQUFHLGNBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVuQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFOztZQUNiLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBVSxDQUFDLE1BQUEsYUFBVSxDQUFDLGlCQUFpQixFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsbUNBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksaUJBQVUsQ0FBRSxNQUFBLGFBQVUsQ0FBQyxRQUFRLEVBQUUsbUNBQUkscUJBQXFCLEVBQUUsTUFBQSxhQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsbUNBQUksRUFBRSxFQUFFLENBQUMsQ0FBQzthQUN6SSxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLElBQUk7Z0JBQUUsT0FBTztZQUN2QixjQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQWpCRCxvQ0FpQkMifQ==