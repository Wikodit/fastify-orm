// import { ModelDecorator, ModelDecoratorType } from 'lib/decorators/model-decorator';
// import {
//   ValidatesAbsencePresenceOptions,
//   ValidatesDateOptions,
//   ValidateOptions,
//   ValidatesNumericalityOptions,
//   ValidatesUniquenessOptions,
//   ValidatesLengthOptions,
//   ValidatesInclusionExclusionOptions,
//   ValidatesFormatOptions,
// } from 'loopback';

// export enum ModelValidator {
//   Validate = 'validate',
//   Async = 'validateAsync',
//   PresenceOf = 'validatesPresenceOf',
//   AbsenceOf = 'validatesAbsenceOf',
//   DateOf = 'validatesDateOf',
//   ExclusionOf = 'validatesExclusionOf',
//   FormatOf = 'validatesFormatOf',
//   InclusionOf = 'validatesInclusionOf',
//   LengthOf = 'validatesLengthOf',
//   NumericalityOf = 'validatesNumericalityOf',
//   UniquenessOf = 'validatesUniquenessOf',
// }

// export function validator(name: ModelValidator, options?: any) {
//   return ModelDecorator.generate(ModelDecoratorType.Validator, { name, options });
// }

// /**
//  * Validate using custom validation function.
//  * @export
//  * @param {*} validatorFn
//  * @param {Validate} [options]
//  * @returns
//  */
// export function validate(validatorFn: any, options?: ValidateOptions) {
//   return ModelDecorator.generate(ModelDecoratorType.Validator, {
//     options,
//     validatorFn,
//     name: ModelValidator.Validate,
//   });
// }

// /**
//  * Validate using custom asynchronous validation function.
//  * @export
//  * @param {*} validatorFn
//  * @param {Validate} [options]
//  * @returns
//  */
// export function validateAsync(validatorFn: any, options?: ValidateOptions) {
//   return ModelDecorator.generate(ModelDecoratorType.Validator, {
//     options,
//     validatorFn,
//     name: ModelValidator.Async,
//   });
// }

// /**
//  * Validate absence of one or more specified properties.
//  *
//  * A model should not include a property to be considered valid;
//  * fails when validated field is not blank.
//  *
//  * For example, validate absence of reserved
//  * @export
//  * @param {ValidatesAbsencePresenceOptions} [options]
//  * @returns
//  */
// export function validatesAbsenceOf(options?: ValidatesAbsencePresenceOptions) {
//   return validator(ModelValidator.AbsenceOf, options);
// }

// /**
//  * Validate presence of one or more specified properties.
//  *
//  * Requires a model to include a property to be considered valid; fails when validated field is
//  * blank.
//  *
//  * For example, validate presence of title
//  * `Post.validatesPresenceOf('title');`
//  *
//  * Validate that model has first, last, and age properties:
//  * `User.validatesPresenceOf('first', 'last', 'age');`
//  *
//  * Example with custom message
//  * `Post.validatesPresenceOf('title', {message: 'Cannot be blank'});`
//  *
//  * @export
//  * @param {ValidatesAbsencePresenceOptions} [options]
//  * @returns
//  */
// export function validatesPresenceOf(options?: ValidatesAbsencePresenceOptions) {
//   return validator(ModelValidator.PresenceOf, options);
// }

// /**
//  * Validate if a value for a property is a Date.
//  * @export
//  * @param {ValidatesDateOptions} [options]
//  * @returns
//  */
// export function validatesDateOf(options: ValidatesDateOptions) {
//   return validator(ModelValidator.DateOf, options);
// }

// /**
//  * Validate exclusion in a set.
//  * Require a property value not be in the specified array.
//  * @export
//  * @param {ValidatesInclusionExclusionOptions} options
//  * @returns
//  */
// export function validatesExclusionOf(options: ValidatesInclusionExclusionOptions) {
//   return validator(ModelValidator.ExclusionOf, options);
// }

// /**
//  * Validate format.
//  * Require a model to include a property that matches the given format.
//  * @export
//  * @param {ValidatesFormatOptions} options
//  * @returns
//  */
// export function validatesFormatOf(options: ValidatesFormatOptions) {
//   return validator(ModelValidator.FormatOf, options);
// }

// /**
//  * Validate inclusion in set.
//  * Require a value for property to be in the specified array.
//  * @export
//  * @param {ValidatesInclusionExclusionOptions} options
//  * @returns
//  */
// export function validatesInclusionOf(options: ValidatesInclusionExclusionOptions) {
//   return validator(ModelValidator.InclusionOf, options);
// }

// /**
//  * Validate length.
//  *
//  * Require a property length to be within a specified range.
//  * There are three kinds of validations: min, max, is.
//  *
//  * Default error messages:
//  *     min: too short
//  *     max: too long
//  *     is: length is wrong
//  *
//  * @export
//  * @param {ValidatesLengthOptions} options
//  * @returns
//  */
// export function validatesLengthOf(options: ValidatesLengthOptions) {
//   return validator(ModelValidator.LengthOf, options);
// }

// /**
//  * Validate numericality.
//  * Requires a value for property to be either an integer or number.
//  * @export
//  * @param {ValidatesNumericalityOptions} options
//  * @returns
//  */
// export function validatesNumericalityOf(options: ValidatesNumericalityOptions) {
//   return validator(ModelValidator.NumericalityOf, options);
// }

// /**
//  * Validate uniqueness of the value for a property in the collection of models.
//  * @export
//  * @param {ValidatesUniquenessOptions} [options]
//  * @returns
//  */
// export function validatesUniquenessOf(options?: ValidatesUniquenessOptions) {
//   return validator(ModelValidator.UniquenessOf, options);
// }
