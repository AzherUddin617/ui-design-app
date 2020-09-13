import React from 'react';
import classes from './EditorArea.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '80%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  inputField: {
    margin: theme.spacing(1),
    width: '80%'
  }
}));

const EditorArea = ({ activeTool, selectedItem, updateTool }) => {
  const uiClasses = useStyles();
  const colors = [
    { label: 'Black', value: 'black' },
    { label: 'White', value: 'white' },
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Turquoise', value: '#66bfbf' },
    { label: 'Grey', value: '#eaf6f6' },
    { label: 'Pink', value: '#f76b8a' },
    { label: '#FAG3DD', value: '#faf3dd' },
    { label: '#64958F', value: '#64958f' },
    { label: '#065C6F', value: '#065c6f' },
    { label: '#FFBB91', value: '#ffbb91' },
    { label: '#4E89AE', value: '#4e89ae' },
    { label: '#43658B', value: '#43658b' },
    { label: '#ED6663', value: '#ed6663' },
    { label: '#FFA372', value: '#ffa372' },
  ];

  const ColorItem = ({ label, value }) => (
    <div className={classes.ColorItem}>
      <div className={classes.ColorShow} style={{backgroundColor: value || 'white'}}></div>
      <p className={classes.ColorLabel}>{label}</p>
    </div>
  );

  const toolUpdate = ({ fillColor, strokeWidth, strokeColor }) => {
    const newToolOptions = {...activeTool.options};
    const newToolStroke = {...newToolOptions.stroke};

    if (fillColor !== undefined) newToolOptions.fillColor = fillColor;
    if (strokeWidth !== undefined) newToolStroke.width = +strokeWidth;
    if (strokeColor !== undefined) newToolStroke.color = strokeColor;

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
            (
              <div className={classes.SelectField}>
                <FormControl variant="outlined" className={uiClasses.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Fill Color</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={activeTool.options.fillColor}
                    onChange={e => toolUpdate({ fillColor: e.target.value })}
                    label="Fill Color"
                  >
                    <MenuItem value="transparent">
                      <em>None</em>
                    </MenuItem>
                    {colors.map(color => (
                      <MenuItem key={color.value} value={color.value} selected={color.value === activeTool.options.fillColor}>
                        <ColorItem label={color.label} value={color.value} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )
          }

          { activeTool.options && activeTool.options.stroke &&
            (
              <React.Fragment>
                <div className={classes.TextField}>
                  <TextField 
                    type="number"
                    variant="outlined"
                    label="Stroke Width"
                    value={activeTool.options.stroke.width}
                    onChange={e => toolUpdate({ strokeWidth: e.target.value })}
                    className={uiClasses.inputField}
                  />
                </div>

                <div className={classes.SelectField}>
                  <FormControl variant="outlined" className={uiClasses.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Stroke Color</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={activeTool.options.stroke.color}
                      onChange={e => toolUpdate({ strokeColor: e.target.value })}
                      label="Stroke Color"
                    >
                      <MenuItem value="transparent">
                        <em>None</em>
                      </MenuItem>
                      {colors.map(color => (
                        <MenuItem key={color.value} value={color.value} selected={color.value === activeTool.options.stroke.color}>
                          <ColorItem label={color.label} value={color.value} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

              </React.Fragment>
            )
              /* <div className={classes.Theme}>
                <p className={classes.Title}>Stroke</p>

                <div className={classes.Size}>
                  <TextField 
                    type="number"
                    variant="outlined"
                    label="Width"
                    value={activeTool.options.stroke.width}
                    onChange={e => toolUpdate({ strokeWidth: e.target.value })}
                    className={classes.Input}
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
              </div> */
          }
        </div>

        <div className={classes.Layers}></div>
      </div>
    </div>
  );
}

export default EditorArea;
