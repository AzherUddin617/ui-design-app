import React, { Component } from 'react';
import classes from './MainArea.module.scss';
import DrawItem from './DrawItem/DrawItem';

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
  }

  componentDidMount() {
    const mainBody = this.mainAreaRef.current;
    if (mainBody) {
      this.offsetTop = mainBody.getBoundingClientRect().top;
      this.offsetLeft = mainBody.getBoundingClientRect().left;

      mainBody.addEventListener('mousedown', this.mouseDownHandler);
    }
  }

  addElement = elem => {
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
      drawData.x = this.mouseStart.x;
      drawData.y = this.mouseStart.y;
      drawData.width = e.pageX - this.offsetLeft - this.mouseStart.x;
      drawData.height = e.pageY - this.offsetTop - this.mouseStart.y;

      this.addElement(drawData);
    }
  }
  mouseMoveHandler = e => {
    e.preventDefault();
    console.log('move');
    this.mouseMoved = true;

    const drawData = {...this.state.drawData};
    drawData.x = this.mouseStart.x;
    drawData.y = this.mouseStart.y;
    drawData.width = e.pageX - this.offsetLeft - this.mouseStart.x;
    drawData.height = e.pageY - this.offsetTop - this.mouseStart.y;

    this.setState({ drawData: drawData });
  }

  render() {
    return (
      <div className={classes.MainArea} ref={this.mainAreaRef}>
        <div className={classes.DrawArea}>
          {this.state.drawLayers.map((layer, i) => (
            <div key={i} className={classes.DrawLayer}>
              {layer.elements.map((elem, i) => (
                <DrawItem key={i} x={elem.x} y={elem.y} width={elem.width} height={elem.height} />
              ))}
            </div>
          ))}

          { this.state.drawData &&
            <DrawItem 
              x={this.state.drawData.x} 
              y={this.state.drawData.y} 
              width={this.state.drawData.width} 
              height={this.state.drawData.height} 
            />
          }
        </div>
      </div>
    );
  }
}

export default MainArea;
