import Model, { QueryFilterAll } from './model';

export abstract class Adapter {
  abstract find<T extends typeof Model>(
    that: T,
    filters?: QueryFilterAll<T>,
  ): Promise<InstanceType<T>[]>;

  abstract findOne(opts: number): any;

  abstract save(opts: string): number;
}

export default Adapter;
