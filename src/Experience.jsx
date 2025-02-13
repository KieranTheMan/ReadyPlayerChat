import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import Avatar from "./Avatar";

export const Experience = () => {
  return (
    <>
      <OrbitControls
        // minPolarAngle={Math.PI / 2.5}
        // maxPolarAngle={Math.PI / 2.5}
        // enablePan={false}
        // enableZoom={false}
        // rotateSpeed={0.1}
      />
      <Avatar />
      
      <Environment preset="sunset" />
      <ContactShadows opacity={0.5} scale={10} blur={1} far={10} resolution={256} color="#000000" />

    </>
  );
};
