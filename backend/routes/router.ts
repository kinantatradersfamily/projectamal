import * as userController from "../controller/user.controller";
import * as sliderController from "../controller/slider.controller";
import express from "express"

const router = express.Router()


router.get("/user/:id", userController.getUser);

router.post("/login", userController.login);

router.post("/userCreate", userController.createUser);
router.post("/userUpdate", userController.updateUser);

// router.post("/sliderCreate", sliderController.createSlider);
// router.post("/sliderUpdate", sliderController.updateSlider);

export default router