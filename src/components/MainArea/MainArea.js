import React, { Component } from 'react';
import classes from './MainArea.module.scss';

class MainArea extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      drawData: null,
      drawElements: []
    };

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

  mouseDownHandler = e => {
    e.preventDefault();
    console.log('down');
      this.mouseStart.x = e.pageX - this.offsetLeft;
      this.mouseStart.y = e.pageY - this.offsetTop;
      // setMouseStart(mouseStart);
      
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

      this.setState((prevState) => {
        return {
          drawElements: prevState.drawElements.concat(drawData),
          drawData: null
        };
      });
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
          {this.state.drawElements.map((elem, i) => (
            <div
              key={i}
              className={classes.DrawItem}
              style={{
                left: elem.x + 'px',
                top: elem.y + 'px',
                width: elem.width + 'px',
                height: elem.height + 'px'
              }}
            ></div>
          ))}

          { this.state.drawData &&
            <div className={classes.DrawItem} style={{
              left: this.state.drawData.x + 'px',
              top: this.state.drawData.y + 'px',
              width: this.state.drawData.width + 'px',
              height: this.state.drawData.height + 'px'
            }}></div>
          }
        </div>
      </div>
    );
  }
}

export default MainArea;
