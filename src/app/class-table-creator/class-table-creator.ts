import { ClassTable } from '../../models/class-table/class-table';
import { Tooltip } from '../tooltip';

/**
 * Creates the class table element,
 * Has all the rules for class table
 */
export class ClassTableCreator {
  classtable: ClassTable;
  selfElement: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

  constructor(
    containerElement: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
    classTable: ClassTable
  ) {
    this.init(containerElement, classTable);
  }

  private init(
    containerElement: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
    classTable: ClassTable
  ) {
    // Set up
    this.classtable = classTable;

    this.selfElement = containerElement
      .append('foreignObject')
      .attrs({
        x: 100,
        y: 80
      })
      .append('xhtml:table')
      .attrs({
        class: 'class-table'
      })
      .raise();

    this.createHeader(this.selfElement, classTable);
    this.createFooter(this.selfElement);
  }

  private createHeader(
    tableElement: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
    classTable: ClassTable
  ) {
    const headerTR = tableElement
      .append('thead')
      .append('tr')
      .attrs({
        class: 'caption'
      });

    headerTR
      .append('th')
      .attrs({
        class: 'class-table-name',
        colspan: 3
      })
      .html(function(el) {
        const tooltip = new Tooltip()
          .create(
            this,
            classTable.getClassTableName(),
            'Class Name / Table Name'
          )
          .node() as HTMLElement;

        return tooltip.outerHTML;
      });

    headerTR
      .append('th')
      .attrs({
        class: 'table-ops',
        colspan: 1
      })
      .append('img')
      .attrs({
        class: 'edit',
        src: 'assets/table-edit.png'
      });
  }

  private createFooter(
    tableElement: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
  ) {
    const footerTR = tableElement.append('tfoot').append('tr');

    const operations = footerTR
      .append('td')
      .attrs({
        colspan: 4
      })
      .append('div')
      .attrs({
        class: 'operations'
      });

    operations.append('img').attrs({
      src: 'assets/table-row-add.png'
    });

    operations
      .append('span')
      .attrs({
        class: 'action'
      })
      .text('Add field');
  }
}
