const router = require("express").Router();
const userController = require("../controller/user.controller");
const sliderController = require("../controller/slider.controller");
router.get("/user/:id", userController.getUser);


router.post("/login", userController.login);

router.post("/userCreate", userController.createUser);
router.post("/userUpdate", userController.updateUser);

router.post("/sliderCreate", sliderController.createSlider);
router.post("/sliderUpdate", sliderController.updateSlider);

module.exports = router;