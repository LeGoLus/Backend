const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1 (Manager)
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// exports.forgot_password = (req, res) => {
//   User.findOne({
//     where: {
//       email: req.body.email
//     }
//   })
//     .then(user => {
//       if (user.email) {
//         return res.status(500).send({ message: "Please verify Email for reset password" });
//       }
//     })
//     .catch(err => {
//       res.status(404).send({ message: err.message });
//     });
// };

exports.forgot_password = (req, res) => {
      if (user.email == req.body.email) {
        return res.status(500).send({ message: "Please verify Email for reset password" });
      }
};

// exports.forgotPassword = (req, res) => {
//   const {email} = req.body;

//   User.findOne({email}, (err, user) => {
//     if(err || !user) {
//       return res.status(400).json({error: "User with this email does not exists"});
//     }

//     const token = jwt.sign({name, email, password}, process.env.JWT_ACC_ACTIVATE, {expiresIn: '20m'});
//     const data = {
//       from: 'noreply@hello.com',
//       to: email,
//       subject: 'Account Activation Link',
//       html:`
//             <h2>Please click on given link to activate you account</h2>
//             <p>${process.env.CLIENT_URL}/authentication/${token}</p>
//             `
//     };
//   })
// }