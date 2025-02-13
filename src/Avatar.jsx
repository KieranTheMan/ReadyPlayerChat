import React, { useEffect, useRef, useState } from "react";
import { useFBX, useGLTF, useAnimations } from "@react-three/drei";

export default function Avatar(props) {
  const { nodes, materials } = useGLTF("/models/67aa505799f23ddeb5c5c6c1.glb");
  const { animations: IdleAnimation } = useFBX("animations/BreathingIdle.fbx");
  const { animations: DanceAnimation } = useFBX("animations/HipHopDancing.fbx");
  const { animations: GreetingAnimation } = useFBX("animations/Salute.fbx");

  IdleAnimation[0].name = "Idle";
  DanceAnimation[0].name = "Dance";
  GreetingAnimation[0].name = "Greeting";

  const [animation, setAnimation] = useState("Dance");

  const avatarGroupRef = useRef();
  const { actions } = useAnimations(
    [IdleAnimation[0], DanceAnimation[0], GreetingAnimation[0]],
    avatarGroupRef
  );

  console.log("Animation:", IdleAnimation[0]);

  useEffect(() => {
    console.log("Available actions:", actions);
    console.log("Selected animation:", animation);
    console.log("Action Object:", actions[animation]);

    //Check the actions object and animation is properly loaded before trying to use it, Stops Errors.
    if (!actions || Object.keys(actions).length === 0) {
      console.warn("Actions are still loading...");
      return;
    }

    if (actions[animation]) {
      actions[animation].reset().fadeIn(0.5).play();
    } else {
      console.warn(`Animation "${animation}" not found`);
    }

    return () => {
      if (actions[animation]) {
        actions[animation].fadeOut(0.5);
      }
    };
  }, [actions, animation]);

  return (
    <group {...props} dispose={null} ref={avatarGroupRef}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
    </group>
  );
}

useGLTF.preload("/67aa505799f23ddeb5c5c6c1.glb");
