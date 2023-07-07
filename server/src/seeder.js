const { MongoClient } = require('mongodb');


const uri = 'mongodb://localhost:27017';
const dbName = 'Ecommerce_books';
const collectionName = 'books';

const seedData = async () => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Remove existing data
    await collection.deleteMany({});

    // Generate fake users
    const books = [
        {
            
            "title": "Brave New World",
            "author": "Aldous Huxley",
            "isbn": 123222,
            "price": 7000,
            "quantity": 98,
            "image": "images/book1.jpg"
          },
          {
            
            "title": "o Kill a Mockingbird",
            "author": "Harper Lee",
            "isbn": 123222,
            "price": 5000,
            "quantity": 98,
            "image": "images/book2.jpg"
          },
          {
            
            "title": "A Passage to India",
            "author": "E. M. Forster",
            "isbn": 123222,
            "price": 4000,
            "quantity": 99,
            "image": "images/book3.png"
          },
          {
           
            "title": "Naruto comic",
            "author": "Kishimoto",
            "isbn": 4445123,
            "price": 5000,
            "quantity": 0,
            "image": "images/book3.jpg"
          }
    ];
    // for (let i = 0; i < 10; i++) {
    //   const book = {
    //     name: faker.name.findName(),
    //     email: faker.internet.email(),
    //     // Set other fields
    //   };
    //   users.push(user);
    // }

    // Insert the users into the collection
    await collection.insertMany(books);

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
};
seedData()