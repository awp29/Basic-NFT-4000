/** @jsxImportSource @emotion/react */

import { shortenAddress } from '../utils/shortenAddress';

const WalletConnected = (props) => {
  const { connectedAccount } = props;

  return (
    <div>
      <div css={{ display: 'flex', alignItems: 'center' }}>
        <div
          css={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#1B9E64',
            marginRight: '4px',
          }}
        />
        <p css={{ position: 'relative', top: '1px', fontSize: '14px' }}>
          {shortenAddress(connectedAccount)}
        </p>
      </div>
    </div>
  );
};

export default WalletConnected;
