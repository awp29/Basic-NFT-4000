import { useEffect, useState } from 'react';

const { ethereum } = window;

ethereum.on('chainChanged', () => {
  window.location.reload();
});

export const useMetaMask = () => {
  const [connectedAccount, setConnectedAccount] = useState(null);

  const handleConnectToMetaMask = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    setConnectedAccount(accounts[0]);
  };

  useEffect(() => {
    ethereum.on('accountsChanged', (accounts) => {
      setConnectedAccount(accounts[0]);
    });
  }, []);

  return {
    connectToMetaMask: handleConnectToMetaMask,
    connectedAccount,
    connectedChain: ethereum.networkVersion,
  };
};
