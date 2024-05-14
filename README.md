# [THREE.js Extra](https://github.com/DesingExpress/three-extra-nodes) Nodes

Extended Functionality for [THREE Nodes]()THREE.js

## Nodes Structure

```bash
 Three
 └── Extra
     ├── ImageRenderer
     └── Components
         └── Tree
```

## 🔲Include Nodes

### `ImageRenderer` Node

```litegraph
{
  "title": "ImageRenderer",
  "inputs": [
    { "label": "scene", "type":"three::scene" },
    { "label": "camera", "type":"three::camera" },
    { "label": "width", "type":"number" },
    { "label": "height", "type":"number" },
    { "label": "background", "type":"three::color,string" },
    { "label": "type", "type":"string" },
    { "label": "transparent", "type":"boolean" },
    { "label": "quality", "type":"number" }
    ],
  "outputs": [
    { "label": "image", "type":"blob" }
  ]
}
```

#### Slots

##### Inputs

| Label           | Type                  | Description |
| --------------- | --------------------- | ----------- |
| **scene**       | `three::scene`        |             |
| **camera**      | `three::camera`       |             |
| **width**       | `number`              |             |
| **height**      | `number`              |             |
| **background**  | `three::color,string` |             |
| **type**        | `string`              |             |
| **transparent** | `boolean`             |             |
| **quality**     | `number`              |             |

##### Outputs

| Label     | Type   | Description |
| --------- | ------ | ----------- |
| **image** | `blob` |             |

---

&nbsp;
&nbsp;

### `Components/Tree` Node

```litegraph
{
  "title": "Tree",
  "inputs": [
    { "label": "toUpdate", "type":-1 },
    { "label": "meshes", "type":"array" },
    { "label": "sortKeys", "type":"array" },
    { "label": "toSelected", "type":-1 },
    { "label": "selectedMesh", "type":"three::mesh,object" }
    ],
  "outputs": [
    { "label": "component", "type":"component" },
    { "label": "onChangeVisibility", "type":-1 },
    { "label": "visibility", "type":"boolean" },
    { "label": "onClick", "type":-1 },
    { "label": "mesh", "type":"three::mesh,array,object" }
  ]
}
```

#### Slots

##### Inputs

| Label            | Type                 | Description |
| ---------------- | -------------------- | ----------- |
| **toUpdate**     | `event`              |             |
| **meshes**       | `array`              |             |
| **sortKeys**     | `array`              |             |
| **toSelected**   | `event`              |             |
| **selectedMesh** | `three::mesh,object` |             |

##### Outputs

| Label                  | Type                       | Description |
| ---------------------- | -------------------------- | ----------- |
| **component**          | `component`                |             |
| **onChangeVisibility** | `event`                    |             |
| **visibility**         | `boolean`                  |             |
| **onClick**            | `event`                    |             |
| **mesh**               | `three::mesh,array,object` |             |

---

&nbsp;
&nbsp;

### `Extract/ByLayer` Node

```litegraph
{
  "title": "ByLayer",
  "inputs": [
    { "label": "meshes", "type": "object,array,three::mesh,three::group,three::scene,three::object3d" },
    { "label": "layer", "type":"number" }
    ],
  "outputs": [
    { "label": "meshes", "type":"object,three::group,three::object3d" }
  ]
}
```

#### Slots

##### Inputs

| Label      | Type                                                                 | Description |
| ---------- | -------------------------------------------------------------------- | ----------- |
| **meshes** | `object,array,three::mesh,three::group,three::scene,three::object3d` |             |
| **meshes** | `number`                                                             |             |

##### Outputs

| Label      | Type                                  | Description |
| ---------- | ------------------------------------- | ----------- |
| **meshes** | `object,three::group,three::object3d` |             |

---

&nbsp;
&nbsp;

## Loadmap

-

## Contributing

Please visit [Github repository [ DesingExpress/three-extra-nodes ]](https://github.com/DesingExpress/three-extra-nodes)

## Sources

[Github repository [ DesingExpress/three-extra-nodes ]](https://github.com/DesingExpress/three-extra-nodes)

## License

[MIT](https://mit-license.org/)
