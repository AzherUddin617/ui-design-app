import React from 'react';
import classes from './EditorArea.module.scss';

const EditorArea = ({ activeTool, selectedItem, updateTool }) => {

  const toolUpdate = ({ fillColor, strokeWidth, strokeColor }) => {
    const newToolOptions = {...activeTool.options};
    const newToolStroke = {...newToolOptions.stroke};

    if (fillColor) newToolOptions.fillColor = fillColor;
    if (strokeWidth) newToolStroke.width = +strokeWidth;
    if (strokeColor) newToolStroke.color = strokeColor;

    newToolOptions.stroke = newToolStroke;

    updateTool(newToolOptions);
  }
  
  return (
    <div className={classes.EditorArea}>
      <div className={classes.Editors}>
        <div className={classes.Options}>
          { selectedItem &&
            (<React.Fragment>
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
            </React.Fragment>)
          }

          { activeTool.options && activeTool.options.fillColor &&
            (<div className={classes.Theme}>
              <p className={classes.Title}>Fill</p>

              <div className={classes.Color}>
                <p>C: </p>
                <input type="text" className={classes.ColorInput} placeholder="HEX" 
                  value={activeTool.options.fillColor}
                  onChange={e => toolUpdate({ fillColor: e.target.value })}
                />
                <div className={classes.ColorShow} style={{backgroundColor: activeTool.fillColor}}></div>
              </div>
            </div>)
          }

          { activeTool.options && activeTool.options.stroke &&
            (
              <div className={classes.Theme}>
                <p className={classes.Title}>Stroke</p>

                <div className={classes.Size}>
                  <p className={classes.Name}>W: </p>
                  <input type="number" className={classes.Input} 
                    value={activeTool.options.stroke.width}
                    onChange={e => toolUpdate({ strokeWidth: e.target.value })}
                  />
                </div>

                <div className={classes.Color}>
                  <p>C: </p>
                  <input type="text" className={classes.ColorInput} placeholder="HEX" 
                    value={activeTool.options.stroke.color}
                    onChange={e => toolUpdate({ strokeColor: e.target.value })}
                  />
                  <div className={classes.ColorShow} style={{backgroundColor: activeTool.options.stroke.color}}></div>
                </div>
              </div>
            )
          }
        </div>

        <div className={classes.Layers}></div>
      </div>
    </div>
  );
}

export default EditorArea;
