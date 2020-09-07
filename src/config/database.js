require('dotenv').config();

module.exports = {
  url: process.env.DATABASE_URL,
  define: {
    timestamp: true,
    underscored: true,
    underscoredALL: true,
  },
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
