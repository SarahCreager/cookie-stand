'use strict';

console.log('Greetings Earthlings');

// -------------------------Global Variables---------------------------------//

// created an array for the hours the Restaurants are open.
const hoursArray = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// created a reference to where I am on the page.
const restTableElem = document.getElementById('restaurantProfiles');


//--------------------------Constructor Function---------------------------//

// used constructor function 'Restaurants' to easily create an object for each location.
function Restaurants(location, minHourlyCust, maxHourlyCust, avgCookiePerCust){
  this.location = location;
  this.minHourlyCust = minHourlyCust;
  this.maxHourlyCust = maxHourlyCust;
  this.avgCookiePerCust = avgCookiePerCust;
  // this.customersPerHour = [];
  // this.cookiesPerHour = [];
  this.salesPerHour = [];
  // this is our rest location array
  Restaurants.allRestaurants.push(this);
}

//-------------------------Constructor Related Stuff------------------------//

//array of all the restaurant locations
Restaurants.allRestaurants = [];

//random customer number generator (used in the function below)
Restaurants.prototype.genRandomCust = function(){
  return Math.floor(Math.random() * (this.maxHourlyCust - this.minHourlyCust + 1) + this.minHourlyCust);
}


// calculate sales per hour based on random customer.
Restaurants.prototype.calcSalesPerHour = function(){
  for (let i=0; i<hoursArray.length; i++){
    const thisHoursSale = Math.ceil(this.genRandomCust() * this.avgCookiePerCust);
    this.salesPerHour.push(thisHoursSale);
  }
}

//prototype to render restaurants to DOM
Restaurants.prototype.renderRestaurant = function(tbodyElem){
  let grandTotal = 0;
  const rowElem = document.createElement('tr');
  tbodyElem.appendChild(rowElem);
  const locationTHElem = document.createElement('th');
  locationTHElem.textContent = this.location;
  rowElem.appendChild(locationTHElem);
  for (let i=0; i< this.salesPerHour.length; i++){
    const hourlyTotal = this.salesPerHour[i];
    const tdElem = document.createElement('td');
    tdElem.textContent = hourlyTotal;
    grandTotal += hourlyTotal;
    rowElem.appendChild(tdElem);

  }
  const grandTotalThElem = document.createElement('td');
  grandTotalThElem.textContent = grandTotal;
  rowElem.appendChild(grandTotalThElem);
}

//----------------------------------Global Functions--------------------------//

//makes elements and adds them to the DOM. Used in functions below. Sometimes has an underscore. Helper function _makeElement. Helps make other functions easier. 
function makeElement(tagName, parent, textContent){
  let element = document.createElement(tagName);
  if (textContent) {
    element.textContent = textContent;
  }
  parent.appendChild(element);
  return element;
}

//renders header of table
function renderHeader(){
  const headerElem = makeElement('thead', restTableElem, null);
  const rowElem = makeElement('tr', headerElem, null);
  makeElement('td', rowElem, null)
  for (let i=0; i<hoursArray.length; i++){
    makeElement('th', rowElem, hoursArray[i]);
  }
  makeElement('th', rowElem, 'Daily Total');
}

// renders body of table
function renderAllRest(){
  const bodyElem = makeElement('tbody', restTableElem, null)
  for (let i=0; i <Restaurants.allRestaurants.length; i++){
    let currentRest = Restaurants.allRestaurants[i];
    currentRest.calcSalesPerHour();
    currentRest.renderRestaurant(bodyElem);
  }
}

//SWITCH DAILYTOTAL AND GRANDTOTAL VARIABLES
// render footer of table
function renderFooter(){
  const tfootElem = makeElement('tfoot', restTableElem, null);
  const tfRowElem = makeElement('tr', tfootElem, null);
  makeElement('th', tfRowElem, 'Hourly Total');
  let grandTotal = 0;
  for(let i=0; i <hoursArray.length; i++){
    let hourlyTotal = 0;
    for(let index=0; index<Restaurants.allRestaurants.length; index++){
      //Restaurants.allRestaurants[index].salesPerHour[i]; is going when my column is at 6 am I'm looking at my restaurant row Seattle and grabbing that value. 
      hourlyTotal += Restaurants.allRestaurants[index].salesPerHour[i];
    }
    makeElement('th', tfRowElem, hourlyTotal);
    grandTotal += hourlyTotal;
  } makeElement('th', tfRowElem , grandTotal);
} 

//-------------------------------------Add Event Listeners-------------------------//


//-------------------------------------Call Functions-------------------------//

const Seattle = new Restaurants('Seattle', 23, 65, 6.3);
const Tokyo = new Restaurants('Tokyo', 3, 24, 1.2);
const Dubai = new Restaurants('Dubai', 11, 38, 3.7);
const Paris = new Restaurants('Paris', 20, 38, 2.3);
const Lima = new Restaurants('Lima', 2, 16, 4.6);

renderHeader();
renderAllRest();
renderFooter();


