import { Sequelize, Model, DataTypes, ModelAttributes, InitOptions } from 'sequelize';
import type { DbInterface } from '.';
import { PostAttributes } from './post.model';

export interface UserAttributes {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Association attributes
  posts?: PostAttributes[];
}

export class User extends Model<UserAttributes> {
  public static associate(models: DbInterface): void {
    User.hasMany(models.Post, { foreignKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  }
}

export const createUserModel = (sequelize: Sequelize): typeof User => {
  const attributes: ModelAttributes<User, UserAttributes> = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  };

  const options: InitOptions<User> = {
    sequelize,
    tableName: 'User',
  }

  User.init(attributes, options);

  return User;
};
