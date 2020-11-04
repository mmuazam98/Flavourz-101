const mongoose = require('mongoose');
const Shop = require('./shops');

const orderSchema = new mongoose.Schema(
	{
		items      : [
			{
				type : mongoose.Schema.Types.ObjectId,
				ref  : 'Menu'
			}
		],
		Totalprice : {
			type     : Number,
			required
		},
		status     : {
			type    : Boolean,
			default : false
		},
		shop       : {
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

const Order = mongoose.model('Menu', orderSchema);
module.exports = Order;
