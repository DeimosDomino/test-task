import { Web3EventSubscriberConfig } from '../types';
import Web3 from 'web3';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const web3 = require('web3');

/**
 * Декоратор, отмечающий класс, методы которого будут обрабатывать события смарт-контракта
 * @param config
 * @constructor
 */
export const Web3EventSubscriber = (config: Web3EventSubscriberConfig) => {
    return <T extends { new (...args: any[]) }>(target: T) => {
        return class extends target {
            constructor(...args) {
                super(args);
                const w3: Web3 = new web3(config.infura_endpoint);
                const contract = new w3.eth.Contract(
                    config.abi,
                    config.contract_address,
                );

                for (const handler of Reflect.getMetadata(
                    'eventHandlers',
                    target.prototype,
                )) {
                    contract.events[handler.contractEvent]().on(
                        handler.optionalEvent,
                        handler.fn.value.bind(this),
                        handler.options,
                    );
                }
            }
        };
    };
};
