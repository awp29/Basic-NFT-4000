/** @jsxImportSource @emotion/react */

import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

const ConnectWalletButton = (props) => {
  const { onClick } = props;

  return (
    <button
      css={{
        cursor: 'pointer',
        fontFamily: 'inherit',
        border: 'none',
        margin: 0,
        overflow: 'visible',
        color: '#04111d',
        backgroundColor: 'transparent',
        lineHeight: 'normal',
        WebkitFontSmoothing: 'inherit',
        MozOsxFontSmoothing: 'inherit',
        WebkitAppearance: 'none',
      }}
      onClick={onClick}
    >
      <MdOutlineAccountBalanceWallet size={32} />
    </button>
  );
};

export default ConnectWalletButton;
