/** @jsxImportSource @emotion/react */

const Author = () => {
  return (
    <p
      css={{
        fontSize: '14px',
        '@media only screen and (min-width: 600px)': {
          fontSize: '16px',
        },
      }}
    >
      By{' '}
      <span
        css={{
          fontWeight: 600,
        }}
      >
        Basic NFT inc
      </span>
    </p>
  );
};

export default Author;
