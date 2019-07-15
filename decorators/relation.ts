// import 'reflect-metadata';

// import { ModelDecorator, ModelDecoratorType } from './model-decorator';
// import {
//   QueryFilter,
//   QueryFilterAll,
//   QueryWhere,
//   RelationDefinition,
//   RelationDefinitionBelongsTo,
//   RelationDefinitionHasMany,
//   RelationDefinitionHasOne,
//   RelationDefinitionHasManyPolymorphic,
// } from 'loopback';
// import Model from '..';
// import { PartialSchemaOf } from '../../types/loopback/common/custom-types';

// interface RelationAccessorMethodGet<ModelClass extends Model> {
//   /**
//    * Asynchronously load and cache the related instance
//    *
//    * @param {QueryFilter} [options]
//    * @returns {Promise<ModelClass>}
//    * @memberof RelationAccessorBelongsTo
//    */
//   get(options?: QueryFilter): Promise<ModelClass>;
//   // get(options: QueryFilter, cb: (err: Error, instance: ModelClass) => void): void
//   // get(cb: (err: Error, instance: ModelClass) => void): void
// }

// interface RelationAccessorMethodBuildCreate<ModelClass extends Model> {
//   /**
//    * Initialize the remote model
//    *
//    * @param {*} data
//    * @returns {ModelClass}
//    * @memberof RelationAccessorBelongsTo
//    */
//   build(data: any): ModelClass;

//   /**
//    * Asynchronously create the related instance from data
//    *
//    * @param {*} [data]
//    * @returns {Promise<ModelClass>}
//    * @memberof RelationAccessorBelongsTo
//    */
//   create(data ?: any): Promise <ModelClass>;
//     // create(data: any, cb: (err: Error, models: ModelClass) => void): void
//     // create(cb: (err: Error, models: ModelClass) => void): void

//   /**
//    * The remote model class name
//    * @type {string}
//    * @memberof RelationAccessorBelongsTo
//    */
//   _targetClass: string;
// }

// interface RelationAccessorBelongsToBase<ModelClass extends Model> {
//   /**
//    * Get the cached related instance
//    *
//    * @param {QueryFilter} [options]
//    * @returns {Promise<ModelClass>}
//    * @memberof RelationAccessorBelongsTo
//    */
//   <T = ModelClass | null>(): Promise<T>;

//   /**
//    * Set the related to an instance
//    *
//    * @param {QueryFilter} [options]
//    * @returns {Promise<ModelClass>}
//    * @memberof RelationAccessorBelongsTo
//    */
//   (instance: ModelClass): Promise<void>;

//   /**
//    * Update set of attributes.  Performs validation before updating
//    *
//    * @param {*} data
//    * @returns {Promise<ModelClass>}
//    * @memberof RelationAccessorBelongsTo
//    */
//   update(data: any): Promise<ModelClass>;
//   // update(data: any, cb: (err: Error, instance: ModelClass) => void): void

//   /** Deletes the model from persistence.
//   * Triggers`destroy` hook(async) before and after destroying object.
//    *
//    * @returns {Promise<void>}
//    * @memberof RelationAccessorBelongsTo
//    */
//   destroy(): Promise<void>;
//   // destroy(cb: () => void): void

// }

// export interface RelationAccessorBelongsToPolymorphic<ModelClass extends Model> extends
//   RelationAccessorBelongsToBase<ModelClass>,
//   RelationAccessorMethodGet<ModelClass>{

// }

// export interface RelationAccessorBelongsTo<ModelClass extends Model> extends
//   RelationAccessorBelongsToBase<ModelClass>,
//   RelationAccessorMethodGet<ModelClass>,
//   RelationAccessorMethodBuildCreate<ModelClass> {

// }

// export interface RelationAccessorBelongsToRequired<ModelClass extends Model> extends
//   RelationAccessorBelongsTo<ModelClass> {
//   /**
//    * Get the cached related instance
//    *
//    * @param {QueryFilter} [options]
//    * @returns {Promise<ModelClass>}
//    * @memberof RelationAccessorBelongsTo
//    */
//   <T = ModelClass>(): Promise<T>;
// }

// export interface RelationAccessorHasOne<
//   ModelClass extends Model
// > extends RelationAccessorHasMany<ModelClass> {

// }

// export interface RelationAccessorEmbedsOne<ModelClass extends Model> extends
//   RelationAccessorBelongsTo<ModelClass> {

