import { ClassTablePosition } from './class-table-position';
import { ClassTableProperty } from './class-table-property';
import { Utils } from '../../app/utils';

export class ClassTable {
  private _key: string;
  public get key(): string {
    return this._key;
  }

  private _name: string;
  public get name(): string {
    return this._name;
  }

  private _tableName: string;
  public get tableName(): string {
    return this._tableName;
  }

  private _properties: Array<ClassTableProperty>;
  public get properties(): Array<ClassTableProperty> {
    return this._properties;
  }

  private _position: ClassTablePosition;
  public get position(): ClassTablePosition {
    return this._position;
  }

  constructor(
    key: string,
    name: string,
    tableName: string,
    properties: Array<ClassTableProperty>,
    position: ClassTablePosition
  ) {
    this._key = key || Utils.generateID();
    this._name = name || '';
    this._tableName = tableName || '';
    this._properties = properties || new Array<ClassTableProperty>();
    this._position = position || new ClassTablePosition(0, 0);
  }

  public changeName(name: string): void {
    if (!name) {
      throw Error('Invalid Property name.');
    }

    this._name = name;
  }

  public changeTableName(tableName: string): void {
    if (!tableName) {
      throw Error('Invalid Property tableName.');
    }

    this._tableName = tableName;
  }

  public changePosition(position: ClassTablePosition): void {
    if (!position) {
      throw Error('Invalid Property position.');
    }

    this._position = position;
  }

  public addProperty(property: ClassTableProperty): void {
    if (!property) {
      throw Error('Invalid Property.');
    }

    this._properties.push(property);
  }

  public removeProperty(propertyKey: string): void {
    if (!propertyKey) {
      throw Error('Invalid Property Key.');
    }

    var propertyIndex = this._properties.findIndex(
      property => property.key == propertyKey
    );

    if (propertyIndex > -1) {
      this._properties.splice(propertyIndex);
    }
  }
}
