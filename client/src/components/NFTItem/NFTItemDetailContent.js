/** @jsxImportSource @emotion/react */

const NFTItemDetailContent = (props) => {
  const { title, children } = props;

  return (
    <p css={{ fontSize: '14px', fontWeight: 600 }} title={title}>
      {children}
    </p>
  );
};

export default NFTItemDetailContent;
