import React, { Component } from 'react';

import classes from './App.module.scss';
import Toolbar from './components/Toolbar/Toolbar';
import Topbar from './components/Topbar/Topbar';
import MainArea from './components/MainArea/MainArea';
import InputImage from './components/UI/InputImage/InputImage';

import * as toolNames from './global/tool-names';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlash } from '@fortawesome/free-solid-svg-icons';
import { faMousePointer } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import EditorArea from './components/EditorArea/EditorArea';

class App extends Component {

  constructor(props) {
    super(props);

    this.createLayout = ({ name, elements, active }) => ({
      active: active && true,
      name: name || 'Layer ' + (this.state ? this.state.drawLayers.lenght : '1'),
      elements: elements || []
    });

    const state = {
      tools: [
        {
          name: toolNames.POINTER,
          icon: <FontAwesomeIcon icon={faMousePointer} color="inherit" fontSize="inherit" transform="right-2" />,
          active: true
        },
        {
          name: toolNames.RECTANGLE,
          icon: <FontAwesomeIcon icon={faSquare} color="inherit" fontSize="inherit" />,
          active: false,
          options: {
            radius: 0,
            fillColor: 'transparent',
            stroke: {
              width: 1,
              color: 'black'
            }
          }
        },
        {
          name: toolNames.CIRCLE,
          icon: <FontAwesomeIcon icon={faCircle} color="inherit" fontSize="inherit" />,
          active: false,
          options: {
            fillColor: 'transparent',
            stroke: {
              width: 1,
              color: 'black'
            }
          }
        },
        {
          name: toolNames.LINE,
          icon: <FontAwesomeIcon icon={faSlash} color="inherit" fontSize="inherit" transform="shrink-4 left-2" />,
          active: false,
          options: {
            stroke: {
              width: 1,
              color: 'black'
            }
          }
        },
        {
          name: toolNames.TEXT,
          icon: <TextFieldsIcon color="inherit" fontSize="inherit" />,
          active: false,
          options: {
            fillColor: 'transparent',
            stroke: {
              width: 0,
              color: 'transparent'
            }
          }
        },
        {
          name: toolNames.IMAGE,
          icon: <FontAwesomeIcon icon={faImage} color="inherit" fontSize="inherit" />,
          active: false
        }
      ],
      drawData: null,
      drawLayers: [this.createLayout({ active: true })],
      activeLayerIndex: 0,
      activeTool: null,
      imageInput: null
    };
    state.activeTool = state.tools[0];
    this.state = state;

    this.mainAreaRef = React.createRef();
    this.mouseStart = { x:null, y:null };
    this.mouseMoved = false;
  }

  componentDidMount() {
    if (this.mainAreaRef.current) {
      this.mainAreaRef.current.addEventListener('mousedown', this.mouseDownHandler);
      this.setOffsets();
    }
  }

  setOffsets() {
    if (this.mainAreaRef.current) {
      this.offsetTop = this.mainAreaRef.current.getBoundingClientRect().top;
      this.offsetLeft = this.mainAreaRef.current.getBoundingClientRect().left;
    }
  }

  setActiveTool = activeTool => { 
    this.setState(prevState => {
      let newActiveTool = prevState.activeTool;
      const updatedTools = prevState.tools.map(tool => {
        const uTool = {...tool};
        if (tool === activeTool) {
          uTool.active = true;
          newActiveTool = tool;
        } else {
          uTool.active = false;
        }
        return uTool;
      });

      return { tools: updatedTools, activeTool: newActiveTool };
    });
  };

  updateActiveTool = (newOptions) => {
    this.setState(prevState => {
      let newActiveTool = prevState.activeTool;
      const updatedTools = prevState.tools.map(tool => {
        const uTool = {...tool};
        if (tool.name === newActiveTool.name) {
          uTool.options = newOptions;
          newActiveTool = uTool;
        }
        return uTool;
      });

      return { tools: updatedTools, activeTool: newActiveTool };
    });
  }

  addElement = elem => {
    this.setState(prevState => {
      elem.toolName = prevState.activeTool.name;
      elem.options = prevState.activeTool.options;
      elem.drawing = false;
      const drawLayers = [...prevState.drawLayers];
      const activeLayer = {...drawLayers[prevState.activeLayerIndex]};
      activeLayer.elements = activeLayer.elements.concat(elem);
      drawLayers[prevState.activeLayerIndex] = activeLayer;

      return { drawLayers: drawLayers, drawData: null };
    });
  }

