/** @jsxImportSource @emotion/react */

const NFTItem = (props) => {
  const { hasSold, children } = props;
  return (
    <a
      css={{
        pointerEvents: hasSold ? 'none' : 'all',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '10px',
        boxShadow: 'rgb(0 0 0 / 4%) 0px 4px 8px',
        marginBottom: '16px',
        overflow: 'hidden',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 'rgb(0 0 0 / 15%) 0px 6px 25px',
          img: {
            transform: 'scale(1.2)',
          },
        },
      }}
      onClick={() => {
        console.log('click');
      }}
    >
      {children}
    </a>
  );
};

export default NFTItem;
