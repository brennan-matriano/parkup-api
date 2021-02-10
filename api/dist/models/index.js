"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
let config_path;
if (env == 'production' || env == 'testing') {
    config_path = __dirname + '/../../config/config.json';
}
else {
    config_path = __dirname + '/../config/config.json';
}
const config = require(config_path)[env];
let db = {};
exports.db = db;
let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);
fs
    .readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
})
    .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize.sync({ alter: false });
