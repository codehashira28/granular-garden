const { Model, DataTypes } = require('sequilize');
const sequelize = require('../config/connection');

class Feed extends Model {};

Feed.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        creator: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        dateCreated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'feed',
    }
)

module.exports = Feed;