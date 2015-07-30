var EmployeeBearcat = function () {
  this.$id = "employeeBearcat";
}

EmployeeBearcat.prototype.hello = function () {
  console.log('hello bearcat');
};

EmployeeBearcat.prototype.newEmployee = function (employee, callback) {
  Employee.create({
    name: employee.name,
    email: employee.email,
    phone: employee.phone
  }).exec(function (err, data) {
    if (err) {
      console.log(err);
      callback(err, data);
    } else {
      console.log('Employee new To Create return data %s', data);
      callback(null, data);
    }
  });
};

EmployeeBearcat.prototype.redisCreate = function () {
  var attributes = {
    data: 'Burning'
  };
  EmployeeRedis.create(attributes).exec(function (err, model) {
    try{
      if (err) throw err;
      console.log(JSON.stringify(model));
    }catch (e) {
      sails.log("Error (E_unkonw)::",e);
    }

  });
};


module.exports = EmployeeBearcat;
