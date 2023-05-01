import { FastifyPluginAsync } from "fastify";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { status: "true" }
  })
}

export default example;
