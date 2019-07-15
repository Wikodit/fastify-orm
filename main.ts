import fp from 'fastify-plugin';
import plugin from './plugin';

export * from './plugin';
export * from './decorators';
export * from './model';

export default fp(plugin, {
  fastify: '>=1.0.0',
  name: 'fastify-orm',
});
