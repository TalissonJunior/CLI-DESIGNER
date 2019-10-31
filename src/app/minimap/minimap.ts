import * as d3 from 'd3';
import { MiniMapOptions } from './minimap-options';
import { WorkSpace } from '../workspace/workspace';

/**
 * https://bl.ocks.org/tlfrd/5efbd1639276d58c904fd1f74508335f
 * Minimap
 */
export class Minimap {
  options: MiniMapOptions;
  self: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

  constructor(workspace: WorkSpace, options: MiniMapOptions) {
    this.options = options;

    this.self = workspace.svg
      .append('g')
      .attr(
        'transform',
        'translate(' +
          (workspace.options.width - options.width) +
          ',' +
          (workspace.options.height - options.heigth) +
          ')'
      );

    this.self
      .append('rect')
      .attr('class', 'minimap')
      .attr('width', options.width)
      .attr('height', options.heigth);
  }
}
