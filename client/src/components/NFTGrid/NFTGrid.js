/** @jsxImportSource @emotion/react */

const NFTGrid = (props) => {
  const { children } = props;

  return (
    <div
      css={{
        display: 'grid',
        padding: '16px',
        '@media only screen and (min-width: 400px)': {
          gridTemplateColumns: '1fr 1fr',
          columnGap: '16px',
        },
        '@media only screen and (min-width: 800px)': {
          gridTemplateColumns: '1fr 1fr 1fr',
        },
        '@media only screen and (min-width: 1200px)': {
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
        },
      }}
    >
      {children}
    </div>
  );
};

export default NFTGrid;
