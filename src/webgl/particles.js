/**
 * WEBGL PARTICLE SYSTEM — manoj-portfolio-3d
 * ============================================
 * Three.js r165 loaded from CDN (importmap in index.html).
 * Particle positions live entirely in BufferAttribute;
 * all motion is computed in the GLSL vertex shader.
 * JS only sets uniforms and computes morph target arrays at init.
 *
 * TUNING CONSTANTS (search "TUNE:" to find all):
 *   PARTICLE_COUNT_DESKTOP = 140_000
 *   PARTICLE_COUNT_MOBILE  =  55_000
 *   MORPH_DURATION         = 1.2   s
 *   REPULSION_RADIUS       = 0.18  (normalised 0-1)
 *   REPULSION_STRENGTH     = 0.07
 *   CURSOR_LERP            = 0.08
 */

import * as THREE from 'three';

/* ─── VERTEX SHADER ─────────────────────────────────────────── */
const VERT = /* glsl */ `
  precision highp float;

  // Per-particle attributes
  attribute vec3 aCurrent;      // current formation position
  attribute vec3 aTarget;       // destination formation position
  attribute float aRandom;      // [0,1) per-particle RNG seed
  attribute float aSize;        // base point size scalar

  // Uniforms driven by JS/GSAP
  uniform float uTime;          // elapsed seconds
  uniform float uMorph;         // 0 = current, 1 = target (GSAP tweens this)
  uniform float uScatter;       // 0 = formation, 1 = scattered noise
  uniform vec2  uPointer;       // normalised device coords of mouse
  uniform float uRepR;          // TUNE: repulsion radius
  uniform float uRepStr;        // TUNE: repulsion strength
  uniform float uPxRatio;       // devicePixelRatio (capped)

  varying float vAlpha;

  vec3 scatterPos(float seed) {
    // Deterministic pseudo-noise from seed
    float a = seed * 6.2831853;
    float b = seed * 9.4247779;
    float c = seed * 3.7699111;
    return vec3(cos(a) * 2.5, sin(b) * 1.5, cos(c) * 0.5)
           + 0.3 * vec3(sin(seed * 43.758), cos(seed * 37.123), sin(seed * 21.5));
  }

  void main() {
    // Lerp between current and target formation
    vec3 pos = mix(aCurrent, aTarget, uMorph);

    // Blend with scatter
    vec3 scattered = scatterPos(aRandom);
    pos = mix(pos, scattered, uScatter);

    // Slow drift noise (in vertex shader, zero JS per-frame cost)
    float drift = sin(uTime * 0.4 + aRandom * 6.28) * 0.012
                + cos(uTime * 0.3 + aRandom * 3.14) * 0.008;
    pos.y += drift;
    pos.x += cos(uTime * 0.25 + aRandom * 6.28) * 0.007;

    // Mouse repulsion
    vec4 clipPos = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vec2 ndc = clipPos.xy / clipPos.w;          // -1..+1 NDC
    vec2 toPointer = ndc - uPointer;
    float dist = length(toPointer);
    if (dist < uRepR && dist > 0.001) {
      float falloff = 1.0 - smoothstep(0.0, uRepR, dist);
      vec2 repel = normalize(toPointer) * falloff * uRepStr;
      pos.xy += repel;
    }

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;

    // Point size: perspective divide + size attribute
    float depth = -mvPos.z;
    float ps = (aSize * uPxRatio * 220.0) / max(depth, 0.5);
    gl_PointSize = clamp(ps, 0.5, 4.0);

    // Alpha: dim particles far from camera; near-zero during scatter
    vAlpha = (1.0 - uScatter * 0.85)
           * (0.25 + 0.75 * (1.0 - smoothstep(2.5, 5.0, depth)));
  }
`;

/* ─── FRAGMENT SHADER ────────────────────────────────────────── */
const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3  uColor;
  uniform float uBrightness;
  varying float vAlpha;

  void main() {
    // Round soft point
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    float a = 1.0 - smoothstep(0.35, 0.5, r);
    if (a < 0.01) discard;

    // Subtle glow ring
    float ring = smoothstep(0.42, 0.48, r);
    vec3 col = mix(uColor, uColor * 0.6, ring);

    gl_FragColor = vec4(col, a * vAlpha * uBrightness);
  }
