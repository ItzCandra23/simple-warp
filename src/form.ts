import { Form, FormButton, FormData, SimpleForm } from "bdsx/bds/form";
import { ServerPlayer } from "bdsx/bds/player";
import { config, SimpleWarp } from "./warps";

export class SimpleWarpUI {
    /**Open WarpsUI for teleport */
    static warps(player: ServerPlayer): void {
        const b: FormButton[] = [];
        const data = SimpleWarp.getWarps();

        data.forEach(v => {
            b.push(new FormButton(config.button.replace("%warp%", v) ?? v));
        });

        new SimpleForm(config.title ?? "§l§2Simple§e-§dWarp", config.content.replace("%player%", player.getName()) ?? "", b)
        .sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null) return;
            SimpleWarp.teleport(player, data[r]);
        });
    }
}