/** @jsxImportSource @emotion/react */

const Header = (props) => {
  const { children } = props;

  return <div css={{ maxWidth: '1280px', margin: 'auto' }}>{children}</div>;
};

export default Header;
