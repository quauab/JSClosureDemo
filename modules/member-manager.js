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
			this.middleName = ' ';
		} else {
			this.middleName = cfc(m) + ' ';
		}
		
		this.firstName = cfc(f) + ' ';
		this.lastName = cfc(l) + ' ';		
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
		
	setId(id) {
		this.id = id;
	}
	
	toString() {
		return this.getName();
	}
}

class Contact extends Person {	
	constructor(p, e, f, l, m) {
		super(f,l,m);
				
		if (null === p || !p || !p.length || !Object.keys(p).length) {
			throw new Error('Provide at least one phone number');
		}
		
		if (null === e || !e || !e.length || !Object.keys(e).length) {
			throw new Error('Provide at least one email address');
		}
		
		// set phone
		this.setPhones(p);
		
		// set email
		this.setEmails(e);		
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
	
	setEmails(e) {
		this.emails = {};
		
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
		
		var size = Object.keys(this.emails).length;
		this.emails['size'] = size;
	}
	
	setPhones(p) {
		this.phones = {};
		
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

let membersManager = (function(){
	let members = {}
		container = [],
		members['container'] = container;
	return function(m,action) {
		if (null === m) {
			throw new Error('Provide a User object or string');
		}
		
		if (null === action || action.length === 0) {
			throw new Error('Provide an action to perform');
		}
		
		if ((m instanceof User) && action === 'add') {
			var username = m.getUserName(),
				email = m.getEmail('primary');
				
			for (var member in members['container']) {
				var mObj = members['container'][member],
					uName = mObj.username,
					uEmail = mObj.email;
					
				if (uName === username) {
					console.log('Username ' + uName + ' is already taken');
					return members['container'];
				}
				
				if (uEmail === email) {
					console.log('The email address ' + uEmail + ' is already used');
					return members['container'];
				}
			}
			
			var index = (members['container'].length + 1);
			
			members['container'].push({
				'id': index,
				'name': m,
				'firstName': m.getFirstName(),
				'lastName': m.getLastName(),
				'middleName': m.getMiddleName(),
				'uname': m.getUserName(),
				'email' :m.getEmail('primary'),
				'emails': m.getEmails(),
				'phone': m.getPhone('primary'),
				'phones': m.getPhones()
			});
		}
		
		if ((m instanceof User) && action === 'edit') {
			console.log('Editing ' + m.getFirstName().trim() + ' ' + m.getLastName().trim());
			var mObj = null;
			for (var i = 0; i < members['container'].length; i++) {							
				if (m.id.toString() === members['container'][i].id.toString()) {
					mObj =  members['container'][i];
					break;
				}
			}	

			if (null !== mObj) {	
					mObj.name = m.getFirstName().trim() + m.getMiddleName() + m.getLastName().trim();
					mObj.uname = m.getUserName();
					mObj.firstName = m.getFirstName();
					mObj.lastName = m.getLastName();
					mObj.middleName = m.getMiddleName();
					mObj.email = m.getEmail('primary');
					mObj.emails = m.getEmails();
					mObj.phone = m.getPhone('primary');
					mObj.phones = m.getPhones();
			}
		}
		
		if (typeof(m) === 'string' && action === 'search') {
			if (m === 'all') {
				return members['container'];
			} else {
				for (var i = 0; i < members['container'].length; i++) {
					var mObj = members['container'][i];
					if (mObj.id.toString() === m ||
						mObj.uname.trim() === m ||
						mObj.email.trim() === m ||
						mObj.phone.toString().trim() === m) {
						return mObj;
					}
				}
			}
		}
		
		if ((typeof(m) === 'string' || typeof(m) === 'number')
			&& (action === 'remove' || action === 'delete')) {			
			for (var i = 0; i < members['container'].length; i++) {
				var mObj = members['container'][i];
				if (mObj.id.toString() === m ||
					mObj.uname.toString().trim() === m ||
					mObj.email.toString() === m ||
					mObj.phone.toString() === m) {
					members['container'].splice(i,1);
					break;
				}
			}
		}
		
		if ((typeof(m) === 'string' && m === 'clean') && action === 'clear') {
			for (var i = -1; i < members['container'].length; i++) {
				members['container'].splice(i,1);
			}
		}
						
		return members['container'];
	}
})();

module.exports = {
	'members':(function(){
		return function(member = 'all', action = 'search') {
			return membersManager(member, action);
		}
	})(),
	'addMember':(function(){
		return function(u,p,e,f,l,m) {
			var newUser = new User(u,p,e,f,l,m);
			return membersManager(newUser,'add');
		}
	})(),
	'deleteMember':(function(){
		return function(id) {
			return membersManager(id,'remove');
		}
	})(),
	'editMember':(function(){
		return function(user) {
			return membersManager(user,'edit');
		}
	})(),
	'findMember':(function(){
		return function(searchCriteria = 'all', action='search') {
			return membersManager(searchCriteria, action);
		}
	})(),
	'editUser': (function(){
		return function(i,u,p,e,f,l,m) {
			let editUser = new User(u,p,e,f,l,m);
			editUser.setId(i);
			return editUser;
		}
	})(),
	'clear': (function(){
		return function(m = 'clean', action = 'clear') {
			return membersManager(m,action);
		}
	})()
}