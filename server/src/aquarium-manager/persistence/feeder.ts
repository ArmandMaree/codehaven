import Feeder from './models/feeder';

const getFeeder = (id: number): Promise<Feeder | null> => Feeder.findByPk(id);

const getAllFeeders = (): Promise<Feeder[]> => {
  return Feeder.findAll();
};

const upsertFeeder = (id: number, name:string, defaultDuration: number) => {
  return Feeder.upsert({
    id,
    name,
    defaultDuration,
  });
};

const deleteFeeder = (id: number) => Feeder.findByPk(id).then((feeder: Feeder | null) => {
  if (!feeder) {
    throw new Error(`Feeder with ID ${id} does not exist.`);
  }

  return feeder.destroy();
});

export {
  getFeeder,
  getAllFeeders,
  upsertFeeder,
  deleteFeeder,
};
