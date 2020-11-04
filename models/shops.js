const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const shopSchema = new mongoose.Schema({
	name            : {
		type     : String,
		required : true,
		unique   : true
	},
	password        : {
		type     : String,
		required : true
	},
	about           : {
		type    : String,
		default : 'Food Joint in SRM Campus'
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

shopSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) {
			return next();
		}
		let hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		return next();
	} catch (err) {
		return next(err);
	}
});

shopSchema.methods.comparePassword = async function (candidatePassword, next) {
	try {
		let isMatch = await bcrypt.compare(candidatePassword, this.password);
		return isMatch;
	} catch (err) {
		return next(err);
	}
};

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
