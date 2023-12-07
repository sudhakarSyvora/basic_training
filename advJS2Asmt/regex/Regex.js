//Passowrd regex
let PasswordRegex = /^(?!.*[.])(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!#$%&'*+\-\/=?^_`{|}~])(?!.*[.]{2})[A-Za-z\d!#$%&'*+\-\/=?^_`{|}~]+(?<![.])$/;
let myString = "ello$j%123";
console.log(PasswordRegex.test(myString)) 
  


//Email regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 
const testEmails = [
  'user@example.com',
  'another.email@test.co.uk',
  'invalid-email@',
  '@missing-localpart.com',
  'email@subdomain.domain.com',
  'user123@gmail.123',
];

testEmails.forEach(email => {
  const isValid = emailRegex.test(email);
  console.log(`${email} is ${isValid ? 'valid' : 'invalid'}`);
});

const creditCardRegex = /^(?:\d[ -]*?){13,16}$/;

// Credit card regex : regular credit card, matches no of digits 13-16 and optional hypen or spaces
function testCreditCardNumber(inputString) {
    return creditCardRegex.test(inputString);
}

const testString1 = "1234-5678-9012-3456";
const testString2 = "Tjnr";
const testString3 = "1234567890123456";

console.log(testCreditCardNumber(testString1));  
console.log(testCreditCardNumber(testString2));  
console.log(testCreditCardNumber(testString3));  

//Regex for mail and phone no 

function extractContacts(text) {
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

    const phonePattern = /(\+\d{1,2}[-()]*)?\d{5}[-()]*\d{5}/g;

    const emails = text.match(emailPattern);

    const phones = text.match(phonePattern);

    return { emails, phones };
}

const paragraph = `Lorem ipsum dolor 9221122108 sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet bibendum enim. In massa tempor nec feugiat. Nunc aliquet bibendum enim facilisis gravida. mytraining@qodeleaf.com Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Amet luctus venenatis lectus magna fringilla. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. +91-20200-21210 Sagittis orci a scelerisque purus semper eget duis. Nulla pharetra diam sit amet nisl suscipit. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in. Fusce (+91)-20200-21210 ut placerat mt@test.inc orci nulla. Pharetra vel turpis nunc eget lorem dolor. Tristique senectus et netus et malesuada.`;

const extractedContacts = extractContacts(paragraph);

console.log("Extracted Email Addresses:", extractedContacts.emails);
console.log("Extracted Phone Numbers:", extractedContacts.phones);