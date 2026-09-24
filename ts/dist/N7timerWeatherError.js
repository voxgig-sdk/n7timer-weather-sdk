"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N7timerWeatherError = void 0;
class N7timerWeatherError extends Error {
    isN7timerWeatherError = true;
    sdk = 'N7timerWeather';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.N7timerWeatherError = N7timerWeatherError;
//# sourceMappingURL=N7timerWeatherError.js.map