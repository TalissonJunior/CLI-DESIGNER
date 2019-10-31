import { ClassTable } from '../../models/class-table/class-table';

/**
 * Creates the class table element,
 * Has all the rules for class table
 */
export class ClassTableCreator {
  classtable: ClassTable;

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
  }
}