//   /**
//    * Get or set the embedded instance
//    *
//    * @param {ModelClass} [instance]
//    * @returns {ModelClass}
//    * @memberof RelationAccessorEmbedsOne
//    */
//   value(instance?: ModelClass): ModelClass;
// }

// export interface RelationAccessorHasMany<ModelClass extends Model> {
//   // (condOrRefresh: boolean, options: QueryFilterAll): Promise<ModelClass>
//   (options?: QueryFilterAll<ModelClass>): Promise<ModelClass[]>;

//   find(filter: QueryFilterAll<ModelClass>): Promise<ModelClass[]>;
//   findOne(filter: QueryFilter<ModelClass>): Promise<ModelClass>;
//   findById(id: string): Promise<ModelClass>;
//   destroy(): Promise<void>;
//   destroyAll(filter: QueryFilter<ModelClass>): Promise<{ info: any, infoCount: number }>;
//   destroyById(id: any): Promise<void>;
//   updateById(id: any, data: any): Promise<ModelClass>;
//   updateAll(filter: QueryWhere<ModelClass>, data: any): Promise<ModelClass>;
//   exists(instance: ModelClass): Promise<boolean>;

//   create(data: PartialSchemaOf<ModelClass>[]): Promise<ModelClass[]>;
//   create(data: PartialSchemaOf<ModelClass>): Promise<ModelClass>;
//   count(where?: QueryWhere<ModelClass>): Promise<ModelClass>;
//   build(data: any): ModelClass;
// }

// export interface RelationAccessorHasManyThrough<ModelClass extends Model> extends
//   RelationAccessorHasMany<ModelClass> {
//   add(instance: ModelClass, dataThrough: any): Promise<ModelClass>;
//   remove(instance: ModelClass): Promise<void>;
// }

// export interface RelationAccessorEmbedsMany<ModelClass extends Model> extends
//   RelationAccessorHasMany<ModelClass> {
//   at(index: number): Promise<ModelClass>;
//   get(id: string): Promise<ModelClass>;
//   set(id: string, data: any): Promise<ModelClass>;
//   unset(id: any): Promise<void>;
// }

// export enum RelationType {
//   BelongsTo = 'belongsTo',
//   EmbedsOne = 'embedsOne',
//   EmbedsMany = 'embedsMany',
//   HasOne = 'hasOne',
//   HasMany = 'hasMany',
//   HasManyThrough = 'hasManyThrough',
//   HasAndBelongsToMany = 'hasAndBelongsToMany',
//   ReferencesMany = 'referencesMany',
// }

// /**
//  * Define a relation
//  * default `as` is `propertyKey`
//  *
//  * @param type Type of the relation
//  * @param modelName Name of the target model
//  * @param params Usual loopback relation params
//  */
// export function relation(
//   type: RelationType,
//   modelName: string | null,
//   params: RelationDefinition | string,
// ) {
//   let _relationParams: RelationDefinition;
//   if (typeof params === 'string') {
//     _relationParams = { foreignKey: params };
//   } else {
//     _relationParams = params;
//   }

//   return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
//     const modelClass = target.constructor;

//     const relationParams = {
//       as: propertyKey,
//       ..._relationParams,
//     };

//     ModelDecorator.append(modelClass, new ModelDecorator(
//       ModelDecoratorType.Relation,
//       propertyKey, {
//         type,
//         modelName,
//         definition: relationParams,
//       },
//     ));
//   };
// }

// /**
//  * Define a embedsMany relation
//  * default `property` is `{propertyKey}List`
//  *
//  * (To have perfect typings, you can add the `property` just below)
//  *
//  * Ex:
//  *    @embedsOne('Address')
//  *    address: RelationAccessorEmbedsOne
//  *    addressData: Address
//  *
//  * @param modelName Name of the target model
//  * @param params Usual loopback relation params
//  */
// export function embedsOne(modelName: string, params?: RelationDefinition) {
//   return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
//     const relationParams = {
//       property: `${propertyKey}Data`,
//       ...params,
//     };
//     return relation(
//       RelationType.EmbedsOne,
//       modelName,
//       relationParams,
//     )(target, propertyKey, descriptor);
//   };
// }

