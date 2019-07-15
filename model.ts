import { EventEmitter } from 'events';
import Adapter from './adapter';
import InMemoryAdapter from './adapters/in-memory';

export type Diff<T, U> = T extends U ? never : T;
export type Filter<T, U> = T extends U ? T : never;
export type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T];
export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T];
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export type Readonly<T> = { readonly [P in keyof T]: T[P] };
export type SchemaOf<T> = Pick<T, NonFunctionPropertyNames<T>>;
export type PartialSchemaOf<T> = Partial<SchemaOf<T>>;

// ==============================================================================================
//#region interfaces

type QueryWhereValue = string | boolean | number | null;

interface QueryWhereOperator {
  /** Equivalence operator */
  '=': QueryWhereValue;

  /** Not equal (!=) */
  neq: QueryWhereValue;

  /** Numerical greater than (>); Valid only for numerical and date values. */
  gt: number | Date;

  /** Numerical greater than or equal (>=). ; Valid only for numerical and date values. */
  gte: number | Date;

  /** Numerical less than (<);  Valid only for numerical and date values.*/
  lt: number | Date;

  /** Numerical less than or equal (<=);  Valid only for numerical and date values.*/
  lte: number | Date;

  /**
   * True if the value is between the two specified values: greater than or equal to first
   * value and less than or equal to second value.
   */
  between: [number, number];

  /** In an array of values. */
  inq: (string | boolean | number | null)[];

  /** Not in an array of values. */
  nin: (string | boolean | number | null)[];

  /**
   * For geolocations, return the closest points, sorted in order of distance.
   * Use with limit to return the n closest points.
   */
  near: (string | [number, number] | { lat: number, lng: number });

  /** To use with `near`, `gt`, `gte`, `lt`, `lte`, `between` filter */
  maxDistance: string;

  /** To use with `near`, `gt`, `gte`, `lt`, `lte`, `between` filter */
  unit: 'kilometers' | 'meters' | 'miles' | 'feet' | 'radians' | 'degrees';

  /**
   * LIKE operators for use with regular expressions.
   * The regular expression format depends on the backend data source.
   */
  like: string;

  /**
   * NOT LIKE operators for use with regular expressions.
   * The regular expression format depends on the backend data source.
   */
  nlike: string;

  /**
   * ILIKE operators for use with regular expressions.
   * The operator is supported only by the memory and Postgresql connectors.
   */
  ilike: string;

  /**
   * NOT ILIKE operators for use with regular expressions.
   * The operator is supported only by the memory and Postgresql connectors.
   */
  nilike: string;

  /** Regular expression. */
  regexp: string | RegExp;
}

export type QueryWhere<T = Model> = {
  [name in ('id' | keyof SchemaOf<T>)]?: QueryWhereValue | Partial<QueryWhereOperator>
} & {
  /** Logical AND operator. */
  and?: QueryWhere<T>[]

  /** Logical OR operator. */
  or?: QueryWhere<T>[],
};

export interface QueryFilterInclude<T = Model> {
  /** The relation to include */
  relation: string;

  /** The filter to use for the include data */
  scope?: QueryFilterForManyThroughInclude<T>;
}

export interface QueryFilterMinimal<T = Model> {
  /** Specify fields to include in or exclude from the response. */
  fields?: string | string[] | { [name: string]: boolean };

  /** Include results from related models, for relations such as belongsTo and hasMany. */
  include?: string | string[] | QueryFilterInclude<T> | QueryFilterInclude<T>[];
}

export interface QueryFilter<T = Model> extends QueryFilterMinimal<T> {
  /** Specify sort order: ascending or descending.  */
  order?: string | string[];

  /** Skip the specified number of instances */
  skip?: number;

  /** Specify search criteria; similar to a WHERE clause in SQL. */
  where?: QueryWhere<T>;
}

export interface QueryFilterAll<T = Model> extends QueryFilter<T> {
  /** Limit the number of instances to return. */
  limit?: number;
}

export interface QueryFilterForManyThroughInclude<T = Model> extends QueryFilterAll<T> {
  with?: QueryWhere<T>;
}

//#endregion interfaces
// ----------------------------------------------------------------------------------------------

export class Model extends EventEmitter {
  static adapter: Adapter = new InMemoryAdapter();
  static collectionName: string = 'default';

  static async find<T extends typeof Model>(
    this: T,
    filter?: QueryFilterAll<T>,
  ): Promise<InstanceType<T>[]> {
    return this.adapter.find<T>(this, filter);
  }

  static async findOne<T extends typeof Model>(
    this: T,
    filter?: QueryFilterAll<T>,
  ): Promise<InstanceType<T>[]> {
    return this.adapter.find(this, filter);
  }
}

export default Model;
