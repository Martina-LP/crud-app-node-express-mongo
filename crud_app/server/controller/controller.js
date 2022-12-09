let userDB = require("../model/model");

// Create and save new user
exports.create = (req, res) => {
  // Validate req
  if(!req.body) {
    res.status(400).send({ 
      message : "Content can't be empty!" 
    });
    return;
  };

  // New user
  const user = new userDB ({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
  });

  // Save user in the database
  user
  .save(user)
  .then(data => {
    // res.send(data)
    res.redirect("/add-user");
  })
  .catch(err => {
    res.status(500).send({ 
      message : err.message || "Some error occurred"
    });
  });
};

// Retrieve and return a single user / all users
exports.find = (req, res) => {
  if(req.query.id) {
    const id = req.query.id;

    userDB.findById(id)
      .then(data => {
        if(!data) {
          res.status(404).send({ 
            message : "Didn't find user with ID " + id 
          });
        } else {
          res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({ 
          message: "Error retrieving user with ID " + id
        });
      });

  } else {
    userDB.find()
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        res.status(500).send({ 
          message : err.message || "Some error occurred while retrieving user info" 
        });
      });
  };
};

// Update a new identified user by user ID
exports.update = (req, res) => {
  if(!req.body) {
    return res
      .status(400).send({ 
        message : "Data to update can't be empty!"
      });
};

const id = req.params.id;
userDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if(!data) {
        res.status(404).send({ 
          message : `Can't update user with ${id}. User not found!`
        })
      } else {
        res.send(data)
      };
    })
    .catch(err => {
      res.status(500).send({ 
        message : "Error updating user information"
      });
    });
};

// Delete a user with a specified user ID in the req
exports.delete = (req, res) => {
  const id = req.params.id;

  userDB.findByIdAndDelete(id)
    .then(data => {
      if(!data) {
        res.status(404).send({ 
          message : `Can't delete user with ID ${id}. Maybe ID is wrong`
        })
      } else {
        res.send({
          message : "User deleted successfully!"
        })
      };
    })
    .catch(err => {
      res.status(500).send({
        message: "Couldn't delete user with ID: " + id
      });
    });
};
