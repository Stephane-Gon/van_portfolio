import { useEffect, useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

type useInfoPointProps = {
  sceneReady: boolean;
};

// TODO - Ver se dá para melhorar performance aqui
// TODO - Mudar o design dos pontos

const useInfoPoints = ({ sceneReady }: useInfoPointProps) => {
  const { camera, scene, size } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  const points = [
    {
      position: new THREE.Vector3(1.55, 1, 1),
      elementRef: useRef<HTMLDivElement | null>(null),
    },
  ];

  useEffect(() => {
    // Append the dynamically created elements to the body
    points.forEach((point, idx) => {
      const element = document.createElement('div');
      element.className = `point point-${idx}`;
      element.innerHTML = `
        <div class="label">${idx + 1}</div>
        <div class="text">Lorem, ipsum dolor sit amet consectetur adipisicing elit</div>
      `;
      document.body.appendChild(element);
      point.elementRef.current = element;
    });

    return () => {
      points.forEach(point => {
        if (point.elementRef.current) {
          document.body.removeChild(point.elementRef.current);
        }
      });
    };
  }, []);

  useFrame(() => {
    if (sceneReady) {
      points.forEach(point => {
        const screenPosition = point.position.clone();
        screenPosition.project(camera);

        raycaster.setFromCamera(new THREE.Vector2(screenPosition.x, screenPosition.y), camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (point.elementRef.current) {
          if (intersects.length === 0) {
            point.elementRef.current.classList.add('visible');
          } else {
            const intersectionDistance = intersects[0].distance;
            const pointDistance = point.position.distanceTo(camera.position);

            if (intersectionDistance < pointDistance) {
              point.elementRef.current.classList.remove('visible');
            } else {
              point.elementRef.current.classList.add('visible');
            }
          }

          const translateX = screenPosition.x * size.width * 0.5;
          const translateY = -screenPosition.y * size.height * 0.5;
          point.elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
        }
      });
    }
  });

  return null;
};

export default useInfoPoints;
