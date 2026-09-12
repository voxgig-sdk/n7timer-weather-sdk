import { N7timerWeatherEntityBase } from '../N7timerWeatherEntityBase';
import type { N7timerWeatherSDK } from '../N7timerWeatherSDK';
import type { Control } from '../types';
import type { Apipl, ApiplListMatch } from '../N7timerWeatherTypes';
declare class ApiplEntity extends N7timerWeatherEntityBase<Apipl> {
    constructor(client: N7timerWeatherSDK, entopts: any);
    make(this: ApiplEntity): ApiplEntity;
    list(this: any, reqmatch?: ApiplListMatch, ctrl?: Control): Promise<ApiplEntity[]>;
}
export { ApiplEntity };
