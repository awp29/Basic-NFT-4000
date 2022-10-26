/** @jsxImportSource @emotion/react */

import { darken, lighten } from 'polished';

const CompletePurchaseButton = (props) => {
  const { className, onClick } = props;

  return (
    <button
      className={className}
      css={{
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: '16px',
        fontWeight: 600,
        border: 'none',
        margin: 0,
        padding: '0.625rem 1.25rem',
        width: '100%',
        overflow: 'visible',
        backgroundColor: '#2081e2',
        borderRadius: '12px',
        color: 'white',
        lineHeight: 'normal',
        WebkitFontSmoothing: 'inherit',
        MozOsxFontSmoothing: 'inherit',
        WebkitAppearance: 'none',
        opacity: 1,
        transition: 'transform 0.1s, background-color 0.1s',
        boxShadow: '0 12px 32px -12px rgb(12 22 44 / 32%)',
        '&:hover': {
          backgroundColor: lighten(0.1, '#2081e2'),
        },
        '&:active': {
          backgroundColor: darken(0.2, '#2081e2'),
        },
      }}
      onClick={onClick}
    >
      Complete purchase
    </button>
  );
};

export default CompletePurchaseButton;
