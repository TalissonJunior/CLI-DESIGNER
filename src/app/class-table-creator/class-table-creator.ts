import { ClassTable } from '../../models/class-table/class-table';
import { Tooltip } from '../tooltip';
import { ClassTableCreatorForm } from './class-table-creator-form';
import { Utils } from '../utils';
import { ClassTableProperty } from '../../models/class-table/class-table-property';

/**
 * Creates the class table element,
 * Has all the rules for class table
 */
export class ClassTableCreator {
  classtable: ClassTable;
  columns: Array<any>;
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

    this.columns = [
      {
        label: 'Property name',
        tooltip: 'Name of property class'
      },
      {
        label: 'Type',
        tooltip: 'Type of property Class'
      },
      {
        label: 'Column name',
        tooltip: 'Column name of Table'
      },
      {
        label: 'Required',
        tooltip: 'Is property required?'
      },
      {
        label: 'Has method',
        tooltip: 'Does property has a self change method?'
      },
      {
        label: 'Actions',
        tooltip: 'Actions'
      }
    ];

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
    this.createBody(this.selfElement, classTable);
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
        colspan: this.columns.length - 1
      })
      .insert(function() {
        const tooltip = new Tooltip().create(this, 'Class Name / Table Name');

        tooltip.append('span').text(classTable.getClassTableName());

        return tooltip.node() as HTMLElement;
      });

    // Add columns to colspan
    const colspan = this.columns.length;

    headerTR
      .append('th')
      .attrs({
        class: 'table-ops',
        colspan: 1
      })
      .insert(function() {
        const tooltip = new Tooltip().create(this, 'Edit');

        const edit = tooltip.append('img').attrs({
          class: 'edit',
          src: 'assets/table-edit.png'
        });

        edit.on('click', () => {
          // Toggle class open-form
          const headerNode = headerTR.node();
          headerNode.classList.toggle('open-form');

          if (headerNode.classList.contains('open-form')) {
            const form = headerTR.append('th').attrs({
              class: 'class-table-form',
              colspan: colspan
            });

            new ClassTableCreatorForm().createInput({
              form: form,
              initialValue: classTable.name,
              key: Utils.generateID(),
              label: 'Class Name'
            });

            new ClassTableCreatorForm().createInput({
              form: form,
              initialValue: classTable.tableName,
              key: Utils.generateID(),
              label: 'Table Name'
            });

            new ClassTableCreatorForm().createCancelSaveButton({
              form: form,
              cancelButtonClass: '',
              saveButtonClass: '',
              cancelButtonLabel: 'Cancel',
              saveButtonLabel: 'Save',
              cancelButtonOnClick: () => {
                form.remove();
                headerNode.classList.remove('open-form');
              },
              saveButtonOnClick: () => {}
            });
          } else {
            headerTR.select('class-table-form').remove();
          }
        });

        return tooltip.node() as HTMLElement;
      });
  }

  private createBody(
    tableElement: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
    classTable: ClassTable
  ) {
    const bodyTR = tableElement.append('tbody');

    // Create columns elements
    bodyTR
      .append('tr')
      .attrs({
        class: 'property-header'
      })
      .selectAll('headers')
      .data(this.columns)
      .enter()
      .append('td')
      .insert(function(column) {
        const tooltip = new Tooltip().create(this, column.tooltip);

        tooltip.append('strong').text(column.label);

        return tooltip.node() as HTMLElement;
      });

    bodyTR
      .selectAll('columns')
      .data(classTable.properties)
      .enter()
      .append('tr')
      .selectAll('td')
      .data((property: ClassTableProperty) => {
        return [
          {
            label: property.name,
            value: property.name
          },
          {
            label: property.type.value,
            value: property.type.value
          },
          {
            label: property.columnName,
            value: property.isPrimaryKey ? 'primary' : property.columnName
          },
          {
            label: property.isRequired,
            value: property.isRequired
          },
          {
            label: property.hasChangeMethod,
            value: property.hasChangeMethod
          },
          {
            label: 'actions',
            value: 'actions'
          }
        ];
      })
      .enter()
      .append('td')
      .html((labelValue: any, e) => {
        if (labelValue.value == 'actions') {
          return `<div class="actions-table"> 
          <div class="tooltip"> 
            <img src="assets/edit.png">
            <span class="tooltiptext tooltip-top" style="margin-left:-18px;">Edit</span>
          </div>

          <div class="tooltip">
            <img src="assets/sort.png">
            <span class="tooltiptext tooltip-top" style="margin-left:-18px;">Sort</span>
          </div>
           
           </div>
          `;
        } else if (labelValue.value == 'primary') {
          return `<div class="table-primary"> 
            <span>${labelValue.label}</span>
            <div class="tooltip">
              <img src="assets/key.png">
              <span class="tooltiptext tooltip-top" style="margin-left:-38px;">Primary Key</span>
            </div>
           </div>
          `;
        }

        return labelValue.label;
      });
  }

  private createFooter(
    tableElement: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
  ) {
    const footerTR = tableElement.append('tfoot').append('tr');

    const operations = footerTR
      .append('td')
      .attrs({
        colspan: this.columns.length
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
      .text('Add property');
  }
}
