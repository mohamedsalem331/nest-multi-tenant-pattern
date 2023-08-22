import { Scope } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { models } from 'src/models';

export const getDatabaseFactoryProvider = async (
  connections: Map<String, Sequelize>,
  databaseName: string,
) => {
  if (!databaseName) throw new Error('Invalid database info');

  if (connections.has(databaseName)) return connections.get(databaseName);

  const sequelize = new Sequelize({
    dialect: 'mysql',
    port: 3306,
    host: '',
    username: '',
    password: '',
    database: databaseName,
    logging: false,
  });

  sequelize.addModels(models);
  await sequelize.sync();
  connections.set(databaseName, sequelize);
  return sequelize;
};
