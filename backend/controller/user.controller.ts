import jwt from "jsonwebtoken"
import userModel from '../models/user'
import bcrypt from 'bcrypt'
import { Request, Response } from "express"


export async function login(req: Request, res: Response) {
  //check user and pass 
  try {
    const user = await userModel.findOne({
      where: { username : req.body.username }
    })

    if(!user) {
      res.status(400).send(`user not found`)
      return
    }

    const getPassword = await req.body.password
    const conditionPassword = bcrypt.compareSync(getPassword, user.password)
    
    if(conditionPassword) {
      const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
      const tempUser = {id : user.id}
      const token = jwt.sign(tempUser, jwtSecretKey)

      user.dataValues['token'] = token
      res.status(200).send(user.dataValues) 
    } else {
      res.status(400).send(`password incoret`)
      return
    }
  } catch (error) {
    throw error
  }
}

export async function createUser(req: Request, res: Response) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
    userModel.create({
        username: req.body.username,
        password: hashedPassword,
    })
    .then(function (result: any) {
        res.json(result);
    })
    .catch(function (error: any) {
        res.json({ error: error });
    });
}

export async function getUser(req: Request, res: Response) {
  try {
    const user = await userModel.findOne({
      where: { id : req.params.id }
    })
    console.log(user)
    if(!user) {
      res.status(400).send(`user not found`)
      return
    }
  
    return user
  } catch (error) {
    throw error
  }

}

export function updateUser(req: Request, res: Response) {
  userModel.update(
    {
      username: req.body.username,
      password: req.body.password,
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