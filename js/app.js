'use strict';

console.log('hello world');
// PART I gathering and storing information

// created an array for the hours the Restaurants are open.
const hoursArray = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// used constructor function 'Restaurants' to easily create an object for each location.
function Restaurants(location, minHourlyCust, maxHourlyCust, avgCookiePerCust){
  this.location = location;
  this.minHourlyCust = minHourlyCust;
  this.maxHourlyCust = maxHourlyCust;
  this.avgCookiePerCust = avgCookiePerCust;
  this.customersPerHour = [];
  this.cookiesPerHour = [];
  this.cookiesSoldString = [];
}

//random customer number generator (used in the function below)
function randomCust(a, b) {
  let customersPerHour = Math.floor(Math.random() * (b - a + 1) + a);
  return customersPerHour;
}

// combined all 3 methods(functions) from previous lab into one called 'getCookiesSoldString'. Made it a prototype of Restaurants. This method finds a random number of customers per hour and uses that to find the number of cookies sold per hour. Then it places both together in a string called 'cookiesSoldString'. I used a prototype because this is a behavior I want to do to each individual instance of Restaurants.
Restaurants.prototype.getCookiesSoldString = function(){
  for (let i=0; i<hoursArray.length; i++){
    this.customersPerHour[i] = randomCust(this.minHourlyCust, this.maxHourlyCust);
    this.cookiesPerHour[i] = Math.floor(this.customersPerHour[i] * this.avgCookiePerCust);
    this.cookiesSoldString[i] = `${hoursArray[i]}: ${this.cookiesPerHour[i]} cookies`;
    // this.totalCookiesSold += this.cookiesPerHour[i];
  }
};

// created a new instance (object) for each restaurant from the constructor function 'Restaurants'.
const Seattle = new Restaurants('Seattle', 23, 65, 6.3);
const Tokyo = new Restaurants('Tokyo', 3, 24, 1.2);
const Dubai = new Restaurants('Dubai', 11, 38, 3.7);
const Paris = new Restaurants('Paris', 20, 38, 2.3);
const Lima = new Restaurants('Lima', 2, 16, 4.6);


// PART II adding the above information to the DOM

// created a shortcut variable 'restProfileDivElem' to use in our subsequent functions called 'renderRestProfile' and 'renderTable'. This variable will let us access the <div> element with an ID of "restaurantProfiles". We will add our information above here.
const restProfileDivElem = document.getElementById('restaurantProfiles');


// added a function that creates and appends elements to the DOM by taking in the tagName, parent, and textContent arguments. Has a conditional statement if the element has textContent.
function makeElement(tagName, parent, textContent){
  let element = document.createElement(tagName);
  if (textContent) {
    element.textContent = textContent;
  }
  parent.appendChild(element);
  return element;
}

// old way of rendering rest profiles without a function:
// let h2Elem = document.createElement('h2');
// h2Elem.textContent = restaurant.location;
// articleElem.appendChild(h2Elem);


// added a function that renders the restaurant profiles to the DOM using restaurant instance ex: (Seattle) as the argument.
function renderRestProfile(restaurant) {
  const articleElem = makeElement('article', restProfileDivElem, null);
  const h2Elem = makeElement('h2', articleElem, restaurant.location);
  const ulElem = makeElement('ul', articleElem, null);

  //here we have to loop through the cookiesSoldString array to add each item to our list. (index 0 of cookiesSoldString has a value of 6am: 409 cookies)
  for (let i = 0; i < restaurant.cookiesSoldString.length; i ++){
    let liElem = makeElement('li', ulElem, restaurant.cookiesSoldString[i]);
  }
}

const locationArray = [Seattle, Tokyo, Dubai, Paris, Lima];

function renderTable(){
  const articleElem = makeElement('article', restProfileDivElem, null);
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
      hourlyTotal += locationArray[index].cookiesPerHour[i];
    }
    makeElement('th', tfRowElem, hourlyTotal);
  }

}

Restaurants.prototype.renderRow = function(tbodyElem){
  const rowElem = makeElement('tr', tbodyElem, null);
  makeElement('th', rowElem, this.location);
  let dailyTotal = 0;
  for (let i=0; i < this.cookiesPerHour.length; i++){
    makeElement('td', rowElem, this.cookiesPerHour[i]);
    dailyTotal += this.cookiesPerHour[i];
  }
  makeElement('td', rowElem, dailyTotal);
};

for (let i = 0; i < locationArray.length; i++){
  locationArray[i].getCookiesSoldString();
  renderRestProfile(locationArray[i]);

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
