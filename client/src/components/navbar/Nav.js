/** @jsxImportSource @emotion/react */

const Nav = (props) => {
  const { children } = props;

  return (
    <nav
      css={{
        width: '100%',
        height: '72px',
        background: 'white',
        boxShadow: 'rgb(229 232 235 / 0%) 0px 1px 0px 0px',
        borderBottom: '1px solid rgb(229, 232, 235)',
      }}
    >
      {children}
    </nav>
  );
};

export default Nav;
