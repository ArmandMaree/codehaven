import express from 'express';
import router from './router';

const register = async (app: express.Application) => {
  await router.register(app);
};

export default { register };
