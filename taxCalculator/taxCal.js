const readline = require('readline');

function calculateSalesTax(price, taxRate) {
  return Math.ceil(price * taxRate * 20) / 20;
}

function processInput(input) {
  const salesTaxRates = {
    book: 0,
    food: 0,
    medical: 0,
    other: 0.1,
    imported: 0.05,
  };

  const items = [];
  let salesTaxes = 0;
  let total = 0;

  for (const line of input) {
    const [quantityDesc, ...rest] = line.split(' at ');
    const priceDesc = rest.join(' at ');

    const [quantity, ...description] = quantityDesc.split(' ');
    const itemName = description.join(' ');
    const isImported = itemName.includes('imported');
    const itemPrice = parseFloat(priceDesc);

    const isExempt = itemName.includes('book') ||
                     itemName.includes('chocolate') ||
                     itemName.includes('pill');

    let salesTaxRate = salesTaxRates.other;

    if (isExempt) {
      salesTaxRate = 0;
    }

    if (isImported) {
      salesTaxRate += salesTaxRates.imported;
    }

    const salesTax = calculateSalesTax(itemPrice, salesTaxRate);
    const totalPrice = itemPrice + salesTax;

    salesTaxes += salesTax;
    total += totalPrice;

    items.push({
      quantity: parseInt(quantity),
      name: itemName,
      price: totalPrice.toFixed(2),
    });
  }

  return { items, salesTaxes: salesTaxes.toFixed(2), total: total.toFixed(2) };
}

function printReceipt(details) {
  for (const item of details.items) {
    console.log(`${item.quantity} ${item.name}: ${item.price}`);
  }
  console.log(`Sales Taxes: ${details.salesTaxes}`);
  console.log(`Total: ${details.total}`);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const inputFromCLI = [];

function takeInput() {
  rl.question('Enter item details ("Quantity Item at Price" or "exit" to finish): ', (input) => {
    if (input.toLowerCase() === 'exit') {
      rl.close();
      const details = processInput(inputFromCLI);
      console.log('Receipt:');
      printReceipt(details);
    } else {
        if(input)
      inputFromCLI.push(input);
      takeInput();
    }
  });
}

takeInput();
