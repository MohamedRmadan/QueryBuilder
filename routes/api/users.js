const express = require("express");
const router = express.Router();

const User = require("../../models/User");

// =--------==-------------==----//
// USER APIS
// =--------==-------------==----//

// @route GET api/users
// @desc Get all users
// @access PUBLIC
router.get("/", async (req, res) => {
  try {
    //CONVERT QUERY TO MONGO QUERY
      const query = JSON.parse(req.query.query);
      if (query && query.rules && query.rules.length > 0) {
      let mongoQuery = [];
      query.rules.map((rule) => {
        const field = rule.field;
        let value = rule.value;
        const operator = rule.operator;
        if (field === "age") {
          value = parseInt(value);
        }
        switch (operator) {
          case "=":
            mongoQuery.push({
              [field] : { $regex: new RegExp("^" + value + "$", "i") }
            })
            break;
          case "!=":
            mongoQuery.push({
              [field] : { $ne: value }
            })
            break;
          case ">":
            mongoQuery.push({
              [field] : { $gt: value }
            })
            break;
          case "<":
            mongoQuery.push({
              [field] : { $lt: value }
            })
            break;
          case "startsWith":
            mongoQuery.push({
              [field] :  {$regex: new RegExp("^" + value, "i") }
            })
            break;
          case "endsWith":
            mongoQuery.push({
              [field] : { $regex: new RegExp(value + "$", "i") }
            })
            break;
          case "contains":
            mongoQuery.push({
              [field] : { $regex: new RegExp(value, "i") }
            })
            break;
          case "exact":
            mongoQuery.push({
              [field] : {$eq: value}
            })
            break;
          default:
            break;
        }
      });
      //GET USERS USING MONGO QUERY
      const users = await User.find({[query.combinator]:mongoQuery}).sort({'number_of_messages' : -1});
      //RETURN ERROR IF NOTHING RETURNED
      if (!users) throw Error("No user exist");
      //RETURN USERS
      res.json(users);
    } else {
      //IN CASE IF NO QUERY SENT
      const users = await User.find().sort({'number_of_messages' : -1});
      //RETURN ERROR IF NOTHING RETURNED
      if (!users) throw Error("No user exist");
      //RETURN USERS
      res.json(users);
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route POST api/users
// @desc Add new user
// @access PUBLIC
router.post("/", async (req, res) => {
  try {
    //CREATE USER JSON
    const {
      first_name,
      last_name,
      full_name,
      gender,
      number_of_messages,
      age,
      creation_date
    } = req.body;
    const newUser = new User({
      first_name: first_name,
      last_name: last_name,
      full_name: full_name,
      gender: gender,
      number_of_messages: number_of_messages,
      age: age,
      creation_date: creation_date
    });
    //SAVE USER 
    const savedUser = await newUser.save();
    //RETURN ERROR IF NOTHING RETURNED
    if (!savedUser) throw Error("Something went wrong saving the user");

    //RETURN USERS
    return res.status(200).json({ user: savedUser });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;

