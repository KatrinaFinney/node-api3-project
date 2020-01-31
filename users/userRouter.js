const express = require('express');

const postDb = require("./../posts/postDb.js")

const db = require("./userDb.js")

const router = express.Router();

router.post('/', validateUser (req, res) => {
   const newUser = db.insert(req.body)
  if(newUser) {
   
    res.status(201).json(newUser)
  }
  else{
    res.status(500).json({errorMessage: "Error"})
  }
  // do your magic!
});

router.post('/:id/posts', validateUserId, validatePost , (req, res) => {
  const newPost = {...req.body, user_id: req.params.id}
  const success = postDb.insert({user_id:req.params.id, text: req.body.text})
  if (success){
    
    res.status(200).json(success)
    const addPost = postDb.insert(newPost)
    res.status(201).json(addPost)
  }
  else {
    res.status(500).json({ error: "ERROR"})
  }
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  const users = db.get()
  if (users) {
    
    res.status(200).json(users)
  }
  else{
    res.status(500).json({ error: "error"})
  }
});

router.get('/:id', a(req, res) => {
  const user =  db.getById(req.params.id)
  if(user) {
    
    res.status(200).json(user)
  }
  else{
    res.status(500).json({ error: "ERROR"})
  }
  // do your magic!
});

router.get('/:id/posts', validateUserId, (req, res) => {
 const posts = db.getUserPosts(req.params.id)
 if (posts) {
    
    res.status(200).json(posts)
  }
  else{
    res.status(500).json({ errorMessage: "error"})
  }
});

router.delete('/:id', validateUserId (req, res) => {
  // do your magic!
  
   const result = db.remove(req.params.id)
  if (result) {
   
    res.status(200).json({ status: `${result} deleted`})
  }
  else {
    res.status(500).json({ error: "error"})
  }


});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const newResult = db.getById(req.params.id)
  
  if (newResult) {
    db.update(req.params.id, {...req.body, id: req.params.id })
    
    res.status(200).json(newResult)
  }
  else {
    res.status(500).json({ error:"Error"})
  }




  // do your magic!
});

//custom middleware

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "not found"})
  } else if (!req.body.text){
    res.status(400).json({ message: "text not found"})
    res.status(400).json({ message: "missing post info"})
  } else if (!req.body.text) {
    res.status(400).json({ message: "text field required"})
  }
    else{
    next()
  }
  // do your magic!
}

function validatePostId(req, res, next) {
  const post =  db.getById(req.params.id)
  if (post){
    next()
  } else {
    res.status(400).json({message: "not found"})
  }
}
function validateUser(req, res, next) {
 if (!req.body) {
   res.status(400).json({ message: "missing user info"})
 } else if (!req.body.name) {
   res.status(400).json({ message: "Name field required"})
 }
 else{
   next()
 }
}


function validateUserId(req, res, next) {
 const user = db.getById(req.params.id)
 if (user) {
   next()
 } else {
   res.status(400).json({ message: "not found"})
   res.status(400).json({ message: "invalid user id"})
 }
 
 
 
  // do your magic!
}


module.exports = router;
