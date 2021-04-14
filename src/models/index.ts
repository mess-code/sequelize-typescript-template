import { Sequelize } from 'sequelize';
import config from '../config';
import { createPostModel, Post } from './post.model';
import { createUserModel, User } from './user.model';

export interface DbInterface {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: typeof User;
  Post: typeof Post;
}

const { host, port, username, password } = config.database;
const sequelize = new Sequelize({
  host,
  port,
  username,
  password,
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
  }
});

const db: DbInterface = {
  sequelize,
  Sequelize,
  User: createUserModel(sequelize),
  Post: createPostModel(sequelize),
};

Object.keys(db).forEach(modelName => {
  if ((db as any)[modelName].associate) {
    (db as any)[modelName].associate(db);
  }
});

export default db;
