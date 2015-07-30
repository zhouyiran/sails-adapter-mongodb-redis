
# 参考sails-angularjs-mongodb-crud

A Simple CRUD with MEAN Stack (MongoDB, ExpressJS, AngularJS, Node.js) + Sails.js on Windows

See step by step tutorial:

http://techbrij.com/mongodb-angularjs-nodejs-sailsjs-crud-bower

# redis和mongodb适配器的配置

原有demo实例中，只提供mongodb适配器，为了验证redis同样适用，加入的sails-redis配置，并且引入的了bearcat容器框架。

## [connections](http://sailsjs.org/documentation/anatomy/my-app/config/connections-js) 说明


`connections.js`包括了应用的所有的适配器设置(sails-mongodb、sails-Redis、sails-mysql等），在sails中，适配器相当于应用和数据库之间的中间件抑或媒介，换句话说，它们作为<u>Waterline</u>的插件，sails使用它们与之数据库进行**沟通**。

### connections.js


```js
module.exports.connections = {
  Mongodb: {
    adapter: 'sails-mongo',
    host: '192.168.204.7',
    port: 27017,
    user: '',
    password: '',
    database: 'sampledb',
    poolSize:100
  },
  Redis: {
    adapter: 'sails-redis',
    port: 6379,
    host: '192.168.204.7',
    password: null,
    database: 2
  }
};
```
> connections.js允许你创建任何不同的全局的"saved setting",在模型对象可以让你去混合、匹配它们。**models.js**选项配置则表明，当使用一个model时，至少指定一个连接适配器。

### models.js
```js
module.exports.models = {
  connection: 'Mongodb'
}
```
此时，全局model则采用**Mongodb**的连接适配器(全局)，除非在`api/model/[modelName].js`覆盖掉默认的，否则，上面的属性配置将会在每个model中设置。
这意味着，我们可以采用在每个model中设置各自的适配器即能完成对不同适配器的选择设置，redis和mongodb的选择得以切换。

## model配置
在models目录下定义我们的模型对象Employee和EmployeeRedis

*employee.js*
```js
module.exports = {

  // mongodb
  attributes: {

    name: {
      type: "string",
      required: true,
      minLength: 2
    },
    email: {
      type: "email",
      required: "true",
      unique: false
    },
    phone: {
      type: "string",
      required: true
    }
  }
};
```
*EmployeeReis.js*

```js
module.exports = {

  connection: 'Redis',
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    data: {type: 'string'}

  }
};
```
> 此时Employee具备的Mongodb的适配器的能力(没有配置connection则采用默认models.js提供的）,EmployeeReis则可以操作redis了

## 控制层的最终使用

```js
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
```
> newEmployee函数使用Employee模型，指向mongodb故数据存储值Mongodb，而redisCreate则存储redis中
