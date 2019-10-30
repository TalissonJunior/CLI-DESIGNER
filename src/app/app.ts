import * as d3 from 'd3';
import 'd3-selection-multi';
import { WorkSpace } from './workspace';
import { Minimap } from './minimap';

class App {
  workspace: WorkSpace;
  minimap: Minimap;

  constructor(container: string) {
    this.workspace = new WorkSpace(container);

    const mini = this.createMinimapSvg();
    // initialize the minimap, passing needed references
    const minimap = new Minimap(mini)
      .setHost(mini)
      .setTarget(this.workspace.svg)
      .setMinimapScale(0.1)
      .setX(3840 + 20)
      .setY(20);

    this.workspace.svg.call(minimap);

    this.init();
  }

  createMinimapSvg() {
    return this.workspace.self.append('svg').attrs({
      class: 'minmap',
      height: 2400,
      width: 3840
    });
  }

  private init() {}
}

export const init = (containerReference?: string) =>
  new App(containerReference);
