import { WorkSpace } from './workspace';

/**
 * Creates the minimap for workspace
 */
export class Minimap {
  workSpace: WorkSpace;
  self: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  frame: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
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

    const minimapWidth = parseInt(containerWidth) / this.options.scale;
    const minimapHeight = parseInt(containerHeight) / this.options.scale;

    const minimapFramWidth = minimapWidth / (this.options.scale / 6);
    const minimapFramHeight = minimapHeight / (this.options.scale / 6);

    this.svg = this.workSpace.self.append('svg').attrs({
      class: 'minimap minimap-bottom-right',
      height: minimapHeight,
      width: minimapWidth
    });

    this.svg.append('rect').attrs({
      class: 'minimap-viewport',
      height: minimapFramHeight,
      width: minimapFramWidth,
      stroke: '#aaaaaa'
    });
  }
}
