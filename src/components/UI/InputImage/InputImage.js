import React, { useState } from 'react';
import classes from './InputImage.module.scss';
import Button from '../Button';

const InputImage = ({ submited }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={classes.InputImage}>
      <form className={classes.Form} onSubmit={(e) => submited(e, inputValue)}>
        <div className={classes.InputSrc}>
          <label htmlFor="input" style={{cursor: 'pointer'}}>
            Image URL:
          </label>
          <input type="text" id="input" value={inputValue} 
            onChange={e => setInputValue(e.target.value)}
          />
        </div>
        or
        <input type="file" className={classes.InputFile} onChange={e => submited(e)} />

        <Button type="submit" style={{marginRight: '0.5rem'}}>OK</Button>
        <Button danger onClick={e => submited(null)}>Cancel</Button>
      </form>
    </div>
  );
}

export default InputImage;
