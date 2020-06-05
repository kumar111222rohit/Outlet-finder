var express = require('express');
var router = express.Router();
var deliveryController=require('../controller/DeliveryController')


class Api{
  constructor(){
    router.get('/outlet', deliveryController.getDeliveyOutlet.bind(deliveryController));
return router;
  }
}

module.exports = new Api();
