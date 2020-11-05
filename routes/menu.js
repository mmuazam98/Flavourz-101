const express = require('express');
const router = express.Router();

const db = require('../models');

const middleware = require('../middleware');

router.get('/shops/:shop_id/menus', (req, res) => {
	db.Menu
		.find({ shop: req.params.shop_id })
		.then((menus) => {
			//RENDER
		})
		.catch((err) => {
			console.log(err);
			//REDIRECT
		});
});
router.post('/shops/:shop_id/menus', async (req, res) => {
	const { item, description, price } = req.body;
	let shop = await db.Shop.findById(req.params.shop_id);
	const newMenu = {
		item,
		description,
		price
	};
	db.Menu
		.create(newMenu)
		.then((menu) => {
			console.log(menu);
			shop.menu.push(menu._id);
			shop.save();
			//REDIRECT
		})
		.catch((err) => {
			console.log(err);
			//REDIRECT
		});
});
router.put('/shops/:shop_id/menus/:menu_id', middleware.checkMenuOwnership, (req, res) => {
	db.Menu
		.findByIdAndUpdate(req.params.menu_id, req.body)
		.then((menu) => {
			req.flash('success', 'Updated Menu Successfully');
			//REDIRECT
		})
		.catch((err) => {
			console.log(err);
			//REDIRECT
		});
});
router.delete('/shops/:shop_id/menus/:menu_id', middleware.checkMenuOwnership, (req, res) => {
	db.Menu
		.findByIdAndRemove(req.params.menu_id)
		.then((menu) => {
			req.flash('success', 'Deleted Menu Successfully');
			//REDIRECT
		})
		.catch((err) => {
			console.log(err);
			//REDIRECT
		});
});

module.exports = router;
