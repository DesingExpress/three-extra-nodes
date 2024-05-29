import { Pure } from "@design-express/fabrica";
import TreeComponent from "./rcTree";
import useTreeStroe from "./store";

export class imageRenderer extends Pure {
  static path = "Three/Extra/Components";
  static title = "Tree";
  static description = "Tree component";
  constructor() {
    super({ mode: 0 });

    this.addInput("toUpdate", -1);
    this.addInput("meshes", "array");
    this.addInput("sortKeys", "array");
    this.addInput("toSelected", -1);
    this.addInput("selectedMesh", "three::mesh,object");

    // this.addOutput("component", "component");
    this.addOutput("component", "component");
    this.addOutput("onChangeVisibility", -1);
    this.addOutput("visibility", "boolean");
    this.addOutput("onClick", -1);
    this.addOutput("mesh", "three::mesh,array,object");
  }

  onExecute() {
    const handleChecked = (v, vis, idx) => {
      this.setOutputData(5, v);
      if (idx === 2) this.setOutputData(3, !!vis);
      this.triggerSlot(idx);
    };

    this.setOutputData(1, <TreeComponent onChecked={handleChecked} />);
  }
  onAction(name) {
    if (name === "toUpdate") {
      const _meshes = this.getInputData(2) ?? [];
      const _keys = this.getInputData(3) ?? [];
      useTreeStroe.getState().setRoot(_meshes, _keys);
    } else if (name === "toSelected") {
      const _mesh = this.getInputData(5) ?? {};
      if (_mesh.userData) useTreeStroe.getState().setSelected(_mesh);
    }
  }
}
