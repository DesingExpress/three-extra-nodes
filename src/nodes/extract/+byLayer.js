import { ImPure } from "@design-express/fabrica";
import { Group, Object3D } from "three";
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
      // this.threeGroup.clear?.();
    }
    const meshesLike = this.getInputData(1);
    const _layer = this.getInputData(2) ?? this.properties.layer;

    if (!meshesLike || _layer === undefined || _layer < 0) return;
    const __layer = _layer + 1;

    const threeGroup = (this.threeGroup = new Group());

    if (typeof meshesLike.traverseVisible === "function") {
      meshesLike.traverseVisible(function (object) {
        if (!object.isMesh) return;
        const _mesh = new Object3D();
        _mesh.isMesh = true;

        _mesh.geometry = object.geometry.clone();
        _mesh.geometry.applyMatrix4(object.matrixWorld);

        if (object.layers?.mask === __layer) threeGroup.add(_mesh);
      });
    } else {
      // meshesLike.forEach(function (child) {
      //   if (child.layers?.mask === __layer) threeGroup.add(child);
      // });
    }
    this.setOutputData(1, threeGroup);
  }
}
