import Adapter from '../adapter';
import Model, { QueryFilterAll } from '../model';

export class InMemoryAdapter extends Adapter {
  findOne(opts: number) {
    throw new Error('Method not implemented.');
  }
  save(opts: string): number {
    throw new Error('Method not implemented.');
  }

  find<T extends typeof Model>(
    that: T,
    filter?: QueryFilterAll<T>,
  ): Promise<InstanceType<T>[]> {
    throw new Error('Method not implemented.');
  }

}

export default InMemoryAdapter;
