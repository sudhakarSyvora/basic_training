const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function calculator() {
  rl.question('Enter first number: ', (num1) => {
    rl.question('Enter second number: ', (num2) => {
      rl.question('Choose operation (+, -, *, /): ', (operator) => {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        let result;

        switch (operator) {
          case '+':
            result = num1 + num2;
            break;
          case '-':
            result = num1 - num2;
            break;
          case '*':
            result = num1 * num2;
            break;
          case '/':
            if (num2 === 0) {
              console.log('Error: Cannot divide by zero');
              rl.close();
              return;
            }
            result = num1 / num2;
            break;
          default:
            console.log('Invalid operator');
            rl.close();
            return;
        }

        console.log(`Result: ${result}`);
        rl.close();
      });
    });
  });
}

calculator();
