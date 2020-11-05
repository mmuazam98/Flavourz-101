const express = require('express');
const router = express.Router();

const db = require('../models');

const middleware = require('../middleware');

router.get('/shops', (req, res) => {
	db.Shop
		.find()
		.populate('menu', {
			item      : true,
			price     : true,
			available : true
		})
		.then((shops) => {
			//RENDER
		})
		.catch((err) => {
			//error
			console.log(err);
		});
});

router.get('/shops/:shop_id', (req, res) => {
	db.Shop
		.findById(req.params.shop_id)
		.populate('menu')
		.then((shop) => {
			//REDIRECT
		})
		.catch((err) => {
			console.log(err);
		});
});

router.put('/shops/:shop_id', middleware.chechShopOwnership, (req, res) => {
	db.Shop.findByIdAndUpdate(req.params.shop_id, req.body).then((shop) => {
		req.flash('success', 'Updated Shop Successfully');
		//REDIRECT
	});
});

module.exports = router;
