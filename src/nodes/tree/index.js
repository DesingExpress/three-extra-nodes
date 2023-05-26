import React, { useEffect, useMemo, useState } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import { AutoSizer } from "react-virtualized";

const testtreeData = [
  {
    title: "empty",
    key: "0-0",
  },
];

function convertArrayToObject(arr) {
  const map = new Map();
  for (const { name, children = undefined } of arr) {
    const childrenMap = Array.isArray(children)
      ? convertArrayToObject(children)
      : undefined;
    map.set(name, childrenMap);
  }

  return map;
}

export function GraphicTree({
  scene,
  sortBy,
  whenUpdate,
  onChange,
  onSelect,
  style,
}) {
  const [tree, setTree] = useState(testtreeData);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const _structure = useMemo(() => convertArrayToObject(sortBy), [sortBy]);
  function handleSelect(selectedKeys) {
    if (!selectedKeys || !selectedKeys[0]) return;
    setSelectedKeys(selectedKeys);

    const selectedMesh = scene.getObjectByProperty("uuid", selectedKeys[0]);
    onSelect(selectedMesh);
  }

  function handleExpand(key) {
    setExpandedKeys(key);
  }

  const onCheck = (checkedKeys, info) => {
    const setKeys = new Set(checkedKeys.filter((i) => !i.startsWith("$")));

    scene.traverse((mesh) => {
      if (setKeys.has(mesh.uuid)) {
        mesh.visible = false;
      } else {
        mesh.visible = true;
      }
    });
    setCheckedKeys(checkedKeys);
    onChange();
  };

  useEffect(() => {
    function TreeUpdater() {
      setSelectedKeys([]);
      setExpandedKeys([]);
      setCheckedKeys([]);
      const treeData = [];
      const mapper = { $: treeData };

      function leafNode(obj3d, parentKey = "$", leafStructure = _structure) {
        for (const [k, v] of leafStructure) {
          if (k in obj3d.userData) {
            const title = obj3d.userData[k];

            if (v === undefined) {
              mapper[parentKey].push({
                title,
                key: obj3d.uuid,
                selectable: true,
              });
            } else {
              const _key = `${parentKey}/${title}`;
              if (mapper[_key]) {
                leafNode(obj3d, _key, v);
              } else {
                const arr = [];
                mapper[parentKey].push({
                  title,
                  key: _key,
                  children: arr,
                  selectable: false,
                });
                mapper[_key] = arr;
                leafNode(obj3d, _key, v);
              }
            }
            break;
          } else {
            mapper[parentKey].push({
              title: "undefined",
              key: obj3d.uuid,
            });
          }
        }
      }
      scene.traverse(leafNode);
      setTree(treeData);
    }

    whenUpdate(TreeUpdater);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{ height: "100%", width: "100%", overflow: "hidden", ...style }}
    >
      <AutoSizer>
        {({ width, height }) => {
          return (
            <Tree
              style={{ width: width }}
              checkable
              defaultExpandAll
              onSelect={handleSelect}
              onCheck={onCheck}
              onExpand={handleExpand}
              treeData={tree}
              showIcon={false}
              height={height - 10}
              itemHeight={20}
              selectedKeys={selectedKeys}
              expandedKeys={expandedKeys}
              checkedKeys={checkedKeys}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
}
