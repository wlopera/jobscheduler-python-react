import React from 'react';

const Drawing = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Dibuja los procesos
    ctx.fillStyle = '#f4eeeefc';
    ctx.fillRect(100, 0, 100, 50);   
    ctx.fillRect(150, 100, 100, 50);
    ctx.fillRect(200, 200, 100, 50);

    ctx.fillStyle = '#f49696';
    ctx.fillRect(100, 300, 140, 50);

    ctx.fillStyle = '#d1f5c7';
    ctx.fillRect(250, 300, 100, 50);

    // Dibuja las flechas
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    ctx.moveTo(125, 50);
    ctx.lineTo(125, 300);
    ctx.moveTo(175, 50);
    ctx.lineTo(175, 100);

    ctx.moveTo(175, 150);
    ctx.lineTo(175, 300);
    ctx.moveTo(225, 150);
    ctx.lineTo(225, 200);

    ctx.moveTo(225, 250);
    ctx.lineTo(225, 300);
    ctx.moveTo(275, 250);
    ctx.lineTo(275, 300);
    ctx.stroke();

    // Dibuja los textos
    ctx.fillStyle = 'black';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('get_list', 150, 30);
    ctx.fillText('copy_file', 200, 130);
    ctx.fillText('send_email', 250, 230);
    ctx.fillText('Error', 175, 330);
    ctx.fillText('Exito', 300, 330);
  }, []);

  return <canvas ref={canvasRef} width={350} height={350} />;
};

export default Drawing;
