'use strict';

console.log('Greetings Earthlings');

// -------------------------Global Variables---------------------------------//

// created an array for the hours the Restaurants are open.
const hoursArray = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// created a reference to where I am on the page.
const restTableElem = document.getElementById('restaurantProfiles');

// created a reference for where we need to listen to the event
const formElem = document.getElementById('addRestForm');


//--------------------------Constructor Function---------------------------//

// used constructor function 'Restaurants' to easily create an object for each location.
function Restaurants(location, minHourlyCust, maxHourlyCust, avgCookiePerCust){
  this.location = location;
  this.minHourlyCust = minHourlyCust;
  this.maxHourlyCust = maxHourlyCust;
  this.avgCookiePerCust = avgCookiePerCust;
  this.salesPerHour = [];
  // this is our rest location array. STILL DON'T QUITE UNDERSTAND THE CODE.
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
  this.salesPerHour = []; // this resets the array value to 0 so that we don't double up on hourly totals.
  for (let i=0; i<hoursArray.length; i++){
    const thisHoursSale = Math.ceil(this.genRandomCust() * this.avgCookiePerCust);
    this.salesPerHour.push(thisHoursSale);
  }
}

//prototype to render restaurants to DOM. 
Restaurants.prototype.renderRestaurant = function(tbodyElem){
  let dailyTotal = 0;
  const rowElem = makeElement('tr', tbodyElem, null);
  makeElement('th', rowElem, this.location);
  for (let i=0; i< this.salesPerHour.length; i++){
    const hourlyTotal = this.salesPerHour[i];
    const tdElem = document.createElement('td');
    tdElem.textContent = hourlyTotal;
    dailyTotal += hourlyTotal;
    rowElem.appendChild(tdElem);

  }
  makeElement('td', rowElem, dailyTotal);
}

//----------------------------------Global Functions--------------------------//

//makes elements and adds them to the DOM. Used in functions below.
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
  makeElement('td', rowElem, null);
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

// render footer of table
function renderFooter(){
  const tfootElem = makeElement('tfoot', restTableElem, null);
  const tfRowElem = makeElement('tr', tfootElem, null);
  makeElement('th', tfRowElem, 'Hourly Total');
  let grandTotal = 0;
  for(let i=0; i <hoursArray.length; i++){
    let hourlyTotal = 0;
    for(let index=0; index<Restaurants.allRestaurants.length; index++){
      hourlyTotal += Restaurants.allRestaurants[index].salesPerHour[i];
    }
    makeElement('th', tfRowElem, hourlyTotal);
    grandTotal += hourlyTotal;
  }
  makeElement('th', tfRowElem , grandTotal);
}

// function will use the snapshot or state of the event as a parameter e and create a new Restaurant with the specifications from the form and render it to the table. 
function handleSubmit (e){
  //used this on form to cancel out data going into URL
  e.preventDefault();
  console.log(e);
  let location = e.target.city.value;
  let minHourlyCust = e.target.minCust.value;
  parseInt(minHourlyCust);
  let maxHourlyCust = e.target.maxCust.value;
  parseInt(maxHourlyCust);
  let avgCookiePerCust = e.target.aveCookie.value;
  parseInt(avgCookiePerCust);

  let newRest = new Restaurants(location, minHourlyCust, maxHourlyCust, avgCookiePerCust);
  newRest.genRandomCust();
  newRest.calcSalesPerHour();


  //clear out table and re-render.
  restTableElem.innerHTML = '';

  renderHeader();
  renderAllRest();
  renderFooter();

  //this clears the form out after submit
  e.target.reset();
}



//-------------------------------------Add Event Listeners-------------------------//

// Upon submission of the HTML form, create an event handler that creates a new instance of a cookie stand that appends to the table upon form submission.
formElem.addEventListener('submit', handleSubmit);

//-------------------------------------Call Functions-------------------------//

const Seattle = new Restaurants('Seattle', 23, 65, 6.3);
const Tokyo = new Restaurants('Tokyo', 3, 24, 1.2);
const Dubai = new Restaurants('Dubai', 11, 38, 3.7);
const Paris = new Restaurants('Paris', 20, 38, 2.3);
const Lima = new Restaurants('Lima', 2, 16, 4.6);

renderHeader();
renderAllRest();
renderFooter();

