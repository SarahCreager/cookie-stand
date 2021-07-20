'use strict';

console.log('hello world');


function randomCust(a, b) {
  let customer = Math.floor(Math.random() * (b - a + 1) + a);
  return customer;
}
const hoursArray = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];


const seattle = {
  location: 'seattle',
  minHourlyCust: 23,
  maxHourlyCust: 65,
  averageCookiePerCust: 6.3,
  customer: 0,
  cookie: 0,
  results: 0,
  getCustPerHour: function () {
    this.customer = [];
    for (let index=0; index<hoursArray.length; index++){
      this.customer[index] = randomCust(this.minHourlyCust, this.maxHourlyCust);
    } return this.customer;
  },
  getCookiePerHour: function () {
    this.cookie = [];
    for (let index=0; index<hoursArray.length; index++){
      this.cookie[index] = Math.floor(this.getCustPerHour()[index] * this.averageCookiePerCust);
    } return this.cookie;
  },
  getResults: function () {
    this.results = [];
    for (let index=0; index<hoursArray.length; index++){
      this.results[index] = hoursArray[index] + ': ' + this.cookie[index] + ' cookies';
    } return this.results;
  },
};


seattle.getCustPerHour();
seattle.getCookiePerHour();
seattle.getResults();


// Store the results for each location in a separate array… perhaps as a property of the object representing that location




const tokyo = {
  location: 'tokyo',
  minHourlyCust: 3,
  maxHourlyCust: 24,
  averageCookiePerCust: 1.2,
  customer: 0,
  cookie: 0,
  results: 0,
  getCustPerHour: function () {
    this.customer = [];
    for (let index=0; index<hoursArray.length; index++){
      this.customer[index] = randomCust(this.minHourlyCust, this.maxHourlyCust);
    } return this.customer;
  },
  getCookiePerHour: function () {
    this.cookie = [];
    for (let index=0; index<hoursArray.length; index++){
      this.cookie[index] = Math.floor(this.getCustPerHour()[index] * this.averageCookiePerCust);
    } return this.cookie;
  },
  getResults: function () {
    this.results = [];
    for (let index=0; index<hoursArray.length; index++){
      this.results[index] = hoursArray[index] + ': ' + this.cookie[index] + ' cookies';
    } return this.results;
  },
};

tokyo.getCustPerHour();
tokyo.getCookiePerHour();
tokyo.getResults();


const dubai = {
  location: 'dubai',
  minHourlyCust: 11,
  maxHourlyCust: 38,
  averageCookiePerCust: 3.7,
  customer: 0,
  cookie: 0,
  results: 0,
  getCustPerHour: function () {
    this.customer = [];
    for (let index=0; index<hoursArray.length; index++){
      this.customer[index] = randomCust(this.minHourlyCust, this.maxHourlyCust);
    } return this.customer;
  },
  getCookiePerHour: function () {
    this.cookie = [];
    for (let index=0; index<hoursArray.length; index++){
      this.cookie[index] = Math.floor(this.getCustPerHour()[index] * this.averageCookiePerCust);
    } return this.cookie;
  },
  getResults: function () {
    this.results = [];
    for (let index=0; index<hoursArray.length; index++){
      this.results[index] = hoursArray[index] + ': ' + this.cookie[index] + ' cookies';
    } return this.results;
  },
};

dubai.getCustPerHour();
dubai.getCookiePerHour();
dubai.getResults();

const paris = {
  location: 'paris',
  minHourlyCust: 20,
  maxHourlyCust: 38,
  averageCookiePerCust: 2.3,
  customer: 0,
  cookie: 0,
  results: 0,
  getCustPerHour: function () {
    this.customer = [];
    for (let index=0; index<hoursArray.length; index++){
      this.customer[index] = randomCust(this.minHourlyCust, this.maxHourlyCust);
    } return this.customer;
  },
  getCookiePerHour: function () {
    this.cookie = [];
    for (let index=0; index<hoursArray.length; index++){
      this.cookie[index] = Math.floor(this.getCustPerHour()[index] * this.averageCookiePerCust);
    } return this.cookie;
  },
  getResults: function () {
    this.results = [];
    for (let index=0; index<hoursArray.length; index++){
      this.results[index] = hoursArray[index] + ': ' + this.cookie[index] + ' cookies';
    } return this.results;
  },
};

paris.getCustPerHour();
paris.getCookiePerHour();
paris.getResults();

console.log(paris);

const lima = {
  location: 'lima',
  minHourlyCust: 2,
  maxHourlyCust: 16,
  averageCookiePerCust: 4.6,
  customer: 0,
  cookie: 0,
  results: 0,
  getCustPerHour: function () {
    this.customer = [];
    for (let index=0; index<hoursArray.length; index++){
      this.customer[index] = randomCust(this.minHourlyCust, this.maxHourlyCust);
    } return this.customer;
  },
  getCookiePerHour: function () {
    this.cookie = [];
    for (let index=0; index<hoursArray.length; index++){
      this.cookie[index] = Math.floor(this.getCustPerHour()[index] * this.averageCookiePerCust);
    } return this.cookie;
  },
  getResults: function () {
    this.results = [];
    for (let index=0; index<hoursArray.length; index++){
      this.results[index] = hoursArray[index] + ': ' + this.cookie[index] + ' cookies';
    } return this.results;
  },
};

lima.getCustPerHour();
lima.getCookiePerHour();
lima.getResults();

const locationArray = [seattle, tokyo, dubai, paris, lima];

const profileDivElem = document.getElementById('cookies');

function renderPlace(place) {
  let articleElem = document.createElement('article');
  profileDivElem.appendChild(articleElem);
  let h2Elem = document.createElement('h2');
  h2Elem.textContent = place.location;
  articleElem.appendChild(h2Elem);
  let ulElem = document.createElement('ul');
  articleElem.appendChild(ulElem);
  for (let i = 0; i < place.results.length; i ++){
    let liElem = document.createElement('li');
    liElem.textContent = place.results[i];
    ulElem.appendChild(liElem);
  }
}

for (let i = 0; i < locationArray.length; i++){
  renderPlace(locationArray[i]);
};