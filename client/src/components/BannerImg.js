/** @jsxImportSource @emotion/react */

import bannerImg from '../assets/banner.png';

const BannerImg = () => {
  return (
    <img
      css={{
        width: '100%',
        minHeight: '100px',
        maxHeight: '300px',
        objectFit: 'cover',
        marginTop: '68px',
      }}
      src={bannerImg}
      alt="D-PENGUINS Banner image"
    />
  );
};

export default BannerImg;
