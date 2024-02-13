import { Request, Response } from "express";
import userModel from "./../models/slider"

export function createSlider(req: Request, res: Response) {
  userModel.create({
    title: req.body.name_slider,
    description_image: req.body.description_image,
    image: req.body.image,
  })
  .then(function (result: any) {
    res.json(result);
  })
  .catch(function (error: any) {
    res.json({ error: error,  });
  });
}

export function updateSlider(req: Request, res: Response) {
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
  .then(function (result: any) {
    res.json({
      message: `Berhasil Update data ${result}`,
    });
  })
  .catch(function (error: any) {
    res.json({ error: error });
  });
     
}
