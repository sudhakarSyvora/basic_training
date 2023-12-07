/* Q-Write a function testNum that takes a number as an argument and returns a Promise that tests if the value is less than or higher than the value 10. */

function testNum(num) {
  return new Promise((res, rej) => {
    if (num > 10) {
      res("Greater then 10!");
    } else if (num == 10) {
      res("Equal to 10!");
    } else if (num < 10) {
      res("Less then 10!");
    } else {
      rej(`${num} is not a number!`);
    }
  });
}

testNum("11k")
  .then((res) => console.log(res))
  .catch((res) => console.log(res));

/* Q-Write two functions that use Promises that you can chain! The first function, makeAllCaps(), will take in an array of words and capitalize them, and then the second function, sortWords(), will sort the words in alphabetical order. If the Array contains anything but Strings, it should throw an error. */

function makeAllCaps(arrOfStrings) {
    return new Promise((res, rej) => {
      if (Array.isArray(arrOfStrings)) {
        arrOfStrings = arrOfStrings.map((element) => {
          return element.toUpperCase();
        });
        res(arrOfStrings);
      } else {
        rej("Not a valid array!");
      }
    });
  }
  function sortWords(arrOfStrings) {
    return new Promise((res, rej) => {
      if (Array.isArray(arrOfStrings)) {
        arrOfStrings = arrOfStrings.map((element) => {
          return element.split("").sort().join("");
        });
        res(arrOfStrings);
      } else {
        rej("Not a valid array!");
      }
    });
  }
  
  let arr=['aacfee','lkjkaas','dauha']
  
  makeAllCaps(arr).then(sortWords).then((res)=>console.log(res)).catch((err)=>console.log(err))
  /* Q -Using Promise create a function named 'sleep' that should invoke a callback function after x seconds. NOTE: sleep function should not block the call stack.*/

  function sleep(callback,time){
return new Promise((res,rej)=>{
   setTimeout(()=>{
    callback()
    res(`Hey, I just woke up after ${time/1000} sec`)
   },time)
})
  }

  sleep(()=>{},2000).then((res)=>console.log(res)).catch((res)=>console.log(res))

  /*Q Let's assume that we have a for loop that prints 0 to 10 at random intervals (0 to 6 seconds). We need to modify it using promises to print sequentially 0 to 10. For example, if 0 takes 6 seconds to print and 1 takes two seconds to print, then 1 should wait for 0 to print, and so on. */

   
async function simulateDelay() {
    for (let i = 0; i <= 10; i++) {
      let randTime = Math.floor(Math.random() * 6) + 1;
  
      await new Promise((resolve) => {
        setTimeout(() => {
          console.log(i);
          resolve();  
        }, randTime * 1000);  
      });
    }
  }
  
   
  simulateDelay();
  
//Q- The following recursive code will cause a stack overflow if the array "somelist" is too large. How can you fix this and still retain the recursive pattern?

  var somelist = new Array(10000).fill('2');

var nextItem = async function() {
  var item = somelist.pop();

  if (item) {
    await new Promise((resolve) => {
        resolve();
    });
    return nextItem();
  }
};

nextItem()
  .then(() => {
    console.log('All items processed');
  })
  .catch((err) => {
    console.error('Error:', err);
  });
  /*Here is a code snippet:

for(var i = 0; i < 10; i++) {

   setTimeout(function() {

     console.log(i); 

   }, 10);

}

Give the reasons for the output the above snippet gives. Also, modify the snippet to print values from 0 to 9. */

// Answer: Its because var is not block scoped variable so as the loop eventually reaches 10 it makes i=10
//         as like var i=1
//                 i=10;
//         But let are block scope variables ,for every iteration it has its own copy of let variable