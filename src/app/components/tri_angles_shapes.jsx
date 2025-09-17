'use client'
import { get } from 'http';
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function Three() {
    const mountRef = useRef(null);
    function getCSSBackgroundColor(){
        return [
            getComputedStyle(document.documentElement)
            .getPropertyValue('--background')
            .trim(),
            getComputedStyle(document.documentElement)
            .getPropertyValue('--foreground')
            .trim()
        ];
    }
    useEffect(() => {
        if (!mountRef.current) return;
        const currentMount = mountRef.current;
        // listen to windows prefer scheme change
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            console.log(getCSSBackgroundColor());
            scene.background.set(getCSSBackgroundColor()[0]);
            particlesMaterial.color.set(getCSSBackgroundColor()[1]);
        });
        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            currentMount.clientWidth / currentMount.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        // controll
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        // Particle data
        
        const COUNT = 1000;
        const positions = new Float32Array(COUNT * 3);
        const angles = new Float32Array(COUNT);
        const radii = new Float32Array(COUNT);
        const speeds = new Float32Array(COUNT);
        const axes = new Float32Array(COUNT);
        const particlesColor = getCSSBackgroundColor()[1];
        const bgColor = getCSSBackgroundColor()[0];

        const R_MIN = 1.5, R_MAX = 5.0;

        // start new loop for random move inside sphere

        for (let i = 0; i < COUNT; i++) {
            axes[i] = Math.floor(Math.random() * 3);
            angles[i] = Math.random() * Math.PI * 2;
            radii[i] = R_MIN + Math.random() * (R_MAX - R_MIN);
            speeds[i] = 0.3 + Math.random() * 1.0;

            // Generate random spherical coordinates
            const theta = Math.random() * Math.PI; // Polar angle (0 to π)
            const phi = Math.random() * Math.PI * 2; // Azimuthal angle (0 to 2π)

            // Convert spherical coordinates to Cartesian coordinates
            const x = radii[i] * ((Math.random() * 2)-1);
            const y = radii[i] * ((Math.random() * 2)-1);
            const z = radii[i] * ((Math.random() * 2)-1);

            positions[3 * i] = x;
            positions[3 * i + 1] = y;
            positions[3 * i + 2] = z;
        }





        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        );

        const particlesMaterial = new THREE.PointsMaterial({
            color: new THREE.Color(particlesColor),
            size: 0.1
        });

        const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particleSystem);
        scene.background = new THREE.Color(bgColor);

        // Animation Loop
        let animationFrameId;
        const clock = new THREE.Clock();
        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            // new loop
            const dt = clock.getDelta();

            for (let i = 0; i < COUNT; i++) {
                angles[i] += speeds[i] * dt;

                // Generate random spherical coordinates
                const theta = Math.random() * Math.PI; // Polar angle (0 to π)
                const phi = Math.random() * Math.PI * 2; // Azimuthal angle (0 to 2π)

                const x = Math.cos(angles[i]) * radii[i];
                const y = (Math.tan(angles[i]) * radii[i]);
                const z = Math.sin(angles[i]) * radii[i];
                positions[3 * i] = x;
                positions[3 * i + 1] = y;
                positions[3 * i + 2] = z;
            }
            particlesGeometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
            controls.update();
        }
        animate();

        // Handle window resizing
        const handleResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
        }
        // Cleanup
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
            cancelAnimationFrame(animationFrameId);
            currentMount.removeChild(renderer.domElement);
            scene.remove(particleSystem);
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (<div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />);
}

export default Three;