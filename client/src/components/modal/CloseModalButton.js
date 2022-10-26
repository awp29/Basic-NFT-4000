/** @jsxImportSource @emotion/react */

import { darken, lighten } from 'polished';
import { MdClose } from 'react-icons/md';

const CloseModalButton = (props) => {
  const { className, onClick } = props;

  return (
    <button
      className={className}
      css={{
        position: 'absolute',
        right: '16px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        border: 'none',
        margin: 0,
        overflow: 'visible',
        color: '#04111d',
        backgroundColor: 'transparent',
        lineHeight: 'normal',
        WebkitFontSmoothing: 'inherit',
        MozOsxFontSmoothing: 'inherit',
        WebkitAppearance: 'none',
        opacity: 1,
        transition: 'transform 0.1s, color 0.1s',
        '&:hover': {
          color: lighten(0.1, '#04111d'),
        },
        '&:active': {
          color: darken(0.2, '#04111d'),
        },
      }}
      onClick={onClick}
    >
      <MdClose size={24} />
    </button>
  );
};

export default CloseModalButton;
