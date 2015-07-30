/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {
    res.view(null, {
      title: "Employee"
    });
  },
  test: function (req, res) {
    var test = req.query.test;
    //console.log(test);
    // 通过global获得容器对象
    var commentedJSON = global.test;
    //console.log(commentedJSON);
    var helloBearcat = commentedJSON.container.getBean('helloBearcat');
    helloBearcat.hello();
    res.json(helloBearcat);
  },
  newEmployee: function (req, res) {
    var name = req.query.name;
    var email = req.query.email;
    var phone = req.query.phone;
    console.log("get name:", req.query);

    var commentedJSON = global.test;
    var employeeBearcat = commentedJSON.container.getBean('employeeBearcat');
    var employee = {
      name: name,
      email: email,
      phone: phone
    };
    employeeBearcat.newEmployee(employee, function (err, data) {
      if (err) {
        res.json(err);
      } else {
        res.json({message: 'ok', data: JSON.stringify(data)})
      }
    });
  },
  redisCreate: function (req, res) {
    var commentedJSON = global.test;
    var employeeBearcat = commentedJSON.container.getBean('employeeBearcat');
    employeeBearcat.redisCreate();
  }
};
