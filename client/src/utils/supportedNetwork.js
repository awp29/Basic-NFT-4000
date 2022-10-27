export const getSupportedNetworkUrl = () => {
  const INFURA_API_KEY = process.env.REACT_APP_INFURA_API_KEY; // eslint-disable-line no-undef
  const connectedChain = window.localStorage.getItem('mm_connectedChain');

  if (connectedChain == 31337) {
    return 'http://localhost:8545';
  }
  return `https://goerli.infura.io/v3/${INFURA_API_KEY}`;
};

export const getSupportChainId = () => {
  const connectedChain = window.localStorage.getItem('mm_connectedChain');

  if (connectedChain == 31337) {
    return 31337;
  }
  return 5;
};
