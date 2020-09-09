import React, { useState } from 'react';
import classes from './App.module.scss';
import Toolbar from './components/Toolbar/Toolbar';
import Topbar from './components/Topbar/Topbar';
import MainArea from './components/MainArea/MainArea';

import * as toolNames from './global/tool-names';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlash } from '@fortawesome/free-solid-svg-icons';
import { faMousePointer } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import TextFieldsIcon from '@material-ui/icons/TextFields';

function App() {
  const [tools, setTools] = useState([
    {
      name: toolNames.POINTER,
      icon: <FontAwesomeIcon icon={faMousePointer} color="inherit" fontSize="inherit" transform="right-2" />,
      active: true
    },
    {
      name: toolNames.RECTANGLE,
      icon: <FontAwesomeIcon icon={faSquare} color="inherit" fontSize="inherit" />,
      active: false
    },
    {
      name: toolNames.CIRCLE,
      icon: <FontAwesomeIcon icon={faCircle} color="inherit" fontSize="inherit" />,
      active: false
    },
    {
      name: toolNames.LINE,
      icon: <FontAwesomeIcon icon={faSlash} color="inherit" fontSize="inherit" transform="shrink-4 left-2" />,
      active: false
    },
    {
      name: toolNames.TEXT,
      icon: <TextFieldsIcon color="inherit" fontSize="inherit" />,
      active: false
    },
    {
      name: toolNames.IMAGE,
      icon: <FontAwesomeIcon icon={faImage} color="inherit" fontSize="inherit" />,
      active: false
    }
  ]);

  const setTextHandler = (setText, textRef) => {
    console.log(textRef)
    const textInputClosed = (e) => {
      console.log(e.target, textRef);
    }

    window.addEventListener('click', textInputClosed);
  }

  const setActiveTool = activeTool => {
    const updatedTools = tools.map(tool => {
      const uTool = {...tool};
      if (tool === activeTool) {
        uTool.active = true;
      } else {
        uTool.active = false;
      }
      return uTool;
    });

    setTools(updatedTools);
  }

  return (
    <div className={classes.App}>
      <div className={classes.Topbar}>
        <Topbar />
      </div>
      <div className={classes.Toolbar}>
        <Toolbar tools={tools} setActive={setActiveTool} />
      </div>
      <div className={classes.MainArea}>
        <MainArea tools={tools} />
      </div>
      <div className={classes.EditorArea}></div>
    </div>
  );
}

export default App;
