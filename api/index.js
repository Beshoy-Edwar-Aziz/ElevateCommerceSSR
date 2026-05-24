const server = import('../dist/ecommerceProject/server/main.server.mjs');

export default async (req, res) => {
  const app = await server;
  app.reqHandler(req, res);
};
