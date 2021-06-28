const express = require ('express');

const recordsController = require ('../controllers/recordsController');

const router = express.Router();

router.get('/records/:sortType', recordsController.getRecords);

router.post('/records/', recordsController.postRecords);

module.exports = router;