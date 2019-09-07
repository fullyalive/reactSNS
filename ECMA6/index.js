// Rest opertaors
var rivers = ["Sunkoshi", "Tamakoshhi", "Saptakoshi"];
var [first, ...rest] = rivers;

console.log(rest); // Tamakoshhi, Saptakoshi

// Spread operators
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

// Restructuring Object

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

// Destructuring Object

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

// Arrow function & this keyword context
let nepal = {
  mountains: ["Everest", "Fish Tail", "Annapurna"],
  printWithDash: function() {
    setTimeout(() => console.log(this.mountains.join(" - ")), 3000);
  }
};

nepal.printWithDash();
