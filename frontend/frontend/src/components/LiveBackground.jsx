// src/components/LiveBackground.jsx
import { useEffect, useRef, useState } from "react";

export default function LiveBackground() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Track mouse for the custom cursor
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // Class to generate vertical pencil lines
    class PencilLine {
      constructor() {
        this.reset();
        // Randomize initial Y so they start all over the screen
        this.y = Math.random() * height; 
      }

      reset() {
        this.x = Math.random() * width;
        this.length = Math.random() * 200 + 80; // Length of the line
        // Some go up (negative), some go down (positive) at different speeds
        this.speed = (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1);
        this.opacity = Math.random() * 0.15 + 0.05; // Faint graphite color
      }

      update() {
        this.y += this.speed;

        // Reset if it goes off screen
        if (this.speed > 0 && this.y - this.length > height) {
          this.reset();
          this.y = -10;
        } else if (this.speed < 0 && this.y + this.length < 0) {
          this.reset();
          this.y = height + 10;
        }
      }

      draw() {
        // Draw 3 overlapping, slightly offset lines to mimic pencil texture
        for (let j = 0; j < 3; j++) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(30, 40, 50, ${this.opacity})`; // Dark graphite line
          ctx.lineWidth = 0.5;

          let startY = this.y;
          let endY = this.y + (this.speed > 0 ? -this.length : this.length);

          ctx.moveTo(this.x + (Math.random() - 0.5) * 2, startY);

          // Add waviness/jitter down the line
          let steps = 6;
          let stepY = (endY - startY) / steps;
          for (let i = 1; i <= steps; i++) {
            let jitterX = (Math.random() - 0.5) * 4; // Irregular side-to-side wobble
            ctx.lineTo(this.x + jitterX, startY + stepY * i);
          }
          ctx.stroke();
        }
      }
    }

    // Create 40 irregular lines
    const lines = Array.from({ length: 40 }, () => new PencilLine());
    let animationFrameId;

    const animate = () => {
      // Clear canvas with a very light, warm paper color
      ctx.fillStyle = "#faf9f6"; 
      ctx.fillRect(0, 0, width, height);

      lines.forEach((line) => {
        line.update();
        line.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
      />
    </>
  );
}