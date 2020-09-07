import React from 'react';
import classes from './Toolbar.module.scss';

import NearMeIcon from '@material-ui/icons/NearMe';
import SquareIcon from '@material-ui/icons/CropSquare';
import CircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import LineIcon from '@material-ui/icons/Remove';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';

const Toolbar = () => {
  return (
    <div className={classes.Toolbar}>
      <div className={classes.ToolItems}>
        <div className={classes.ToolItem}>
          <NearMeIcon color="inherit" fontSize="inherit" style={{transform: 'rotate(-90deg)'}} />
        </div>
        <div className={classes.ToolItem}>
          <SquareIcon color="inherit" fontSize="inherit" style={{transform: 'scale(1.2)'}} />
        </div>
        <div className={classes.ToolItem}>
          <CircleIcon color="inherit" fontSize="inherit" />
        </div>
        <div className={classes.ToolItem}>
          <LineIcon color="inherit" fontSize="inherit" style={{transform: 'rotate(45deg) scaleX(1.5)'}} />
        </div>
        <div className={classes.ToolItem}>
          <TextFieldsIcon color="inherit" fontSize="inherit" />
        </div>
        <div className={classes.ToolItem}>
          <ImageIcon color="inherit" fontSize="inherit" />
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
