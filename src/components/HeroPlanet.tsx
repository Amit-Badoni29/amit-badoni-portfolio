import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Planet() {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);


  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0008;
      const mouseInfluence = state.pointer.x * 0.15;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mouseInfluence,
        0.03
      );
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        state.pointer.x * 0.5,
        0.04
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        -state.pointer.y * 0.3,
        0.04
      );
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= 0.0005;
      atmosphereRef.current.position.copy(meshRef.current?.position ?? new THREE.Vector3());
    }
  });

  const planetMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1a1f3a'),
        roughness: 0.85,
        metalness: 0.15,
        emissive: new THREE.Color('#0a0e2a'),
        emissiveIntensity: 0.4,
      }),
    []
  );

  const atmosphereMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#64FFDA'),
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide,
      }),
    []
  );

  return (
    <>
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#E8ECF4" />
      <ambientLight intensity={0.15} color="#38BDF8" />
      <pointLight position={[-5, -2, 3]} intensity={0.5} color="#4338CA" />

      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 64, 64]} />
        <primitive object={planetMaterial} attach="material" />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.15}>
        <sphereGeometry args={[2, 32, 32]} />
        <primitive object={atmosphereMaterial} attach="material" />
      </mesh>

      {/* Orbital ring */}
      <mesh rotation={[Math.PI / 2.5, 0.3, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[3, 3.02, 128]} />
        <meshBasicMaterial color="#64FFDA" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Small moon */}
      <Moon />
    </>
  );
}

function Moon() {
  const moonRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={moonRef}>
      <mesh position={[3.5, 0.5, -1]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#2a2f4a" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
}

interface HeroPlanetProps {
  className?: string;
}

export function HeroPlanet({ className = '' }: HeroPlanetProps) {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) return null;

  return (
    <div className={`absolute pointer-events-none ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2)}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <Planet />
      </Canvas>
    </div>
  );
}
