const getFeeder = (id:number) => {
  return Promise.resolve({
    id: 1,
    name: "10 Gallon Aquarium",
    defaultDuration: 600
  })
}

const getAllFeeders = () => {
  return Promise.resolve([{
    id: 1,
    name: "10 Gallon Aquarium",
    defaultDuration: 600
  }])
}

const upsertFeeder = (id:number, name:string, defaultDuration:number) => {
  return Promise.resolve()
}

const deleteFeeder = (id:number) => {
  return Promise.resolve()
}

export {
  getFeeder,
  getAllFeeders,
  upsertFeeder,
  deleteFeeder
}