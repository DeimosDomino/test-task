import { ABI } from './abi';

export const WEB3_CONFIG = {
    ABI,
    CONTRACT_ADDRESS:
        process.env.CONTRACT_ADDRESS ||
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    INFURA_HTTPS_ENDPOINT:
        process.env.INFURA_HTTPS_ENDPOINT ||
        'https://mainnet.infura.io/v3/ff194713efd1443c9704c3ccd2187ad0',
    INFURA_WSS_ENDPOINT:
        process.env.INFURA_WSS_ENDPOINT ||
        'wss://mainnet.infura.io/ws/v3/ff194713efd1443c9704c3ccd2187ad0',
    BLOCK_COUNT: parseInt(process.env.BLOCK_COUNT) || 10000,
};
