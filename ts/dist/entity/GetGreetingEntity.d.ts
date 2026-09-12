import { HelloAsServiceEntityBase } from '../HelloAsServiceEntityBase';
import type { HelloAsServiceSDK } from '../HelloAsServiceSDK';
import type { Control } from '../types';
import type { GetGreeting, GetGreetingLoadMatch } from '../HelloAsServiceTypes';
declare class GetGreetingEntity extends HelloAsServiceEntityBase<GetGreeting> {
    constructor(client: HelloAsServiceSDK, entopts: any);
    make(this: GetGreetingEntity): GetGreetingEntity;
    load(this: any, reqmatch?: GetGreetingLoadMatch, ctrl?: Control): Promise<GetGreetingEntity>;
}
export { GetGreetingEntity };
