/** @jsxImportSource @emotion/react */

const HeaderContent = (props) => {
  const { children } = props;

  return (
    <div
      css={{
        padding: '16px',
        maxWidth: '900px',
        '@media only screen and (min-width: 1200px)': {
          padding: '32px',
        },
      }}
    >
      {children}
    </div>
  );
};

export default HeaderContent;
