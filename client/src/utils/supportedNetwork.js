export const getSupportedNetworkUrl = () => {
  const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY; // eslint-disable-line no-undef
  const connectedChain = window.localStorage.getItem('mm_connectedChain');

  if (connectedChain == 31337) {
    return 'http://localhost:8545';
  }
  return `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
};

export const getSupportChainId = () => {
  const connectedChain = window.localStorage.getItem('mm_connectedChain');

  if (connectedChain == 31337) {
    return 31337;
  }
  return 5;
};
