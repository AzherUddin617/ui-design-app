import React from 'react';
import classes from './Toolbar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlash } from '@fortawesome/free-solid-svg-icons';
import { faMousePointer } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import TextFieldsIcon from '@material-ui/icons/TextFields';

const Toolbar = () => {
  return (
    <div className={classes.Toolbar}>
      <div className={classes.ToolItems}>
        <div className={classes.ToolItem}>
          <FontAwesomeIcon icon={faMousePointer} color="inherit" fontSize="inherit" transform="right-2" />
        </div>
        <div className={classes.ToolItem}>
          <FontAwesomeIcon icon={faSquare} color="inherit" fontSize="inherit" />
        </div>
        <div className={classes.ToolItem}>
          <FontAwesomeIcon icon={faCircle} color="inherit" fontSize="inherit" />
        </div>
        <div className={classes.ToolItem}>
          <FontAwesomeIcon icon={faSlash} color="inherit" fontSize="inherit" transform="shrink-4 left-2" />
        </div>
        <div className={classes.ToolItem}>
          <TextFieldsIcon color="inherit" fontSize="inherit" />
        </div>
        <div className={classes.ToolItem}>
          <FontAwesomeIcon icon={faImage} color="inherit" fontSize="inherit" />
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
