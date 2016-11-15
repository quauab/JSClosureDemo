let group = [],
	days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
	week = days,
	months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
	calendar = months;
let interval = 0;









let msg = function(m) { alert(m); };

let manageContacts = (function(){
	let contacts = {};
	return function(c,action) {
		if ((null === c || !(c instanceof Contact) && action === 'add')) {
			throw new Error('Provide a valid Contact object');
		}			
		if (null === action || !action) {
			throw new Error('Provide an action to perform on ' + c);
		}			
		if (action === 'add') {
			if (!Object.prototype.hasOwnProperty.call(contacts,c.toString().trim())) {
				log('\t\tAdded ' + c.toString());
				contacts[c.toString().trim()] = c;
			}
		}
		else if (action === 'search' && typeof(c) === 'string') {
			if (c === 'all') {
				return contacts;
			}
			else {
				log('\n\t\t\t\tSearching contacts for ' + c.trim());
				if (Object.prototype.hasOwnProperty.call(contacts,c.trim())) {
					log('\t\tFound ' + c.trim());
					return contacts[c.trim()];
				} else {
					return c.trim() + ' Not Found';
				}
			}
		} 
		else if (action === 'remove' && (c instanceof Contact)) {
			log('\n\t\t\t\tRemoving ' + c);
			if (Object.prototype.hasOwnProperty.call(contacts,c.toString().trim()))
				delete contacts[c.toString().trim()];
		} 
		else if (action === 'remove' && typeof(c) === 'string') {
			log('\n\t\t\t\tRemoving ' + c);
			if (Object.prototype.hasOwnProperty.call(contacts,c.trim()))
				delete contacts[c.trim()];
		}
		return contacts;
	}
})();

let manageUsers = (function(){
	let users = {};
	return function(u,action) {
		if ((null === u || !(u instanceof User) && action === 'add')) {
			throw new Error('Provide a valid User object');
		}			
		if (null === action || !action) {
			throw new Error('Provide an action to perform on ' + u);
		}			
		if (action === 'add') {
			if (!Object.prototype.hasOwnProperty.call(users,u.toString().trim())) {
				log('\t\tAdded ' + u.toString());
				users[u.toString().trim()] = u;
			}
		}
		else if (action === 'search' && typeof(u) === 'string') {
			if (u === 'all') {
				return users;
			}
			else {
				log('\n\t\t\t\tSearching users for ' + u.trim());
				if (Object.prototype.hasOwnProperty.call(users,u.trim())) {
					log('\t\tFound ' + u.trim());
					return users[u.trim()];
				} else {
					return u.trim() + ' Not Found';
				}
			}
		} 
		else if (action === 'remove' && (u instanceof User)) {
			log('\n\t\t\t\tRemoving ' + u);
			if (Object.prototype.hasOwnProperty.call(users,u.toString().trim()))
				delete users[u.toString().trim()];
		} 
		else if (action === 'remove' && typeof(u) === 'string') {
			log('\n\t\t\t\tRemoving ' + u);
			if (Object.prototype.hasOwnProperty.call(users,u.trim()))
				delete users[u.trim()];
		}
		return users;
	}
})();

function viewContacts(obj) {
	for (var contact in obj) {
		viewContact(obj[contact]);
	}
	log('\n');
}

function viewContact(obj) {
	if (obj instanceof Contact) {
		log();
		log(obj.toString() + '\n\nEmails');
		for (var e in obj.getEmails()) {
			var email = obj.getEmails()[e];
			log(cfc(e) + ': ' + email);
		}
		
		log('\nPhones');
		for (var p in obj.getPhones()) {
			var phone = obj.getPhones()[p];
			log(cfc(p) + ': ' + phone);
		}
		log();
	}
	else if (typeof(obj) === 'string') {
		log();
		log(obj);
		log();
	}
}

function log(message = '\n') {
	console.log(message);
}
	
function numSuf(num) {
	let index = (num.toString().length - 1);
	let n = num.toString().substring(index);
	switch (n) {		
		case '1':
			return 'st';
			
		case '2':
			return 'nd';
			
		case '3':
			return 'rd';
			
		default:
			return 'th';
	}
}
	
