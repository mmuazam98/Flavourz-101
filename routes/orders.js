const express = require('express');
const router = express.Router();

const db = require('../models');

const middleware = require('../middleware');

router.get('/shops/:shop_id/orders', (req, res) => {
	db.Order
		.find({ shop: req.params.shop_id })
		.then((orders) => {
			//RENDER
		})
		.catch((err) => {
			console.log(err);
			//REDIRECT
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
router.put('/shops/:shop_id/orders/:order_id', middleware.checkOrderOwnership, (req, res) => {
	db.Order
		.findByIdAndUpdate(req.params.order_id, req.body)
		.then((order) => {
			req.flash('success', 'Updated Order Successfully');
			//REDIRECT
		})
		.catch((err) => {
			console.log(err);
			//REDIRECT
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
