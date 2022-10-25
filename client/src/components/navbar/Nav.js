/** @jsxImportSource @emotion/react */

const Nav = (props) => {
  const { children } = props;

  return (
    <nav
      css={{
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '72px',
        background: 'white',
        zIndex: 1030,
        boxShadow: 'rgb(229 232 235 / 0%) 0px 1px 0px 0px',
        borderBottom: '1px solid rgb(229, 232, 235)',
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
      }}
    >
      {children}
    </nav>
  );
};

export default Nav;
