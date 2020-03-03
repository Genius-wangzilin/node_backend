const express = require('express');
const router=express.Router();
const Agent = require('../models/agent');

//mounting handlers
router.get("/agents", function(req,res,next){
        console.log('GET received');
        if (!req.body.category) {
            console.log("Category field needed");
            res.send("GET denied, request needs a category field!");
        }

        Agent.findOne({available: true, category: req.body.category},{available:false},function(err,agent){
            if(!agent) {
                res.send("No agents found, sorry!")
            } else {
                res.send(agent);
            }
        }).catch(next);
});

router.post("/agents", function(req,res,next){
    console.log('POST received');
    Agent.create(req.body).then(function(agent){
        res.send(agent);
    }).catch(next);
});

router.put("/agents/:id", function(req,res){
    console.log('PUT received');
    Agent.updateOne({_id:req.params.id}, req.body).then(function(agent){
        res.send(agent)
    });
});

router.delete("/agents/:id", function(req,res,next){
    console.log('DELETE received');
    res.send({type:"DELETE"});
});

router.get("/agentsf", function(req,res,next){
    console.log('REACTIVATE received');
    if (!req.body.category) {
        console.log("Category field needed");
        res.send("REACTIVATE denied, request needs a category field!");
    }

    Agent.findOne({available: false, category: req.body.category},{available:true},function(err,agent){
        if(!agent) {
            res.send("No agents found, sorry!")
        } else {
            res.send(agent);
        }
    }).catch(next);
});

module.exports = router;



