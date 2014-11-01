var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var List = mongoose.model('List');

/* GET home page. */
router.get('/', function(req, res) {
	res.redirect('/list');
});


router.get('/list', function(req, res){
	List.find({}, function(err, list){
		//console.log(list);
		res.render('index', {title: 'test', List:list});
	});
});
router.get('/list/create', function(req, res){
	res.render('create');
});
/*
router.get('/item/create', function(req,res){

	console.log('test2');
	res.redirect('/list');
});
*/
router.post('/list/create', function(req, res){
	console.log(req.body.name);
	var test  = new List({
		name: req.body.name,
		createdBy: req.body.createdBy,
		//items: [{'name':'lasersw','quantity':10,'checked':false},{'name':'bugaboo', 'quantity':15, 'checked':true}],
	});
	test.save(function(err, list){
		console.log('NEW LIST: '+test.slug);
		res.redirect('/list/'+test.slug);
	});
});
router.get('/list/:slug', function(req,res){
	console.log(req.params.slug)	
	List.findOne({'slug' : req.params.slug}, function(err, list){
		//console.log("SLUG LIST",list);
		res.render('truelist' , {items: list.items});
	});
});

router.post('/list/:slug', function(req, res){
	console.log("which submit was checked? newitem? " + req.body.newitem + " or checker? " + req.body.checker);
	if(req.body.newitem != undefined){
		List.findOneAndUpdate({'slug' : req.params.slug}, {$push : {items:{name:req.body.s_item ,quantity:req.body.quantity, checked:false}}},function(err, list){
			//list.items.push({name:req.body.s_item, quantity:req.body.quantity, checked:false});
			//console.log(list);
		});	
	}
	if(req.body.checker != undefined){
		List.findOne({'slug': req.params.slug}, function(err, list, count){
			for(var i = 0; i < list.items.length; i++){
				console.log(document.getElementById("testa").checked);
			}
			list.save(function(err, mod, count){
				console.log(err, mod);
			});
			//console.log("TESTA",req.body.testa);
		});
	}
	console.log("here");
	
	res.redirect('/list/'+req.params.slug);
});
module.exports = router;
