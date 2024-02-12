const userModel = require("./../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


async function login(req, res) {
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
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
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

async function createUser(req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
    userModel.create({
        username: req.body.username,
        password: hashedPassword,
    })
    .then(function (result) {
        res.json(result);
    })
    .catch(function (error) {
        res.json({ error: error });
    });
}

async function getUser(req, res) {
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

function updateUser(req, res) {
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
  login,
  createUser,
  updateUser,
  getUser
};
