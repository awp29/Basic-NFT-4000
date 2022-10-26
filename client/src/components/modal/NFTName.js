/** @jsxImportSource @emotion/react */

const NFTName = (props) => {
  const { name } = props;

  return <p css={{ fontSize: '14px', fontWeight: 600 }}>CRYPTO PENGUIN #{name}</p>;
};

export default NFTName;
