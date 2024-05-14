import { ImPure } from "@design-express/fabrica";
import { Group } from "three";
export class byLayer extends ImPure {
  static path = "Extra/Extract";
  static title = "ByLayer";
  static [`@layer`] = {
    type: "enum",
    values: Array(32)
      .fill(0)
      .map((_, idx) => idx),
  };
  constructor() {
    super();
    this.properties = { layer: 0 };
    this.addInput(
      "meshes",
      "object,array,three::mesh,three::group,three::scene,three::object3d"
    );
    this.addInput("layer", "number");
    this.addOutput("meshes", "object,three::group,three::object3d");
    this.addWidget("combo", "layer", this.properties.layer, "layer", {
      values: byLayer["@layer"].values,
    });

    this.widgets_up = true;
    this.widgets_start_y = 26;
    this.threeGroup = undefined;
  }

  onExecute() {
    if (this.threeGroup) {
      this.threeGroup.clear?.();
    }
    const meshesLike = this.getInputData(1);
    const _layer = this.getInputData(2) ?? 1;

    if (!meshesLike || _layer === undefined || _layer < 0) return;

    const threeGroup = (this.threeGroup = new Group());

    if (typeof meshesLike.traverseVisible === "function") {
      meshesLike.traverseVisible(function (child) {
        if (child.layers?.mask === _layer) threeGroup.add(child);
      });
    } else {
      meshesLike.forEach(function (child) {
        if (child.layers?.mask === _layer) threeGroup.add(child);
      });
    }
    this.setOutputData(1, threeGroup);
  }
}
