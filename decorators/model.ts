import 'reflect-metadata';

import { ModelDecorator, ModelDecoratorType } from './model-decorator';
import Model from '..';

export enum ModelHook {
  Access = 'access',
  Persist = 'persist',
  Loaded = 'loaded',
  BeforeSave = 'before save',
  AfterSave = 'after save',
  BeforeDelete = 'before delete',
  AfterDelete = 'after delete',
}

export interface ModelPropertyDefinition {
  type?: any;
  required?: boolean;
  id?: boolean;
  default?: any;
  defaultFn?: 'guid' | 'uuid' | 'uuidv4' | 'now';
  description?: string;
  index?: boolean;
  min?: number;
  max?: number;
  length?: number;
  pattern?: string;
}

export type ModelEvent = 'attached'
  | 'dataSourceAttached'
  | 'set'
  | string;

/**
 * Define a Loopback Model
 * @param settings
 */
export function model(settings: any = {}) {
  return function (target: any) {
    ModelDecorator.prepareModel(target);
  };
}

/**
 * Used to propagate a method or property from a base model to inherited childs
 * @todo find cleaner workaround ?
 */
export function propagate() {
  return function (target: any, propertyKey: string) {
    let modelClass: any;
    let isOnPrototype: boolean;

    if (target.hasOwnProperty('constructor')) {
      modelClass = target.constructor;
      isOnPrototype = true;
    } else {
      modelClass = target;
      isOnPrototype = false;
    }

    ModelDecorator.append(modelClass, new ModelDecorator(
      ModelDecoratorType.Propagate,
      propertyKey,
      { handler: target[propertyKey] },
      isOnPrototype,
    ));
  };
}

/**
 * Add an observer to the model
 * @param name Hook name to hook onto
 */
export function hook(name: ModelHook) {
  return ModelDecorator.generate(ModelDecoratorType.Hook, { name });
}

export function onAccess() {
  return ModelDecorator.generate(ModelDecoratorType.Hook, { name: ModelHook.Access });
}

export function onPersist() {
  return ModelDecorator.generate(ModelDecoratorType.Hook, { name: ModelHook.Persist });
}

export function onLoaded() {
  return ModelDecorator.generate(ModelDecoratorType.Hook, { name: ModelHook.Loaded });
}

export function beforeSave() {
  return ModelDecorator.generate(ModelDecoratorType.Hook, { name: ModelHook.BeforeSave });
}

export function afterSave() {
  return ModelDecorator.generate(ModelDecoratorType.Hook, { name: ModelHook.AfterSave });
}

export function beforeDelete() {
  return ModelDecorator.generate(ModelDecoratorType.Hook, { name: ModelHook.BeforeDelete });
}

export function afterDelete() {
  return ModelDecorator.generate(ModelDecoratorType.Hook, { name: ModelHook.AfterDelete });
}

/**
 * Add an event listener to the model
 * @param name Event name to hook onto
 */
export function on(name: ModelEvent) {
  return ModelDecorator.generate(ModelDecoratorType.Event, { name });
}

/**
 * Define a loopback property on the datastore,
 *  - `type` is optional and can be automaticaly infered for string, number, date, boolean,
 *    array and object. For complex objects, complex arrays, or other, it should be defined.
 *
 * Can be used like :
 *  - `@property title: string = 'Default Title'`
 *  - `@property({ required: true }) title: string = 'Default Title'`
 *  - `@property({ default: 'Default Title', required: true }) title: string`
 *  - ...
 *
 * @param params Property params (see loopback documentation)
 */
export function property(params: ModelPropertyDefinition = {}): any {
  return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
    const modelClass = target.constructor;

    if (!params.type) {
      const type = Reflect.getMetadata('design:type', target, propertyKey);

      if (type === Array) {
        params.type = 'array';
      } else {
        params.type = type;
      }
    }

    ModelDecorator.append(modelClass, new ModelDecorator(
      ModelDecoratorType.Property,
      propertyKey, {
        name: propertyKey,
        definition: params,
      },
    ));
  };
}

export function mixin<T = any>(
  handler: (modelClass: typeof Model, options: T) => void,
  options?: T,
) {
  return function (target: any) {
    const modelClass = target;

    ModelDecorator.append(modelClass, new ModelDecorator(
      ModelDecoratorType.Mixin,
      null, {
        handler,
        options,
      },
    ));
  };
}
