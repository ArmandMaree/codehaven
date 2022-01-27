const handleLogin = (req: any, res: any) => {
  return Promise.resolve()
    .then(() => {
      res.status(200).send({
        token: 'test123',
      });
    });
};

export {
  // eslint-disable-next-line import/prefer-default-export
  handleLogin,
};
