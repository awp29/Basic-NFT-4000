/** @jsxImportSource @emotion/react */

const NFTItemBuyBanner = (props) => {
  const { className } = props;

  return (
    <div
      className={className}
      css={{
        textAlign: 'center',
        fontFamily: 'inherit',
        fontSize: '16px',
        fontWeight: 600,
        border: 'none',
        margin: 0,
        padding: '0.625rem 1.25rem',
        width: '100%',
        overflow: 'visible',
        backgroundColor: '#2081e2',
        color: 'white',
        lineHeight: 'normal',
      }}
    >
      Buy Now
    </div>
  );
};

export default NFTItemBuyBanner;
