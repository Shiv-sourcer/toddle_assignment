require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models'); // Sequelize DB models

const authRoutes = require('./routes/auth.routes');
const journalRoutes = require('./routes/journal.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/journals', journalRoutes);

// Health check (optional)
app.get('/', (req, res) => {
  res.send('✅ Journal Backend is running!');
});

// Connect to DB and start server
const PORT = process.env.PORT || 3000;

db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully.');
    return db.sequelize.sync(); // Ensure tables are created
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to start server due to DB error:', err);
  });

  app.use('/uploads', express.static('uploads'));


module.exports = app;
