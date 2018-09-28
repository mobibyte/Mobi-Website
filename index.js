// Client ID and API key from the Developer Console
var CLIENT_ID = '842850006337-chnnp39a2vtfqkf88rri8c3bjl494o0l.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCvNk9cQQf9rJT669hZeVkF3OaQGbwlQoU';
var CALENDAR_ID = 'uta.mobi@gmail.com';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
var MAX_EVENTS = 0;
/**
 *  On load, called to load the API client library.
 */
function handleClientLoad(amountOfEventsShown) {
		MAX_EVENTS = amountOfEventsShown
		gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library 
 */
function initClient() {
	gapi.client.init({
		apiKey: API_KEY,
		clientId: CLIENT_ID,
		discoveryDocs: DISCOVERY_DOCS,
		scope: SCOPES
	}).then(function () {
		listUpcomingEvents();
	})
}

/**
 *  Replace the current text in Calandar Card (in index.html) with most current event's
 *  Summary and Date.
 */
function appendCalendarCard(summary, when, where, description) {
	document.getElementById("calandarCardTitle").innerHTML = summary;
	formattedDate = formatDate(when)
	document.getElementById("calandarCardDate").innerHTML = formattedDate;
	if (where != undefined ) {
		document.getElementById("calandarCardLocation").innerHTML = where;
	}
	if (description != undefined ) {
		document.getElementById("calandarCarDescription").innerHTML = description
	}

	showPage()
}

/**
 *  Replace the current text in Calandar List (in Workshop.html) with 5
 * 	or less upcoming events with Summary and Date (and location).
 */
function appendCalendarList(summary, when, where = undefined) {
	// Create a list element and a h5 element
	var li = document.createElement("li");
	var h5 = document.createElement("h5");
	
	// Add summary (title of event) to a h5 html element and append it to the list element
	var t = document.createTextNode(`${summary}`);
	h5.appendChild(t);
	li.appendChild(h5);

	//Format date and place inside the list element (and location if applicable)
	formattedDate = formatDate(when);
	var dateAndLocation;
	if (where === undefined) {
		dateAndLocation = document.createTextNode(`${formattedDate}`);
	} else {
		dateAndLocation = document.createTextNode(`${formattedDate} in ${where}`);
	}
  li.appendChild(dateAndLocation);
	// Append list element to ul html element (unordered list) in Workshop.html 

	li.style.marginBottom = "24px";
	document.getElementById("calendarList").appendChild(li);
	showPage()

}

/**
 * Formats date and time
 * 
 *  If only a date is recived back from Google Calendar API:
 *    Date Format Given By Google Calandar API yyyy-mm-dd ie 2018-12-20
 *    Formated to monthName dd, yyyy
 * 
 * If date and time is recieve back from Google Calendar API:
 *   Date Format given by google calendar API is 2018-06-15T18:00:00-05:00
 *   Formatted to monthName dd, yyyy tt:tt (am/pm)
 * 
 */
function formatDate(when) {

	if (when !== '') {
		const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];
		
		// Splits 2018-06-15T18:00:00-05:00 or 2018-12-20 into an array 
		// of numbers
		let dateArray = when.split(/(?:-|T)+/);
		const year = dateArray[0];

		let month;
		if (dateArray[1].indexOf("10") === -1){
			month = dateArray[1].replace("0", ''); //Replace the 05:00 with 5:00
		} else {
			month = dateArray[1] //Replace the 05:00 with 5:00
		}
		const day = dateArray[2];
	
		// If only date given return just the date else return time as well
		if (dateArray.length <= 3) {
			return `${ monthNames[month-1]} ${day}, ${year}`;
		} else {
			var time = dateArray[4].replace("0", '');
			var ampm = "0"
			// if the 24 hour time doesn't contain a 0 as the first element ie 17:00
			// it it pm
			dateArray[3][0] == '0' ? ampm = "am" : ampm = "pm"
			return `${ monthNames[month-1]} ${day}, ${year} ${time} ${ampm}`
		}
	}
	return '';
}

/**
 * Print the summary and start datetime/date of the next events. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
	gapi.client.calendar.events.list({
		'calendarId': CALENDAR_ID,
		'timeMin': (new Date()).toISOString(),
		'showDeleted': false,
		'singleEvents': true,
		'maxResults': MAX_EVENTS,
		'orderBy': 'startTime'
	}).then(function(response) {
		if(response.status >= 200 && response.status < 400){

			var events = response.result.items;
			if (events.length > 0) {
				for (i = 0; i < events.length; i++) {
					let event = events[i];
					let when = event.start.dateTime;
					if (!when) {
						when = event.start.date;
					}
					var where = event.location;
					var description = event.description;
					MAX_EVENTS <= 1 ? appendCalendarCard(event.summary, when, where, description) :
					appendCalendarList(event.summary, when, where)
				
				}
			} else {
				// Create one event card for with just a summary saying no upcoming events
				MAX_EVENTS <= 1
					?
					appendCalendarCard('No upcoming events found.', '')
					:
					appendCalendarList('No upcoming events found.', '');
			}

		}else{
			alert('Error: bad response from Google')
		}
	});
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("content").style.display = "block";
}

function scrollToForm() {
	var formElement = document.getElementById('first_name');
	formElement.scrollIntoView();
	formElement.focus();
}

function attemptRegister() {
	// Bootstrap takes care of some validation for us,
	// such as a valid email address and required fields
	const form = document.getElementById('register');
	const button = document.getElementById('submitBtn');

	if(form[0].value.length <= 1){
		alert('Please enter your first name');
		return false;
	}

	// Check if the last name <= 1
	if(form[1].value.length <= 1){
		alert('Please enter your last name');
		return false;
	}

	// Check the 10-digit mav id
	if(form[3].value.length !== 10){
		alert('Invalid Mav ID');
		return false;
	}

	// Create the data object to be sent
	let data = {
		'FNAME': null,
		'LNAME': null,
		'EMAIL': null,
		'MAVS': null,
	};

	// Getting keys of data object
	let keys = Object.keys(data);

	for (let index = 0; index < form.length - 1; index++) {
		// Looping through each value in the form and assigning
		// it to the object by each key
		const element = form[index];
		data[keys[index]] = element.value;
	}

	// Stateful submit button
	button.disabled = true;

	// Call server
	register(data)
	button.disabled = false;
}

function register(data) {
	// Creds
	const u = '5d3eeb8a245375de29b010caa';
  const id = '0a24065ed9';
	const url = 'http://idappthat.us7.list-manage.com/subscribe/post-json?u=' + u + '&id=' + id + '&c=?';
	// Ajax call here
	$.ajax({
		url: url,
    jsonp: "callback",
    // Tell jQuery we're expecting JSONP
		dataType: "jsonp",
		data: data,
		contentType: 'application/json; charset=utf-8',
		error: function(err) { alert('Could not register at this time...'); },
		success: function( response ) {
			if(response.result !== "success"){
				displayFailure(response.msg);
			}
			else{
				displaySuccess(response.msg);
			}
		}
	})
}

function displayFailure(message) {
	// TODO: 
	// 1. create an commen element to display error/success message
	// 2. Set styling
	const status = document.getElementById('status');
	status.className = "alert alert-danger";
	status.innerHTML = message;
}

function displaySuccess(message) {
	// 1. See displayFailure
	// 2. Clear form
	const status = document.getElementById('status');
	const form = document.getElementById('register');

	status.className = "alert alert-success";
	status.innerHTML = message;
	form.reset();
}