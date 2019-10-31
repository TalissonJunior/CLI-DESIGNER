import * as d3 from 'd3';
import { WorkSpaceOptions } from './workspace-options';

/**
 * This class is responsible for creating the entire external environment
 * of the cli designer such as the menu,body container and so on.
 */
export class WorkSpace {
  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  options: WorkSpaceOptions;

  constructor(container: string, options: WorkSpaceOptions) {
    this.options = options;

    this.svg = d3
      .select(container)
      .append('svg')
      .attrs({
        class: 'workspace',
        width: options.width,
        height: options.height
      });
  }
}
