import React from 'react';

import classes from './MainArea.module.scss';
import DrawItem from './DrawItem/DrawItem';

const MainArea = React.forwardRef((props, ref) =>  (
    <div className={classes.MainArea} ref={ref}>
        <div className={classes.DrawArea}>
          {props.drawLayers.map((layer, i) => (
            <div key={i} className={classes.DrawLayer}>
              {layer.elements.map((elem, i) => (
                <DrawItem key={i} 
                  toolName={elem.toolName} 
                  elem={elem}
                  options={elem.options}
                />
              ))}

              { layer.active && props.drawData &&
                <DrawItem 
                  toolName={props.activeTool.name}
                  elem={props.drawData}
                  options={props.activeTool.options}
                />
              }
            </div>
          ))}
        </div>
      </div>
  )
);

export default MainArea;
