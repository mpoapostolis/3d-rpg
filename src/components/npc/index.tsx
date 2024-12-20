/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    BaseHuman_1: THREE.SkinnedMesh;
    BaseHuman_2: THREE.SkinnedMesh;
    BaseHuman_3: THREE.SkinnedMesh;
    BaseHuman_4: THREE.SkinnedMesh;
    BaseHuman_5: THREE.SkinnedMesh;
    BaseHuman_6: THREE.SkinnedMesh;
    BaseHuman_7: THREE.SkinnedMesh;
    BaseHuman_8: THREE.SkinnedMesh;
    BaseHuman_9: THREE.SkinnedMesh;
    Bone: THREE.Bone;
  };
  materials: {
    Shirt2: THREE.MeshStandardMaterial;
    Shirt: THREE.MeshStandardMaterial;
    Skin: THREE.MeshStandardMaterial;
    Pants: THREE.MeshStandardMaterial;
    Shoes: THREE.MeshStandardMaterial;
    Socks: THREE.MeshStandardMaterial;
    Hair2: THREE.MeshStandardMaterial;
    Hair: THREE.MeshStandardMaterial;
    Eyes: THREE.MeshStandardMaterial;
  };
};

type ActionName =
  | "HumanArmature|Man_Clapping"
  | "HumanArmature|Man_Death"
  | "HumanArmature|Man_Idle"
  | "HumanArmature|Man_Jump"
  | "HumanArmature|Man_Punch"
  | "HumanArmature|Man_Run"
  | "HumanArmature|Man_RunningJump"
  | "HumanArmature|Man_Sitting"
  | "HumanArmature|Man_Standing"
  | "HumanArmature|Man_SwordSlash"
  | "HumanArmature|Man_Walk";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export function Npc(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    "/scene_GRKwy6sDPh.glb"
  ) as GLTFResult;
  const { actions } = useAnimations<GLTFActions>(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="HumanArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Bone} />
          </group>
          <group name="BaseHuman" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="BaseHuman_1"
              geometry={nodes.BaseHuman_1.geometry}
              material={materials.Shirt2}
              skeleton={nodes.BaseHuman_1.skeleton}
            />
            <skinnedMesh
              name="BaseHuman_2"
              geometry={nodes.BaseHuman_2.geometry}
              material={materials.Shirt}
              skeleton={nodes.BaseHuman_2.skeleton}
            />
            <skinnedMesh
              name="BaseHuman_3"
              geometry={nodes.BaseHuman_3.geometry}
              material={materials.Skin}
              skeleton={nodes.BaseHuman_3.skeleton}
            />
            <skinnedMesh
              name="BaseHuman_4"
              geometry={nodes.BaseHuman_4.geometry}
              material={materials.Pants}
              skeleton={nodes.BaseHuman_4.skeleton}
            />
            <skinnedMesh
              name="BaseHuman_5"
              geometry={nodes.BaseHuman_5.geometry}
              material={materials.Shoes}
              skeleton={nodes.BaseHuman_5.skeleton}
            />
            <skinnedMesh
              name="BaseHuman_6"
              geometry={nodes.BaseHuman_6.geometry}
              material={materials.Socks}
              skeleton={nodes.BaseHuman_6.skeleton}
            />
            <skinnedMesh
              name="BaseHuman_7"
              geometry={nodes.BaseHuman_7.geometry}
              material={materials.Hair2}
              skeleton={nodes.BaseHuman_7.skeleton}
            />
            <skinnedMesh
              name="BaseHuman_8"
              geometry={nodes.BaseHuman_8.geometry}
              material={materials.Hair}
              skeleton={nodes.BaseHuman_8.skeleton}
            />
            <skinnedMesh
              name="BaseHuman_9"
              geometry={nodes.BaseHuman_9.geometry}
              material={materials.Eyes}
              skeleton={nodes.BaseHuman_9.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/scene_GRKwy6sDPh.glb");
