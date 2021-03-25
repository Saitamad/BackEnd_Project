console.log('database Ready !');

const USE_DB = true;
const mongoose = USE_DB ? require("mongoose") : null;
const db = USE_DB ? mongoose.connection : null;

mongoose.connect('mongodb+srv://garnesj:garnesj@exviuscollections.faibn.mongodb.net/ExviusGame?retryWrites=true&w=majority"', {
	useNewUrlParser: true, 
	useUnifiedTopology: true
});

//const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('connected to database');
});


//  User Schema and Model definition 
const userSchema = new mongoose.Schema({ 
    username: {type: String, required: true, unique: true},
    password: {type:String, required: true},
});

//userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

//////////// MONGO DATABASE SET UP END ////////////////////


//////////// SIGNIN AND SIGNUP MANAGEMENT PROCESS /////////

Database = {};
database.isValidPassword = function(data,cb){
	User.find({username:data.username,password:data.password},function(err,res){
		if(res.length > 0)
			cb(true);
		else
			cb(false);
	});
}

database.isUserNameTaken = function(data,cb){
	User.find({username:data.username},function(err,res){
		if(res.length > 0)
			cb(true);
		else
			cb(false);
	});
}

database.addUser = function(data,cb){
	User.create({username:data.username,password:data.password, level:0, exp:0},function(err){
		cb();
	});
}