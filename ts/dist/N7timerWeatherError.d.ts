import { Context } from './Context';
declare class N7timerWeatherError extends Error {
    isN7timerWeatherError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { N7timerWeatherError };
