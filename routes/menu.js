const express = require('express');
const router = express.Router();

const db = require('../models');

const middleware = require('../middleware');

router.get('/menu', (req, res) => {
	db.Shop
		.find()
		.populate('menu')
		.then((shops) => {
			res.render('menu', { shops: shops, page: 'menu' });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get('/shops/:shop_id/menus', (req, res) => {
	db.Shop
		.find()
		.populate('menu')
		.then((shops) => {
			res.render('menu', { shops: shops, page: 'menu' });
		})
		.catch((err) => {
			console.log(err);
		});
});
router.post('/shops/:shop_id/menus', async (req, res) => {
	const { item, imageUrl, price } = req.body;
	let shop = await db.Shop.findById(req.params.shop_id);
	const newMenu = {
		item,
		imageUrl,
		price,
		shop     : req.params.shop_id
	};
	db.Menu
		.create(newMenu)
		.then(async (menu) => {
			console.log(menu);
			shop.menu.push(menu._id);
			await shop.save();
			//REDIRECT
			res.redirect(`/shops/${shop._id}/menus`);
		})
		.catch((err) => {
			console.log(err);
			//REDIRECT
		});
});
router.get('/shops/:shop_id/menus/:menu_id/edit', (req, res) => {
	db.Menu.findById(req.params.menu_id).populate('user').then((menu) => {
		res.render('edit', { edit: 'menu', menu: menu });
	});
});
router.put('/shops/:shop_id/menus/:menu_id', (req, res) => {
	db.Menu
		.findByIdAndUpdate(req.params.menu_id, req.body)
		.then((menu) => {
			req.flash('success', 'Updated Menu Successfully');
			//REDIRECT
			res.redirect(`/shops/${req.params.shop_id}/menus`);
		})
		.catch((err) => {
			console.log(err);
			//REDIRECT
		});
});
router.delete('/shops/:shop_id/menus/:menu_id', async (req, res) => {
	db.Menu
		.findByIdAndRemove(req.params.menu_id)
		.then((menu) => {
			req.flash('success', 'Deleted Menu Successfully');
			//REDIRECT
			res.redirect('/shops');
		})
		.catch((err) => {
			console.log(err);
			//REDIRECT
			res.redirect('/');
		});
});

module.exports = router;
