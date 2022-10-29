/** @jsxImportSource @emotion/react */

const ErrorBanner = (props) => {
  const { children } = props;

  return (
    <p
      css={{
        width: '100%',
        padding: '16px',
        background: '#F20000',
        color: 'white',
        fontWeight: '600',
        zIndex: 2000,
        textAlign: 'center',
      }}
    >
      {children}
    </p>
  );
};

export default ErrorBanner;
