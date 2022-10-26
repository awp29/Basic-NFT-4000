/** @jsxImportSource @emotion/react */

const NFTImage = (props) => {
  const { src } = props;

  return (
    <img
      css={{
        width: '72px',
        height: '72px',
      }}
      src={src}
    />
  );
};

export default NFTImage;
