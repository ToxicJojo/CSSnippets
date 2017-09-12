const express = require('express');
const controller = require('./../controller/header');

const router = express.Router();

router.get('/', controller.show);
router.get('/content', controller.showContent);

module.exports = router;
