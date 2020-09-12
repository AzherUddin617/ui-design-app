import React from 'react';
import classes from './EditorArea.module.scss';

const EditorArea = () => {
  return (
    <div className={classes.EditorArea}>
      <div className={classes.Editors}>
        <div className={classes.Options}>
          <div className={classes.Rect}>
            <div className={[classes.RectItem, classes.Width].join(' ')}>
              <p className={classes.RectName}>W:</p>
              <input type="number" className={classes.RectInput}/>
            </div>

            <div className={[classes.RectItem, classes.Height].join(' ')}>
              <p className={classes.RectName}>H:</p>
              <input type="number" className={classes.RectInput}/>
            </div>
          </div>

          <div className={classes.Rect}>
            <div className={[classes.RectItem, classes.Width].join(' ')}>
              <p className={classes.RectName}>X:</p>
              <input type="number" className={classes.RectInput}/>
            </div>

            <div className={[classes.RectItem, classes.Height].join(' ')}>
              <p className={classes.RectName}>Y:</p>
              <input type="number" className={classes.RectInput}/>
            </div>
          </div>

          <div className={classes.Theme}>
            <p className={classes.Title}>Fill</p>

            <div className={classes.Color}>
              <p>C: </p>
              <input type="text" className={classes.ColorInput} placeholder="RGB, HEX or HSL"/>
            </div>
          </div>

          <div className={classes.Theme}>
            <p className={classes.Title}>Stroke</p>

            <div className={classes.Size}>
              <p className={classes.Name}>W: </p>
              <input type="number" className={classes.Input}/>
            </div>

            <div className={classes.Color}>
              <p>C: </p>
              <input type="text" className={classes.ColorInput} placeholder="RGB, HEX or HSL"/>
            </div>
          </div>
        </div>

        <div className={classes.Layers}></div>
      </div>
    </div>
  );
}

export default EditorArea;
