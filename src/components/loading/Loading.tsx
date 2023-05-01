import React from 'react';
import { Circles } from 'react-loader-spinner';

type LoaderProps = {
  size: number;
  style: React.CSSProperties;
};

const Loading: React.FC<LoaderProps> = (props: LoaderProps) => {
  const { size, style } = props;

  return (
    <div style={style}>
      <Circles
        height={size}
        width={size}
        color="primary.main"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
