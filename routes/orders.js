const express = require('express');
const router = express.Router();

const db = require('../models');

const middleware = require('../middleware');

router.get('/shops/:shop_id/menus/:menu_id/confirm', (req, res) => {
	db.Menu
		.findById(req.params.menu_id)
		.populate('shop', {
			username        : true,
			profileImageUrl : true
		})
		.then((menu) => {
			db.Shop
				.findById(req.params.shop_id)
				.then((shop) => {
					res.render('confirm', { shop: shop, menu: menu, page: 'confirm' });
				})
				.catch((err) => {
					console.log(err);
					res.redirect('/');
				});
		})
		.catch((err) => {
			console.log(err);
			res.redirect('/');
		});
});
router.get('/shops/:shop_id/menus/:menu_id/orders', async (req, res) => {
	let menu = await db.Menu.findById(req.params.menu_id);
	let user = await db.Shop.findById(req.params.shop_id);
	db.Order
		.create({
			item  : menu._id,
			Total : menu.price,
			shop  : user._id
		})
		.then(async (order) => {
			user.orders.push(order._id);
			await user.save();
			res.redirect(`/shops/${req.params.shop_id}/menus/${req.params.menu_id}/orders/${order._id}`);
		})
		.catch((err) => {
			console.log(err);
			res.redirect('/');
		});
});

router.get('/shops/:shop_id/menus/:menu_id/orders/:order_id', (req, res) => {
	db.Order.findById(req.params.order_id).populate('shop').then((order) => {
		res.render('confirmOrder', { page: 'confirmOrder', order: order });
	});
});

router.get('/shops/:shop_id/orders', (req, res) => {
	db.Order
		.find({ shop: req.params.shop_id })
		.populate('item', {
			item : true
		})
		.then((orders) => {
			//RENDER
			res.render('orders', { orders: orders });
		})
		.catch((err) => {
			console.log(err);
			//REDIRECT
			res.redirect('/');
		});
});
router.post('/shops/:shop_id/orders', async (req, res) => {
	const { item, total } = req.body;
	let shop = await db.Shop.findById(req.params.shop_id);
	const newOrder = {
		item,
		total
	};
	db.Order
		.create(newOrder)
		.then((order) => {
			console.log(order);
			shop.orders.push(order._id);
			shop.save();
			//REDIRECT
		})
		.catch((err) => {
			console.log(err);
			//REDIRECT
		});
});
router.put('/shops/:shop_id/orders/:order_id', (req, res) => {
	db.Order
		.findByIdAndUpdate(req.params.order_id, {
			status : req.body.status
		})
		.then((order) => {
			req.flash('success', 'Updated Order Successfully');
			//REDIRECT
			res.redirect(`/shops/${req.params.shop_id}/orders`);
		})
		.catch((err) => {
			console.log(err);
			//REDIRECT
			res.redirect('/');
		});
});
router.delete('/shops/:shop_id/orders/:order_id', middleware.checkOrderOwnership, (req, res) => {
	db.Order
		.findByIdAndRemove(req.params.order_id)
		.then((order) => {
			req.flash('success', 'Deleted  Successfully');
			//REDIREct
		})
		.catch((err) => {
			console.log(err);
			//REDIRECT
		});
});

module.exports = router;
