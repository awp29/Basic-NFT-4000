/** @jsxImportSource @emotion/react */

const SectionHeader = (props) => {
  const { children } = props;

  return <p css={{ fontSize: '16px', fontWeight: 600 }}>{children}</p>;
};

export default SectionHeader;
