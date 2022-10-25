/** @jsxImportSource @emotion/react */

import avatarImg from '../../assets/avatar.png';

const Avatar = () => {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative',
        width: '82px',
        height: '82px',
        backgroundImage: `url(${avatarImg})`,
        backgroundSize: 'contain',
        border: '4px solid white',
        boxShadow: 'rgb(0 0 0 / 8%) 0px 5px 20px 0px',
        borderRadius: '16px',
        marginLeft: '16px',
        marginTop: '-54px',
        '@media only screen and (min-width: 600px)': {
          width: '112px',
          height: '112px',
          marginTop: '-86px',
        },
        '@media only screen and (min-width: 1000px)': {
          width: '168px',
          height: '168px',
          marginTop: '-134px',
        },
        '@media only screen and (min-width: 1200px)': {
          marginLeft: '32px',
        },
      }}
    />
  );
};

export default Avatar;