function testRun(e) {
	if (e instanceof Object) {
		for (var x in e) {
			var xObj = e[x];
			log(cfc(x) + ': ' + xObj);
		}
	} else if (typeof(e) === 'string') {
		log(e);
	} else {
		log(e);
	}
}

let addToO = (function() {
	let inc = {};
	return function(i) {
		let key = (Object.keys(inc).length += 1);
		inc[key] = i;
		return inc;
	}
})();

let addToA = (function() {
	let inc = [];
	return function(i) {
		inc.push(i);
		return inc;
	}
})();

let incByOne = (function(){
	return function(i) {
		return i+=1;
	}
})();

let incByTwo = (function(){
	return function(i) {
		return i+=2;
	}
})();

let incBy = (function(){
	return function(i,x) {
		return i+=x;
	}
})();
	
function crudTests() {
	log('\t\t\t\tAdding new contacts');
	var rick = new Contact(['232-786-9223','454-777-9311'],['rick@google.com'],'rick','walker');
	var objs = manageContacts(rick,'add');
	
	var anita = new Contact(['978-303-4111'],['anita@test.net'],'anita','bathe','major');
	objs = manageContacts(anita,'add');
	
	var jeaucque = new Contact('214-723-8796','jeac@vermon.org','jeacque','strapp');
	objs = manageContacts(jeaucque,'add');
	
	jeaucque.addEmail('primary','strapp@deez.net');
	jeaucque.addPhone('secondary','966-888-7144');
		
	log('\n\n');
	
	viewContacts(objs);
	
	log('\n\n');
		
	objs = manageContacts('Jeacque Strapp','remove');
	viewContacts(objs);
		
	let name = 'Rick Walker';
	let contact = manageContacts(name,'search');
	viewContact(contact);
	
	log('\nChanging Rick Walker\'s last name to poopil');
	contact.setLastName('poopil');
	viewContact(contact);
	
	viewContacts(manageContacts('all','search'));
}

function setLastNameTest() {
	log('\t\t\t\tAdding new contacts');
	
	var rick = new Contact(['232-786-9223','454-777-9311'],['rick@google.com'],'rick','walker');
	var objs = manageContacts(rick,'add');
	
	var anita = new Contact(['978-303-4111'],['anita@test.net'],'anita','bathe','major');
	objs = manageContacts(anita,'add');
	
	var jeaucque = new Contact('214-723-8796','jeac@vermon.org','jeacque','strapp');
	objs = manageContacts(jeaucque,'add');
	
	let name = 'Rick Walker';
	let contact = manageContacts(name,'search');
	viewContact(contact);
	
	log('\nChanging Rick Walker\'s last name to poopil');
	contact.setLastName('poopil');
	viewContact(contact);
}
	
function numSufTests() {
	log(21 + numSuf(21));
	log(102 + numSuf('102'));
	log(43 + numSuf(43));
	log(766804+ numSuf('766804'));
	log(50000 + numSuf(50000));
}
	
function createUserTest() {
	var rick = new User('ricwalker',['009-555-8100','967-324-4491'],['ric@google.com'],'rick','walker','');
	var users = manageUsers(rick,'add');
	
	log(rick.getFirstName().trim() + '\'s ' + 'Username is ' + rick.getUserName());
	
	viewContacts(users);
}
	
	
	
	
	

function element(id) { return document.getElementById(id); }

function newElement(type) { return document.createElement(type); }

function createTextNode(str) { return document.createTextNode(str); }

function createUlist(strArray) { 
	var ul = newElement('ul');
	addAttribute('id',strArray[0] + ' list',ul);
	var li;	
	for (var i = 0; i<strArray.length; i++ ) {
		li = newElement('li');
		addAttribute('id',strArray[i],li);
		appendElement(li,createTextNode(strArray[i]));
		appendElement(ul,li);	
	}	
	return ul;
}

function appendElement(parent,child) { parent.appendChild(child); }

function appendChild(parent,child) { appendElement(parent,child); }

function prependElement(parent,child,index) { parent.insertBefore(child,parent.childNodes[index]); }

function replaceElement(parent,newElement) {
	if (parent.childNodes.length === 1) {
		parent.replaceChild(newElement,parent.childNodes[0]);
	} else if (parent.childNodes.length === 0 || !parent.childNodes.length) {
		appendChild(parent,newElement);
	}
}

