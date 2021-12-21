import {CHAIN_NAME, CHAINS, DEFAULT_CHAIN} from '../../config';

type AlchemyAPIURL = `https://eth-${
  | typeof CHAIN_NAME['1']
  | typeof CHAIN_NAME['3']
  | typeof CHAIN_NAME['4']
  | typeof CHAIN_NAME['42']
  | typeof CHAIN_NAME['5']}.alchemyapi.io/v2/${string}`;

/**
 * Alchemy API URL
 *
 * @note Some services (i.e. Transfers) only work on certain network IDs.
 *
 * @param networkID `typeof CHAINS[keyof typeof CHAINS]`
 * @return `AlchemyAPIURL`
 */
export function getAlchemyURL(
  networkID: typeof CHAINS[keyof typeof CHAINS] = DEFAULT_CHAIN
): AlchemyAPIURL | undefined {
  if (!process.env.REACT_APP_ALCHEMY_API_KEY) return;

  // Alchemy does not support the following networks
  if (
    networkID === CHAINS.GANACHE ||
    networkID === CHAINS.HARMONY_MAIN ||
    networkID === CHAINS.HARMONY_TEST
  ) {
    return;
  }

  return `https://eth-${CHAIN_NAME[networkID]}.alchemyapi.io/v2/${
    process.env.REACT_APP_ALCHEMY_API_KEY || ''
  }`;
}
