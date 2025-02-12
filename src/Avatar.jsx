import { useGLTF, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

export default function Avatar() {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <AvatarScene/>
    </Canvas>
  );
}

function AvatarScene() {
  const { scene: avatar } = useGLTF(
    "https://models.readyplayer.me/67aa505799f23ddeb5c5c6c1.glb"
  );

  const avatarRef = useRef();
  const [cameraPosition, setCameraPosition] = useState([0, 1, 5]);

  useEffect(() => {
    // Adjust and set the camera position on render
    setCameraPosition([0, -6, 0]);
  }, []);

  return (
    <>
      {/* Perspective Camera */}
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
        fov={20}
        near={0.1}
        far={1000}
      />
      <ambientLight intensity={2} />
      <directionalLight intensity={3} position={[2, 2, 2]} />

      <primitive
        ref={avatarRef}
        object={avatar}
        position={[0, -8.2, 0]}
        scale={5}
      />

      {/* Allow user to interact with the scene */}
      <OrbitControls 
      // Lock vertical rotation
      minPolarAngle={Math.PI / 2.5} 
      maxPolarAngle={Math.PI / 2.5}
      enablePan={false}
      enableZoom={false}
      rotateSpeed={0.1}
      />
    </>
  );
}