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
      </div>
    </div>
  );
}

export default Toolbar;
