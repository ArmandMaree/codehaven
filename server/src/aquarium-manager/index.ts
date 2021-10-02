import express from 'express';
import router from './router';
import persistence from './persistence';

const register = async (app: express.Application, parentRouter: express.Router) => {
  await router.register(app, parentRouter);
  await persistence.register();
};

export default { register };
