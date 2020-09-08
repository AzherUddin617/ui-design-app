import React from 'react';
import classes from './DrawItem.module.scss';

const DrawItem = ({ x, y, width, height, classeName, style }) => {
  return (
    <div
      className={[classes.DrawItem, classeName].join(' ')}
      style={{
        left: x + 'px',
        top: y + 'px',
        width: width + 'px',
        height: height + 'px',
        ...style
      }}
    >
      
    </div>
  );
}

export default DrawItem;
