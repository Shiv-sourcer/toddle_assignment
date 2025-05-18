module.exports = (sequelize, DataTypes) => {
  return sequelize.define("JournalStudent", {}, { timestamps: false });
};
