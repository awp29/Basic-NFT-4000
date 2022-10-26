/** @jsxImportSource @emotion/react */

import { keyframes } from '@emotion/react';
import { rgba } from 'polished';

const Overlay = (props) => {
  const { state, children } = props;

  return (
    <div
      css={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        animation: `${state === 'opening' ? fadeInBackground : fadeOutBackground} 0.2s ease`,
        animationFillMode: 'forwards',
      }}
    >
      {children}
    </div>
  );
};

export default Overlay;

const fadeInBackground = keyframes`
  from {
    background-color: transparent;
  }

  to {
    background-color: ${rgba(0, 0, 0, 0.7)};
  }
`;

const fadeOutBackground = keyframes`
  from {
    background-color: ${rgba(0, 0, 0, 0.7)};
  }

  to {
    background-color: transparent;
  }
`;
