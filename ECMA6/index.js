// 👉 Class constructor super

// we could create a function and add methods on the function object using the prototype
// in javascript functions are objects - inherit the behaviour of object
// whenever you create an object, the prototype object is also  created behind the scene
class Trip {
  constructor(destination, days) {
    this.destination = destination;
    this.days = days;
  }
  info() {
    console.log(`${this.destination} will take ${this.days} days.`);
  }
}

const tripToKathmandu = new Trip("Kathmandu, Nepal", 30);
tripToKathmandu.info();
console.log(Trip.prototype);

// sub class
class Expedition extends Trip {
  constructor(destination, days, gear) {
    super(destination, days);
    this.gear = gear;
  }
  info() {
    super.info();
    console.log(`Bring your ${this.gear.join(" and your ")}`);
  }
}

const tripWithGear = new Expedition("Everest", 20, [
  "Sunglasses",
  "Flags",
  "Camera"
]);
tripWithGear.info();

function Holiday(destination, days) {
  this.destination = destination;
  this.days = days;
}

Holiday.prototype.info = function() {
  console.log(this.destination + " | " + this.days + " days");
};

var nepal = new Holiday("Nepal", 30);
console.log(nepal.info());

// 👉 Rest opertaors
var rivers = ["Sunkoshi", "Tamakoshhi", "Saptakoshi"];
var [first, ...rest] = rivers;

console.log(rest); // Tamakoshhi, Saptakoshi

// 👉 Spread operators
var mountains = ["Everest", "Fish Tail", "Annapurna"];
var mountainsFromJapan = ["Fuji"];

var allMountains = [...mountains, ...mountainsFromJapan];
console.log(allMountains); // Everest, Fish Tail, Annapurna, Fuji

var day = {
  breakfast: "toast with milk",
  lunch: "rice with chicken curry"
};

var night = {
  dinner: "noddle soup"
};

var picnic = { ...day, ...night };
console.log(picnic); // breakfast: "toast with milk", lunch: "rice with chicken curry", dinner: "noodle soup"

// 👉 Restructuring Object

var name = "Everest";
var height = 8848;
var output = function() {
  console.log(`Mt.${this.name} is ${this.height} meter tall`);
};
var adventureClimbing = { name, height, output };
adventureClimbing.output();

var adventureClimbing2 = {
  name: "Everest",
  height: 8848,
  output() {
    console.log(`Mt.${this.name} is ${this.height} meter tall`);
  }
};
adventureClimbing2.output();

// 👉 Destructuring Object

let thingsToDo = {
  morning: "Exercise",
  afternoon: "Work",
  evening: "Code",
  night: ["Sleep", "Dream"]
};

let { morning, afternoon, evening } = thingsToDo;
console.log(morning, " - ", afternoon, " - ", evening);

let uniStudent = student => {
  let { name, university } = student;
  console.log(`${name} from ${university}`);
};

uniStudent({
  name: "fullyalive",
  university: "Sogang University"
});

// 👉 Arrow function & this keyword context
let nepalMountains = {
  mountains: ["Everest", "Fish Tail", "Annapurna"],
  printWithDash: function() {
    setTimeout(() => console.log(this.mountains.join(" - ")), 3000);
  }
};

nepalMountains.printWithDash();
