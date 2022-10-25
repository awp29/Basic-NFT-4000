/** @jsxImportSource @emotion/react */

const NFTItemImage = (props) => {
  const { src } = props;

  return (
    <div css={{ display: 'flex', overflow: 'hidden', borderRadius: '10px' }}>
      <img
        css={{
          width: '100%',
          borderRadius: '10px',
          transition: 'transform 0.2s',
        }}
        src={src}
      />
    </div>
  );
};

export default NFTItemImage;
