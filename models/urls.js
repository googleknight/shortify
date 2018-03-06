module.exports = (sequelize, DataTypes) => {
  const urls = sequelize.define('urls', {
    longUrl: DataTypes.STRING,
    shortUrl: {
      type: DataTypes.STRING(6),
      unique: true,
    },
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
  });
  return urls;
};
