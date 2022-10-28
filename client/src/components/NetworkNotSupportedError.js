/** @jsxImportSource @emotion/react */

const NetworkNotSupportedError = () => {
  return (
    <p
      css={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '16px',
        background: '#F20000',
        color: 'white',
        fontWeight: '600',
        zIndex: 2000,
        textAlign: 'center',
      }}
    >
      CHAIN NOT SUPPORTED, PLEASE SWITHC TO GOERLI
    </p>
  );
};

export default NetworkNotSupportedError;