// /**
//  * Define a embedsMany relation
//  * default `property` is `{propertyKey}List`
//  *
//  * (To have perfect typings, you can add the `property` just below)
//  *
//  * Ex:
//  *    @embedsMany('Address')
//  *    addresses: RelationAccessorEmbedsMany
//  *    addressesList: Address[]
//  *
//  * @param modelName Name of the target model
//  * @param params Usual loopback relation params
//  */
// export function embedsMany(modelName: string, params?: RelationDefinition) {
//   return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
//     const relationParams = {
//       property: `${propertyKey}List`,
//       ...params,
//     };
//     return relation(
//       RelationType.EmbedsMany,
//       modelName,
//       relationParams,
//     )(target, propertyKey, descriptor);
//   };
// }

// /**
//  * Define a referencesMany relation
//  * default `foreignKey` is `{propertyKey}Ids`
//  *
//  * (To have perfect typings, you can add the `property` just below)
//  *
//  * Ex:
//  *    @referencesMany('Image', resourceIds)
//  *    resources: RelationAccessorReferencesMany
//  *    resourceIds: Image
//  *
//  * @param modelName Name of the target model
//  * @param params Usual loopback relation params or string representing the foreignKey
//  */
// export function referencesMany(modelName: string, params?: RelationDefinition | string) {
//   let _relationParams: RelationDefinition;
//   if (typeof params === 'string') {
//     _relationParams = { foreignKey: params };
//   } else {
//     _relationParams = params || {};
//   }

//   return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
//     const relationParams = {
//       foreignKey: `${propertyKey}Ids`,
//       ..._relationParams,
//     };
//     return relation(
//       RelationType.ReferencesMany,
//       modelName,
//       relationParams,
//     )(target, propertyKey, descriptor);
//   };
// }

// /**
//  * Define a belongsTo relation
//  * default `foreignKey` is `{propertyKey}Id`
//  *
//  * (To have perfect typings, you can add the foreignKey just below)
//  *
//  * Ex:
//  *    @belongsTo('Article')
//  *    @belongsTo('Article')
//  *    article: RelationAccessorBelongsTo
//  *    articleId: string
//  *
//  * @param modelName Name of the target model
//  * @param params Usual loopback relation params
//  */
// export function belongsTo(
//   modelName: null,
//   params: RelationDefinitionBelongsTo & { polymorphic: true },
// ): Function;
// export function belongsTo(
//   modelName: string,
//   params?: (RelationDefinitionBelongsTo & { polymorphic?: false }) | string,
// ): Function;
// export function belongsTo(
//   modelName: string | null,
//   params?: RelationDefinitionBelongsTo | string,
// ): Function {
//   let _relationParams: RelationDefinitionBelongsTo;
//   if (typeof params === 'string') {
//     _relationParams = { foreignKey: params };
//   } else {
//     _relationParams = params || {};
//   }

//   return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
//     const relationParams = {
//       foreignKey: `${propertyKey}Id`,
//       ..._relationParams,
//     };
//     return relation(
//       RelationType.BelongsTo,
//       modelName,
//       relationParams,
//     )(target, propertyKey, descriptor);
//   };
// }

// /**
//  * Define a hasMany relation
//  *
//  * Ex:
//  *    @hasMany('Comment', { foreignKey: 'articleId' })
//  *    comments: RelationAccessorHasMany
//  * - or -
//  *    @hasMany('Comment', 'articleId')
//  *    comments: RelationAccessorHasMany
//  *
//  * @param modelName Name of the target model
//  * @param params Usual loopback relation params
//  */
// export function hasMany(
//   modelName: string,
//   params: RelationDefinitionHasMany | RelationDefinitionHasManyPolymorphic | string,
// ) {
//   let _relationParams: RelationDefinitionHasMany | RelationDefinitionHasManyPolymorphic;

//   if (typeof params === 'string') {
//     _relationParams = { foreignKey: params };
//   } else {
//     _relationParams = params;
//   }

//   return relation(RelationType.HasMany, modelName, _relationParams);
// }

// /**
//  * Define an hasOne relation
//  *
//  * Ex:
//  *    @hasOne('Comment', { foreignKey: 'articleId' })
//  *    comments: RelationAccessorHasMany
//  * - or -
//  *    @hasOne('Comment', 'articleId')
//  *    comments: RelationAccessorHasMany
//  *
//  * @param modelName Name of the target model
//  * @param params Usual loopback relation params
//  */
// export function hasOne(modelName: string, params: RelationDefinitionHasOne | string) {
//   let _relationParams: RelationDefinitionHasOne;

//   if (typeof params === 'string') {
//     _relationParams = { foreignKey: params };
//   } else {
//     _relationParams = params;
//   }

//   return relation(RelationType.HasMany, modelName, _relationParams);
// }
