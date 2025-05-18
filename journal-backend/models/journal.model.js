module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Journal", {
    description: DataTypes.TEXT,
    published_at: DataTypes.DATE,
    is_published: { type: DataTypes.BOOLEAN, defaultValue: false }
  });
};
