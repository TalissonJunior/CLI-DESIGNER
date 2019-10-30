import { WorkSpace } from './workspace';
import * as d3 from 'd3';

/**
 * Creates the minimap for workspace
 */
export class Minimap {
  workSpace: WorkSpace;
  self: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  zoomViewport: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  options = {
    scale: 16,
    minimapZoomScale: 0.3
  };

  constructor(workspace: WorkSpace) {
    this.workSpace = workspace;

    this.create();
  }

  create(): void {
    const containerHeight = this.workSpace.svg.attr('height');
    const containerWidth = this.workSpace.svg.attr('width');

    // Calculate height
    const minimapWidth = parseInt(containerWidth) / this.options.scale;
    const minimapHeight = parseInt(containerHeight) / this.options.scale;

    // create minimap container
    this.svg = this.workSpace.self.append('svg').attrs({
      class: 'minimap minimap-bottom-right',
      height: minimapHeight,
      width: minimapWidth
    });

    this.createZoomViewPort(this.svg);
  }

  /**
   * Create minimap zoom view port
   */
  createZoomViewPort(
    svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
  ): void {
    const svgHeight = svg.attr('height');
    const svgWidth = svg.attr('width');

    this.zoomViewport = svg.append('rect').attrs({
      class: 'minimap-viewport',
      height: svgHeight,
      width: svgWidth,
      transform: 'translate(0,0)scale(' + this.options.minimapZoomScale + ')',
      stroke: '#aaaaaa'
    });

    var dragPosX = 0;
    var dragPosY = 0;

    // Add drag behavior
    const drag = d3.drag().on('drag', () => {
      dragPosX += d3.event.dx;
      dragPosY += d3.event.dy;

      this.zoomViewport.attr(
        'transform',
        'translate(' +
          dragPosX +
          ',' +
          dragPosY +
          ')' +
          'scale(' +
          this.options.minimapZoomScale +
          ')'
      );

      var translate = [
        -dragPosX * this.options.scale,
        -dragPosY * this.options.scale
      ];

      this.workSpace.svg.attr('transform', 'translate(' + translate + ')');
    });

    this.zoomViewport.call(drag);
  }
}
