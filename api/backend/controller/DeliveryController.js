var deliveryService = require('../service/DeliveryService')

class DeliveryController {
    getDeliveyOutlet (req, res,next) {


            deliveryService.getDeliveryOutlet("Stuly")
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                next(error)
            })
    }
}

module.exports = new DeliveryController();