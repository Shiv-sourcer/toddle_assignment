module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Attachment", {
    type: { type: DataTypes.ENUM('image', 'video', 'pdf', 'url'), allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false }
  });
};
