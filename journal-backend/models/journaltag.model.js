// models/journaltag.model.js
module.exports = (sequelize, DataTypes) => {
  const JournalTags = sequelize.define('JournalTags', {
    journalId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  return JournalTags;
};
