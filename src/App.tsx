import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf"; // 查看性能
import PingPong from "./PingPong";
import { useStore } from "./store.tsx";
const style = (welcome) => ({
  color: "#000000",
  display: welcome ? "block" : "none",
  fontSize: "1.8em",
  left: "50%",
  position: "absolute",
  top: 40,
  transform: "translateX(-50%)",
  background: "rgba(255, 255, 255, .2)",
  backdropFilter: "blur(4px)",
  padding: "16px",
  whiteSpace: "nowrap",
  borderRadius: "12px",
  boxShadow: "1px 1px 2px rgba(0, 0, 0, .2)",
  border: "1px groove rgba(255, 255, 255, .2)",
  textShadow:
    "0px 1px 2px rgba(255, 255, 255, .2), 0px 2px 2px rgba(255, 255, 255, .8), 0px 2px 4px rgba(0, 0, 0, .5)",
  zIndex: "11111",
});
export default function App() {
  const welcome = useStore((state) => state.welcome);
  const { reset } = useStore((state) => state.api);
  return (
    <div id="canvas-container" style={{ height: "100%" }}>
      <Canvas
        shadows
        camera={{ fov: 50, position: [0, 5, 12] }}
        onPointerMissed={() => welcome && reset(false)}
      >
        <Perf position="top-right" />
        <color attach="background" args={["#171720"]} />
        <ambientLight intensity={2.5} />
        <pointLight position={[-10, -10, -10]} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />
        <PingPong />
        <gridHelper
          args={[50, 50, "#11f1ff", "#0b50aa"]}
          position={[0, -1.1, -4]}
          rotation={[Math.PI / 2.68, 0, 0]}
        />
      </Canvas>
      <div className="tips" style={style(welcome)}>
        🏓 点击任意区域开始颠球
      </div>
    </div>
  );
}
