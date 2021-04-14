import db from './models';
import { umzug } from './migrations';

(async () => {
  try {
    await db.sequelize.authenticate();
  } catch (error) {
    console.log('==================== Db authentication failed ====================');
    throw error;
  }

  try {
    await umzug.up();
    console.log('-------------------- All migrations are run successfully ----------------------');
  } catch (error) {
    console.log('==================== Migration failed ====================');
    throw error;
  }


  // await db.User.create({
  //   name: 'Xuan Hai',
  //   posts: []
  // }, {
  //   include: [
  //     { model: db.Post, as: 'posts' }
  //   ]
  // })

  const a = await db.User.findAll({
    include: [
      { model: db.Post, as: 'posts' }
    ]
  })

  a.posts = {};

  console.log((await db.User.findAndCountAll()).rows.map(x => x.get()));
  await db.Post.findOne({
    where: {
      title: 'a'
    }
  });
})();
