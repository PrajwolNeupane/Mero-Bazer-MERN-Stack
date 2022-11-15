import User from '../Model/UserModel.js';

  const checkValidUser = async (req, res, next) => {

a
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ "message": 'User already registered', "code": 400 });
    next();

}

export default checkValidUser;

