/* Q -5 Implement the setTimeout function using native javascript only. 

Q -6 Implement a javascript Array having the following prototype functions without using Native javascript array:

- push

- pop

- shift

- unshift

- length

- splice

- indexOf

- forEach */

//-----------Sol 5 starts------------
this._setTimeout = function (callBack, time) {
  let date1 = new Date();
  while (true) {
    if (new Date().getTime() - date1.getTime() >= time) {
      return callBack();
    }
  }
};
this._setTimeout(() => {
  console.log("this");
}, 3000);


//-----------Sol 5 ends--------------

//-----------Sol 6 starts------------

const arr = [1, 2, 3, 4, 5];

//Attaching _push to Array Prototype

Array.prototype._push = function (...args) {
  for (let i = 0; i < args.length; i++) {
    this[this.length] = args[i];
  }
  return this.length;
};

arr._push(6, 7, 8);

//Attaching _pop to Array Prototype

Array.prototype._pop = function () {
  let lastElem = this[this.length - 1];
  if (this.length > 0) this.length = this.length - 1;
  return lastElem;
};

//Attaching _shift to Array Prototype

Array.prototype._shift = function () {
  let firstElem = this[0];
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i + 1];
  }
  this.length--;
  return firstElem;
};

//Attaching _unshift to Array Prototype

Array.prototype._unshift = function (...args) {
  this.splice(0, 0, ...args);
  return this.length;
};

//Attaching   _splice to Array prototype

Array.prototype._splice = function (start, deleteCount, ...items) {
  let arr = [];

  const leftItems = this.splice(start + deleteCount);
  for (let i = 0; i < items.length; i++) {
    this[start + i] = items[i];
  }
  this.push(...leftItems);
  return this;
};
// Attaching _indexOf to Array prototype

Array.prototype._indexOf = function (item) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === item) {
      return i;
    }
  }
};
// Attaching _forEach to Array prototype

Array.prototype._forEach = function (callBack) {
  for (let i = 0; i < this.length; i++) {
    callBack(this[i], i, this);
  }
};

//-----------Sol 6 ends-----------
