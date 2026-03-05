import { Renderer, Program, Mesh, Triangle, Vec2 } from 'ogl';
import vertex from './main.vert?raw';
import fragment from './main.frag?raw';

const NUM_METABALLS = 100;
const SPEED = 0.8;

interface Metaball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

class Scene {
  #renderer!: Renderer;

  #mesh!: Mesh;

  #program!: Program;

  #canvasEl: HTMLCanvasElement;

  #metaballs: Metaball[] = [];

  #width: number;

  #height: number;

  #animationId: number = 0;

  // Pre-allocated buffer — mutated in place each frame
  #metaballsData = new Float32Array(3 * NUM_METABALLS);

  constructor(canvasEl: HTMLCanvasElement) {
    this.#canvasEl = canvasEl;
    this.#width = window.innerWidth;
    this.#height = window.innerHeight - 10;
    this.setScene();
  }

  setScene() {
    this.#renderer = new Renderer({
      dpr: 1,
      canvas: this.#canvasEl,
      width: this.#width,
      height: this.#height,
      alpha: true,
    });

    this.#renderer.gl.clearColor(0, 0, 0, 0);

    const { gl } = this.#renderer;

    for (let i = 0; i < NUM_METABALLS; i += 1) {
      const radius = Math.random() * 100;
      this.#metaballs.push({
        x: Math.random() * (this.#width - 2 * radius) + radius,
        y: Math.random() * (this.#height - 2 * radius) + radius,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: radius * (this.#width > 1000 ? 0.7 : 0.35),
      });
    }

    const geometry = new Triangle(gl);

    // OGL parses "uMetaballs[0]" as uniformName="uMetaballs", nameComponents=["0"].
    // It then traverses: uniforms["uMetaballs"]["0"].value
    // so the correct shape is { 0: { value: Float32Array } }.
    this.#program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uResolution: { value: new Vec2(this.#width, this.#height) },
        uMetaballs: { 0: { value: this.#metaballsData } },
      },
    });

    this.#mesh = new Mesh(gl, { geometry, program: this.#program });

    this.#animationId = requestAnimationFrame(this.handleRAF);
  }

  handleRAF = () => {
    this.#animationId = requestAnimationFrame(this.handleRAF);

    for (const mb of this.#metaballs) {
      mb.x += mb.vx;
      mb.y += mb.vy;

      if (mb.x < mb.r || mb.x > this.#width - mb.r) mb.vx *= -1;
      if (mb.y < mb.r || mb.y > this.#height - mb.r) mb.vy *= -1;
    }

    for (let i = 0; i < NUM_METABALLS; i += 1) {
      const mb = this.#metaballs[i];
      this.#metaballsData[i * 3] = mb.x;
      this.#metaballsData[i * 3 + 1] = mb.y;
      this.#metaballsData[i * 3 + 2] = mb.r;
    }

    this.#renderer.render({ scene: this.#mesh });
  };

  destroy() {
    cancelAnimationFrame(this.#animationId);
  }
}

export default Scene;
