import "./api";
import "./form";
import "./command";
import { events } from "bdsx/event";
import { SimpleWarpAPI } from "./api";


events.serverStop.on(() => {
    SimpleWarpAPI.writeFile();
});
