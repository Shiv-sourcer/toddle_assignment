const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, DataTypes);
db.Journal = require('./journal.model')(sequelize, DataTypes);
db.Attachment = require('./attachment.model')(sequelize, DataTypes);
db.JournalStudent = require('./journalStudent.model')(sequelize, DataTypes);

// Associations
db.User.hasMany(db.Journal, { foreignKey: 'teacher_id' });
db.Journal.belongsTo(db.User, { foreignKey: 'teacher_id' });

db.Journal.belongsToMany(db.User, {
  through: db.JournalStudent,
  as: 'taggedStudents',
  foreignKey: 'journal_id',
});
db.User.belongsToMany(db.Journal, {
  through: db.JournalStudent,
  as: 'studentJournals',
  foreignKey: 'student_id',
});

db.Journal.hasMany(db.Attachment, { foreignKey: 'journal_id' });
db.Attachment.belongsTo(db.Journal, { foreignKey: 'journal_id' });

module.exports = db;
