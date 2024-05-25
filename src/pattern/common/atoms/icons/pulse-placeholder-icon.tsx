import React from 'react';

interface IPulsePlaceholder {
  barHeight?: string;
  barWidth?: string;
  width?: string;
  height?: string;
}

const PulsePlaceholder = ({
  width, height, barHeight, barWidth,
}: IPulsePlaceholder) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={ {
      margin: 'auto',
      background: 'rgb(255, 255, 255)',
      display: 'block',
      shapeRendering: 'auto',
    } }
    width={ width ?? '80px' }
    height={ height ?? '80px' }
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <rect
      x="17"
      y="14"
      width={ barWidth ?? '16' }
      height={ barHeight ?? '72' }
      fill="#08C168"
    >
      <animate
        attributeName="y"
        repeatCount="indefinite"
        dur="1.075268817204301s"
        calcMode="spline"
        keyTimes="0;0.5;1"
        values="-4;14;14"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.21505376344086022s"
      />
      <animate
        attributeName="height"
        repeatCount="indefinite"
        dur="1.075268817204301s"
        calcMode="spline"
        keyTimes="0;0.5;1"
        values="108;72;72"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.21505376344086022s"
      />
    </rect>
    <rect
      x="42"
      y="14"
      width={ barWidth ?? '16' }
      height={ barHeight ?? '72' }
      fill="#08C168"
    >
      <animate
        attributeName="y"
        repeatCount="indefinite"
        dur="1.075268817204301s"
        calcMode="spline"
        keyTimes="0;0.5;1"
        values="0.5;14;14"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.10752688172043011s"
      />
      <animate
        attributeName="height"
        repeatCount="indefinite"
        dur="1.075268817204301s"
        calcMode="spline"
        keyTimes="0;0.5;1"
        values="99;72;72"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.10752688172043011s"
      />
    </rect>
    <rect
      x="67"
      y="14"
      width={ barWidth ?? '16' }
      height={ barHeight ?? '72' }
      fill="#08C168"
    >
      <animate
        attributeName="y"
        repeatCount="indefinite"
        dur="1.075268817204301s"
        calcMode="spline"
        keyTimes="0;0.5;1"
        values="0.5;14;14"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
      />
      <animate
        attributeName="height"
        repeatCount="indefinite"
        dur="1.075268817204301s"
        calcMode="spline"
        keyTimes="0;0.5;1"
        values="99;72;72"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
      />
    </rect>
  </svg>
);

export default PulsePlaceholder;
