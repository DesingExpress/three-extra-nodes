import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import AutoSizer from "react-virtualized-auto-sizer";

import useTreeStroe from "./store";
import { Fragment } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material";

import checkbox from "../../assets/checkbox.svg?url";
import checkboxChecked from "../../assets/checkbox--checked.svg?url";
import checkboxIndeterminate from "../../assets/checkbox--indeterminate.svg?url";

const StyledWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  [`& div.rc-tree-treenode`]: {
    minHeight: 32,
    display: "inline-flex",
    alignItems: "center",
    [`& > span.rc-tree-switcher`]: {
      height: "24px !important",
      width: "24px !important",
      backgroundImage: "unset !important",
    },
    [`& > .rc-tree-checkbox`]: {
      backgroundImage: `url(${checkboxChecked}) !important`,
      backgroundPosition: "unset !important",
      position: "absolute",
      right: 12,
      width: "24px !important",
      height: "24px !important",
      [`&.rc-tree-checkbox-checked`]: {
        backgroundImage: `url(${checkbox}) !important`,
      },
      [`&.rc-tree-checkbox-indeterminate`]: {
        backgroundImage: `url(${checkboxIndeterminate}) !important`,
      },
    },
    // [`& .rc-tree-iconEle.rc-tree-icon__customize`]: {
    //   display: "none !important",
    // },
    [`& .rc-tree-title`]: {
      ...theme.typography.button,
      textTransform: "unset",
    },
    [`& > .rc-tree-node-content-wrapper`]: {
      //   width: "calc(100% - 56px) !important",
      flex: 1,
      marginRight: "56px !important",
      paddingLeft: "8px !important",
      [`&.rc-tree-node-selected`]: {
        borderRadius: 20,
        backgroundColor: theme.palette.custom.background[60],
        boxShadow: "unset",
      },
      //   marginLeft: 16,
    },
  },
}));

function SwitchIcon({ isLeaf, expanded }) {
  return (
    <i className="tree-switcher">
      {isLeaf ? (
        <Fragment />
      ) : expanded ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      )}
    </i>
  );
}

function TreeComponent({ onChecked }) {
  const [
    treeData,
    checkedKeys,
    selected,
    expandedKeys,
    loadedKeys,
    setLeaf,
    setChecked,
    setSelected,
    setExpandedKeys,
    setLoadedKeys,
  ] = useTreeStroe((state) => [
    state.tree,
    state.checked,
    state.selected,
    state.expandedKeys,
    state.loadedKeys,
    state.setLeaf,
    state.setChecked,
    state.setSelected,
    state.setExpandedKeys,
    state.setLoadedKeys,
  ]);
  function onSelect(info, e) {
    setSelected(info);
    onChecked(e.node.subMeshes, undefined, 4);
  }

  function onCheck(checkedKeys, e) {
    setChecked(checkedKeys);
    onChecked(e.node.subMeshes, e.node.checked, 2);
  }

  function onExpand(expandedKeys) {
    setExpandedKeys(expandedKeys);
  }

  function onLoad(loadedKeys) {
    setLoadedKeys(loadedKeys);
  }

  function onLoadData(treeNode) {
    return setLeaf(treeNode);
  }

  return (
    <StyledWrapper>
      <AutoSizer disableWidth>
        {({ height }) => (
          <Tree
            switcherIcon={SwitchIcon}
            icon={<Fragment />}
            selectable
            selectedKeys={selected}
            onSelect={onSelect}
            checkable
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            onLoad={onLoad}
            loadedKeys={loadedKeys}
            //   showLine
            virtual
            height={height}
            itemHeight={48}
            loadData={onLoadData}
            treeData={treeData}
          />
        )}
      </AutoSizer>
    </StyledWrapper>
  );
}
export default TreeComponent;
