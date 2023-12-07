function validateString(input, callback) {
    setTimeout(function () {
      if (typeof input === "string" && input === input.toLowerCase()) {
        return callback(null, true);
      }
      return callback(new Error('Invalid string'), null);
    }, 500);
  }
  
  const arr = ['first', 'Second', 'thiRd', 4, false, 'true'];
  
  const validateAndMap = async (array) => {
    const promises = array.map((item) => {
      return new Promise((resolve) => {
        validateString(item, (error, isValid) => {
          resolve({ [item]: !error && isValid });
        });
      });
    });
  
    const results = await Promise.all(promises);
   console.log(results)
  };
  
  validateAndMap(arr)