function removeElement(parent, child) { parent.removeChild(child); }

function removeElements(parent) {
	for (var i = 0; i<parent.childNodes.length; i++ ){
		var child = parent.childNodes[i];
		parent.removeChild(child);
	}
}

function removeElementsFrom(parent, index) {
	for (;index < (parent.childNodes.length); index++) {
		parent.removeChild(parent.childNodes[index]);
	}
}

function childCount(parent) { return parent.childNodes.length; }

function countLinks() { return document.links.length; }

function docLinks() { return document.links; }

function documentLinkHrefs() {
	var anchors = {},
		links = [];			
	if (countLinks() > 0) {
		anchors = docLinks();		
		$(anchors).each(function(index,value){
			links.push(index + "|" + value);
		});
	}
	return links;
}

function documentLinkHrefsOnly() {
	var anchors = {},
		links = [];			
	if (countLinks() > 0) {
		anchors = docLinks();		
		$(anchors).each(function(index,value){
			links.push(value);
		});
	}
	return links;
}

function documentLinkIDs() {
	var link_ids = [];	
	for (var i = 0; i<docLinks().length; i++) {
		var link = docLinks()[i];
		link_ids.push(link.id);
	}
	return link_ids;
}

function documentLinks() {
	var links = [];
	for (var i = 0; i<docLinks().length; i++) {
		var link = docLinks()[i];
		links.push(link);
	}
	return links;
}










var xmlHttpObject = function() {
	try {
		return new XMLHttpRequest();
	} catch (error){}
	
	try {
		return new ActiveXObject(Microsoft.XMLHTTP);
	} catch (error) {}
	
	try {
		return new ActiveXObject(Msxml2.XMLHTTP);
	} catch (error) {}
	
	throw new Error("Could not make AJAX request object");
};

function objectType(obj) { return (typeof obj); }

function screenWidth() { 
	var width = screen.availWidth;
	return width;
}











function hide(ele_id) {
	element(ele_id).style.display = "none";	
}

function show(ele_id) {
	element(ele_id).style.display = "visible";
}












function send_mail() {	
	var ele = event.currentTarget;
	document.location.href =('mailto:'+ele.value.trim()+'?subject=Deez Nuts');	
}

function sendMail(email_address) {
	document.location.href = ('mailto:' + email_address.trim() + '?subject=No Subject Provided');
}

function sendMailWithSubject(email_address, subject) {
	document.location.href = ('mailto:' + email_address.trim() + '?subject=' + subject);
}

function send_call() {
	var ele = event.currentTarget,
	 phone = ele.value.trim(),
	 patt = /^\d{3}-\d{3}-\d{4}$/,	
	 res = patt.exec(phone),
	 p = res.toString(),
	 num = p.split("-"),
	 phoneNum = "";	
	for(var i = 0; i<num.length; i++) {
		phoneNum += num[i];
	}
	document.location.href =('tel:'+phoneNum);
}

function sendCall(phone_number) {
	num = phone_number.trim().split('-'),
	phoneNum = "";
	if (num.length) {
		for(var i = 0; i<num.length; i++) {
			phoneNum += num[i];
		}
		document.location.href = ('tel:'+phoneNum);
	} 
	else {
		document.location.href = ('tel:' + phone_number);
	}
	var num,phoneNum;
}











function getCurrentLocation() {
	if (element('footer')) {
		if (navigator.geolocation) {
			try {
				navigator.geolocation.watchPosition(coordinates,errorHandler);
			} 
			catch (error) {
				errorHandler(error);
			}
		}
	}
}

function coordinates(position) {
	element('footer').innerHTML = 'Latitude: ' + position.coords.latitude + '&nbsp;&nbsp;&nbsp;Longitude: ' + position.coords.longitude;
	localStorage.latitude = position.coords.latitude;
	localStorage.longitude = position.coords.longitude;
}

function errorHandler(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			viewError('Geo-Location Error:&nbsp;&nbsp;Permission Denied');
		break;
		
		case error.POSITION_UNAVAILABLE:
			viewError('Geo-Location Error:&nbsp;&nbsp;Position Unavailable');
		break;
		
		case error.TIMEOUT:
			viewError('Geo-Location Error:&nbsp;&nbsp;Timed Out');
		break;
		
		case error.UNKNOWN_ERROR:
			viewError('Geo-Location Error:&nbsp;&nbsp;An Unknown Error Occurred');
		break;
		
		default:
			viewError(error);
		break;
	}
}

