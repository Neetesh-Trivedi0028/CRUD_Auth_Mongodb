const router = require('express').Router();
const fieldcontroller = require('../controller/fieldcontroller');
const usercontroller = require('../controller/usercontroller');
router.route('/test/:id')
    .get(usercontroller.protect,fieldcontroller.getOneTrip)
    .patch(fieldcontroller.updateTrip)
    .delete(usercontroller.protect,fieldcontroller.deleteTrip);
router.route('/test')
    .post(fieldcontroller.createTrip)
    .get(usercontroller.protect,fieldcontroller.getTrip);
// routes for login and signup
router.route('/signup').post(usercontroller.signpup);
router.route('/login').post(usercontroller.login);
module.exports = router;