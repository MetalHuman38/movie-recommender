const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface) => {
    const data = [];
    const filePath = path.resolve(
      __dirname,
      '/home/babsdevsys/movie_recommendations/loader/sequelize/data/movies_clean.csv'
    );

    // Read the CSV file
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          // Prepare data for bulk insert
          data.push({
            movie_id: parseInt(row.movie_id, 10),
            title: row.title,
            genres: row.genres,
            created_at: new Date(),
            updated_at: new Date(),
          });
        })
        .on('end', async () => {
          try {
            // Bulk insert into the Movies table
            await queryInterface.bulkInsert('Movies', data, {});
            console.log('Movies seeded successfully!');
            resolve();
          } catch (error) {
            console.error('Error seeding Movies:', error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('Error reading CSV:', error);
          reject(error);
        });
    });
  },

  down: async (queryInterface) => {
    // Remove all data from the Movies table
    await queryInterface.bulkDelete('Movies', null, {});
  },
};