function viewError(e) {
	element('mapfooter').innerHTML += '<span style="color:rgba(225,220,215);margin-left:25%;font:bold 18pt "Palatino Linotype", "Book Antiqua", Palatino, serif;">' + e + '</span>';
}

function getMap() {	
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(viewMap, errorHandler);
    } 
	else { 
        errorHandler('Your browser does not support Geo-Location');
    }
}

function viewMap(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	latlon = new google.maps.LatLng(lat, lon);
	mapholder = element('mapwell');
	mapholder.style.height = '550px';
	mapholder.style.width = '1139px';

	var myOptions = {
		center:latlon,zoom:14,
		mapTypeId:google.maps.MapTypeId.ROADMAP,
		mapTypeControl:false,
		navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
	};

	var map = new google.maps.Map(element('mapwell'), myOptions);
	var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
	if (localStorage.latitude && localStorage.longitude) {
		element('footer').innerHTML = 'Latitude: ' + localStorage.latitude + ' &nbsp;&nbsp;&nbsp;&nbsp;Longitude: ' + localStorage.longitude;
	}
	else {
		element('footer').innerHTML = '&copy;2013 Quauab';
	}
}












// @param method The function to execute
// @param count The number of seconds
function doInterval(method,count) {
	return setInterval(function(){
		switch (typeof(method)) {
			case 'function':
				method();
				break;
		}
	},(count*1000));
}

function stopInterval(object) {
	clearInterval(object);
	object = 0;
}














function attachHandler(objId, theEvent, theHandler) {
	try {
		element(objId).addEventListener(theEvent,theHandler,true);
	} catch (error) {
		alert("Error attaching event handler to element " + objId
			+ "\n" + error);
	}
}

function addHandler(theElement, theEvent, theHandler) {
	try {
		theElement.addEventListener(theEvent,theHandler,true);
	} catch (error) {
		alert("Error adding event handler to element " + theElement.id 
			+ "\n" + error);
	}
}

function attachAttribute(theProperty, theValue, elementId) {
	try {
		element(elementId).setAttribute(theProperty,theValue);
	} catch (error) {
		alert("Error attaching attribute to element " + element(elementId) 
			+ "\n" + error);
	}
}

function addAttribute(theProperty, theValue, theElement) {
	try {
		theElement.setAttribute(theProperty,theValue);
	} catch(error) {
		alert("Error adding attribute to element " + theElement.id
			+ "\n" + error);
	}
}













function capitalizeFirstCharacter(word) {
	var word_split = null,
		line = "";
	if (word.trim().toLowerCase() === 'id' ||
		word.trim().toLowerCase() === 'ssn' ||
		word.trim().toLowerCase() === 'sku' ||
		word.trim().toLowerCase() === 'vm' ||
		word.trim().toLowerCase() === 'mac' ||
		word.trim().toLowerCase() === 'imei' ||
		word.trim().toLowerCase() === 'os' ||
		word.trim().toLowerCase() === 'atm' ||
		word.trim().toLowerCase() === 'pa') {
		word = word.toUpperCase();
	} else if (word.match(/[-]/)) {
		if (null !== (word_split = word.split(['-'])).length > 0) {
			for (var i = 0; i<word_split.length; i++) {
				if (i < (word_split.length - 1)) {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1) + '-';
				} else {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1);
				}
			}
			return line;
		}
	} else if (word.match(/[ ]/)) {
		if (null !== (word_split = word.split([' '])).length > 0) {
			for (var i = 0; i<word_split.length; i++) {
				if (i < (word_split.length - 1)) {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1) + ' ';
				} else {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1);
				}
			}
			return line;
		}
	} else {
		return word.substring(0,1).toUpperCase() + word.substring(1);
	}
	return word;
}

function cfc(word) {
	return capitalizeFirstCharacter(word);
}

function cap(str) { return str.substring(0,1).toUpperCase() + str.substring(1); }












