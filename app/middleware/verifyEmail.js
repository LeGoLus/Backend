const db = require("../models");
// const ROLES = db.ROLES;
const User = db.user;

checkVerifyEmail = (req, res, next) => {
    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(email => {
      if (email) {
        res.status(200).send({
          message: "Please verify Email for reset password"
        });
        return;
      }
  

    next();
    });
}

const verifyEmail = {
    checkVerifyEmail: checkVerifyEmail
};

module.exports = verifyEmail;

// checkVerifyEmail = (req, res, next) => {
//     // Username
//     User.findOne({
//       where: {
//         username: req.body.username
//       }
//     }).then(user => {
//       if (user) {
//         res.status(400).send({
//           message: "Failed! Username is already in use!"
//         });
//         return;
//       }
  
//       // Email
//       User.findOne({
//         where: {
//           email: req.body.email
//         }
//       }).then(user => {
//         if (user) {
//           res.status(400).send({
//             message: "Failed! Email is already in use!"
//           });
//           return;
//         }
  
//         next();
//       });
//     });
//   };


