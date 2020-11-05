const mongoose = require('mongoose');
const Shop = require('./shops');

const menuSchema = new mongoose.Schema(
	{
		item      : {
			type     : String,
			required : true
		},
		price     : {
			type     : Number,
			required : true
		},
		available : {
			type    : Boolean,
			default : true
		},
		shop      : {
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'Shop'
		}
	},
	{
		timestamps : true
	}
);

menuSchema.pre('remove', async function (next) {
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

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
