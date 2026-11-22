import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Box, Rotate3d } from 'lucide-react';
import { ABDULLAH_JS_SNIPPET } from '../data/portfolioData';

export type RenderMode = 'wireframe' | 'solid' | 'particles';

function detectSoftwareGl(): boolean {
  try {
    const probe = document.createElement('canvas');
    const gl = probe.getContext('webgl2') || probe.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function Hero3DStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [renderMode, setRenderMode] = useState<RenderMode>('wireframe');
  const [statusLabel, setStatusLabel] = useState<'THREE.JS · ACTIVE' | '3D CANVAS · ACTIVE'>('THREE.JS · ACTIVE');

  const modeRef = useRef<RenderMode>('wireframe');
  const targetRotRef = useRef({ x: 0.35, y: 0.5 });
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0 });
  const applyModeRef = useRef<((mode: RenderMode) => void) | null>(null);

  const handleModeChange = (mode: RenderMode) => {
    modeRef.current = mode;
    setRenderMode(mode);
    applyModeRef.current?.(mode);
  };

  const handleReset = () => {
    targetRotRef.current.x = 0.35;
    targetRotRef.current.y = 0.5;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let frameId = 0;
    let disposed = false;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const initWebGL = () => {
      const isSoftwareGl = detectSoftwareGl();
      const width = container.clientWidth || 560;
      const height = container.clientHeight || 340;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      renderer.setPixelRatio(
        isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2),
      );
      renderer.setSize(width, height, false);

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x100d16, 0.045);

      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      const roomEnv = new RoomEnvironment();
      const envRT = pmremGenerator.fromScene(roomEnv, 0.04);
      scene.environment = envRT.texture;
      roomEnv.dispose();
      pmremGenerator.dispose();

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 5.2;

      // Composite 5-part 3D group
      const group = new THREE.Group();
      scene.add(group);

      // Part 1: Outer Icosahedral Core (wireframe or solid metallic purple)
      const outerGeo = new THREE.IcosahedronGeometry(1.35, 1);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xd3bbff,
        wireframe: true,
      });
      const solidMat = new THREE.MeshPhysicalMaterial({
        color: 0x6d28d9,
        roughness: 0.22,
        metalness: 0.78,
        clearcoat: 0.9,
        clearcoatRoughness: 0.12,
        flatShading: true,
      });
      const coreMesh: THREE.Mesh<THREE.IcosahedronGeometry, THREE.Material> =
        new THREE.Mesh(outerGeo, wireMat);
      group.add(coreMesh);

      // Part 2: Inner Accent Octahedral Core (contrasting peach-amber crystal)
      const innerGeo = new THREE.OctahedronGeometry(0.68, 0);
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0xffb68b,
        roughness: 0.52,
        metalness: 0.3,
        emissive: 0x522300,
        emissiveIntensity: 0.35,
      });
      const innerCore = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerCore);

      // Part 3: Primary Orbital Ring (Tertiary Peach)
      const ringGeo1 = new THREE.TorusGeometry(2.05, 0.026, 12, 72);
      const ringMat1 = new THREE.MeshStandardMaterial({
        color: 0xffb68b,
        roughness: 0.35,
        metalness: 0.65,
      });
      const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
      ring1.rotation.x = Math.PI / 3;
      group.add(ring1);

      // Part 4: Secondary Orbital Ring (Secondary Lavender)
      const ringGeo2 = new THREE.TorusGeometry(2.35, 0.018, 12, 72);
      const ringMat2 = new THREE.MeshStandardMaterial({
        color: 0xc7aaff,
        roughness: 0.4,
        metalness: 0.55,
      });
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      ring2.rotation.y = Math.PI / 4;
      group.add(ring2);

      // Part 5: Orbital Particle Cloud (240 points)
      const count = 240;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const theta = (i * 2.399963) % (Math.PI * 2);
        const yUnit = 1 - (i / (count - 1)) * 2;
        const radiusAtY = Math.sqrt(Math.max(0, 1 - yUnit * yUnit));
        const r = 1.85 + ((i * 17) % 100) / 100 * 1.35;
        positions[i * 3] = Math.cos(theta) * radiusAtY * r;
        positions[i * 3 + 1] = yUnit * r;
        positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * r;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xd3bbff,
        size: 0.055,
        sizeAttenuation: true,
      });
      const particles = new THREE.Points(pGeo, pMat);
      group.add(particles);

      // 3-Point Warm/Cool Lighting Rig
      const hemiLight = new THREE.HemisphereLight(0xc7aaff, 0x15121b, 0.85);
      const keyLight = new THREE.DirectionalLight(0xffe0cc, 1.5);
      keyLight.position.set(4, 5, 5);
      const rimLight = new THREE.PointLight(0xd3bbff, 1.8, 18);
      rimLight.position.set(-4, -2, 4);
      scene.add(hemiLight, keyLight, rimLight);

      applyModeRef.current = (mode: RenderMode) => {
        if (mode === 'wireframe') {
          coreMesh.visible = true;
          coreMesh.material = wireMat;
          innerCore.visible = true;
          particles.visible = true;
        } else if (mode === 'solid') {
          coreMesh.visible = true;
          coreMesh.material = solidMat;
          innerCore.visible = false;
          particles.visible = true;
        } else {
          coreMesh.visible = false;
          innerCore.visible = true;
          particles.visible = true;
        }
      };
      applyModeRef.current(modeRef.current);

      if (!isSoftwareGl) {
        renderer.compile(scene, camera);
      }

      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const w = Math.max(240, Math.floor(entry.contentRect.width));
        const h = Math.max(240, Math.floor(entry.contentRect.height));
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      });
      resizeObserver.observe(container);

      const handleContextLost = (e: Event) => {
        e.preventDefault();
        window.cancelAnimationFrame(frameId);
        window.clearTimeout(frameId);
      };
      const handleContextRestored = () => {
        lastTime = performance.now();
        scheduleNext();
      };
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);

      function afterDraw(cb: () => void) {
        const gl = renderer.getContext() as WebGL2RenderingContext;
        if (typeof gl.fenceSync === 'function') {
          const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
          gl.flush();
          const poll = () => {
            if (disposed) {
              if (sync) gl.deleteSync(sync);
              return;
            }
            const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
            if (state === gl.UNSIGNALED) {
              frameId = window.setTimeout(poll, 5);
            } else {
              if (sync) gl.deleteSync(sync);
              frameId = window.setTimeout(cb, 80);
            }
          };
          frameId = window.setTimeout(poll, 5);
        } else {
          frameId = window.setTimeout(cb, 80);
        }
      }

      let lastTime = performance.now();
      const tick = () => {
        if (disposed) return;
        const now = performance.now();
        const delta = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        if (!dragRef.current.active && !prefersReducedMotion) {
          targetRotRef.current.y += delta * 0.28;
        }

        const dampFactor = prefersReducedMotion ? 18 : 6;
        group.rotation.x = THREE.MathUtils.damp(
          group.rotation.x,
          targetRotRef.current.x,
          dampFactor,
          delta,
        );
        group.rotation.y = THREE.MathUtils.damp(
          group.rotation.y,
          targetRotRef.current.y,
          dampFactor,
          delta,
        );

        if (!prefersReducedMotion) {
          innerCore.rotation.y -= delta * 0.45;
          innerCore.rotation.x += delta * 0.25;
          ring1.rotation.z += delta * 0.36;
          ring2.rotation.x -= delta * 0.3;
        }

        renderer.render(scene, camera);
        scheduleNext();
      };

      const scheduleNext = () => {
        if (disposed) return;
        if (isSoftwareGl) {
          afterDraw(tick);
        } else {
          frameId = window.requestAnimationFrame(tick);
        }
      };

      setStatusLabel('THREE.JS · ACTIVE');
      tick();

      return () => {
        disposed = true;
        window.cancelAnimationFrame(frameId);
        window.clearTimeout(frameId);
        resizeObserver.disconnect();
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
        outerGeo.dispose();
        innerGeo.dispose();
        ringGeo1.dispose();
        ringGeo2.dispose();
        pGeo.dispose();
        wireMat.dispose();
        solidMat.dispose();
        innerMat.dispose();
        ringMat1.dispose();
        ringMat2.dispose();
        pMat.dispose();
        envRT.dispose();
        renderer.dispose();
      };
    };

    try {
      const cleanup = initWebGL();
      return cleanup;
    } catch {
      // 2D Canvas 3D-Projection Fallback if WebGL unavailable
      setStatusLabel('3D CANVAS · ACTIVE');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const phi = (1 + Math.sqrt(5)) / 2;
      const rawVerts: [number, number, number][] = [
        [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
        [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
        [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
      ];
      const edges: [number, number][] = [
        [0, 1], [0, 5], [0, 7], [0, 10], [0, 11], [1, 5], [1, 7], [1, 8], [1, 9],
        [2, 3], [2, 4], [2, 6], [2, 10], [2, 11], [3, 4], [3, 6], [3, 8], [3, 9],
        [4, 5], [4, 9], [4, 11], [5, 9], [5, 11], [6, 7], [6, 8], [6, 10], [7, 8],
        [7, 10], [8, 9], [10, 11],
      ];

      const drawFallback = () => {
        if (disposed) return;
        const w = (canvas.width = container.clientWidth || 560);
        const h = (canvas.height = container.clientHeight || 340);
        if (!dragRef.current.active && !prefersReducedMotion) {
          targetRotRef.current.y += 0.008;
        }
        ctx.clearRect(0, 0, w, h);
        const cx = w / 2;
        const cy = h / 2;
        const scale = 72;
        const cosY = Math.cos(targetRotRef.current.y);
        const sinY = Math.sin(targetRotRef.current.y);
        const cosX = Math.cos(targetRotRef.current.x);
        const sinX = Math.sin(targetRotRef.current.x);

        const pts = rawVerts.map(([x, y, z]) => {
          const x1 = x * cosY - z * sinY;
          const z1 = x * sinY + z * cosY;
          const y2 = y * cosX - z1 * sinX;
          const z2 = y * sinX + z1 * cosX;
          const p = 4 / (4 - z2 * 0.4);
          return [cx + x1 * scale * p, cy + y2 * scale * p] as const;
        });

        ctx.strokeStyle = modeRef.current === 'particles' ? '#6D28D9' : '#D3BBFF';
        ctx.lineWidth = 1.6;
        if (modeRef.current !== 'particles') {
          edges.forEach(([a, b]) => {
            ctx.beginPath();
            ctx.moveTo(pts[a][0], pts[a][1]);
            ctx.lineTo(pts[b][0], pts[b][1]);
            ctx.stroke();
          });
        }
        pts.forEach(([px, py]) => {
          ctx.fillStyle = '#FFB68B';
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
        });
        frameId = window.requestAnimationFrame(drawFallback);
      };
      drawFallback();

      return () => {
        disposed = true;
        window.cancelAnimationFrame(frameId);
      };
    }
  }, []);

  useEffect(() => {
    const handlePointerUp = () => {
      dragRef.current.active = false;
    };
    const handlePointerMove = (e: PointerEvent) => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.lastX;
      const dy = e.clientY - dragRef.current.lastY;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
      targetRotRef.current.y += dx * 0.008;
      targetRotRef.current.x += dy * 0.008;
    };
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.active = true;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
  };

  return (
    <div className="rounded-[28px] bg-surface-container-low border border-outline-variant p-4 flex flex-col gap-4">
      {/* Stage Header */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <Box className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
          <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-on-surface-variant">
            ABDULLAH.JS · DRAG TO ORBIT 3D
          </span>
        </div>
        <button
          type="button"
          onClick={handleReset}
          aria-label="Reset 3D camera"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-high border border-outline-variant text-on-surface transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary cursor-pointer shrink-0"
        >
          <Rotate3d className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className="relative w-full h-[340px] rounded-[20px] bg-surface-container-lowest border border-outline-variant overflow-hidden cursor-grab active:cursor-grabbing select-none"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Floating Code Card Overlay (solid surface, no backdrop-filter over WebGL) */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:w-72 rounded-[12px] bg-surface-container/95 border border-outline-variant p-4 pointer-events-none">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-primary">
              abdullah.js
            </span>
            <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-tertiary">
              live
            </span>
          </div>
          <pre className="font-mono text-[12px] leading-[18px] text-on-surface-variant overflow-x-auto">
            <code>{ABDULLAH_JS_SNIPPET}</code>
          </pre>
        </div>
      </div>

      {/* 3D Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div
          className="flex flex-wrap items-center gap-1"
          role="group"
          aria-label="3D Render Mode"
        >
          {(
            [
              { id: 'wireframe', label: 'Wireframe' },
              { id: 'solid', label: 'Solid Mesh' },
              { id: 'particles', label: 'Orbital Cloud' },
            ] as const
          ).map((item) => {
            const active = renderMode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => handleModeChange(item.id)}
                className={`inline-flex items-center px-4 py-1.5 rounded-full font-label text-[12px] leading-[16px] tracking-[0.4px] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-secondary-container border border-primary text-on-secondary-container'
                    : 'bg-surface-container-high border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-outline tabular-nums">
          {statusLabel}
        </span>
      </div>
    </div>
  );
}
