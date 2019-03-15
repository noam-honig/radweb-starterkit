"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_event_authorize_action_1 = require("./server-event-authorize-action");
var tempConnections = {};
server_event_authorize_action_1.ServerEventAuthorizeAction.authorize = function (key) {
    var x = tempConnections[key];
    if (x)
        x();
};
var ServerEvents = /** @class */ (function () {
    function ServerEvents(app) {
        var _this = this;
        this.connection = [];
        this.SendMessage = function (x) {
            _this.connection.forEach(function (y) { return y.write("data:" + x + "\n\n"); });
        };
        app.get('/stream', function (req, res) {
            res.writeHead(200, {
                "Access-Control-Allow-Origin": req.header('origin') ? req.header('origin') : '',
                "Access-Control-Allow-Credentials": "true",
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            });
            var key = new Date().toISOString();
            tempConnections[key] = function () {
                _this.connection.push(res);
                tempConnections[key] = undefined;
            };
            res.write("event:authenticate\ndata:" + key + "\n\n");
            req.on("close", function () {
                tempConnections[key] = undefined;
                var i = _this.connection.indexOf(res);
                if (i >= 0)
                    _this.connection.splice(i, 1);
            });
        });
    }
    return ServerEvents;
}());
exports.ServerEvents = ServerEvents;
//# sourceMappingURL=server-events.js.map