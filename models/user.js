'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const { USER_ROLES } = require('../enums/roles.enum');
const { USER_STATUS } = require('../enums/status.enum');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Event, {
        foreignKey: 'createdBy'
      });
    }

      // Format response
    toJSON() {
      const data = { ...this.get() };
      delete data.password;
      delete data.createdAt;
      delete data.updatedAt;

      return data;
    }
  }

  User.init({
    first_name: DataTypes.STRING(50),
    last_name: DataTypes.STRING(50),
    email: DataTypes.STRING(100),
    contact_number: DataTypes.STRING(50),
    street_address: DataTypes.STRING(150),
    city: DataTypes.STRING(100),
    state: DataTypes.STRING(100),
    postal_code: DataTypes.INTEGER,
    membership_registration_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
  },
  membership_expiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
  },
    password: {
      type: DataTypes.STRING(300),
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, parseInt(process.env.HASH_SALT_ROUNDS));
        this.setDataValue('password', hashedPassword);
      }
    },
    role: DataTypes.ENUM(...Object.values(USER_ROLES)),
    picture: {
      type: DataTypes.STRING(500),
      get() {
        const fileName= this.getDataValue('picture');
        if (!fileName) return null;

        return `${process.env.AWS_BASE_URL}/images/members/${fileName}`;
      }
    },
    status: {
      defaultValue: USER_STATUS.ACIVE,
      type: DataTypes.ENUM(...Object.values(USER_STATUS))
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    /*
    defaultScope: {  // We dont need it as we are using toJSON function above
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    },*/
    scopes: {
      default: {
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt']
        }
      },
      members: {
        where: {role: USER_ROLES.MEMBER}
      }
    }
  });

  return User;
};