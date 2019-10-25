import * as d3 from 'd3';
import 'd3-selection-multi';
import { WorkSpace } from './workspace';
import { Minimap } from './minimap';

class App {
  workspace: WorkSpace;
  minimap: Minimap;

  constructor(container: string) {
    this.workspace = new WorkSpace(container);
    this.minimap = new Minimap(this.workspace);

    this.init();
  }

  private init() {}
}

export const init = (containerReference?: string) =>
  new App(containerReference);