  mouseDownHandler = e => {
    e.preventDefault();
    console.log('down');
      this.mouseStart.x = e.pageX - this.offsetLeft;
      this.mouseStart.y = e.pageY - this.offsetTop;
      
      if (this.mainAreaRef.current) {
        const body = this.mainAreaRef.current;
        
        body.addEventListener('mouseup', this.mouseUpHandler);
        body.addEventListener('mousemove', this.mouseMoveHandler);
      }
  }
  mouseUpHandler = e => {
    e.preventDefault();
    console.log('up');
    
    if (this.mainAreaRef.current) {
      const body = this.mainAreaRef.current;
      
      body.removeEventListener('mouseup', this.mouseUpHandler);
      body.removeEventListener('mousemove', this.mouseMoveHandler);
    }
    
    if (this.mouseMoved) {
      this.mouseMoved = false;
      const drawData = {};

      drawData.x1 = this.mouseStart.x;
      drawData.y1 = this.mouseStart.y;
      drawData.x2 = e.pageX - this.offsetLeft;
      drawData.y2 = e.pageY - this.offsetTop;

      if (this.state.activeTool.name === toolNames.TEXT) {
        this.changeTextHandler(drawData).then(data => {
          drawData.textValue = data;
          this.addElement(drawData);
        })
      }
      else if (this.state.activeTool.name === toolNames.IMAGE) {
        this.imageAddHandler().then(src => {
          drawData.src = src;
          this.addElement(drawData);
        }).catch(err => this.setState({drawData: null})).then(()=> this.setState({ imageImput: null}));
      }
      else
        this.addElement(drawData);
    }
  }
  mouseMoveHandler = e => {
    e.preventDefault();
    console.log('move');
    this.mouseMoved = true;

    const drawData = {};
    drawData.drawing = true;
    drawData.x1 = this.mouseStart.x;
    drawData.y1 = this.mouseStart.y;
    drawData.x2 = e.pageX - this.offsetLeft;
    drawData.y2 = e.pageY - this.offsetTop;

    this.setState({ drawData: drawData });
  }

  changeTextHandler = (elem) => {
    return new Promise((resolve, reject) => {
      const x1 = Math.min(elem.x1, elem.x2);
      const y1 = Math.min(elem.y1, elem.y2);
      const x2 = Math.max(elem.x2, elem.x1);
      const y2 = Math.max(elem.y2, elem.y1);
      let inputText = '';
      const inputChanged = e => {
        if (e.key && e.key.length === 1) {
          const drawData = elem;
          inputText += e.key;
          drawData.textValue = inputText;
          this.setState({drawData: drawData});
        }
        else if (e.key === 'Backspace' && inputText.length > 0) {
          const drawData = elem;
          inputText = inputText.slice(0, inputText.length-1);
          drawData.textValue = inputText;
          this.setState({drawData: drawData});
        }
      }

      const inputClosed = e => {
        this.setOffsets();
        const mouseX = e.pageX - this.offsetLeft;
        const mouseY = e.pageY - this.offsetTop;

        if (mouseX < x1 || mouseX > x2 || mouseY < y1 || mouseY > y2) {
          window.removeEventListener('keydown', inputChanged);
          window.removeEventListener('click', inputClosed);
          resolve(inputText);
        }
      };

      window.addEventListener('keydown', inputChanged);

      setTimeout(() => {
        window.addEventListener('click', inputClosed);
      }, 100);
    });
  }

  imageAddHandler = () => {
    return new Promise((resolve, reject) => {
      const imageSubmited = (e, src) => {
        if (src) {
          resolve(src);
        }
        else if (e.target) {
          const files = e.target.files;
  
          if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = () => {
              resolve(fr.result);
            }
            fr.onerror = () => {
              reject();
            }
            fr.readAsDataURL(files[0]);
          } else {
            reject();
          }
        }
        else {
          reject();
        }
      };

      this.setState({ imageImput: { onSubmit: imageSubmited } });
    });
  }
  
  render() {
    return (
      <div className={classes.App}>
        { this.state.imageImput &&
          <InputImage submited={this.state.imageImput.onSubmit} />
        }
        <div className={classes.Topbar}>
          <Topbar />
        </div>
        <div className={classes.Toolbar}>
          <Toolbar tools={this.state.tools} setActive={this.setActiveTool} />
        </div>
        <div className={classes.MainArea}>
          <MainArea 
            activeTool={this.state.activeTool} 
            drawLayers={this.state.drawLayers} drawData={this.state.drawData}
            ref={this.mainAreaRef} />
        </div>
        <div className={classes.EditorArea}>
          <EditorArea activeTool={this.state.activeTool} updateTool={this.updateActiveTool} />
        </div>
      </div>
    );
  }
}

export default App;
