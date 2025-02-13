import { Experience } from "./Experience";
import { Canvas } from "@react-three/fiber";
function App() {
  return (
    <>
      <Canvas style={{ width: "100vw", height: "100vh" }}>
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
