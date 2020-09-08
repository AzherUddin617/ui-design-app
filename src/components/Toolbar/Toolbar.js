import React from 'react';
import classes from './Toolbar.module.scss';

const Toolbar = ({ tools, setActive }) => {
  return (
    <div className={classes.Toolbar}>
      <div className={classes.ToolItems}>
        {tools.map(tool => {
          const itemClasses = [classes.ToolItem];
          if (tool.active) itemClasses.push(classes.Active);
          return (
            <div key={tool.name} className={itemClasses.join(' ')} onClick={() => setActive(tool)}>
              {tool.icon}
            </div>
          )
        })}

        {/* <div className={classes.ToolItem}>
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
        </div> */}
      </div>
    </div>
  );
}

export default Toolbar;
