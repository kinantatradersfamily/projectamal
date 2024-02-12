const userModel = require("./../models/slider");

function createSlider(req, res) {
  userModel.create({
    title: req.body.name_slider,
    description_image: req.body.description_image,
    image: req.body.image,
  })
  .then(function (result) {
    res.json(result);
  })
  .catch(function (error) {
    res.json({ error: error });
  });
}
function updateSlider(req, res) {
  userModel.update(
  {
    title: req.body.title,
    description_image: req.body.description_image,
    image: req.body.image,
  },
  {
    where: {
      id: req.body.id,
    },
  }
)
  .then(function (result) {
    res.json({
      message: `Berhasil Update data ${result}`,
    });
  })
  .catch(function (error) {
    res.json({ error: error });
  });
     
}
  
module.exports = {
    createSlider,
    updateSlider
};
