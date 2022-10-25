/** @jsxImportSource @emotion/react */

const NetworkNotSupportedError = () => {
  return (
    <p
      css={{
        position: 'fixed',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '72px',
        padding: '16px',
        background: '#F20000',
        color: 'white',
        fontWeight: '600',
        zIndex: 2000,
      }}
    >
      CHAIN NOT SUPPORTED! PLEASE SWITCH TO GOERLI!!
    </p>
  );
};

export default NetworkNotSupportedError;
