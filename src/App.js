import React from 'react';
import classes from './App.module.scss';
import Toolbar from './components/Toolbar/Toolbar';
import Topbar from './components/Topbar/Topbar';
import MainArea from './components/MainArea/MainArea';

function App() {
  return (
    <div className={classes.App}>
      <div className={classes.Topbar}>
        <Topbar />
      </div>
      <div className={classes.Toolbar}>
        <Toolbar />
      </div>
      <div className={classes.MainArea}>
        <MainArea />
      </div>
      <div className={classes.EditorArea}></div>
    </div>
  );
}

export default App;
