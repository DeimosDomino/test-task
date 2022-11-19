import { AbiItem } from 'web3-utils';

export type Web3EventSubscriberConfig = {
    abi: AbiItem[] | AbiItem;
    infura_endpoint: string;
    contract_address: string;
};
