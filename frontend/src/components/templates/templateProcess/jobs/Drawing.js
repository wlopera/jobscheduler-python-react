import React from "react";

const Drawing = ({ width, height, diagramData }) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const X0 = 50;
    const Y0 = 75;
    let X = 0;
    let Y = -75;

    const drawRect = (x, y, w, h, text) => {
      //console.log(1111, x, y, w, h, text);
      ctx.fillStyle = "#f4eeeefc";
      ctx.fillRect(x, y, w, h);

      ctx.fillStyle = "black";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, x + w / 2, y + h / 2);
    };

    const drawLine = (fromX, fromY, toX, toY) => {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
    };

    let cont = 0;
    // Dibujar elementos
    for (const element of diagramData) {
      if (element.text === "exito") {
        drawRect(X0 + X + 5, Y0 + Y, 100, 50, element.text);
      } else if (element.text === "error") {
        drawRect(X0 / 2, Y0 + Y, X + X0 - 25, 50, element.text);
      } else {
        X = X + X0;
        Y = Y + Y0;
        cont++, drawRect(X, Y, 100, 50, element.text);
        drawLine(X + 25, Y + 50, X + 25, (diagramData.length - 2) * 3 * 25);
        drawLine(X + 75, Y + 50, X + 75, cont * 3 * 25);
      }
    }
  }, [diagramData]);

  return (
    <div
     
    >
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default Drawing;
