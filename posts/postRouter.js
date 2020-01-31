const express = require('express');

const db = require('./postDb')

const router = express.Router();

//router.get('/', (req, res) => {
  // do your magic!
  router.get('/',  (req, res) => {
    const resources = db.get()
    
    if (resources) { 
      res.status(200).json(resources)
    
    }else {
      res.status(500).json({ errorMessage: "error"})
    }

  });


//router.get('/:id', (req, res) => {
  // do your magic!
router.get('/:id', validatePostId, (req, res) => {
  const post = db.getById(req.params.id)
  
  if (post) {
     res.status(200).json(post)
  }
  else{
    res.status(500).json({errorMessage: "error"})
  }
});

//router.delete('/:id', (req, res) => {
  // do your magic!
router.delete('/:id', (req, res) => {
  const result = db.remove(req.params.id)
  
  if (result) {
    
res.status(200).json(result)
  }
  else{
    res.status(500).json({errorMessage: "error"})
  }
});

//router.put('/:id', (req, res) => {
  // do your magic!
router.put('/:id'. validatePostId,  (req, res) => {
  
  const result = db.update(req.params.id, req.body)
  if (result){
    res.status(200).json(result)
  }
  else{
    res.status(500).json({errorMessage: "error"})
  }
})

// custom middleware

 function validatePostId(req, res, next) {
 const post = db.getById(req.params.id)
 if (post){
   next()
 } else {
   res.status(400).json({ message: "not found"})
 }
}

module.exports = router;
