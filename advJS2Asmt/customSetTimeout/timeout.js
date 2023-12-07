const { parentPort } = require("worker_threads");
function timeoutWorker(time) {
  const date1 = new Date();
  while (true) {
    if (new Date().getTime() - date1.getTime() >= time) {
      parentPort.postMessage({ status: true });
      break;
    }
  }
}

parentPort.on("message", (message) => {
  const time = message;
  timeoutWorker(time);
});
