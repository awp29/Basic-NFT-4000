/** @jsxImportSource @emotion/react */

import { keyframes } from '@emotion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import CloseModalButton from './CloseModalButton';
import CompletePurchaseButton from './CompletePurchaseButton';
import SectionHeader from './ItemHeader';
import ModalTitle from './ModalTitle';
import NFTDetail from './NFTDetail';
import NFTImage from './NFTImage';
import NFTName from './NFTName';
import Overlay from './Overlay';
import { useModal } from './useModal';

const MobileShoppingCartModal = (props) => {
  const { itemToBuy, onBuy, onClose } = props;

  const modalRef = useRef(null);
  const [modalHeight, setModalHeight] = useState(0);
  const { modalState, handleClose } = useModal(onClose);

  useClickOutside(modalRef, handleClose);

  useLayoutEffect(() => {
    if (modalRef && modalRef.current) {
      const modalHeight = modalRef.current.getBoundingClientRect().height;
      setModalHeight(modalHeight);
    }
  }, []);

  return (
    <Overlay state={modalState}>
      <div
        ref={modalRef}
        css={{
          position: 'fixed',
          bottom: 0,
          backgroundColor: 'white',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          width: '100%',
          animation: `${
            modalState === 'opening' ? slideIn(modalHeight) : slideOut(modalHeight)
          } 0.2s ease`,
          animationFillMode: 'forwards',
        }}
      >
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '16px',
            borderBottom: '1px solid #E8EAEC',
          }}
        >
          <ModalTitle />
          <CloseModalButton onClick={handleClose} />
        </div>

        <div css={{ padding: '24px 16px', borderBottom: '1px solid #E8EAEC' }}>
          <SectionHeader>ITEM</SectionHeader>

          <div css={{ display: 'flex', marginTop: '12px' }}>
            <NFTImage src={itemToBuy.image} />
            <div css={{ marginLeft: '16px' }}>
              <NFTName name={itemToBuy.tokenId} />
              <NFTDetail>D-PENGUINS</NFTDetail>
            </div>
          </div>
        </div>

        <div css={{ display: 'flex', justifyContent: 'space-between', padding: '24px 16px' }}>
          <SectionHeader>Total price</SectionHeader>
          <NFTDetail>0.1 ETH</NFTDetail>
        </div>

        <div css={{ padding: '0px 16px 16px 16px' }}>
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
    </Overlay>
  );
};

export default MobileShoppingCartModal;

function slideIn(modalHeight: number) {
  return keyframes`
    from {
      bottom: -${modalHeight}px;
    }

    to {
      bottom: 0px;
    }
  `;
}

function slideOut(modalHeight: number) {
  return keyframes`
    from {
      bottom: 0px;
    }

    to {
      bottom: -${modalHeight}px;
    }
  `;
}
