import { Pure } from "@design-express/fabrica";
import { WebGLRenderer, Color } from "three";

export class imageRenderer extends Pure {
  static path = "Three/Extra";
  static title = "ImageRenderer";
  static description = "Export THREE.js Scene to Image (png,jpg)";
  static [`@type`] = { type: "enum", values: ["png", "jpg"] };
  constructor() {
    super();
    this.properties = {
      width: 1920,
      height: 1080,
      transparent: false,
      background: "#FFFFFF",
      type: imageRenderer["@type"].values[0],
      quality: 0.5,
    };
    this.addInput("scene", "three::scene");
    this.addInput("camera", "three::camera");
    this.addInput("width", "number");
    this.addInput("height", "number");
    this.addInput("background", "three::color,string");
    this.addInput("type", "string");
    this.addInput("", "boolean");
    this.addInput("", "number");

    this.addOutput("image", "blob");

    this.addWidget("number", "width", this.properties.width, "width", {
      min: 100,
      step: 100,
    });
    this.addWidget("number", "height", this.properties.height, "height", {
      min: 100,
      step: 100,
    });
    this.backgroundWidget = this.addWidget(
      "string",
      "background",
      this.properties.background,
      "background"
    );
    this.addWidget("combo", "type", this.properties.type, "type", {
      values: imageRenderer["@type"].values,
    });
    this.pngWidget = this.addWidget(
      "toggle",
      "transparent",
      this.properties.transparent,
      "transparent"
    );
    this.jpgWidget = this.addWidget(
      "slider",
      "quality",
      this.properties.quality,
      "quality",
      { min: 0.1, max: 1.0, step: 0.1 }
    );
    this.jpgWidget.disabled = true;
    this.widgets_up = true;
    this.widgets_start_y = 50;
  }
  onPropertyChanged(name, val, prev) {
    if (name === "type") {
      if (val === "jpg") {
        this.pngWidget.disabled = true;
        this.jpgWidget.disabled = false;
      } else {
        this.pngWidget.disabled = false;
        this.jpgWidget.disabled = true;
      }
    }
  }

  async onExecute() {
    const _scene = this.getInputData(1);
    const _camera = this.getInputData(2);
    const _width = Number(
      this.getInputData(3) ?? this.properties.width
    ).toFixed(0);
    const _height = Number(
      this.getInputData(4) ?? this.properties.height
    ).toFixed(0);

    if (!_scene || !_camera || Number.isNaN(_width) || Number.isNaN(_height))
      return;
    let _type = (this.getInputData(6) ?? this.properties.type).toLowerCase();
    if (_type !== "png" && _type !== "jpg") {
      _type = "png";
    }

    let _transparent = false;
    let _quality = undefined;

    if (_type === "png") {
      _transparent = this.getInputData(7) ?? this.properties.transparent;
    } else {
      _quality = this.getInputData(8) ?? this.properties.quality;
      if (_quality < 0.1) _quality = 0.1;
      else if (_quality > 1) _quality = 1.0;
    }

    let _background = new Color("#FFFFFF");
    if (!_transparent) {
      _background = this.getInputData(5) ?? this.properties.background;
      if (
        typeof _background === "string" &&
        _background.startsWith("#") &&
        _background.length >= 7 &&
        _background.length <= 8
      ) {
        _background = new Color(_background);
      }
    } else {
      _background = null;
    }

    const _canvasElem = document.createElement("canvas");
    _canvasElem.width = _width;
    _canvasElem.height = _height;
    _canvasElem.style.display = "none";
    _canvasElem.style.visibility = "hidden";
    // document.body.appendChild(_canvasElem);
    const _renderer = new WebGLRenderer({
      canvas: _canvasElem,
      antialias: true,
      alpha: true,
    });
    _scene.environment = _scene.environment ?? null;
    _scene.fog = _scene.fog ?? null;

    const _clonedScene = _scene.clone();
    const _clonedCamera = _camera.clone();

    _renderer.setSize(_width, _height);

    const aspect = _width / _height;
    _clonedScene.background = _background;
    if (_clonedCamera.isPerspectiveCamera) {
      _clonedCamera.aspect = aspect;
    } else {
      const frustumSize = _clonedCamera.userData.frustumSize ?? 60;
      _clonedCamera.left = (-1 * frustumSize * aspect) / 2;
      _clonedCamera.right = (1 * frustumSize * aspect) / 2;
      _clonedCamera.top = frustumSize / 2;
      _clonedCamera.bottom = -frustumSize / 2;
    }
    _clonedCamera.updateProjectionMatrix();
    _renderer.render(_clonedScene, _clonedCamera);

    const resolver = { r: () => {} };
    const waiter = new Promise((r) => {
      resolver.r = r;
    });
    _canvasElem.toBlob((blob) => resolver.r(blob), `image/${_type}`, _quality);

    this.setOutputData(1, await waiter);

    _renderer.dispose();
    let mtrl;
    _clonedScene.traverse((obj) => {
      if (obj.geometry) {
        obj.geometry.dispose();
      }

      if (obj.material) {
        if (obj.material && obj.material.materials) {
          for (var i = 0; i < obj.material.materials.length; ++i) {
            mtrl = obj.material.materials[i];
            if (mtrl.map) mtrl.map.dispose();
            if (mtrl.lightMap) mtrl.lightMap.dispose();
            if (mtrl.bumpMap) mtrl.bumpMap.dispose();
            if (mtrl.normalMap) mtrl.normalMap.dispose();
            if (mtrl.specularMap) mtrl.specularMap.dispose();
            if (mtrl.envMap) mtrl.envMap.dispose();

            mtrl.dispose(); // disposes any programs associated with the material
          }
        } else {
          if (obj.material.map) obj.material.map.dispose();
          if (obj.material.lightMap) obj.material.lightMap.dispose();
          if (obj.material.bumpMap) obj.material.bumpMap.dispose();
          if (obj.material.normalMap) obj.material.normalMap.dispose();
          if (obj.material.specularMap) obj.material.specularMap.dispose();
          if (obj.material.envMap) obj.material.envMap.dispose();

          obj.material.dispose(); // disposes any programs associated with the material
        }
      }
      obj.dispose?.();
    });
    mtrl = undefined;
    _clonedCamera.clear();
    _clonedCamera.removeFromParent();
    _canvasElem.remove();
  }
}
