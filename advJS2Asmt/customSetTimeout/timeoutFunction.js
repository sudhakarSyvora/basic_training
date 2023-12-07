const { Worker } = require("worker_threads");

function _setTimeout(callBack, time) {
  if (typeof time !== 'number' || typeof callBack !== 'function') {
    throw new Error('Invalid arguments: callback should be a function and time should be a number');
  }


  const worker = new Worker("./timeout.js");
  worker.postMessage(time);
  worker.on("message", (message) => {
    if (message?.status) {
      callBack();
      worker.terminate();
    }
  });
}
module.exports = { _setTimeout };
