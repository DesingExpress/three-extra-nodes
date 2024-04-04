# [THREE.js Extra](https://github.com/DesingExpress/three-extra-nodes) Nodes

Extended Functionality for [THREE Nodes]()THREE.js

## Nodes Structure

```bash
 Three
 └── Extra
     └── ImageRenderer
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

## Loadmap

-

## Contributing

Please visit [Github repository [ DesingExpress/three-extra-nodes ]](https://github.com/DesingExpress/three-extra-nodes)

## Sources

[Github repository [ DesingExpress/three-extra-nodes ]](https://github.com/DesingExpress/three-extra-nodes)

## License

[MIT](https://mit-license.org/)
