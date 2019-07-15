import 'reflect-metadata';
import { ModelDecorator, ModelDecoratorType } from './index';

export enum OperationVerb {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

export interface OperationArgument {
  arg?: string;
  description?: string;
  http?: any;
  required?: boolean;
  root?: boolean;
  type?: string;
  default?: string;
  documented?: boolean;
}

export interface OperationDefinition {
  accepts?: OperationArgument | OperationArgument[];
  accessScopes?: any;
  description?: string | string[];
  http?: {
    path?: string,
    verb?: OperationVerb,
    status?: number,
    errorStatus?: number,
  };
  notes?: string | string[];
  documented?: boolean;
  returns?: OperationArgument | OperationArgument[];
  jsonapi?: boolean;
}

export function beforeRemote(methodName: string) {
  return ModelDecorator.generate(ModelDecoratorType.RemoteHook, {
    methodName,
    name: 'beforeRemote',
  });
}

export function afterRemote(methodName: string) {
  return ModelDecorator.generate(ModelDecoratorType.RemoteHook, {
    methodName,
    name: 'afterRemote',
  });
}

export function afterRemoteError(methodName: string) {
  return ModelDecorator.generate(ModelDecoratorType.RemoteHook, {
    methodName,
    name: 'afterRemoteError',
  });
}

export function get(path: string, spec?: OperationDefinition) {
  return operation(OperationVerb.Get, path, spec);
}

export function post(path: string, spec?: OperationDefinition) {
  return operation(OperationVerb.Post, path, spec);
}

export function put(path: string, spec?: OperationDefinition) {
  return operation(OperationVerb.Put, path, spec);
}

export function patch(path: string, spec?: OperationDefinition) {
  return operation(OperationVerb.Patch, path, spec);
}

export function del(path: string, spec?: OperationDefinition) {
  return operation(OperationVerb.Delete, path, spec);
}

export function operation(verb: OperationVerb, path: string, spec: OperationDefinition = {}) {
  return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
    let modelClass: any;
    let isInstanceOperation: boolean;

    if (target.hasOwnProperty('constructor')) {
      modelClass = target.constructor;
      isInstanceOperation = true;
    } else {
      modelClass = target;
      isInstanceOperation = false;
    }

    if (!spec.http) spec.http = {};
    if (!spec.http.verb) spec.http.verb = verb;

    // Also add leading / for instance methods
    if (!spec.http.path) {
      spec.http.path = `${isInstanceOperation && path[0] !== '/' ? '/' : ''}${path}`;
    }

    ModelDecorator.append(modelClass, new ModelDecorator(
      ModelDecoratorType.Operation,
      propertyKey, {
        handlerName: `${isInstanceOperation ? 'prototype.' : ''}${propertyKey}`,
        definition: spec,
      },
    ));
  };
}
