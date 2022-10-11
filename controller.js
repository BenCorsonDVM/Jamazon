require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize("products", "postgres", "Al1995an!", {
  host: "localhost",
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = {
  viewCart: (req, res) => {
    db.query(`SELECT * FROM cart;`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  deleteFromCart: (req, res) => {
    console.log(req);
    let cart_id = req.params.id;

    db.query(`DELETE FROM cart WHERE cart_id = ${cart_id}`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  addToCart: (req, res) => {
    let name = req.body.name.replace("'", "''");

    console.log(name);
    db.query(
      `
      INSERT INTO cart(product_id, name, price, image)
      VALUES(${req.body.product_id}, '${name}', ${req.body.price}, '${req.body.image}');

      SELECT * FROM cart;
    `
    )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  allProducts: (req, res) => {
    db.query(`SELECT * FROM products;`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  clothing: (req, res) => {
    db.query(`SELECT * FROM products WHERE department = 'Clothing';`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  games: (req, res) => {
    db.query(`SELECT * FROM products WHERE department = 'Games';`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  grocery: (req, res) => {
    db.query(`SELECT * FROM products WHERE department = 'Grocery';`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  movies: (req, res) => {
    db.query(`SELECT * FROM products WHERE department = 'Movies';`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  music: (req, res) => {
    db.query(`SELECT * FROM products WHERE department = 'Music';`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  toys: (req, res) => {
    db.query(`SELECT * FROM products WHERE department = 'Toys';`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  seed: (req, res) => {
    db.query(
      `
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS products;

        CREATE TABLE products (
          product_id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          price FLOAT NOT NULL,
          description TEXT,
          image VARCHAR(255),
          department VARCHAR(255)
        );

        CREATE TABLE cart (
          cart_id SERIAL PRIMARY KEY,
          product_id INT,
          name VARCHAR(255) NOT NULL,
          price FLOAT NOT NULL,
          image VARCHAR(255),
          FOREIGN KEY (product_id) REFERENCES products(product_id)
        );

        INSERT INTO products(name, price, description, image, department)
        
        VALUES('Smucker''s Concord Grape Jelly', 3.29, 'Fall in love with Smucker''s Concord Grape Jam. The sweet flavor of this jam will practically transport you to the warm, sunny summers of your youth.', 'https://m.media-amazon.com/images/I/81oPT9dcMIL._SL1500_.jpg', 'Grocery'),
        
        ('Smucker''s Seedless Strawberry Jam', 3.69, 'With just the right balance of fruit and sweetness, this tasty jam could be used for almost anything. Make a balsamic vinaigrette, pair it with chocolate, or add a heaping dollop to your morning oatmeal.', 'https://m.media-amazon.com/images/I/81r+PLBI2WL._SL1500_.jpg', 'Grocery'),
        
        ('Smucker''s Seedless Blackberry Jam', 4.79, ' Smucker''s Seedless Blackberry Jam bursts with all of the complex, tangy flavor you want, but without all of the seeds you don''t. Pair this blackberry jam with our Smucker''s peanut butter to create a classic PB and J.', 'https://m.media-amazon.com/images/I/81RGMRdRyIL._SL1500_.jpg', 'Grocery'),

        ('Smucker''s Red Raspberry Preserves', 4.79, 'Smucker''s Red Raspberry Preserves have a rich, velvety texture and deep berry flavor that the whole family will love. The delightful raspberry flavor keeps you coming back for more.', 'https://m.media-amazon.com/images/I/81pnf-Ll00L._SL1500_.jpg', 'Grocery'),

        ('Smucker''s Peach Preserves', 3.69, 'Smucker''s Peach Preserves have a sweet, juicy quality that the whole family will enjoy. Made with large pieces of peaches, its thick lushness will have you craving another bite.', 'https://m.media-amazon.com/images/I/81ATpFTxZ+L._SL1500_.jpg', 'Grocery'),

        ('Smucker''s Uncrustables Peanut Butter & Strawberry Sandwiches, 10 ct', 8.99, 'You will never go back to a normal PB and J after you taste Smucker''s Uncrustables Peanut Butter and Strawberry Spread Whole Wheat Bread Sandwiches. Taste the sweet flavor of strawberry fruit spread combined with creamy peanut butter in every bite.', 'https://m.media-amazon.com/images/I/91kvCxzK8sL._SL1500_.jpg', 'Grocery'),

        ('Smucker''s Uncrustables Peanut Butter & Grape Jelly Sandwiches, 10 ct', 10.79, 'Just thaw, unwrap, and snack wherever you are! Uncrustables Peanut Butter & Grape Jelly Sandwiches are a convenient, packable snack to take along wherever you and your kids are going next.', 'https://m.media-amazon.com/images/I/91UWEcDznGL._SL1500_.jpg', 'Grocery'),

        ('Space Jam', 14.99, 'NBA star Michael Jordan teams up with Bugs Bunny and his pals in a basketball game that is more important than any that has ever come before. An invading alien race, the Nerdlucks, want to kidnap Bugs and the rest of the Looney Tunes and use them as a tourist attraction on Moron Mountain.', 'https://flxt.tmsimg.com/assets/p18721_p_v8_aj.jpg', 'Movies'),

        ('Space Jam: A New Legacy', 9.99, 'When NBA champion and cultural icon LeBron James and his young son Dom are trapped in a digital space by a rogue A.I., LeBron must get them home safe by leading Bugs, Lola Bunny and the whole gang of notoriously undisciplined Looney Tunes to victory over the A.I.''s digitized champions on the court.', 'https://preview.redd.it/xvrk1i0ko2x41.jpg?auto=webp&s=dba211712504c7b43b9f9975d888e7c07d0b9b5b', 'Movies'),

        ('Pearl Jam: Greatest Hits 1991-2003', 24.99, 'The first official greatest hits with 33 total tracks. 2 disc set spanning a 14 year career with legendary anthems, compilation tracks and radio hits.', 'https://m.media-amazon.com/images/I/81WO5EYtsrL._SL1500_.jpg', 'Music'),

        ('Jam - Michael Jackson (Single)', 2.99, 'Jam is a single by American singer-songwriter Michael Jackson. The song is the fourth single from his 1991 album Dangerous, where it is the opening track. The single peaked at #26 on the Billboard Hot 100.', 'https://upload.wikimedia.org/wikipedia/en/5/5b/Michael_Jackson_Jam.jpg', 'Music'),

        ('Jamming - Bob Marley and the Wailers (Single)', 2.99, 'Jamming is a song by the reggae band Bob Marley and the Wailers from their 1977 album Exodus. The song also appears on the compilation album Legend.', 'https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Jamming_-_single_cover.jpg/220px-Jamming_-_single_cover.jpg', 'Music'),

        ('Traffic Jam - "Weird Al" Yankovic (Single)', 2.99, 'Traffic Jam is a song by "Weird Al" Yankovic from his 1993 album Alapalooza. The song''s style closely imitates that of "Let''s Go Crazy" by Prince, who famously refused permission every time Al asked to directly parody his songs.', 'https://m.media-amazon.com/images/I/51cn7HzD-xL._UX358_FMwebp_QL85_.jpg', 'Music'),

        ('Zatarain''s Jambalaya, Pack of 12', 17.46, 'Enjoy the flavor and soul of New Orleans with Jambalaya Rice Mix. Add one pound of smoked sausage, cooked chicken, ham or shrimp for an easy meal your whole crew will love.', 'https://m.media-amazon.com/images/I/81K7cAXPEqL._SL1500_.jpg', 'Grocery'),

        ('Skeleton Glow in the Dark Pajamas Set', 21.99, 'Enjoy the spooky season with these Skeleton glow in the dark pajamas. Made from 100% cotton and machine washable. Sleep set includes a sleep tee and matching sleep bottoms.', 'https://m.media-amazon.com/images/I/813OfCue3BL._AC_UY741_.jpg', 'Clothing'),

        ('Christmas Pajamas Set', 21.99, 'Enjoy Christmas time with these Christmas themed pajamas. Made from 100% cotton and machine washable. Sleep set inclludes a sleep tee and matching sleep bottoms.', 'https://m.media-amazon.com/images/I/815gxi3ek4L._AC_UY741_.jpg', 'Clothing'),

        ('Space Jam Pajama 3-Piece Set', 14.97, 'Come on and slam, and welcome to the Jam! Your little ones will experience the same magic you did with these comfortable PJs from Space Jam: A New Legacy.', 'https://m.media-amazon.com/images/I/71JrBulcJYL._AC_UY741_.jpg', 'Clothing'),

        ('Monster Jam Grave Digger Pajamas Set', 19.99, 'Enjoy these Monster Jam Grave Digger Pajamas. Made from 100% cotton and machine washable. Sleep set inclludes a sleep tee and matching sleep bottoms.', 'https://m.media-amazon.com/images/I/91SGHLbOjaL._AC_UX679_.jpg', 'Clothing'),

        ('Monster Jam, Official Champ Ramp Freestyle Playset', 33.72, 'Introducing the all-new Monster Jam Champ Ramp Freestyle Playset! This mega-fun playset features 4 unique ramps, a connecting bridge, truck launcher and launch stabilizer so you can perform endless, epic stunts, just like the pros!', 'https://m.media-amazon.com/images/I/91dA4245JyL._AC_SL1500_.jpg', 'Toys'),

        ('Camp Rock 2: The Final Jam', 7.99, 'Mitchie and her friends return to Camp Rock for another great summer of music, dancing, and fun. However, when state-of-the-art Camp Star opens across the lake, it lures away many instructors and campers - putting the future of Camp Rock in jeopardy.', 'https://upload.wikimedia.org/wikipedia/en/c/c8/CampRock2DVD.jpg', 'Movies'),

        ('Monster Jam PS2', 46.99, 'Extreme action with the biggest and baddest names in monster-trucks. Compete on 18 indoor and 12 outdoor racing tracks.', 'https://m.media-amazon.com/images/I/51DjhEMZU-L.jpg', 'Games'),

        ('NBA Jam PS2', 139.99, 'Choose players from all 29 NBA team, and get to playing in the classic NBA arenas and outdoor courts like Rucker Park & Venice Beach.', 'https://m.media-amazon.com/images/I/81i3igNNmCL._SY445_.jpg', 'Games'),

        ('Monster Jam Steel Titans PS4', 21.86, 'Compete with 25 of the most popular trucks including grave Digger and Maxi. Total destruction including breaking body panels, deforming junker cars as well as demolishing the environment.', 'https://m.media-amazon.com/images/I/81l3S-XzqwL._SX342_.jpg', 'Games'),

        ('Mario & Luigi Paper Jam 3DS', 40.89, 'When Luigi accidentally opens a mysterious book, he gets more than he bargained for when characters from the Paper Mario universe spill out of the pages and start running amok.', 'https://m.media-amazon.com/images/I/81S69QEQ4yL._SX342_.jpg', 'Games'),

        ('All Star Comedy Jam', 7.99, 'The Original King of Comedy and Shaquille O''Neal presents this Stand-Up Special with some of the industry''s most talented and sought after comedians.', 'https://m.media-amazon.com/images/M/MV5BMTM1Mjk4MjI2Nl5BMl5BanBnXkFtZTcwMjA0MTc5Mw@@._V1_.jpg', 'Movies'),
        
        ('Traffic Jam Logic Game', 39.99, 'This game provides 1500 levels of challenges that are perfect for adults and children. Full-color screen shows you how to set up game.', 'https://m.media-amazon.com/images/I/81Mxlprr5KL._AC_SY355_.jpg', 'Toys');
      `
    )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },
};
