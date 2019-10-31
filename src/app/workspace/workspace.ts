import * as d3 from 'd3';
import { WorkSpaceOptions } from './workspace-options';
import { ClassTable } from '../../models/class-table/class-table';
import { ClassTableCreator } from '../class-table-creator/class-table-creator';

/**
 * This class is responsible for creating the entire external environment
 * of the cli designer such as the menu,body container and so on.
 */
export class WorkSpace {
  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  options: WorkSpaceOptions;
  creators: Array<ClassTableCreator>;

  constructor(container: string, options: WorkSpaceOptions) {
    this.init(container, options);
  }

  private init(container: string, options: WorkSpaceOptions): void {
    // Set up
    this.options = options;
    this.creators = new Array<ClassTableCreator>();

    this.svg = d3
      .select(container)
      .append('svg')
      .attrs({
        class: 'workspace',
        width: options.width,
        height: options.height
      });
  }

  addClassTable(classTable: ClassTable): void {
    const creator = new ClassTableCreator(this.svg, classTable);

    this.creators.push(creator);
  }
}
