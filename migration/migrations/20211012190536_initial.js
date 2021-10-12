const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable() => "Feeders", deps: []
 * createTable() => "Logs", deps: [Feeders]
 * createTable() => "Schedules", deps: [Feeders]
 *
 */

const info = {
  revision: 1,
  name: 'initial',
  created: '2021-10-12T19:05:36.753Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'createTable',
    params: [
      'Feeders',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: 'name' },
        defaultDuration: { type: Sequelize.INTEGER, field: 'defaultDuration' },
        deletedAt: { type: Sequelize.DATE, field: 'deletedAt' },
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Logs',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        timestamp: { type: Sequelize.DATE, field: 'timestamp' },
        duration: { type: Sequelize.INTEGER, field: 'duration' },
        actor: { type: Sequelize.STRING, field: 'actor' },
        status: { type: Sequelize.STRING, field: 'status' },
        message: { type: Sequelize.STRING, field: 'message' },
        deletedAt: { type: Sequelize.DATE, field: 'deletedAt' },
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: false,
        },
        FeederId: {
          type: Sequelize.INTEGER,
          field: 'FeederId',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          references: { model: 'Feeders', key: 'id' },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Schedules',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        cron: { type: Sequelize.STRING, field: 'cron' },
        deletedAt: { type: Sequelize.DATE, field: 'deletedAt' },
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: false,
        },
        FeederId: {
          type: Sequelize.INTEGER,
          field: 'FeederId',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          references: { model: 'Feeders', key: 'id' },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'dropTable',
    params: ['Logs', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Schedules', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Feeders', { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) => execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) => execute(queryInterface, sequelize, rollbackCommands),
  info,
};
