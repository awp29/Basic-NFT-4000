/** @jsxImportSource @emotion/react */

const NavContent = (props) => {
  const { children } = props;

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0px 16px',
        '@media only screen and (min-width: 1200px)': {
          padding: '0px 32px',
        },
      }}
    >
      {children}
    </div>
  );
};

export default NavContent;
