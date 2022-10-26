/** @jsxImportSource @emotion/react */

import { keyframes } from '@emotion/react';

const bounceAnimation = keyframes`
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
`;

const Loader = () => {
  return (
    <div
      css={{
        width: '60px',
        height: '60px',
        position: 'relative',
        margin: '100px auto',
      }}
    >
      <div
        css={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: '#333',
          opacity: '0.6',
          position: 'absolute',
          top: '0',
          left: '0',
          animation: `${bounceAnimation} 1.5s infinite ease-in-out`,
        }}
      />
      <div
        css={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: '#333',
          opacity: '0.6',
          position: 'absolute',
          top: '0',
          left: '0',
          animation: `${bounceAnimation} 1.5s infinite ease-in-out`,
          animationDelay: '-0.5s',
        }}
      />
    </div>
  );
};

export default Loader;
