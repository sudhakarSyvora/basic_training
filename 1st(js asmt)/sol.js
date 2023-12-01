// Problem 1: Complete the secondLargest function which takes in an array of numbers in input and return the second biggest number in the array. (without using sort)?
function secondLargest(arr) {
   
    if (arr.length < 2) {
      return a[0]
    }
  
    let first = arr[0];
    let second = -Infinity;
  
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > first) {
        second = first;
        first = arr[i];
      } else if (arr[i] > second && arr[i] !== first) {
        second = arr[i];
      }
    }
  
   
      return second;
    
  }
  
  // Problem 2: Complete the calculateFrequency function that takes lowercase string as input and returns frequency of all english alphabet. (using only array, no in-built function)
  function calculateFrequency(string) {
    let freq = {};  
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
     
      if (/[a-zA-Z0-9]/.test(char)) {
        if (!freq[char]) {
           
          freq[char] = 0;
        }  
        freq[char]=freq[char]+1;
      }
    }
  
    return freq; 
  }
  
  
  // Problem 3: Complete the flatten function that takes a JS Object, returns a JS Object in flatten format (compressed)
  let result__={}
  function flatten(obj, parentDirecName = "") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let currentKey = parentDirecName ? `${parentDirecName}.${key}` : key;
  
        if (typeof obj[key] === "object" ) {
          flatten(obj[key], currentKey);
        } else {
          result__[currentKey] = obj[key];
        }
      }
    }
    return result__;
  }
  
  
    // Write your code here
  
  
  // Problem 4: Complete the unflatten function that takes a JS Object, returns a JS Object in unflatten format
  function unflatten(ufobj) {
    let ufresult = {};
  
    for (let key in ufobj) {
      let keys = key.split('.');
      let currentObj = ufresult;
  
      for (let i = 0; i < keys.length - 1; i++) {
        if (!currentObj[keys[i]]) {
          currentObj[keys[i]] = {};
        }
        currentObj = currentObj[keys[i]];
      }
  
      currentObj[keys[keys.length - 1]] = ufobj[key];
    }
  
    return ufresult;
  }