//  ------------------------------------------------------------------------------
function size(object) {
	if (isArray(object)) {
		return arraySize(object);
	}
	else if (isObject(object)) {
		return objectSize(object);
	}
	else {
		return 0;
	}
}

function objectSize(o) { return Object.keys(o).length; }

function arraySize(a) { return a.length; }

function isObject(obj) {
	return ((obj instanceof Object) && !(obj instanceof Array));
}

function isArray(obj) {
	return (obj instanceof Array);
}
//  ------------------------------------------------------------------------------












var degrees_to_radians = function (degrees) { return degrees * Math.PI / 180; };

var dtr = function(degrees) { return degrees_to_radians(degrees); };

var radians_to_degrees = function (radians) { return radians * 180 / Math.PI; };

var rtd = function(radians) { return radians_to_degrees(radians); };

var kilometers_to_miles = function (km) {
	if(!isNaN(parseFloat(km)) &&
		isFinite(parseFloat(km))) {
		return number(km*(0.621371));
	}
	else {
		return -1;
	}
};

var ktm = function(km) { return kilometers_to_miles(km); };











function suffix(input) {
	var temp = [],
		string = new String(input).trim();
		
	for (var i = 0; i < string.length; i++) {
		temp.push(string.charAt(i));
	}
	
	switch (temp.length) {
		case 1:
			return input + '' + checkChar(input);
			
		case 2:
			return checkChars(temp);
	}
	
}

function checkChar(input) {
	switch (input) {
		case 1:
			return 'st';
			
		case 2:
			return 'nd';
			
		case 3:
			return 'rd';
			
		default:
			return 'th';
	}
}

function checkChars(an_array) {	
	switch (an_array[0]) {
		case '1':
			return an_array[0] + '' + an_array[1] + 'th';
			
		default:
			return an_array[0] + '' + an_array[1] + checkSecondChar(an_array[1]);
	}
}

function checkSecondChar(input) {
	switch (input) {		
		case '1':
			return 'st';
			
		case '2':
			return 'nd';
			
		case '3':
			return 'rd';
			
		default:
			return 'th';
	}
}

function dateTimeStamp() {	
	return '<b class="datetimestamp">' + date() + '  ' + time() + '</b>';
}

function stamp() {
	return '<b class="datetimestamp">' + date() + '  ' + time() + '</b>';
}

function time() {
	var d = new Date(),
		seconds = null,
		minutes = null,
		hours = null;
	
	switch (d.getSeconds()) {
		case 0:
			seconds = '00';
			break;
		case 1:
			seconds = '01';
			break;
		
		case 2:
			seconds = '02';
			break;
			
		case 3:
			seconds = '03';
			break;
			
		case 4:
			seconds = '04';
			break;
			
		case 5:
			seconds = '05';
			break;
			
		case 6:
			seconds = '06';
			break;
			
		case 7:
			seconds = '07';
			break;
			
		case 8:
			seconds = '08';
			break;
			
		case 9:
			seconds = '09';
			break;
			
		default:
			seconds = d.getSeconds();
			break;
	}
	
	switch (d.getMinutes()) {
		
		case 0:
			minutes = '00';
			break;
		case 1:
			minutes = '01';
			break;
		
		case 2:
			minutes = '02';
			break;
			
		case 3:
			minutes = '03';
			break;
			
		case 4:
			minutes = '04';
			break;
			
		case 5:
			minutes = '05';
			break;
			
		case 6:
			minutes = '06';
			break;
			
		case 7:
			minutes = '07';
			break;
			
		case 8:
			minutes = '08';
			break;
			
		case 9:
			minutes = '09';
			break;
			
		default:
			minutes = d.getMinutes();
			break;
	}
	
	switch (d.getHours()) {
		
		case 0:
			hours = '00';
			break;
		case 1:
			hours = '01';
			break;
		
		case 2:
			hours = '02';
			break;
			
		case 3:
			hours = '03';
			break;
			
		case 4:
			hours = '04';
			break;
			
		case 5:
			hours = '05';
			break;
			
		case 6:
			hours = '06';
			break;
			
		case 7:
			hours = '07';
			break;
			
		case 8:
			hours = '08';
			break;
			
		case 9:
			hours = '09';
			break;
			
		default:
			hours = d.getHours();
			break;
	}
	
	var time = hours + '\:' + minutes + '\:' + seconds;
	return time;
}

