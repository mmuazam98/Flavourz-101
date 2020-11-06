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
			db.Menu
				.find()
				.then((menus) => {
					res.render('shops', { menus: menus, shops: shops, page: 'shops' });
				})
				.catch((err) => {
					console.log(err);
				});
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
router.get('/shops/:shop_id/edit', (req, res) => {
	db.Shop.findById(req.params.shop_id).then((shop) => {
		res.render('edit', { edit: 'shop', shop: shop });
	});
});
router.put('/shops/:shop_id', (req, res) => {
	db.Shop.findByIdAndUpdate(req.params.shop_id, req.body).then((shop) => {
		req.flash('success', 'Updated Shop Successfully');
		//REDIRECT
		res.redirect(`/shops`);
	});
});

module.exports = router;
