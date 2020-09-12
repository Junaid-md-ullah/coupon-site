"use strict";

var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var MongoClient = require("mongodb").MongoClient;
var app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(function (req, res, next) {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  });
  next();
});
app.use(
  session({
    key: "user_id",
    secret: "allorsathi",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000000,
    },
  })
);

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var MongoClient = require("mongodb").MongoClient;
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.set("view engine", "ejs");
var admin_controller = require("./controller/admin_controller");
//var info_controller = require("./controller/info_controller");
var banner_controller = require("./controller/banner_controller");
const { ObjectId, ObjectID } = require("mongodb");
app.use(cors());

app.options("*", cors());
admin_controller.init(app);
//info_controller.init(app);
banner_controller.init(app);

// var url = "mongodb://127.0.0.1:27017/";
const password = "qsJ322HFC2uHXu3I";

var url = `mongodb+srv://dbUser:${password}@cluster0.zzeuc.mongodb.net/coupon?retryWrites=true&w=majority`;

app.get("/customer", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("web_portal");

    dbo
      .collection("customer")
      .find()
      .toArray(function (err, result) {
        res.render("customer", {
          customer: result,
        });
        console.log(result);
      });
  });
});

app.get("/team", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("web_portal");

    var back_list = [];
    var android_list = [];
    var graphics_list = [];
    var content_list = [];

    var editor_list = [];

    dbo
      .collection("team")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          if (result[i].post === "Back-End Developer") {
            back_list.push(result[i]);
          } else if (result[i].post === "Android Developer") {
            android_list.push(result[i]);
          } else if (result[i].post === "Graphics Designer") {
            graphics_list.push(result[i]);
          } else if (result[i].post === "Content Writer") {
            content_list.push(result[i]);
          } else if (result[i].post === "Content Editor") {
            editor_list.push(result[i]);
          }
        }
        if (back_list.length > 0) {
          res.render("team", {
            back: back_list,
            android: android_list,
            graphics: graphics_list,
            content: content_list,
            editor: editor_list,
          });
        }
      });
  });
});

app.get("/shop", function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("coupon");

    dbo
      .collection("shop")
      .find()
      .toArray(function (err, result) {
        res.render("shop", {
          shop: result,
        });
      });
  });
});

//test junaid

app.get("/", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log(err);
    var dbo = db.db("coupon");

    dbo
      .collection("shop")
      .find()
      .toArray(function (err, result) {
        res.render("index", {
          shops: result,
        });
        console.log(result[0].coupon[0].couponDetails);
        console.log(result);
      });
  });
});

app.get("/allStores", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log(err);
    var dbo = db.db("coupon");

    dbo
      .collection("shop")
      .find()
      .toArray(function (err, result) {
        res.render("allStores", {
          shops: result,
        });
        console.log(result[0].coupon[0].couponDetails);
        console.log(result);
      });
  });
});

app.get("/exclusiveCoupon", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log(err);
    var dbo = db.db("coupon");

    dbo
      .collection("shop")
      .find()
      .toArray(function (err, result) {
        res.render("exclusiveCoupon", {
          shops: result,
        });
        console.log(result[0].coupon[0].couponDetails);
        console.log(result);
      });
  });
});

// app.get("/shopCoupon", function (req, res) {
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log(err);
//     var dbo = db.db("coupon");

//     dbo
//       .collection("shop")
//       .find()
//       .toArray(function (err, result) {
//         res.render("shopCoupon", {
//           shops: result,
//         });
//         console.log(result[0].coupon[0].couponDetails);
//         console.log(result);
//       });
//   });
// });

app.get("/singleShop/:id?", function (req, res, next) {
  console.log("hit" + req.params.id);

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log(err);
    var dbo = db.db("coupon");

    dbo
      .collection("shop")
      .find({
        _id: ObjectId(req.params.id),
      })
      .toArray(function (err, result) {
        res.render("singleShop", {
          shop: result,
        });
        console.log(result);
      });
  });
});
app.get("/AllCategories", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log(err);
    var dbo = db.db("coupon");

    dbo
      .collection("coupons")
      .find()
      .toArray(function (err, result) {
        res.render("AllCategories", {
          coupons: result,
        });
      });
  });
});
//test junaid end

app.get("/category", function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("coupon");

    dbo
      .collection("category")
      .find()
      .toArray(function (err, result) {
        res.render("category", {
          category: result,
        });
      });
  });
});

app.get("/product_details/:model?", (req, res, next) => {
  var o_id = req.query.model;
  var query = {
    model: o_id,
  };
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db("web_portal");

    dbo
      .collection("product")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        res.render("product_details", {
          product_detail: result,
        });
      });
  });
});

app.get("/", function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("coupon");

    dbo
      .collection("banner")
      .find()
      .toArray(function (err, result) {
        res.render("index", {
          banner: result,
        });
        console.log(result);
      });
  });
});

app.get("/achivement/get", function (req, res, next) {
  try {
    if (req.headers.authorization == null) {
      res.status(500).json({
        code: 500,
        message: "Authorization Error",
      });
    } else {
      number(req.headers.authorization);
    }
  } catch (Exception) {
    res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

function number(auth) {
  Request.get(
    {
      url:
        "http://devallorshathiapi.azurewebsites.net//api/StudentModelTest/modelTestAchievements",
      headers: {
        Authorization: auth,
      },
    },
    function (error, response, body) {
      const user = JSON.parse(body);

      MongoClient.connect(url, function (err, client) {
        var result = 0;
        var point = 0;
        if (user.data != null) {
          for (var i = 0; i < user.data.length; i++) {
            point = +user.data[i].achievementAvg;
          }
        }

        result = point / user.data.length;

        var user = {
          user_name: user.data.name,
          point: result,
        };

        res.render("achivement", {
          achivement: user,
        });
      });
    }
  );
}

var port = process.env.PORT || 8081; // you can use any port
app.listen(port);
console.log("server on" + port);
