//Q -Create a function to calculate the factorial of a number using closure
function factorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    function _iExistForSakeOfClosures() {
      result = result * i;
    }
    _iExistForSakeOfClosures();
  }
  return result;
}
// this is just one way ,other can be to return a internal funct fact from BuildFact fx and it can be later called
console.log(factorial(4));

//Q -Write a JavaScript program to test if the first character of a string is uppercase or not, if not then set the first character to uppercase?

function testUppercase(str) {
  if (str[0].toUpperCase() !== str[0]) {
    console.log("First letter is not uppercase.");
    str = str[0].toUpperCase() + str.slice(1);
  }
  console.log(str);
}

testUppercase("abc");

/* Q -Create a constructor function Calculator that creates objects with 3 methods:

read() asks for two values using prompt and remembers them in object properties.

sum() returns the sum of these properties.

mul() returns the multiplication product of these properties.*/

function Calculator() {
  this.value1 = 0;
  this.value2 = 0;

  this.read = function () {
    this.value1 = prompt("Enter first value:");
    this.value2 = prompt("Enter second value:");
  };

  this.sum = function () {
    return this.value1 + this.value2;
  };

  this.mul = function () {
    return this.value1 * this.value2;
  };
}

var calculator = new Calculator();
calculator.read();
console.log("Sum:", calculator.sum());
console.log("Multiplication:", calculator.mul());

// Q- Deep clone Javascript Object (without using any internal methods of cloning). All properties along with functions, prototypes should get cloned to target objects.
const originalObj = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4],
  },
  func: function () {
    console.log("Hello, world!");
  },
};

// Perform deep cloning using Lodash
const clonedObj = _.cloneDeep(originalObj);

console.log(clonedObj);

function deepClone(obj) {

  const cloned = Object.create(Object.getPrototypeOf(obj));

  for (let key in obj) {
      if (typeof obj[key] === 'object') {
        cloned[key] = deepClone(obj[key]);
      } else {
        cloned[key] = obj[key];
      }
  }

  return cloned;
}

