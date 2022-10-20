import { ethers } from 'ethers';

const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum, 'any');
const signer = provider.getSigner();

provider.on('network', (newNetwork, oldNetwork) => {
  if (oldNetwork) {
    // NETWORK CHANGED RELOAD
    window.location.reload();
  }
});

export { provider, signer };
