const db = require('../models');

const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'Not Logged In');
	//REDIRECT
};

middlewareObj.chechShopOwnership = (req, res, next) => {
	if (req.isAuthenticated()) {
		db.Shop
			.findById(req.params.shop_id)
			.then((shop) => {
				if (shop._id.equals(req.user._id)) {
					return next();
				} else {
					req.flash('error', 'You are not the Right User');
					//REDIRECT
				}
			})
			.catch((err) => {
				req.flash('error', 'You need to be Logged In to do that.');
				//REDIRECT
			});
	} else {
		req.flash('error', 'You are not Logged In');
		//REDIRECT
	}
};

middlewareObj.checkMenuOwnership = (req, res, next) => {
	if (req.isAuthenticated()) {
		db.Menu
			.findById(req.params.menu_id)
			.then((menu) => {
				if (menu.shop.id.equals(req.user._id)) {
					return next();
				} else {
					req.flash('error', 'You are not the Right User');
					//REDIRECT
				}
			})
			.catch((err) => {
				req.flash('error', 'You need to be Logged In to do that.');
				//REDIRECT
			});
	} else {
		req.flash('error', 'You are not Logged In');
		//REDIRECT
	}
};

middlewareObj.checkOrderOwnership = (req, res, next) => {
	if (req.isAuthenticated()) {
		db.Order
			.findById(req.params.order_id)
			.then((order) => {
				if (order.shop.id.equals(req.user._id)) {
					return next();
				} else {
					req.flash('error', 'You are not the Right User');
					//REDIRECT
				}
			})
			.catch((err) => {
				req.flash('error', 'You need to be Logged In to do that.');
				//REDIRECT
			});
	} else {
		req.flash('error', 'You are not Logged In');
		//REDIRECT
	}
};

module.exports = middlewareObj;
