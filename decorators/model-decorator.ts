export enum ModelDecoratorType {
  Event = 'Event',
  Hook = 'Hook',
  Mixin = 'Mixin',
  Operation = 'Operation',
  Property = 'Property',
  Relation = 'Relation',
  RemoteHook = 'RemoteHook',
  Propagate = 'Propagate',
  Validator = 'Validator',
}

export class ModelDecorator {
  type: ModelDecoratorType;
  propertyKey: string | null;
  spec: any;
  isOnPrototype: boolean;

  constructor(
    type: ModelDecoratorType,
    propertyKey: string | null,
    spec?: any,
    isOnPrototype?: boolean,
  ) {
    this.type = type;
    this.propertyKey = propertyKey;
    this.spec = spec;
    this.isOnPrototype = !!isOnPrototype

    // TS: prevent some warnings
    ; {
      this.applyEvent;
      this.applyHook;
      this.applyValidator;
      this.applyRelation;
      this.applyRemoteHook;
      this.applyOperation;
      this.applyMixin;
      this.applyProperty;
      this.applyPropagate;
    }
    // <
  }

  static append(modelClass: any, decorator: ModelDecorator) {
    this.prepareModel(modelClass);
    modelClass.__decorators.push(decorator);
  }

  static generate(type: ModelDecoratorType, spec: any = {}) {
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

      ModelDecorator.append(modelClass, new ModelDecorator(type, propertyKey, spec, isOnPrototype));
    };
  }

  static prepareModel(modelClass: any) {
    if (modelClass.hasOwnProperty('__decorators')) return;

    // This property will contain everything the decorators will need to set
    // Setting everything will be handled by the `setup` class method which will
    // be called at runtime with the real Model as argument
    Object.defineProperty(modelClass, '__decorators', {
      enumerable: false,

      // Support inheritance from parent decorators
      value: modelClass.__decorators ? [...modelClass.__decorators] : [],
    });

    modelClass.__applyDefinitionDecorators = function (definition: any = {}) {
      if (!this.__decorators) return;

      const decorators = modelClass.__decorators;
      for (const decorator of decorators) {
        decorator.commit(modelClass, definition, true);
      }

      return definition;
    };

    // Can also be done within a mixin??
    modelClass.__applyDecorators = function (modelClass: any) {
      if (!modelClass || !modelClass.__decorators) return;

      const decorators = modelClass.__decorators;

      const decoratorsAfterAttached: ModelDecorator[] = [];

      for (const decorator of decorators) {
        switch (decorator.type) {
          case ModelDecoratorType.Mixin:
          case ModelDecoratorType.Hook:
            decoratorsAfterAttached.push(decorator);
            break;
          default:
            decorator.commit(modelClass);
        }
      }
      modelClass.setMaxListeners(100);
      modelClass.once('attached', () => {
        for (const decorator of decoratorsAfterAttached) {
          decorator.commit(modelClass);
        }
      });
    };
  }

  public commit(modelClass: any, $definition?: any, withDef: boolean = false) {
    const handler = (<any>this)[`apply${this.type}`];

    const handlerArgNb = handler.length;

    // when two parameters are passed only handler with two arguments can be called, those handlers
    // will need to modify the second parameter
    // On another hand, it means it's applied on the modelClass
    //
    // What it means is that when you define an handler like `applyFoo(mc, def)` it will be called
    // before an handler defined like `applyBar(mc)`, and it should modify `def`, `mc` is immutable
    if (handler && (!withDef && handlerArgNb === 2) === (withDef && handlerArgNb === 1)) {
      handler.call(this, modelClass, $definition);
    }
  }

  // modelClass is immutable when two arguments are in the definition
  // definition should be mutated
  protected applyRelation(modelClass: any, $definition: any) {
    if (!$definition.relations) $definition.relations = {};

    const relDef = { type: this.spec.type, model: this.spec.modelName, ...this.spec.definition };
    delete relDef.as;

    $definition.relations[this.spec.definition.as] = relDef;
  }

  protected applyHook(modelClass: any) {
    modelClass.observe(this.spec.name, modelClass[this.propertyKey!].bind(modelClass));
    delete modelClass[this.propertyKey!]; // Avoid `deprecated`
  }

  protected applyRemoteHook(modelClass: any) {
    modelClass[this.spec.name](
      this.spec.methodName,
      modelClass[this.propertyKey!].bind(modelClass),
    );
  }

  protected applyValidator(modelClass: any) {
    if (this.spec.validatorFn) {
      modelClass[this.spec.name](this.propertyKey, this.spec.validatorFn, this.spec.options);
    } else {
      modelClass[this.spec.name](this.propertyKey, this.spec.options);
    }
  }

  protected applyEvent(modelClass: any) {
    modelClass.on(this.spec.name, modelClass[this.propertyKey!].bind(modelClass));
  }

  protected applyProperty(modelClass: any) {
    modelClass.defineProperty(this.spec.name, this.spec.definition);
  }

  protected applyOperation(modelClass: any) {
    modelClass.remoteMethod(this.spec.handlerName, this.spec.definition);
  }

  protected applyMixin(modelClass: any) {
    this.spec.handler(modelClass, this.spec.options);
  }

  protected applyPropagate(modelClass: any) {
    const target = this.isOnPrototype ? modelClass.prototype : modelClass;
    target[this.propertyKey!] = this.spec.handler;
  }
}
