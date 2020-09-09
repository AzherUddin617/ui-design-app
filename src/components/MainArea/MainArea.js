import React, { Component } from 'react';
import classes from './MainArea.module.scss';
import DrawItem from './DrawItem/DrawItem';
import * as toolNames from '../../global/tool-names';

class MainArea extends Component {
  
  constructor(props) {
    super(props);

    this.createLayout = ({ name, elements, active }) => ({
      active: active && true,
      name: name || 'Layer ' + (this.state ? this.state.drawLayers.lenght : '1'),
      elements: elements || []
    });

    this.state = {
      drawData: null,
      drawElements: [],
      drawLayers: [this.createLayout({ active: true })],
      activeLayerIndex: 0
    };
    console.log(this.state.drawLayers);

    this.mainAreaRef = React.createRef();
    this.mouseStart = { x:null, y:null };
    this.mouseMoved = false;
    this.activeToolName = this.props.tools.find(t=>t.active).name;
  }

  componentDidMount() {
    const mainBody = this.mainAreaRef.current;
    if (mainBody) {
      this.offsetTop = mainBody.getBoundingClientRect().top;
      this.offsetLeft = mainBody.getBoundingClientRect().left;

      mainBody.addEventListener('mousedown', this.mouseDownHandler);
    }
  }

  componentDidUpdate() {
    this.activeToolName = this.props.tools.find(t=>t.active).name;
  }

  addElement = elem => {
    elem.toolName = this.activeToolName;
    elem.drawing = false;
    const drawLayers = [...this.state.drawLayers];
    const activeLayer = {...drawLayers[this.state.activeLayerIndex]};
    activeLayer.elements = activeLayer.elements.concat(elem);
    drawLayers[this.state.activeLayerIndex] = activeLayer;

    this.setState({ drawLayers: drawLayers, drawData: null });
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
      const drawData = {...this.state.drawData};

      drawData.x1 = this.mouseStart.x;
      drawData.y1 = this.mouseStart.y;
      drawData.x2 = e.pageX - this.offsetLeft;
      drawData.y2 = e.pageY - this.offsetTop;

      if (this.activeToolName === toolNames.TEXT) {
        this.changeTextHandler(drawData).then(data => {
          drawData.textValue = data;
          this.addElement(drawData);
        })
      }
      else
        this.addElement(drawData);
    }
  }
  mouseMoveHandler = e => {
    e.preventDefault();
    console.log('move');
    this.mouseMoved = true;

    const drawData = {...this.state.drawData};
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

  render() {

    return (
      <div className={classes.MainArea} ref={this.mainAreaRef}>
        <div className={classes.DrawArea}>
          {this.state.drawLayers.map((layer, i) => (
            <div key={i} className={classes.DrawLayer}>
              {layer.elements.map((elem, i) => (
                <DrawItem key={i} 
                  toolName={elem.toolName} 
                  elem={elem}
                />
              ))}

              { layer.active && this.state.drawData &&
                <DrawItem 
                  toolName={this.activeToolName}
                  elem={this.state.drawData}
                />
              }
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MainArea;
