'use strict';

console.log('hello world');


function randomCust(a, b) {
  let customerPerHour = Math.floor(Math.random() * (b - a + 1) + a);
  return customerPerHour;
}

function Store(location, minHourlyCust, maxHourlyCust, averageCookiePerCust){
  this.location = location;
  this.minHourlyCust = minHourlyCust;
  this.maxHourlyCust = maxHourlyCust;
  this.averageCookiePerCust = averageCookiePerCust;
  this.customerPerHour = [];
  this.cookiePerHour = [];
  this.results = [];
}

const hoursArray = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

const Seattle = new Store('Seattle', 23, 65, 6.3);
const Tokyo = new Store('Tokyo', 3, 24, 1.2);
const Dubai = new Store('Dubai', 11, 38, 3.7);
const Paris = new Store('Paris', 20, 38, 2.3);
const Lima = new Store('Lima', 2, 16, 4.6);

Store.prototype.getCookiesSold = function(){
  for (let i=0; i<hoursArray.length; i++){
    this.customerPerHour[i] = randomCust(this.minHourlyCust, this.maxHourlyCust);
    this.cookiePerHour[i] = Math.floor(this.customerPerHour[i] * this.averageCookiePerCust);
    this.results[i] = hoursArray[i] + ': ' + this.cookiePerHour[i] + ' cookies';
    this.totalCookiesSold += this.cookiePerHour[i];
  }
};

function makeElement(tagName, parent, textContent){
  let element = document.createElement(tagName);
  if (textContent) {
    element.textContent = textContent;
  }
  parent.appendChild(element);
  return element;
}

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

const locationArray = [Seattle, Tokyo, Dubai, Paris, Lima];
const profileDivElem = document.getElementById('cookies');

function renderTable(){
  const articleElem = makeElement('article', profileDivElem, null);
  const tableElem = makeElement('table', articleElem, null);
  const theadElem = makeElement('thead', tableElem, null);
  const rowElem = makeElement('tr', theadElem, null);

  makeElement('th', rowElem, null);
  for (let i=0; i<hoursArray.length; i++){
    makeElement('th', rowElem, hoursArray[i]);
  }
  makeElement('th', rowElem, 'Daily Location Total');

  const tbodyElem = makeElement('tbody', tableElem, null);
  for (let i=0; i<locationArray.length; i++){
    locationArray[i].renderRow(tbodyElem);
  }
  const tfootElem = makeElement('tfoot', tableElem, null);
  const tfRowElem = makeElement('tr', tfootElem, null);
  makeElement('th', tfRowElem, 'Hourly Total');
  for(let i=0; i <hoursArray.length; i++){
    let hourlyTotal = 0;
    for(let index=0; index<locationArray.length; index++){
      hourlyTotal += locationArray[index].cookiePerHour[i];
    }
    makeElement('th', tfRowElem, hourlyTotal);
  }

}

Store.prototype.renderRow = function(tbodyElem){
  const rowElem = makeElement('tr', tbodyElem, null);
  makeElement('th', rowElem, this.location);
  let dailyTotal = 0;
  for (let i=0; i < this.cookiePerHour.length; i++){
    makeElement('td', rowElem, this.cookiePerHour[i]);
    dailyTotal += this.cookiePerHour[i];
  }
  makeElement('td', rowElem, dailyTotal);
};

for (let i = 0; i < locationArray.length; i++){
  locationArray[i].getCookiesSold();
  renderPlace(locationArray[i]);

}

renderTable();


/* <article>
<table>
  <thead>
    <tr>
      <th> 6 am</th>
      <th> 7 am</th>
      <th> 8 am</th>
      <th> Daily Location total</th>
    <tr/>
  </thead>
  <tbody>
     <tr>
      <th> Seattle</th>
      <td> 200</td>
      <td> 200</td>
      <td> 200</td>
      <td> dailytotalgoeshere</td>
    <tr/>
  </tbody>
  <tfoot>
    <tr>
    <th>Totals</th>
    </tr>
  </tfoot>
</table>
<article> */

//Example of previous way I constructed object. 
// const seattle = {
//   location: 'seattle',
//   minHourlyCust: 23,
//   maxHourlyCust: 65,
//   averageCookiePerCust: 6.3,
//   customerPerHour: [],
//   cookiePerHour: [],
//   results: [],
//   getCustPerHour: function () {
//     for (let index=0; index<hoursArray.length; index++){
//       this.customerPerHour[index] = randomCust(this.minHourlyCust, this.maxHourlyCust);
//     } return this.customerPerHour;
//   },
//   getCookiePerHour: function () {
//     for (let index=0; index<hoursArray.length; index++){
//       this.cookiePerHour[index] = Math.floor(this.getCustPerHour()[index] * this.averageCookiePerCust);
//     } return this.cookiePerHour;
//   },
//   getResults: function () {
//     for (let index=0; index<hoursArray.length; index++){
//       this.results[index] = hoursArray[index] + ': ' + this.cookie[index] + ' cookies';
//     } return this.results;
//   },
// };












//Example of previous way I constructed object. 
// const seattle = {
//   location: 'seattle',
//   minHourlyCust: 23,
//   maxHourlyCust: 65,
//   averageCookiePerCust: 6.3,
//   customerPerHour: [],
//   cookiePerHour: [],
//   results: [],
//   getCustPerHour: function () {
//     for (let index=0; index<hoursArray.length; index++){
//       this.customerPerHour[index] = randomCust(this.minHourlyCust, this.maxHourlyCust);
//     } return this.customerPerHour;
//   },
//   getCookiePerHour: function () {
//     for (let index=0; index<hoursArray.length; index++){
//       this.cookiePerHour[index] = Math.floor(this.getCustPerHour()[index] * this.averageCookiePerCust);
//     } return this.cookiePerHour;
//   },
//   getResults: function () {
//     for (let index=0; index<hoursArray.length; index++){
//       this.results[index] = hoursArray[index] + ': ' + this.cookie[index] + ' cookies';
//     } return this.results;
//   },
// };