`;

/* ─── MORPH TARGET BUILDERS ─────────────────────────────────── */
function buildScatterTargets(n) {
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const seed = i / n;
    const a = seed * Math.PI * 2 * 7.3;
    const b = seed * Math.PI * 2 * 11.7;
    arr[i * 3]     = (Math.cos(a) * 2.6 + (seed - 0.5) * 1.4);
    arr[i * 3 + 1] = (Math.sin(b) * 1.8 + (seed * 2 - 1) * 0.8);
    arr[i * 3 + 2] = (Math.cos(b * 0.5) * 0.6);
  }
  return arr;
}

function buildHeroStream(n) {
  // Flowing diagonal river — "data in motion"
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const band = Math.floor(t * 6);
    const bt = (t * 6) % 1;
    const spread = 0.08 + band * 0.03;
    arr[i * 3]     = (bt * 4.0 - 2.0) * (1 + band * 0.05) + (Math.random() - 0.5) * spread;
    arr[i * 3 + 1] = (band - 2.5) * 0.28 + (Math.random() - 0.5) * 0.05;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
  }
  return arr;
}

function buildAboutClusters(n) {
  // 4 tight clusters — one per stat
  const centres = [[-1.4, 0.6, 0],[-0.4, 0.6, 0],[0.6, 0.6, 0],[1.6, 0.6, 0]];
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const ci = i % 4;
    const c = centres[ci];
    const r = Math.sqrt(Math.random()) * 0.25;
    const angle = Math.random() * Math.PI * 2;
    arr[i * 3]     = c[0] + Math.cos(angle) * r;
    arr[i * 3 + 1] = c[1] + Math.sin(angle) * r + (Math.random() - 0.5) * 0.1;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
  }
  return arr;
}

function buildSkillsClusters(n) {
  // 7 clusters arranged in arc — one per skill category
  const arr = new Float32Array(n * 3);
  const numCats = 7;
  const perCat = Math.floor(n / numCats);
  for (let c = 0; c < numCats; c++) {
    const angle = (c / numCats) * Math.PI * 2 - Math.PI / 2;
    const cx = Math.cos(angle) * 1.6;
    const cy = Math.sin(angle) * 0.9;
    const start = c * perCat;
    const end = c === numCats - 1 ? n : (c + 1) * perCat;
    for (let i = start; i < end; i++) {
      const r = Math.sqrt(Math.random()) * 0.28;
      const a = Math.random() * Math.PI * 2;
      arr[i * 3]     = cx + Math.cos(a) * r;
      arr[i * 3 + 1] = cy + Math.sin(a) * r;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    }
  }
  return arr;
}

function buildExpChain(n) {
  // Vertical chain of 4 nodes
  const nodeY = [0.9, 0.3, -0.3, -0.9];
  const arr = new Float32Array(n * 3);
  const perNode = Math.floor(n / 4);
  for (let ni = 0; ni < 4; ni++) {
    const start = ni * perNode;
    const end = ni === 3 ? n : (ni + 1) * perNode;
    const yCentre = nodeY[ni];
    // Connector particles between nodes (thin band)
    for (let i = start; i < end; i++) {
      const t = (i - start) / (end - start);
      if (t < 0.3) {
        // Node cluster
        const r = Math.sqrt(Math.random()) * 0.18;
        const a = Math.random() * Math.PI * 2;
        arr[i * 3]     = Math.cos(a) * r;
        arr[i * 3 + 1] = yCentre + Math.sin(a) * r * 0.4;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
      } else {
        // Connector band to next node
        const nextY = ni < 3 ? nodeY[ni + 1] : nodeY[ni];
        const lt = (t - 0.3) / 0.7;
        arr[i * 3]     = (Math.random() - 0.5) * 0.04;
        arr[i * 3 + 1] = yCentre + (nextY - yCentre) * lt;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      }
    }
  }
  return arr;
}

function buildAmbient(n) {
  // Dim scattered, low density feel
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const seed = i / n;
    arr[i * 3]     = (Math.sin(seed * 23.7 + 1.3) * 2.0);
    arr[i * 3 + 1] = (Math.cos(seed * 17.3 + 0.9) * 1.3);
    arr[i * 3 + 2] = (Math.sin(seed * 11.1) * 0.3);
  }
  return arr;
}

function buildContactForm(n) {
  // Tight ellipse — "data delivered"
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const r = Math.sqrt(Math.random()) * 0.7 + 0.05;
    const a = t * Math.PI * 2 * 137.5 * (Math.PI / 180);
    arr[i * 3]     = Math.cos(a) * r * 1.4;
    arr[i * 3 + 1] = Math.sin(a) * r * 0.9;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
  }
  return arr;
}

/* ─── PARTICLE SYSTEM CLASS ─────────────────────────────────── */
export class ParticleSystem {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    // TUNE: particle counts
    const mobile = window.matchMedia('(max-width: 768px)').matches
                || window.matchMedia('(pointer: coarse)').matches;
    this.N = mobile ? 55_000 : 140_000; // TUNE: PARTICLE_COUNT

    this._buildGeometry();
    this._buildMaterial();
    this._buildMesh();
    this._precomputeTargets();

    // Mutable uniforms
    this.morphProgress = 0;
    this.scatterAmount = 1; // start scattered
    this.pointer = new THREE.Vector2(9999, 9999); // off screen
    this.currentTarget = 'scatter';
    this._targetArrays = {};
  }

  _buildGeometry() {
    const n = this.N;
    const geo = new THREE.BufferGeometry();

    // Start positions = scattered noise
    const pos = new Float32Array(n * 3);
    const rnd = new Float32Array(n);
    const sizes = new Float32Array(n);

    for (let i = 0; i < n; i++) {
      const seed = i / n;
      const a = seed * Math.PI * 2 * 7.3;
      const b = seed * Math.PI * 2 * 11.7;
      pos[i * 3]     = Math.cos(a) * 2.6 + (seed - 0.5) * 1.2;
      pos[i * 3 + 1] = Math.sin(b) * 1.8 + (seed * 2 - 1) * 0.7;
      pos[i * 3 + 2] = Math.cos(b * 0.5) * 0.6;
      rnd[i]   = seed;
      sizes[i] = 0.4 + Math.random() * 0.6; // varied size
    }

    geo.setAttribute('aCurrent', new THREE.BufferAttribute(pos.slice(), 3));
    geo.setAttribute('aTarget',  new THREE.BufferAttribute(pos.slice(), 3));
    geo.setAttribute('aRandom',  new THREE.BufferAttribute(rnd, 1));
    geo.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1));
    this.geo = geo;
    this._initPos = pos;
  }

  _buildMaterial() {
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime:       { value: 0 },
        uMorph:      { value: 0 },
        uScatter:    { value: 1 },
        uPointer:    { value: new THREE.Vector2(9999, 9999) },
        uRepR:       { value: 0.18 },   // TUNE: REPULSION_RADIUS
        uRepStr:     { value: 0.07 },   // TUNE: REPULSION_STRENGTH
        uPxRatio:    { value: Math.min(window.devicePixelRatio, 2) },
        uColor:      { value: new THREE.Color(0x0F766E) },
        uBrightness: { value: 0.85 },
      },
    });
  }

  _buildMesh() {
    this.points = new THREE.Points(this.geo, this.mat);
    this.scene.add(this.points);
  }

  _precomputeTargets() {
    const n = this.N;
    this._targets = {
      scatter:   buildScatterTargets(n),
      hero:      buildHeroStream(n),
      about:     buildAboutClusters(n),
      skills:    buildSkillsClusters(n),
      experience: buildExpChain(n),
      ambient:   buildAmbient(n),
      contact:   buildContactForm(n),
    };
  }

  /**
   * Morph to a named formation.
   * Called by the scroll timeline.
   * Uses GSAP to tween uMorph 0→1, then swaps aCurrent.
   */
  morphTo(formationName, duration = 1.2, ease = 'power2.inOut') {
    if (!this._targets[formationName]) return;
    if (this.currentTarget === formationName) return;

    const targetArr = this._targets[formationName];
    const geo = this.geo;

    // Copy current interpolated positions into aCurrent
    // so we always animate FROM where we are now
    const curr = geo.attributes.aCurrent.array;
    const tgt  = geo.attributes.aTarget.array;
    const morph = this.mat.uniforms.uMorph.value;

    for (let i = 0; i < curr.length; i++) {
      curr[i] = curr[i] + (tgt[i] - curr[i]) * morph;
    }
    geo.attributes.aCurrent.needsUpdate = true;

    // Set new target
    geo.attributes.aTarget.array.set(targetArr);
    geo.attributes.aTarget.needsUpdate = true;

    this.mat.uniforms.uMorph.value = 0;
    this.currentTarget = formationName;

    // Tween uMorph 0→1 with GSAP (loaded globally from CDN)
    if (window.gsap) {
      gsap.to(this.mat.uniforms.uMorph, {
        value: 1, duration, ease,
        overwrite: true,
      });
      // Fade scatter during morph
      gsap.to(this.mat.uniforms.uScatter, {
        value: 0, duration: duration * 0.6, ease,
        overwrite: true,
      });
    } else {
      this.mat.uniforms.uMorph.value = 1;
      this.mat.uniforms.uScatter.value = 0;
    }
  }

  /** Highlight a specific skill category cluster */
  highlightCluster(catIndex) {
    // Pulse brightness on that cluster only — handled by shifting uPointer
    // toward cluster centre so repulsion effect reveals it. Simple but effective.
    if (!this._targets.skills) return;
    const centres = [
      [-0, 0.9], [0.9, 0.55], [1.56, 0],
      [1.56, -0.55], [0.9, -0.9], [-0.9, -0.9], [-1.56, -0.55]
    ];
    const c = centres[catIndex % centres.length];
    // Convert from world to NDC (approximate)
    this.mat.uniforms.uPointer.value.set(c[0] * 0.35, c[1] * 0.55);
  }

  clearHighlight() {
    this.mat.uniforms.uPointer.value.set(9999, 9999);
  }

  setPointer(ndcX, ndcY) {
    this.mat.uniforms.uPointer.value.set(ndcX, ndcY);
  }

  tick(elapsedSeconds) {
    this.mat.uniforms.uTime.value = elapsedSeconds;
  }
}

/* ─── RENDERER + SCENE SETUP ─────────────────────────────────── */
export function createScene() {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return null;

  // Check WebGL support
  try {
    const testCtx = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!testCtx) throw new Error('no webgl');
  } catch {
    document.documentElement.classList.add('no-webgl');
    return null;
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // TUNE: pixel ratio cap
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 3.5;

  function onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize, { passive: true });

  return { renderer, scene, camera };
}
