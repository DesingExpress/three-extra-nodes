import { GraphicTree } from "./tree";

export class TreeComponent {
  static path = "graphics";

  static title = "Inspector";
  static description = "Scene Inspector";

  constructor() {
    this.addInput("scene", "");
    this.addInput("whenChanged", -1);
    // this.addInput("whenSelected", -1);
    this.addOutput("component", "");
    this.addOutput("onChange", -1);
    this.addOutput("onSelect", -1);
    this.update = undefined;
    this.onChange = (v) => {
      this.triggerSlot(1, v);
    };
    this.onSelect = (v) => {
      this.triggerSlot(2, v);
    };
    this.properties = {
      sortBy: [
        {
          name: "name",
          children: [{ name: "part", children: [{ name: "key" }] }],
        },
      ],
    };
  }
  onPropertyChanged() {}

  onExecute() {
    // set output slot data 'Hello'
    const scene = this.getInputData(0);

    this.setOutputData(
      0,
      !scene?.isScene ? (
        <div />
      ) : (
        <GraphicTree
          scene={scene}
          sortBy={this.properties.sortBy}
          onChange={this.onChange}
          onSelect={this.onSelect}
          whenUpdate={(cb) => {
            this.update = cb;
          }}
        />
      )
    );
  }
  onAction(action, param) {
    switch (action) {
      case "whenChanged":
        this.update?.();
        break;

      default:
        break;
    }
  }
}
