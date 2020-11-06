const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../models');

router.get('/', (req, res) => {
	res.redirect('/shops');
});

router.post('/register', (req, res) => {
	const { username, profileImageUrl } = req.body;
	const newShop = new db.Shop({
		username,
		profileImageUrl
	});
	db.Shop.register(newShop, req.body.password, (err, shop) => {
		if (err) {
			console.log(err);
			//REDIRECT
			res.send('Something Went Wrong');
		}
		passport.authenticate('local')(req, res, () => {
			req.flash('success', 'Successfully Registered as: ' + username);
			//REDIRECT
			res.redirect('/shops');
		});
	});
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect : '/',
		failureRedirect : '/login'
	}),
	(req, res) => {}
);
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'Successfully Logged Out');
	res.redirect('/');
});

module.exports = router;
