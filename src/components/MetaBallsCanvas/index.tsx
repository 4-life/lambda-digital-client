import React, { useRef, useEffect } from 'react';
import Scene from './Scene';

function MetaBallsCanvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const scene = new Scene(canvas);

    return () => scene.destroy();
  }, []);

  return <canvas ref={canvasRef} />;
}

export default MetaBallsCanvas;
