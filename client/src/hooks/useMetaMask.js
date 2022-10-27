import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

const MM_CONNECTED_ACCOUNT_KEY = 'mm_connectedAccount';
const MM_CONNECTED_CHAIN_KEY = 'mm_connectedChain';

const { ethereum } = window;

export const useMetaMask = () => {
  const [connectedAccount, setConnectedAccount] = useState(
    window.localStorage.getItem(MM_CONNECTED_ACCOUNT_KEY)
  );

  const handleConnectToMetaMask = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const chain = await ethereum.request({ method: 'eth_chainId' });

    handleAccountChanged(accounts);
    handleChainChanged(chain);
  };

  const handleAccountChanged = (accounts) => {
    const account = accounts[0];

    if (isEmpty(account)) {
      removeConnectedAccountFromLocalStorage();
      setConnectedAccount(null);
    } else {
      storeConnectedAccountInLocalStorage(account);
      setConnectedAccount(account);
    }
  };

  useEffect(() => {
    ethereum.on('accountsChanged', handleAccountChanged);

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountChanged);
    };
  }, []);

  const handleChainChanged = (chainId) => {
    storeChain(parseChain(chainId));
    window.location.reload();
  };

  useEffect(() => {
    ethereum.on('chainChanged', handleChainChanged);

    return () => {
      ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  return {
    connectedToMetaMask: !!connectedAccount,
    connectToMetaMask: handleConnectToMetaMask,
    connectedAccount,
    connectedChain: window.localStorage.getItem(MM_CONNECTED_CHAIN_KEY),
  };
};

function storeConnectedAccountInLocalStorage(connectedAddress) {
  window.localStorage.setItem(MM_CONNECTED_ACCOUNT_KEY, connectedAddress);
}

function removeConnectedAccountFromLocalStorage() {
  window.localStorage.removeItem(MM_CONNECTED_ACCOUNT_KEY);
}

function storeChain(chainId) {
  window.localStorage.setItem(MM_CONNECTED_CHAIN_KEY, chainId);
}

function parseChain(chainId) {
  return parseInt(chainId).toString();
}
