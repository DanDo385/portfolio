// components/ThreeScene.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0077ff); // Blue background
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    camera.add(pointLight);
    scene.add(camera);

    // Blockchain creation
    const blockchain = [];
    const material = new THREE.MeshLambertMaterial({ color: 0xffa500 }); // Bright orange
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = i * 1.1;
      blockchain.push(cube);
      scene.add(cube);
    }

    camera.position.z = 30;

    let direction = 0.1;

    function animate() {
      requestAnimationFrame(animate);

      blockchain.forEach((block, idx) => {
        // Simple slithering movement
        block.rotation.x += 0.01;
        block.rotation.y += 0.01;
        block.position.x += Math.sin(Date.now() * 0.001 + idx) * 0.01;
        block.position.y += Math.cos(Date.now() * 0.001 + idx) * direction;
      });

      // Change direction randomly
      if (Math.random() < 0.01) {
        direction = -direction;
      }

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeScene;
