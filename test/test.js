var assert = require('assert'),
	db = require('../modules/member-manager.js');
	
console.log('\n\t\t\tMembers-Manager JavaScript Closure Tests\n\n');

describe('Array', function() {
	describe('#indexOf()', function() {
		it('should return -1 when the value is not present', function() {
			assert.equal(-1, [1,2,3].indexOf(4));
		});
	});
});

describe('Array', function() {
	describe('#elementAt()', function() {
		it('should return b', function() {
			assert.equal('b', ['a','b','c'][1]);
		});
	});
});

describe('Users', function() {	
	describe('Adds one user', function() {
		it('Should return an array size of 1', function() {
			var users = db.addMember('newuser','545-777-9311','user@new.net','fname','lname','mname');
			assert.equal('Fname', users[0].firstName.trim());
			assert.equal('Lname', users[0].lastName.trim());
			assert.equal('Mname', users[0].middleName.trim());
			assert.equal('user@new.net', users[0].email);
			assert.equal('545-777-9311', users[0].phone);
			assert.equal('newuser', users[0].uname.trim());
			assert.equal(1,users.length);
		});
	});
});

describe('Users', function() {	
	describe('Adds two more users', function() {
		it('Should return an array size of 3', function() {		
			var users = db.addMember('newuser1','565-777-9311','user1@new.net','fname1','lname1','mname1'),
			users = db.addMember('newuser2','333-555-7777','anotheruser@new.net','fname2','lname2','mname2');
				
			assert.equal('Fname1', users[1].firstName.trim());
			assert.equal('Lname1', users[1].lastName.trim());
			assert.equal('Mname1', users[1].middleName.trim());
			assert.equal('user1@new.net', users[1].email);
			assert.equal('565-777-9311', users[1].phone);
			assert.equal('newuser1', users[1].uname.trim());
			
			assert.equal('Fname2', users[2].firstName.trim());
			assert.equal('Lname2', users[2].lastName.trim());
			assert.equal('Mname2', users[2].middleName.trim());
			assert.equal('anotheruser@new.net', users[2].email);
			assert.equal('333-555-7777', users[2].phone);
			assert.equal('newuser2', users[2].uname.trim());
			
			assert.equal(3,users.length);
		});
	});
});

describe('Users', function() {	
	describe('Search for two User objects and test their inequality', function() {
		it('Should return return false', function() {				
			assert.notDeepEqual(db.findMember('newuser1'),db.findMember('newuser2'));
		});
	});
});

describe('Users', function() {	
	describe('Search for a user by username', function() {
		it('Should return 1 user object', function() {		
			var user = db.findMember('newuser1','search');				
			assert.equal('Fname1', user.firstName.trim());
			assert.equal('Lname1', user.lastName.trim());
			assert.equal('Mname1', user.middleName.trim());
			assert.equal('user1@new.net', user.email.trim());
			assert.equal('565-777-9311', user.phone.trim());
			assert.equal('newuser1', user.uname.trim());
		});
	});
});

describe('Users', function() {	
	describe('Search for a user by phone', function() {
		it('Should return 1 user object', function() {		
			var user = db.findMember('565-777-9311','search');				
			assert.equal('Fname1', user.firstName.trim());
			assert.equal('Lname1', user.lastName.trim());
			assert.equal('Mname1', user.middleName.trim());
			assert.equal('user1@new.net', user.email.trim());
			assert.equal('565-777-9311', user.phone.trim());
			assert.equal('newuser1', user.uname.trim());
		});
	});
});

describe('Users', function() {
	describe('Removes a user', function() {
		it('Should return an array size of 2', function() {
			var users = db.deleteMember('newuser','remove');
			assert.equal(2,users.length);
		});
	});
});

describe('Users', function() {
	describe('Removes all users', function() {
		it('Should return an array size of 0', function() {
			var users = db.clear();
			assert.equal(0,users.length);
		});
	});
});