import * as d3 from 'd3';
import 'd3-selection-multi';
import { WorkSpace } from './workspace/workspace';
import { Minimap } from './minimap/minimap';

class App {
  height = 2400;
  width = 3840;
  workspace: WorkSpace;
  minimap: Minimap;

  constructor(container: string) {
    this.init(container);
  }

  private init(container: string) {
    this.workspace = new WorkSpace(container, {
      height: this.height,
      width: this.width
    });

    this.minimap = new Minimap(this.workspace, {
      heigth: this.height / 16,
      width: this.width / 16
    });
  }
}

export const init = (containerReference?: string) =>
  new App(containerReference);
