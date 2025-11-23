'use client';

import React, { useEffect, useRef, useState, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

/**
 * HeroPipeline3D Component - Premium Full-Screen 3D Animated Hero
 * 
 * Enterprise-grade hero section with stunning 3D pipeline visualization.
 * 
 * Features:
 * - Full viewport 3D WebGL animation using Three.js
 * - Smooth glowing curved pipeline with CatmullRomCurve3
 * - 100+ floating particles flowing along path
 * - Mouse-based parallax and camera interaction
 * - Mobile-optimized with lightweight SVG fallback
 * - Brand colors: Navy (#153B6B), Teal (#00A8B5), Light (#E9ECEF)
 * - GPU-accelerated for 60-120 FPS performance
 * - Responsive text overlay with glassmorphism
 * 
 * Technical Implementation:
 * - WebGL rendering with antialiasing
 * - Ambient + point lighting for depth
 * - Tube geometry for pipeline
 * - Particle system with BufferGeometry
 * - Mouse interaction for dynamic camera
 * - Proper cleanup and disposal
 * 
 * @param {Object} props - Component properties
 * @param {string} props.brandName - Company brand name
 * @param {string} props.headline - Primary headline text
 * @param {string} props.description - Supporting description
 */
export default function HeroPipeline3D({
  brandName = "SCO-SMB",
  headline = "Enterprise Document Scanning for Kyocera & Sharp Printers",
  description = "Secure, automated document ingestion with zero-configuration network discovery, enterprise-grade security, and intelligent file organization."
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Detect mobile devices and viewport size for fallback rendering
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(mobile);
      setIsLoaded(true);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-linear-to-br from-[#0a1628] via-[#153B6B] to-[#1a4d7a]">
      {/* 3D WebGL Pipeline (Desktop only - high performance) */}
      {isLoaded && !isMobile && <ThreePipelineScene />}
      
      {/* Mobile Fallback - Lightweight SVG (instant load) */}
      {isLoaded && isMobile && <MobilePipelineFallback />}

      {/* Depth gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none z-10" />

      {/* Hero Content - Centered overlay */}
      <div className="relative z-20 w-full h-full flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          
          {/* Brand Badge with glow */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#00A8B5] animate-pulse shadow-[0_0_10px_rgba(0,168,181,0.8)]" />
            <span className="text-sm font-semibold text-[#00A8B5] tracking-wide">{brandName}</span>
          </div>

          {/* Main Headline - Large, bold, premium */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.1] tracking-tight max-w-5xl mx-auto drop-shadow-2xl">
            {headline}
          </h1>

          {/* Description - Clear, readable */}
          <p className="text-lg sm:text-xl lg:text-2xl text-[#E9ECEF] max-w-4xl mx-auto leading-relaxed font-light">
            {description}
          </p>

          {/* CTA Buttons - Premium style */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
            <Link
              href="/trial"
              className="group px-8 py-4 bg-[#00A8B5] hover:bg-[#008c97] text-white text-lg font-bold rounded-xl transition-all duration-300 shadow-xl hover:shadow-[0_0_40px_rgba(0,168,181,0.6)] hover:scale-105 transform"
            >
              <span className="flex items-center justify-center gap-2">
                Start Free Trial
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <Link
              href="/download"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-lg font-bold rounded-xl transition-all duration-300 border-2 border-white/30 hover:border-white/50"
            >
              Watch Demo
            </Link>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-4 justify-center pt-4 text-sm text-[#E9ECEF]">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">✓ Zero Configuration</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">✓ Enterprise Security</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">✓ Network Discovery</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-7 h-11 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-white/60 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

/**
 * ThreePipelineScene Component
 * 
 * Premium 3D WebGL scene with animated pipeline, particles, and lighting.
 * Optimized for high FPS (60-120) with GPU acceleration.
 */
function ThreePipelineScene() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Store ref value for cleanup
    const container = containerRef.current;

    // ==========================================
    // SCENE INITIALIZATION
    // ==========================================
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a1628, 15, 60);
    sceneRef.current = scene;

    // ==========================================
    // CAMERA SETUP
    // Perspective camera for depth perception
    // ==========================================
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 18);
    camera.lookAt(0, 0, 0);

    // ==========================================
    // RENDERER CONFIGURATION
    // GPU-accelerated WebGL with antialiasing
    // ==========================================
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ==========================================
    // LIGHTING SETUP
    // Ambient + multiple point lights for depth
    // ==========================================
    
    // Base ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Main teal accent light
    const pointLight1 = new THREE.PointLight(0x00A8B5, 3, 60);
    pointLight1.position.set(12, 8, 10);
    scene.add(pointLight1);

    // Secondary navy blue light
    const pointLight2 = new THREE.PointLight(0x153B6B, 2, 60);
    pointLight2.position.set(-12, -5, 8);
    scene.add(pointLight2);

    // Accent highlight
    const pointLight3 = new THREE.PointLight(0x00A8B5, 1.5, 40);
    pointLight3.position.set(0, 10, -5);
    scene.add(pointLight3);

    // ==========================================
    // PIPELINE CURVE DEFINITION
    // Using CatmullRomCurve3 for smooth 3D path
    // ==========================================
    
    const curvePoints = [
      new THREE.Vector3(-15, -4, 2),
      new THREE.Vector3(-10, 3, -1),
      new THREE.Vector3(-5, -2, 3),
      new THREE.Vector3(0, 4, 0),
      new THREE.Vector3(5, -1, -2),
      new THREE.Vector3(10, 2, 1),
      new THREE.Vector3(15, -3, -1),
    ];

    // Create smooth flowing curve through points
    const curve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.4);

    // ==========================================
    // PIPELINE TUBE MESH
    // Main glowing tube with emissive material
    // ==========================================
    
    const tubeGeometry = new THREE.TubeGeometry(curve, 300, 0.2, 20, false);
    const tubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x00A8B5,
      emissive: 0x00A8B5,
      emissiveIntensity: 0.6,
      shininess: 120,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
    const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tubeMesh);

    // Outer glow layer for bloom effect
    const glowGeometry = new THREE.TubeGeometry(curve, 300, 0.35, 20, false);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00A8B5,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // ==========================================
    // NODE SPHERES
    // Connection points along the pipeline
    // ==========================================
    
    const nodePositions = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
    const nodes = [];

    nodePositions.forEach((t, index) => {
      const point = curve.getPoint(t);
      
      // Core sphere
      const coreGeometry = new THREE.SphereGeometry(0.4, 32, 32);
      const coreMaterial = new THREE.MeshPhongMaterial({
        color: 0x00A8B5,
        emissive: 0x00A8B5,
        emissiveIntensity: 0.8,
        shininess: 100,
      });
      const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
      coreMesh.position.copy(point);
      scene.add(coreMesh);

      // Outer ring indicator
      const ringGeometry = new THREE.TorusGeometry(0.55, 0.08, 16, 50);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x00A8B5,
        transparent: true,
        opacity: 0.5,
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.position.copy(point);
      scene.add(ringMesh);

      nodes.push({ 
        core: coreMesh, 
        ring: ringMesh, 
        offset: index * 0.7 
      });
    });

    // ==========================================
    // PARTICLE SYSTEM
    // Flowing particles along the pipeline curve
    // ==========================================
    
    const particleCount = 150;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleProgress = new Float32Array(particleCount);
    const particleSpeeds = new Float32Array(particleCount);

    // Initialize particles with random positions and speeds
    for (let i = 0; i < particleCount; i++) {
      particleProgress[i] = Math.random();
      particleSpeeds[i] = 0.0005 + Math.random() * 0.001;
      
      const point = curve.getPoint(particleProgress[i]);
      particlePositions[i * 3] = point.x;
      particlePositions[i * 3 + 1] = point.y;
      particlePositions[i * 3 + 2] = point.z;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ==========================================
    // MOUSE INTERACTION HANDLERS
    // Parallax effect based on cursor position
    // ==========================================
    
    const handleMouseMove = (event) => {
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ==========================================
    // RESPONSIVE RESIZE HANDLER
    // Maintain aspect ratio and full viewport
    // ==========================================
    
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // ==========================================
    // ANIMATION LOOP
    // 60+ FPS rendering with smooth animations
    // ==========================================
    
    let time = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      time += delta;

      // Smooth mouse parallax with lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.02;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.02;

      // Subtle pipeline rotation
      const rotationAmount = Math.sin(time * 0.2) * 0.15;
      tubeMesh.rotation.z = rotationAmount;
      glowMesh.rotation.z = rotationAmount;

      // Animate node spheres with pulsing and rotation
      nodes.forEach((node) => {
        const pulseScale = 1 + Math.sin(time * 2.5 + node.offset) * 0.15;
        node.core.scale.set(pulseScale, pulseScale, pulseScale);
        
        node.ring.rotation.x = time * 0.8 + node.offset;
        node.ring.rotation.y = time * 0.5 + node.offset;
        
        const ringPulse = 0.8 + Math.sin(time * 2 + node.offset) * 0.2;
        node.ring.material.opacity = ringPulse;
      });

      // Update particle positions along curve
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        particleProgress[i] += particleSpeeds[i];
        if (particleProgress[i] > 1) {
          particleProgress[i] = 0;
        }

        const point = curve.getPoint(particleProgress[i]);
        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y;
        positions[i * 3 + 2] = point.z;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Camera parallax with mouse
      const targetCamX = mouseRef.current.x * 3;
      const targetCamY = mouseRef.current.y * 2 + 3;
      
      camera.position.x += (targetCamX - camera.position.x) * 0.015;
      camera.position.y += (targetCamY - camera.position.y) * 0.015;

      // Subtle autonomous camera movement
      camera.position.x += Math.sin(time * 0.15) * 0.03;
      camera.position.y += Math.cos(time * 0.12) * 0.025;

      // Always look at scene center
      camera.lookAt(0, 0, 0);

      // Animate point lights
      pointLight1.position.x = 12 + Math.sin(time * 0.5) * 3;
      pointLight1.position.y = 8 + Math.cos(time * 0.3) * 2;
      
      pointLight2.position.x = -12 + Math.cos(time * 0.4) * 3;
      pointLight2.position.z = 8 + Math.sin(time * 0.6) * 2;

      // Render scene
      renderer.render(scene, camera);
    };

    animate();

    // ==========================================
    // CLEANUP
    // Proper disposal to prevent memory leaks
    // ==========================================
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      // Dispose geometries
      tubeGeometry.dispose();
      glowGeometry.dispose();
      particleGeometry.dispose();

      // Dispose materials
      tubeMaterial.dispose();
      glowMaterial.dispose();
      particleMaterial.dispose();

      // Dispose nodes
      nodes.forEach(node => {
        node.core.geometry.dispose();
        node.core.material.dispose();
        node.ring.geometry.dispose();
        node.ring.material.dispose();
      });

      // Clean up renderer
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.75 }}
    />
  );
}

/**
 * MobilePipelineFallback Component
 * 
 * Lightweight SVG animation for mobile devices.
 * Instant loading without WebGL overhead.
 */
function MobilePipelineFallback() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-40">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient for pipeline */}
          <linearGradient id="mobileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A8B5" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#153B6B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00A8B5" stopOpacity="0.8" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="mobileGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Simplified flowing paths */}
        <g filter="url(#mobileGlow)">
          <path
            d="M 50 250 Q 300 150, 600 300 Q 900 450, 1150 300"
            fill="none"
            stroke="url(#mobileGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 50 550 Q 300 650, 600 500 Q 900 350, 1150 500"
            fill="none"
            stroke="url(#mobileGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>

        {/* Node circles */}
        {[
          [300, 200], [600, 300], [900, 400],
          [300, 600], [600, 500], [900, 450]
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="12" fill="#00A8B5" opacity="0.7" />
            <circle cx={x} cy={y} r="18" fill="none" stroke="#00A8B5" strokeWidth="2" opacity="0.5" />
          </g>
        ))}
      </svg>
    </div>
  );
}
