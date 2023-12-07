const { Worker } = require('worker_threads');
const {_setTimeout} =require('./timeoutFunction')
console.log("first")
 _setTimeout(()=>{
    console.log("im timeout")
 },2000)

 console.log("last")
