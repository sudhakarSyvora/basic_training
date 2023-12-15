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
      const priceDesc = rest.join('');
  
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
  
 
  const input1 = [
    '1 book at 12.49',
    '1 music CD at 14.99',
    '1 chocolate bar at 0.85',
  ];
  
  const input2 = [
    '1 imported box of chocolates at 10.00',
    '1 imported bottle of perfume at 47.50',
  ];
  
  const input3 = [
    '1 imported bottle of perfume at 27.99',
    '1 bottle of perfume at 18.99',
    '1 packet of headache pills at 9.75',
    '1 box of imported chocolates at 11.25',
  ];
  
  const details1 = processInput(input1);
  const details2 = processInput(input2);
  const details3 = processInput(input3);
  
  console.log('Output 1:');
  printReceipt(details1);
  console.log('\nOutput 2:');
  printReceipt(details2);
  console.log('\nOutput 3:');
  printReceipt(details3);
  