const mongoose = require('mongoose');
const Shop = require('./shops');

const orderSchema = new mongoose.Schema(
	{
		item   : {
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'Menu'
		},
		Total  : {
			type     : Number,
			required : true
		},
		status : {
			type    : Boolean,
			default : false
		},
		shop   : {
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'Shop'
		}
	},
	{
		timestamps : true
	}
);

orderSchema.pre('remove', async function (next) {
	try {
		//find the shop
		let shop = await Shop.findById(this.shop);
		//remove id of menu from shop menu list
		shop.menu.remove(this.id);
		//save shop
		await shop.save();
		//next
		return next();
	} catch (error) {
		return next(error);
	}
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
