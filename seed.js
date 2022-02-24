const { green, red } = require('chalk');
const { db, Project, Robot } = require('./server/db');


const seed = async () => {
  try {
    await db.sync({ force: true });
    //create single robot
    const walle = await Robot.create({name: "Walle", imageUrl: 'pic3.png', fuelType:"gas", fuelLevel: 0.88})
    const RMax = await Robot.create({name: "RMax",imageUrl:'pic2.png', fuelType:"gas"})
    const bayMax = await Robot.create({name: "BayBaby",imageUrl:'https://techunwrapped.com/wp-content/uploads/2021/11/Baymax-first-trailer-for-the-Big-Hero-6-spin-off-series.jpg', fuelType:"gas"})
    const dundun = await Robot.create({name: "DUNDUN", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbdoPUP2nz1qcoeC7tGzU2yhgzkmWrjD1U1Q&usqp=CAU', fuelLevel: 97.8})
    const candy = await Robot.create({name: "Camarero_del_Limon", imageUrl:'https://i.insider.com/5cdedc95021b4c12a50f46f6?width=1136&format=jpeg', fuelType:"diesel", fuelLevel: 97.8})
    const eva =  await Robot.create({name: "Eva"})
    const R1 = await Robot.create({name: "R1", imageUrl:'https://pbs.twimg.com/media/E_M6dcSUcAAmgkH.jpg', fuelType:"diesel", fuelLevel: 97.8})
    const R2 = await Robot.create({name: "R1", imageUrl:'pic4.png', fuelType:"diesel", fuelLevel: 97.8})
    
    
    //create single project
    const barn = await Project.create({title: 'Build barn', description: 'Lorem Ipsum' })
    const love = await Project.create({title: 'Discover love', description: 'Let us go then, you and I,When the evening is spread out against th sky Like a patient etherized upon a table; Let us go, through certain half-deserted streets, The muttering retreats Of restless nights in one-night cheap hotels And sawdust restaurants with oyster-shells: Streets that follow like a tedious argument Of insidious intent To lead you to an overwhelming question ... Oh, do not ask, “What is it?” Let us go and make our visit.', completed: true, deadline: '2022-2-14'})
    const door = await Project.create({title: 'Open the pod bay doors', priority: 10})
    const pizza = await Project.create({title: 'Make pizza', priority: 9, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'})

    //associate the robot and project
    await walle.addProject(love)
    await walle.addProject(pizza)
    await dundun.addProject(pizza)
    await bayMax.addProject(barn)
    await dundun.addProject(love)


  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
