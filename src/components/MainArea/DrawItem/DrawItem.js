import React from 'react';
import classes from './DrawItem.module.scss';
import * as toolNames from '../../../global/tool-names';

const DrawItem = ({ toolName, elem, options, classeName, style }) => {
  const left = Math.min(elem.x1, elem.x2);
  const top = Math.min(elem.y1, elem.y2);
  const width = Math.abs(elem.x1 - elem.x2);
  const height = Math.abs(elem.y1 - elem.y2);
  const rotate = Math.atan2((elem.y2 - elem.y1), (elem.x2 - elem.x1));
  const dis = Math.sqrt(((elem.x2 - elem.x1) ** 2) + ((elem.y2 - elem.y1) ** 2));
  
  let drawItem = <div></div>;

  switch (toolName) {
    case toolNames.POINTER:
      break;
    case toolNames.RECTANGLE:
      
      drawItem = (
        <div className={[classes.DrawItem, classeName].join(' ')} style={{
            left: left,
            top: top,
            width: width,
            height: height,
            borderWidth: options ? options.stroke.width : 1,
            borderColor: options ? options.stroke.color : '#000',
            backgroundColor: options ? options.fillColor : 'transparent',
            ...style
          }}
        ></div>
      );
      break;
    case toolNames.CIRCLE:
      drawItem = (
        <div className={[classes.DrawItem, classeName].join(' ')} style={{
            left: left,
            top: top,
            width: width,
            height: height,
            borderRadius: '50%',
            borderWidth: options ? options.stroke.width : 1,
            borderColor: options ? options.stroke.color : 'transparent',
            backgroundColor: options ? options.fillColor : 'transparent',
            ...style
          }}
        ></div>
      );
      break;
    case toolNames.LINE:
      drawItem = (
        <div className={[classes.DrawItem, classes.Line, classeName].join(' ')} style={{
            left: elem.x1,
            top: elem.y1,
            width: dis,
            height: options ? options.stroke.width : 1,
            transform: `rotate(${rotate}rad)`,
            backgroundColor: options ? options.stroke.color : 'transparent',
            ...style
          }}
        ></div>
      );
      break;
    case toolNames.TEXT:
      drawItem = (
        <div className={[classes.DrawItem, classes.Text, classeName].join(' ')} style={{
            left: left + 'px',
            top: top + 'px',
            width: width + 'px',
            height: height + 'px',
            borderColor: elem.drawing ? `#ccc` : 'transparent',
            ...style
          }}
        >{elem.textValue}{elem.drawing && <span className={classes.TypeBar}>|</span>}</div>
      );
      break;
    case toolNames.IMAGE:
      drawItem = (
        <div className={[classes.DrawItem, classes.Image, classeName].join(' ')} style={{
            left: left + 'px',
            top: top + 'px',
            width: width + 'px',
            height: height + 'px',
            borderColor: elem.drawing ? `#ccc` : 'transparent',
            backgroundImage: `url(${elem.src})`,
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
