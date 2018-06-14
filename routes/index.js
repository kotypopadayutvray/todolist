var express = require('express');
var router = express.Router();
var someShit = {
  '1': {
    title: 'Express'
  },
  '2': {
    title: 'The Witcher'
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET page with ids */
// Test middleware
router.get('/:id', function(req, res, next) {
  let record = someShit[req.params.id];
  if (record) {
    res.render('test_id', { record: record });
  } else {
    res.status(404);
    res.render('404');
  }
});

module.exports = router;
