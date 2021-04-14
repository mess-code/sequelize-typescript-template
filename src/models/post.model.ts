import { Sequelize, Model, DataTypes, ModelAttributes, InitOptions } from 'sequelize';
import { DbInterface } from '.';
import { UserAttributes } from './user.model';

export interface PostAttributes {
  id?: string;
  userId?: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Association attributes
  user?: UserAttributes;
}

export class Post extends Model<PostAttributes> {
  public static associate(models: DbInterface): void {
    Post.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  }
}

export const createPostModel = (sequelize: Sequelize): typeof Post => {
  const attributes: ModelAttributes<Post, PostAttributes> = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
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

  const options: InitOptions<Post> = {
    sequelize,
    tableName: 'Post',
  }

  Post.init(attributes, options);

  return Post;
};
