import { useEffect, useRef } from "react";
import Matter from "matter-js";
import MatterAttractors from "matter-attractors";
import MatterWrap from "matter-wrap";

const BUBBLE_COUNT = 39;

function MatterBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const {
      Engine,
      Render,
      Runner,
      World,
      Bodies,
      Body,
      Events,
      Common,
    } = Matter;

    Matter.use(MatterAttractors);
    Matter.use(MatterWrap);

    // =========================
    // SETTINGS
    // =========================

    const FOLLOW_SPEED = 0.9;

    // Pull from the Matter attractor plugin
    const ATTRACTION_FORCE = 0.000009;

    // Extra force when bubbles are far from the cluster
    const CLUSTER_PULL = 0.000015;

    // Bubbles inside this distance are allowed
    // to move naturally and collide
    const CLUSTER_RADIUS = 450;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // =========================
    // CREATE ENGINE
    // =========================

    const engine = Engine.create();

    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0;
    engine.world.gravity.scale = 0;

    const world = engine.world;

    // =========================
    // CREATE RENDERER
    // =========================

    const render = Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio,
      },
    });

    const runner = Runner.create();

    // =========================
    // CURSOR POSITION
    // =========================

    const mousePosition = {
      x: width / 2,
      y: height / 2,
    };

    const handleMouseMove = (event) => {
      mousePosition.x = event.clientX;
      mousePosition.y = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // =========================
    // INVISIBLE ATTRACTOR
    // =========================

    const attractor = Bodies.circle(
      width / 2,
      height / 2,
      50,
      {
        isStatic: true,

        collisionFilter: {
          category: 0x0002,
          mask: 0,
        },

        render: {
          visible: false,
        },

        plugin: {
          attractors: [
            (bodyA, bodyB) => ({
              x:
                (bodyA.position.x - bodyB.position.x) *
                ATTRACTION_FORCE,

              y:
                (bodyA.position.y - bodyB.position.y) *
                ATTRACTION_FORCE,
            }),
          ],
        },
      }
    );

    World.add(world, attractor);

    // =========================
    // CREATE BUBBLES
    // =========================

    // Store all bubbles here
    const bubbles = [];

    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const x = Common.random(0, width);
      const y = Common.random(0, height);

      const radius = Common.random(10, 65);

      const bubble = Bodies.circle(x, y, radius, {
        restitution: 0.8,
        friction: 0,
        frictionStatic: 0,

        // Slight resistance so the balls don't fly forever
        frictionAir: 0.01,

        density: 0.009,
        inertia: Infinity,

        render: {
          fillStyle: "rgba(59, 130, 246, 0.20)",
          strokeStyle: "rgba(96, 165, 250, 0.35)",
          lineWidth: 1,
        },
      });

      bubbles.push(bubble);
      World.add(world, bubble);
    }

    // =========================
    // MOVE ATTRACTOR + PULL CLUSTER
    // =========================

    Events.on(engine, "afterUpdate", () => {
      // 1. Move the cluster center toward cursor
      Body.translate(attractor, {
        x:
          (mousePosition.x - attractor.position.x) *
          FOLLOW_SPEED,

        y:
          (mousePosition.y - attractor.position.y) *
          FOLLOW_SPEED,
      });

      // 2. Pull bubbles strongly only when
      // they are outside the cluster radius
      bubbles.forEach((bubble) => {
        const dx =
          attractor.position.x - bubble.position.x;

        const dy =
          attractor.position.y - bubble.position.y;

        const distance = Math.sqrt(
          dx * dx + dy * dy
        );

        if (distance > CLUSTER_RADIUS) {
          Body.applyForce(
            bubble,
            bubble.position,
            {
              x: dx * CLUSTER_PULL,
              y: dy * CLUSTER_PULL,
            }
          );
        }
      });
    });

    // =========================
    // WINDOW RESIZE
    // =========================

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      render.canvas.width = width;
      render.canvas.height = height;

      render.options.width = width;
      render.options.height = height;

      render.canvas.style.width = `${width}px`;
      render.canvas.style.height = `${height}px`;
    };

    window.addEventListener("resize", handleResize);

    // =========================
    // START
    // =========================

    Runner.run(runner, engine);
    Render.run(render);

    // =========================
    // CLEANUP
    // =========================

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      Render.stop(render);
      Runner.stop(runner);

      World.clear(world, false);
      Engine.clear(engine);

      render.canvas.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden hidden md:block"
    />
  );
}

export default MatterBackground;