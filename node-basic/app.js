// const helpers = require('./helpers');
// const total = helpers.sum(10, 200);

const { sum, add } = require('./helpers');
const total = sum(10, 200);
const total2 = add(200, 10);

console.log("Total : ", total)
console.log("Total2 : ", total2);