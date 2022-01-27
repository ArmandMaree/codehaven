const getAllStatuses = () => Promise.resolve([
  {
    Feeder: {
      id: 1,
      name: '10 Gallon Aquarium',
    },
    status: 'Operational',
    code: 200,
    message: 'I am online!',
  },
]);

export {
  // eslint-disable-next-line import/prefer-default-export
  getAllStatuses,
};
