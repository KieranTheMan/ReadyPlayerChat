import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

export default function AvatarScene() {
  const { scene } = useGLTF(
    "https://models.readyplayer.me/67aa505799f23ddeb5c5c6c1.glb"
  );
  const [cameraPosition, setCameraPosition] = useState([0, 1, 5]); // Default camera position
  const avatarRef = useRef(); // Ref for avatar or 3D object

  useEffect(() => {
    // Optionally, adjust the camera position dynamically based on avatar or user interaction
    setCameraPosition([-6, 5, 9]); // Default position
  }, []);
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      {/* Perspective Camera: Default settings like Ready Player Me Avatar Creator */}
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
        fov={54} // Field of view (adjust for more zoomed-in or zoomed-out effect)
        near={0.1}
        far={1000}
      />
      <ambientLight intensity={2} />
      <directionalLight intensity={3} position={[2, 2, 2]} />
      <primitive
        ref={avatarRef}
        object={scene}
        rotation={[0, 5.7, 0]}
        position={[0, -4, 0]}
        scale={5}
      />
      ; /* OrbitControls: Allow user to interact with camera */
      <OrbitControls
        target={avatarRef.current ? avatarRef.current.position : [0, 1, 0]}
        enablePan={false}
      />
    </Canvas>
  );
}
