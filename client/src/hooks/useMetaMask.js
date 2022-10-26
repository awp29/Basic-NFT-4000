import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

const MM_CONNECTED_ACCOUNT_KEY = 'mm_connectedAccount';

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
    const connectedAccount = window.localStorage.getItem(MM_CONNECTED_ACCOUNT_KEY);
    if (connectedAccount) {
      setConnectedAccount(connectedAccount);
    }
  }, []);

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

  return {
    connectToMetaMask: handleConnectToMetaMask,
    connectedAccount,
    connectedChain: ethereum.networkVersion,
  };
};

function storeConnectedAccountInLocalStorage(connectedAddress) {
  window.localStorage.setItem(MM_CONNECTED_ACCOUNT_KEY, connectedAddress);
}

function removeConnectedAccountFromLocalStorage() {
  window.localStorage.removeItem(MM_CONNECTED_ACCOUNT_KEY);
}
