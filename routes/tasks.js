var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://leo:Lt171392@ds117251.mlab.com:17251/website_leonel', ['tasks']);

//Get All Tasks
router.get('/tasks', function(req, res, next){
	db.tasks.find(function(err, tasks){
		if(err){
			res.send(err);
		}
		res.json(tasks);
	});
});

//Get Single Tasks
router.get('/task/:id', function(req, res, next){
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});
});

//Save Tasks
router.post('/task', function(req, res, next){
	var task = req.body;
		if(!task.title || (task.isDone + ' ')){
			res.status(400);
			res.json({
				"error": "Bad Data"
			});
		} else{
			db.tasks.save(task, function(err, task){
				if(err){
			res.send(err);
		}
		res.json(task);
			});
		}
});

//Delete Task
router.delete('/task/:id', function(req, res, next){
	db.tasks.remove(function(err, tasks){
		if(err){
			res.send(err);
		}
		res.json(tasks);
	});
});

//Update Task
router.put('/task/:id', function(req, res, next){
	var task = req.body;
	var updTask = {}
	
	if(task.isDone){
		updTask.isDone = task.isDone;
	}
	if(task.title){
		updTask.title = task.title;
	}	
	
	if(!updTask){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
		
	}else{
		db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	
		});	
	
	}
	
});

module.exports = router;