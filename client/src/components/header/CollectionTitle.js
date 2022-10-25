/** @jsxImportSource @emotion/react */

const CollectionTitle = () => {
  return (
    <h1
      css={{
        fontSize: '24px',
        fontWeight: 600,
        marginBottom: '8px',
        '@media only screen and (min-width: 600px)': {
          fontSize: '30px',
        },
      }}
    >
      D-PENGUINS
    </h1>
  );
};

export default CollectionTitle;
