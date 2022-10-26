/** @jsxImportSource @emotion/react */

import ReactDOM from 'react-dom';
import { keyframes } from '@emotion/react';
import CloseModalButton from './CloseModalButton';
import CompletePurchaseButton from './CompletePurchaseButton';
import Overlay from './Overlay';
import ModalTitle from './ModalTitle';
import SectionHeader from './ItemHeader';
import NFTImage from './NFTImage';
import NFTName from './NFTName';
import NFTDetail from './NFTDetail';
import { useModal } from './useModal';
import { useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';

const DesktopShoppingCartModal = (props) => {
  const { itemToBuy, onBuy, onClose } = props;

  const modalRef = useRef(null);
  const { modalState, handleClose } = useModal(onClose);

  useClickOutside(modalRef, handleClose);

  return ReactDOM.createPortal(
    <Overlay state={modalState}>
      <div
        ref={modalRef}
        css={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          backgroundColor: 'white',
          borderRadius: '16px',
          width: '375px',
          height: `calc(100vh - 48px)`,
          animation: `${modalState === 'opening' ? slideIn : slideOut} 0.2s ease`,
          animationFillMode: 'forwards',
        }}
      >
        <div css={{ display: 'flex', padding: '24px', borderBottom: '1px solid #E8EAEC' }}>
          <ModalTitle />
          <CloseModalButton onClick={handleClose} />
        </div>
        <div css={{ padding: '24px', borderBottom: '1px solid #E8EAEC' }}>
          <SectionHeader>ITEM</SectionHeader>

          <div css={{ display: 'flex', marginTop: '12px' }}>
            <NFTImage src={itemToBuy.image} />
            <div css={{ marginLeft: '16px' }}>
              <NFTName name={itemToBuy.tokenId} />
              <NFTDetail>D-PENGUINS</NFTDetail>
            </div>
          </div>
        </div>

        <div css={{ display: 'flex', justifyContent: 'space-between', padding: '24px' }}>
          <SectionHeader>Total price</SectionHeader>
          <NFTDetail>0.1 ETH</NFTDetail>
        </div>

        <div css={{ padding: '0px 24px 24px 24px' }}>
          <CompletePurchaseButton
            onClick={async () => {
              const completedPurchase = await onBuy(itemToBuy.nftAddress, itemToBuy.tokenId);
              if (completedPurchase) {
                handleClose();
              }
            }}
          />
        </div>
      </div>
    </Overlay>,
    document.getElementById('modal-root')
  );
};

export default DesktopShoppingCartModal;

const slideIn = keyframes`
  from {
    right: -375px;
  }

  to {
    right: 24px;
  }
`;

const slideOut = keyframes`
  from {
    right: 0px;
  }

  to {
    right: -375px;
  }
`;
