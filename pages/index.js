// import Head from 'next/head'
import React from "react";
// import ReactDOM from "react-dom";
import { fabric } from "fabric";

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
      console.log({ "logging e": e });
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

  showData = () => {
    const canvas = this._fabricCanvas;
    console.log({ canvas });
  };

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', placeItems: 'center', backgroundColor: 'pink', height: '100vh' }}>
        <div style={{ backgroundColor: 'white' }}>
          <canvas ref={this.canvasRef} height={628} width={1200} />
        </div>
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
