const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid"
});

// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age:Number,
  favouriteFruit: fruitSchema
});


const Person = mongoose.model("Person",personSchema);
const person = new Person({
  name: "John",
  age: 22
}) ;

const pineapple= new Fruit({
  name: "Pineapple",
  rating: 9,
  review: "Pretty solid"
});
pineapple.save();


const amy = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
}) ;

amy.save();


Person.updateOne({name:"John"},{favouriteFruit: pineapple},(err)=>{
  if(err)
  console.log(err);
  else {
    console.log("successfully updated");
  }
})

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 7,
  review: "Pretty solid"
});


const litchi= new Fruit({
  name: "Litchi",
  rating: 7,
  review: "Pretty solid"
});



const orange = new Fruit({
  name: "Orange",
  rating: 7,
  review: "Pretty solid"
});

// person.save();

//
// Fruit.insertMany([kiwi,litchi,orange],(err)=>{
//   if(err)
//     console.log(err);
//   else {
//     console.log("Fruits are added successfully.");
//   }
// });

//
// Fruit.find(function(err,fruits){
//   if(err)
//   console.log(err);
//   else {
//     mongoose.connection.close();
//     fruits.forEach((fruit)=>{
//       console.log(fruit._doc.name);
//     })
//   }
// });


// Fruit.updateOne({_id:"5e15e81fb6fde029bcd6bbb9"},{name:"Mango"}, (err)=>{
//   if(err)
//   console.log(err);
//   else {
//     console.log("successfully updated");
//   }
// })


//
// Fruit.deleteOne({_id:"5e15e81fb6fde029bcd6bbb9"},(err)=>{
//   if(err)
//   console.log(err);
//   else {
//     console.log("successfully deleted");
//   }
// })

//
// Person.deleteMany({name:"John"},(err)=>{
//   if(err)
//   console.log(err);
//   else {
//     console.log("successfully deleted");
//   }
// })
