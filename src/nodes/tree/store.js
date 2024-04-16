import { create } from "zustand";
import { groupBy } from "lodash";

// const createNode = (meshes, keys, id, visibilityCB, i = 0) => {
//   const _key = keys[i++];
//   const children =
//     _key === undefined
//       ? []
//       : meshes.length === 0 && i === 1
//       ? [{ name: "none", id: "none", children: [] }]
//       : Object.entries(groupBy(meshes, `userData.${_key}`)).map(([k, v]) => {
//           //   v.parent = meshes;
//           return createNode(v, keys, k, i);
//         });

//   return {
//     children: children,
//     id: id ?? "root",
//     name: id ?? "root",
//     meshes,
//   };
// };

const useTreeStroe = create((set, get) => ({
  tree: [],
  keys: [],
  checked: [],
  selected: [],
  setRoot: (meshes, keys, depth = 0) => {
    if ((meshes ?? []).length === 0 || (keys ?? []).length === 0) {
      set({ tree: [], keys });
      return;
    }

    const _key = keys[depth];
    const tree = Object.entries(groupBy(meshes, `userData.${_key}`)).map(
      ([k, v]) => {
        //   v.parent = meshes;
        return { title: k, key: `${k}`, isLeaf: v.length === 0, subMeshes: v };
      }
    );
    set({ tree, keys, checked: [], selected: [] });
  },
  setLeaf: (treeNode) => {
    const { tree, keys } = get();
    const indexes = treeNode.pos.split("-").map((i) => Number(i).toFixed(0));
    indexes.shift();
    const lastKey = keys.length === indexes.length + 1;
    return new Promise((r) => {
      let _tree = tree;
      const _key = keys[indexes.length];
      for (let idx of indexes) {
        _tree = Array.isArray(_tree.children)
          ? _tree.children[idx]
          : _tree[idx];
      }
      _tree.children = Object.entries(
        groupBy(_tree.subMeshes, `userData.${_key}`)
      ).map(([k, v]) => {
        return {
          title: k,
          key: `${treeNode.key}:${k}`,
          isLeaf: lastKey || v.length === 0,
          subMeshes: v,
        };
      });
      set({ tree: [...tree] });
      r();
    });
  },
  setChecked: (v) => {
    set({ checked: v });
  },
  setSelected: (v) => {
    if (Array.isArray(v) && typeof v[0] === "string") {
      set({ selected: v });
      return;
    }

    const { keys } = get();

    const _data = v?.userData;
    if (!_data) {
      set({ selected: [] });
      return;
    }
    const _ids = [];
    for (let _key of keys) {
      const _val = _data[_key] ?? "";
      if (_val.trim() === "") break;
      _ids.push(_val);
    }
    if (_ids.length === 0) return;
    set({ selected: [_ids.join(":")] });
  },
}));

export default useTreeStroe;
