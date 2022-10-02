"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./form");
require("./command");
const event_1 = require("bdsx/event");
const api_1 = require("./api");
event_1.events.serverStop.on(() => {
    api_1.SimpleWarpAPI.writeFile();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlCQUFlO0FBQ2Ysa0JBQWdCO0FBQ2hCLHFCQUFtQjtBQUNuQixzQ0FBb0M7QUFDcEMsK0JBQXNDO0FBR3RDLGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUN0QixtQkFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzlCLENBQUMsQ0FBQyxDQUFDIn0=