function date() {
	var d = new Date();
	var date = days[d.getDay()] +  ' ' + months[d.getMonth()] + ' ' + suffix(d.getDate('Greenwich Mean Time')) + ' ' + d.getFullYear();
	return date;
}

function timeObjects() {
	var d = null,
		seconds = null,
		minutes = null,
		hours = null;	
	
	if (null !== (d = new Date())) {
		switch (d.getSeconds()) {
			case 0:
				seconds = '00';
				break;
			case 1:
				seconds = '01';
				break;
			
			case 2:
				seconds = '02';
				break;
				
			case 3:
				seconds = '03';
				break;
				
			case 4:
				seconds = '04';
				break;
				
			case 5:
				seconds = '05';
				break;
				
			case 6:
				seconds = '06';
				break;
				
			case 7:
				seconds = '07';
				break;
				
			case 8:
				seconds = '08';
				break;
				
			case 9:
				seconds = '09';
				break;
				
			default:
				seconds = d.getSeconds();
				break;
		}
		
		switch (d.getMinutes()) {
			
			case 0:
				minutes = '00';
				break;
			case 1:
				minutes = '01';
				break;
			
			case 2:
				minutes = '02';
				break;
				
			case 3:
				minutes = '03';
				break;
				
			case 4:
				minutes = '04';
				break;
				
			case 5:
				minutes = '05';
				break;
				
			case 6:
				minutes = '06';
				break;
				
			case 7:
				minutes = '07';
				break;
				
			case 8:
				minutes = '08';
				break;
				
			case 9:
				minutes = '09';
				break;
				
			default:
				minutes = d.getMinutes();
				break;
		}
		
		switch (d.getHours()) {
			
			case 0:
				hours = '00';
				break;
			case 1:
				hours = '01';
				break;
			
			case 2:
				hours = '02';
				break;
				
			case 3:
				hours = '03';
				break;
				
			case 4:
				hours = '04';
				break;
				
			case 5:
				hours = '05';
				break;
				
			case 6:
				hours = '06';
				break;
				
			case 7:
				hours = '07';
				break;
				
			case 8:
				hours = '08';
				break;
				
			case 9:
				hours = '09';
				break;
				
			default:
				hours = d.getHours();
				break;
		}
		
		return {
			second:seconds,
			minute:minutes,
			hour:hours,
			sec:d.getSeconds(),
			min:d.getMinutes(),
			hou:d.getHours()
		};
	}
	return null;
}

function dateObjects() {	
	var d = null;
	if (null !== (d = new Date()))
		return {
			strDay:days[d.getDay()],
			intDay:d.getDay(),
			strMonth:months[d.getMonth()],
			intMonth:d.getMonth(),
			intYear:d.getFullYear(),
			day:suffix(d.getDate('Greenwich Mean Time'))
		};
	return null;
}








// classes
class Person {	
	constructor(f,l,m) {
		if (null === f || !f) {
			throw new Error('First name is required');
			return;
		}
		
		if (null === l || !l) {
			throw new Error('Last name is required');
			return;
		}
		
		if (null === m || !m) {
			this.middleName = '';
		} else {
			this.middleName = cfc(m) + ' ';
		}
		
		this.firstName = cfc(f) + ' ';
		this.lastName = cfc(l) + ' ';		
	}
	
	setFirstName(fname) {
		if (null === fname || !fname) {
			throw new Error('Provide a first name');
		} else {
			this.firstName = cfc(fname) + ' ';
		}
	}
	
	setLastName(lname) {
		if (null === lname || !lname) {
			throw new Error('Provide a last name');
		} else {
			this.lastName = cfc(lname) + ' ';
		}
	}
	
	setMiddleName(mname) {
		this.middleName = cfc(mname) + ' ' || '';
	}
	
	getFirstName() {
		return this.firstName;
	}
	
	getLastName() {
		return this.lastName;
	}
	
	getMiddleName() {
		return this.middleName;
	}
	
	getName() {
		return this.getFirstName() + this.getMiddleName() + this.getLastName();
	}
	
	toString() {
		return this.getName();
	}
}

