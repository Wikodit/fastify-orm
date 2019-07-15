import { Plugin } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

export interface FastifyOrmOptions {

}

export const plugin: Plugin<Server, IncomingMessage, ServerResponse, any> = function (
  fastify,
  opts,
  next,
) {
  next();
};

export default plugin;
