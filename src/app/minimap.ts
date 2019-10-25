import { WorkSpace } from './workspace';

export class Minimap {
  workSpace: WorkSpace;
  self: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

  options = {
    scale: 16
  };

  constructor(workspace: WorkSpace) {
    this.workSpace = workspace;

    this.create();
  }

  create(): void {
    const containerHeight = this.workSpace.svg.attr('height');
    const containerWidth = this.workSpace.svg.attr('width');

    this.workSpace.self.append('svg').attrs({
      class: 'minimap minimap-bottom-right',
      height: parseInt(containerHeight) / this.options.scale,
      width: parseInt(containerWidth) / this.options.scale
    });
  }
}
