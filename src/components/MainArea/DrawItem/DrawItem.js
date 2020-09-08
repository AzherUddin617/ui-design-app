import React from 'react';
import classes from './DrawItem.module.scss';
import * as toolNames from '../../../global/tool-names';

const DrawItem = ({ toolName, x, y, width, height, classeName, style }) => {
  let drawItem = <div></div>;

  switch (toolName) {
    case toolNames.POINTER:
      break;
    case toolNames.RECTANGLE:
      drawItem = (
        <div className={[classes.DrawItem, classeName].join(' ')} style={{
            left: x + 'px',
            top: y + 'px',
            width: width + 'px',
            height: height + 'px',
            ...style
          }}
        ></div>
      );
      break;
    case toolNames.CIRCLE:
      drawItem = (
        <div className={[classes.DrawItem, classeName].join(' ')} style={{
            left: x + 'px',
            top: y + 'px',
            width: width + 'px',
            height: height + 'px',
            borderRadius: '50%',
            ...style
          }}
        ></div>
      );
      break;
    default:
      break;
  }

  return drawItem;
}

export default DrawItem;
