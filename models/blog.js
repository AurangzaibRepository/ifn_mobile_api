'use strict';
const {
  Model
} = require('sequelize');
const { BLOG_STATUS } = require('../enums/status.enum');

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Blog.init({
    title:{
      allowNull: false,
      type: DataTypes.STRING(200),
    },
    text: {
      allowNull: false,
      type: DataTypes.STRING
    },
    banner: {
      allowNull: false,
      type: DataTypes.STRING(300),
      get() {
        const fileName = this.getDataValue('banner');
        if (! fileName) return null;

        return `${process.env.AWS_BASE_URL}/images/blogs/${fileName}`;
      }
    },
    status: {
      defaultValue: BLOG_STATUS.DRAFT,
      type: DataTypes.ENUM(...Object.values(BLOG_STATUS))
    },
  }, {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });

  return Blog;
};