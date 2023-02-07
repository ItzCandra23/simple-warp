import { FormButton, SimpleForm } from "bdsx/bds/form";
import { ServerPlayer } from "bdsx/bds/player";
import { SimpleWarp } from "..";
import { WarpConfig } from ".";

export class SimpleWarpUI {
    /**Open WarpsUI for teleport */
    static warps(player: ServerPlayer): void {
        const b: FormButton[] = [];
        const data = SimpleWarp.getWarps();

        data.forEach(v => {
            b.push(new FormButton(WarpConfig.getTeleportButton().replace("%warp%", v) ?? v));
        });

        new SimpleForm( WarpConfig.getTitle() ?? "§l§2Simple§e-§dWarp", WarpConfig.getContent().replace("%player%", player.getNameTag()) ?? "", b)
        .sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null) return;
            SimpleWarp.teleport(player, data[r]);
        });
    }
}