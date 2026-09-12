import { N7timerWeatherEntityBase } from '../N7timerWeatherEntityBase';
import type { N7timerWeatherSDK } from '../N7timerWeatherSDK';
import type { Control } from '../types';
import type { GraphicalApi, GraphicalApiLoadMatch } from '../N7timerWeatherTypes';
declare class GraphicalApiEntity extends N7timerWeatherEntityBase<GraphicalApi> {
    constructor(client: N7timerWeatherSDK, entopts: any);
    make(this: GraphicalApiEntity): GraphicalApiEntity;
    load(this: any, reqmatch?: GraphicalApiLoadMatch, ctrl?: Control): Promise<GraphicalApiEntity>;
}
export { GraphicalApiEntity };
