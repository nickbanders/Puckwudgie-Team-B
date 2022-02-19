const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Subcomment extends Model {}

Subcomment.init(
  {
    // columns will go here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
                model: 'user',
                key: 'id'
            }
    },
    subcomment_text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1]
        }
    }
    
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'subcomment'
  }
);

module.exports = Subcomment;