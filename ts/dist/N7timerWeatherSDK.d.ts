import { ApiplEntity } from './entity/ApiplEntity';
import { GraphicalApiEntity } from './entity/GraphicalApiEntity';
export type * from './N7timerWeatherTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { N7timerWeatherEntityBase } from './N7timerWeatherEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class N7timerWeatherSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Apipl(entopts?: Record<string, any>): ApiplEntity;
    GraphicalApi(entopts?: Record<string, any>): GraphicalApiEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): N7timerWeatherSDK;
    tester(testopts?: any, sdkopts?: any): N7timerWeatherSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof N7timerWeatherSDK;
export { stdutil, config, BaseFeature, N7timerWeatherEntityBase, N7timerWeatherSDK, SDK, };
