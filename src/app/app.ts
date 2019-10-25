import * as d3 from 'd3';
import 'd3-selection-multi';
import { WorkSpace } from './workspace';

class App {
  workspace: WorkSpace;

  constructor(container: string) {
    this.workspace = new WorkSpace(container);

    this.init();
  }

  private init() {}
}

export const init = (containerReference?: string) =>
  new App(containerReference);
