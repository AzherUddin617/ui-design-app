import React from 'react';
import classes from './Button.module.scss';

const index = ({ children, primary, secondary, danger, ...rest }) => {
  const classNames = [classes.Button];
  if (primary) classNames.push(classes.Primary);
  else if (secondary) classNames.push(classes.Secondary);
  else if (danger) classNames.push(classes.Danger);
  else classNames.push(classes.Primary);

  if (rest.className) classNames.push(rest.className);

  return (
    <button className={classNames.join(' ')} style={rest.style}>
      {children}
    </button>
  );
}

export default index;
