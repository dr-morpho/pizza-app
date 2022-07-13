import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton: React.FC = () => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={500}
      viewBox="0 0 280 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="136" cy="136" r="125" />
      <rect x="0" y="275" rx="10" ry="10" width="280" height="27" />
      <rect x="0" y="325" rx="10" ry="10" width="280" height="88" />
      <rect x="4" y="440" rx="10" ry="10" width="90" height="27" />
      <rect x="124" y="430" rx="30" ry="30" width="152" height="52" />
    </ContentLoader>
  );
};

export default PizzaSkeleton;
