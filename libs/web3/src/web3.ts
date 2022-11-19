import Web3 from 'web3';
import { CONFIG } from '@libs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const web3 = require('web3');

export const WEB3: Web3 = new web3(CONFIG.WEB3.INFURA_HTTPS_ENDPOINT);
