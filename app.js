var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	db = require('./modules/member-manager.js'),
	app = express();
	
var user = null;
	
// View engine
app.engine('dust',cons.dust);

// Setting view engine and views directory location
app.set('view engine','dust');
app.set('views',__dirname + '/views');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.get('/',function(req, res){
	res.render('index',{members:db.members});
});

app.get('/profile/:id', function(req, res, next) {
	var id = req.params.id.toString() || null;
	user = db.findMember(id,'search') || null;
	var emails = [],
		phones = [];
		
	for (var e in user.emails) {
		var email = user.emails[e];
		emails.push(email);
	}
	
	for (var p in user.phones) {
		var phone = user.phones[p];
		phones.push(phone);
	}
	res.render('about',{user:user,emails:emails,phones:phones});
});

app.get('/about', function(req, res){
	res.render('about',{user:user});
});

app.post('/add',function(req, res){
	var uname = req.body.username,
		fname = req.body.first_name,
		lname = req.body.last_name,
		mname = req.body.middle_name || '',
		email = req.body.email,
		phone = req.body.phone;
	db.addMember(uname,phone,email,fname,lname,mname);
	res.redirect('/');
});

app.delete('/delete/:id', function(req, res){
	var id = req.params.id;
	console.log('ID: ' + id);
	db.deleteMember(id.toString(),'remove');
	res.sendStatus(200);
});

app.post('/edit',function(req, res){
	var id = req.body.id,
		uname = req.body.username,
		fname = req.body.first_name,
		lname = req.body.last_name,
		mname = req.body.middle_name || '',
		email = req.body.email,
		phone = req.body.phone,
		editUser = db.editUser(id,uname,phone,email,fname,lname,mname);			
	db.editMember(editUser);
	res.redirect('/');
});

// Server 
app.set('port', (process.env.PORT || 2222));

app.listen(app.get('port'),function(){
	console.log("Server started on port " + app.get('port'));
});
