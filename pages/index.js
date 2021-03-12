// import Head from 'next/head'
import React, { useEffect, useRef, useState } from "react";
// import ReactDOM from "react-dom";
import { fabric } from "fabric";

const MyStage = () => {

  const canvasRef = useRef(null)
  const [add, setAdd] = useState(true)
  const [canvasDimensions, setCanvasDimensions] = useState(null)

  useEffect(() => {

    const _fabricCanvas = new fabric.Canvas(canvasRef.current);
    const canvas = _fabricCanvas;
    window.canvas = canvas;
    canvas.isMouseDown = false;

    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = "#000";
    canvas.freeDrawingBrush.width = 4;

    // this.drawLines(1000);
    setCanvasDimensions({ height: window.innerHeight, width: window.innerWidth })
    // canvas.on("mouse:down", this.onMouseDown);

  }, [])


  const onMouseDown = e => {
    // const { add } = this.state;

    if (!add) {
      return;
    }
    const canvas = _fabricCanvas;

    const { x, y } = canvas.getPointer(e.e);
    const text = new fabric.IText("", {
      fontFamily: "arial",
      left: x,
      top: y,
      erasable: true
    });

    text.on("editing:exited", async e => {
      console.log({ "logging e": e });
    });

    setAdd(false)
    canvas.selection = true;
    canvas.isDrawingMode = false;
    canvas.defaultCursor = "default";
    canvas.hoverCursor = "grab";
    canvas.moveCursor = "grabbing";
    canvas.add(text);
    canvas.setActiveObject(text);
    if (text) {
      text.selectable = true;
      text.enterEditing();
    }
  };

  const showData = () => {
    const canvas = _fabricCanvas;
    console.log({ canvas });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', placeItems: 'center', backgroundColor: 'pink', height: '100vh' }}>
      <div style={{ backgroundColor: 'white' }}>
        <canvas ref={canvasRef} height={628} width={1200} />
      </div>
      <button
        style={{ position: "absolute", zIndex: 1, bottom: 10, right: 10 }}
        onClick={showData}
      >
        Log canvas Data
        </button>
    </div>
  );
}

export default MyStage