class Contact extends Person {	
	constructor(p, e, f, l, m) {
		super(f,l,m);
		
		this.phones = {};
		this.emails = {};		
		
		if (null === p || !p || !p.length || !Object.keys(p).length) {
			throw new Error('Provide at least one phone number');
		}
		
		if (null === e || !e || !e.length || !Object.keys(e).length) {
			throw new Error('Provide at least one email address');
		}
		
		// set phone
		if (p instanceof Array) {
			for (var i = 0; i<p.length; i++) {
				if (i === 0) {
					this.phones['primary'] = p[i];
				} else {
					var key = (Object.keys(this.phones).length + 1) + numSuf((Object.keys(this.phones).length + 1).toString()) + ' Phone';
					this.phones[key] = p[i];
				}
			}
		} else if (p instanceof Object && !(p instanceof Array)) {
			for (var x in p) {
				var xObj = p[x];
				this.phones[x] = xObj;
			}
		} else {
			this.phones['primary'] = p;
		}
		
		// set email
		if (e instanceof Array) {
			for (var i = 0; i<e.length; i++) {
				if (i === 0) {
					this.emails['primary'] = e[i];
				} else {
					var key = (Object.keys(this.emails).length + 1) + numSuf((Object.keys(this.emails).length + 1).toString()) + ' Email';
					this.emails[key] = e[i];
				}
			}
		} else if (e instanceof Object && !(e instanceof Array)) {
			for (var x in e) {
				var xObj = e[x];
				this.emails[x] = xObj;
			}
		} else {
			this.emails['primary'] = e;
		}		
	}
	
	getEmails() {
		return this.emails;
	}
		
	getEmail(key) {
		if (Object.prototype.hasOwnProperty.call(this.emails,key)) {
			return this.emails[key];
		}
		return null;
	}
	
	getPhones() {
		return this.phones;
	}
		
	getPhone(key) {
		if (Object.prototype.hasOwnProperty.call(this.phones,key)) {
			return this.phones[key];
		}
		return null;
	}
	
	addEmail(category,email) {
	if (null === category ||
		!category ||
		!category.length ||
		typeof(category) !== 'string') {
			throw new Error('Provide a category for this email address');
		}
		
		if (null === email ||
			!email ||
			!email.length ||
			typeof(email) !== 'string') {
				throw new Error('Provide an email address');
			}
			
		if (this.emails[category]) {
			if (confirm('Do you want to replace the current ' + category + ' email address: ' + this.emails[category] + '?')) {
				this.emails[category] = email;
			} else {
				var newKey = (Object.keys(this.emails).length + 1) + numSuf((Object.keys(this.emails).length + 1).toString()) + ' Email';
				this.emails[newKey] = email;
			}
		} else {
			this.emails[category] = email;
		}
	}
	
	addPhone(category,phone) {
	if (null === category ||
		!category ||
		!category.length ||
		typeof(category) !== 'string') {
			throw new Error('Provide a category for this phone number');
		}
		
		if (null === phone ||
			!phone ||
			!phone.length ||
			typeof(phone) !== 'string') {
				throw new Error('Provide a phone number');
			}
			
		if (this.phones[category]) {
			if (confirm('Do you want to replace the current ' + category + ' phone number: ' + this.phones[category] + '?')) {
				this.phones[category] = phone;
			} else {
				var newKey = (Object.keys(this.phones).length + 1) + numSuf((Object.keys(this.phones).length + 1).toString()) + ' Phone';
				this.phones[newKey] = phone;
			}
		} else {
			this.phones[category] = phone;
		}
	}
	
	toString() { return super.toString(); }
}

class User extends Contact {
	constructor(uname, p, e, f, l, m) {
		super(p, e, f, l, m);
		
		if (null === uname || !uname) {
			throw new Error('Provide a user name');
		}

		this.username = uname;
	}
	
	setUserName(uname) {
		if (uname.trim() === this.username.trim()) {
			if (confirm('Are you sure that you want to replace the current Username ' + this.username + ' with ' + uname + '?')) {
				this.username = uname;
			}
		} else {
			if (this.username) {
				if (confirm('Are you sure that you want to change the current username ' + this.username + ' to ' + uname + '?')) {
					this.username = uname;
				}
			} else {
				this.username = uname;
			}
		}
	}
	
	getUserName() {
		return this.username;
	}
	
	toString() { return super.toString(); }
}