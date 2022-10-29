/** @jsxImportSource @emotion/react */

const NFTItem = (props) => {
  const { disabled, hasSold, children, onClick } = props;
  return (
    <button
      css={{
        cursor: !disabled ? 'pointer' : 'cursor',
        fontFamily: 'inherit',
        fontSize: '16px',
        fontWeight: 600,
        border: 'none',
        margin: 0,
        width: '100%',
        lineHeight: 'normal',
        WebkitFontSmoothing: 'inherit',
        MozOsxFontSmoothing: 'inherit',
        pointerEvents: hasSold ? 'none' : 'all',
        position: 'relative',
        borderRadius: '10px',
        boxShadow: 'rgb(0 0 0 / 4%) 0px 4px 8px',
        marginBottom: '16px',
        overflow: 'hidden',
        transition: 'all 0.2s',
        textAlign: 'left',
        backgroundColor: 'white',
        padding: 0,
        '&:hover': {
          boxShadow: !disabled && 'rgb(0 0 0 / 15%) 0px 6px 25px',
          img: {
            transform: !disabled ? 'scale(1.2)' : 'none',
          },
        },
        '&:disabled': {
          color: 'black',
        },
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default NFTItem;
