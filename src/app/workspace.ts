import * as d3 from 'd3';

/**
 * This class is responsible for creating the entire external environment
 * of the cli designer such as the menu,body container and so on.
 */
export class WorkSpace {
  self: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  menu: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

  constructor(container: string) {
    this.self = d3.select(container);
    this.createWorkSpace();
    this.createMenu();
  }

  createWorkSpace(): void {
    this.svg = this.self.append('svg').attrs({
      class: 'workspace',
      height: 2400,
      width: 3840
    });
  }

  createMenu(): void {
    this.menu = this.self
      .append('xhtml:ul')
      .attr('class', 'clidesigner-menu')
      .append('li')
      .append('span')
      .attrs({
        draggable: 'true',
        class: 'clidesigner-menu-icon'
      });
  }
}
