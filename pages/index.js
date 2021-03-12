// import Head from 'next/head'
import React from "react";
// import ReactDOM from "react-dom";
import { fabric } from "fabric";

const innerHeight = 900
const innerWidth = 1600

export default class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      add: true
    };
  }

  componentDidMount() {
    this._fabricCanvas = new fabric.Canvas(this.canvasRef.current);
    const canvas = this._fabricCanvas;
    window.canvas = canvas;
    canvas.isMouseDown = false;

    // const { activePenColor, activePenSize, data } = this.props;
    // canvas.loadFromJSON(data);

    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = "#000";
    canvas.freeDrawingBrush.width = 4;

    // this.drawLines(1000);
    this.setState({
      canvasDimensions: { height: window.innerHeight, width: window.innerWidth }
    });
    // canvas.on("mouse:down", this.onMouseDown);
  }

  onMouseDown = e => {
    const { add } = this.state;

    if (!add) {
      return;
    }
    const canvas = this._fabricCanvas;

    const { x, y } = canvas.getPointer(e.e);
    this.text = new fabric.IText("", {
      fontFamily: "arial",
      left: x,
      top: y,
      erasable: true
    });

    this.text.on("editing:exited", async e => {
      console.log({ e });
    });

    this.setState({ add: false });
    canvas.selection = true;
    canvas.isDrawingMode = false;
    canvas.defaultCursor = "default";
    canvas.hoverCursor = "grab";
    canvas.moveCursor = "grabbing";
    canvas.add(this.text);
    canvas.setActiveObject(this.text);
    if (this.text) {
      this.text.selectable = true;
      this.text.enterEditing();
    }
  };

  // drawLines = num => {
  //   const canvas = this._fabricCanvas;
  //   let count = 0;
  //   const interval = setInterval(() => {
  //     count++;
  //     if (count > num) {
  //       clearInterval(interval);
  //     }
  //     const points = [
  //       Math.floor(Math.random() * 1000),
  //       Math.floor(Math.random() * 1000),
  //       Math.floor(Math.random() * 1000),
  //       Math.floor(Math.random() * 1000)
  //     ];
  //     const line = new fabric.Line(points, {
  //       strokeWidth: 4,
  //       fill: "#000",
  //       stroke: "#000",
  //       strokeLineCap: "round"
  //     });
  //     canvas.add(line);
  //     // canvas.requestRenderAll();
  //   }, 100);
  // };

  showData = () => {
    const canvas = this._fabricCanvas;
    console.log({ canvas });
  };

  render() {
    return (
      <div>
        <canvas ref={this.canvasRef} height={innerHeight} width={innerWidth} />
        <button
          style={{ position: "absolute", zIndex: 1, top: 10, left: 10 }}
          onClick={this.showData}
        >
          Show Data
        </button>
      </div>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Demo />, rootElement);
