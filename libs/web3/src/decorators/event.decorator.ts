import 'reflect-metadata';
import { Filter } from 'web3-eth-contract';

export enum OPTIONAL_EVENT {
    DATA = 'data',
    CHANGED = 'changed',
    ERROR = 'error',
    CONNECTED = 'connected',
}

/**
 * Декоратор, отмечающий метод, который будет обрабатывать событие смарт-контракта
 * @param contractEvent - событие контракта
 * @param optionalEvent - опциональное событие
 * @param options
 * @constructor
 */
export const Event = (
    contractEvent: string,
    optionalEvent: OPTIONAL_EVENT,
    options?: Filter,
) => {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<any>,
    ): TypedPropertyDescriptor<any> => {
        if (!Reflect.hasMetadata('eventHandlers', target))
            Reflect.defineMetadata('eventHandlers', [], target);
        Reflect.getMetadata('eventHandlers', target).push({
            fn: descriptor,
            contractEvent,
            optionalEvent,
            options,
        });
        return descriptor;
    };
};
