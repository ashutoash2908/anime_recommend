const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.NODE_ENV === 'production') {
  // Validate DATABASE_URL exists
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required in production environment');
  }

  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  // Local development config with validation
  const requiredVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST'];
  const missingVars = requiredVars.filter(v => !process.env[v]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required DB config: ${missingVars.join(', ')}`);
  }

  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: false
    }
  );
}

// Test connection with retries
const testConnection = async (attempts = 3) => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');
  } catch (error) {
    if (attempts > 0) {
      console.log(`Connection failed, ${attempts} attempts remaining...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return testConnection(attempts - 1);
    }
    throw new Error(`Failed to connect to database: ${error.message}`);
  }
};

testConnection().catch(err => {
  console.error(err.message);
  process.exit(1);
});

module.exports = sequelize;