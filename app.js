const express = require('express');
const app = express();
const fs = require('fs');
const db = require('./models');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const indexRoutes = require('./routes');
const shopRoutes = require('./routes/shops');
const menuRoutes = require('./routes/menu');
const ordersRoute = require('./routes/orders');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(flash());

// ************PASSPORT CONFG***********
app.use(
	require('express-session')({
		secret            : 'This is Team 1 for InWeb',
		resave            : false,
		saveUninitialized : false
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(db.Shop.authenticate()));
passport.serializeUser(db.Shop.serializeUser());
passport.deserializeUser(db.Shop.deserializeUser());
// ************PASSPORT CONFG***********

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use(indexRoutes);
app.use(shopRoutes);
app.use(menuRoutes);
app.get('/', (req, res) => {
	res.render('index', { page: 'index' });
});

let port = process.env.PORT || 5000;

app.listen(port, function () {
	console.log(`Server has started successfully at port ${port}`);
});
