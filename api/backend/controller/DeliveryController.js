var deliveryService = require('../service/DeliveryService')

class DeliveryController {
    getDeliveyOutlet (req, res,next) {


            deliveryService.getDeliveryOutlet(req.query.place)
            .then(result => {
                res.send(JSON.stringify(result));
            })
            .catch(error => {
                res.send(JSON.stringify(error))
            })
    }
}

module.exports = new DeliveryController();