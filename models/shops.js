const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');

const shopSchema = new mongoose.Schema({
	username        : {
		type     : String,
		required : true,
		unique   : true
	},
	password        : {
		type : String
	},
	profileImageUrl : {
		type : String
	},
	menu            : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'Menu'
		}
	],
	orders          : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'Order'
		}
	]
});

shopSchema.plugin(passportLocalMongoose);

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
