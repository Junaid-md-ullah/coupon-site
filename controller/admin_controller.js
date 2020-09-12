(function (admin_controller) {
  const http = require("http");
  const express = require("express");
  var session = require("express-session");
  var cookieParser = require("cookie-parser");
  const path = require("path");
  const cors = require("cors");
  const bodyParser = require("body-parser");
  var ObjectId = require("mongodb").ObjectId;
  const app = express();
  const fs = require("fs");
  var MongoClient = require("mongodb").MongoClient;

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  var multer = require("multer");
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../views/images");
    },

    // get group image file resources

    filename: (req, file, cb) => {
      if (file != null) {
        console.log("File :" + file);
        var filetype = "";
        if (file.mimetype === "image/gif") {
          filetype = "gif";
        }
        if (file.mimetype === "image/png") {
          filetype = "png";
        }
        if (file.mimetype === "image/jpeg") {
          filetype = "jpg";
        }
        cb(null, file.originalname);
      }
    },
  });
  var upload = multer({
    //file storage object
    storage: storage,
  });

  const password = "qsJ322HFC2uHXu3I";

  var url = `mongodb+srv://dbUser:${password}@cluster0.zzeuc.mongodb.net/coupon?retryWrites=true&w=majority`;

  admin_controller.init = function (app) {
    app.post("/signin", function (req, res) {
      if (req.session.user) {
        var name = req.body.name;
        var email = req.body.email;
        var pass = req.body.password;

        MongoClient.connect(url, function (err, client) {
          var dbo = client.db("coupon");

          dbo.collection("admin", function (err, collection) {
            collection.insert({
              name: name,
              email: email,
              password: pass,
            });
          });
        });

        return res.redirect("login.html");
      } else {
        res.redirect("/admin/login.html");
      }
    });

    app.get("/admin/panel", function (req, res) {
      if (req.session.user) {
        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("coupon");

          dbo
            .collection("admin")
            .find()
            .toArray(function (err, result) {
              res.render("panel", {
                admin: result,
              });
              console.log(result);
            });
        });
      } else {
        res.redirect("/admin/login.html");
      }
    });

    app.get("/admin/editpanel/:id?", (req, res, next) => {
      if (req.session.user) {
        console.log("Hit" + req.query.id);

        var o_id = new ObjectId(req.query.id);
        var query = {
          _id: o_id,
        };
        MongoClient.connect(url, function (err, db) {
          var dbo = db.db("coupon");

          dbo
            .collection("admin")
            .find(query)
            .toArray(function (err, result) {
              if (err) throw err;
              res.render("editpanel", {
                admin: result,
              });
              console.log(result);
            });
        });
      } else {
        res.redirect("/admin/login.html");
      }
    });

    app.post("/edit_panel", function (req, res) {
      if (req.session.user) {
        console.log("Hit 2" + req.body.id);

        var o_id = new ObjectId(req.body.id);

        MongoClient.connect(url, function (err, client) {
          var dbo = client.db("coupon");

          dbo.collection("admin").update(
            {
              _id: o_id,
            },
            {
              $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
              },
            }
          );
        });

        return res.redirect("/admin/panel");
      } else {
        res.redirect("/admin/login.html");
      }
    });

    app.post("/deleteadmin", function (req, res) {
      if (req.session.user) {
        var o_id = new ObjectId(req.body.id);

        MongoClient.connect(url, function (err, client) {
          var dbo = client.db("coupon");

          dbo.collection("admin").remove(
            {
              _id: o_id,
            },
            1
          );
        });

        return res.redirect("/admin/panel");
      } else {
        res.redirect("/admin/login.html");
      }
    });
    app.post("/login", function (req, res) {
      var query = {
        name: req.body.name,
      };

      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("coupon");

        dbo
          .collection("admin")
          .find(query)
          .toArray(function (err, result) {
            if (err) throw err;
            // console.log("pass"+ req.body.password + result[0].password)
            // if (result.password === req.body.password) {

            //    req.session.log = true;
            req.session.user = req.body.name;

            console.log("Name" + req.session.user);
            res.redirect("/admin/dashboard.html");
            // } else {

            //   res.redirect("/admin/login");

            // }
          });
      });
    });

    app.get("/admin/login", function (req, res) {
      res.render("login", {
        message: "error",
      });
    });

    app.get("/logout", (req, res) => {
      res.clearCookie("key");
      //  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
      res.redirect("/admin/login.html");
    });
    app.post("/registration", function (req, res) {
      if (req.session.user) {
        var name = req.body.name;
        var email = req.body.email;
        var pass = req.body.password;

        MongoClient.connect(url, function (err, client) {
          var dbo = client.db("coupon");

          dbo.collection("customer", function (err, collection) {
            collection.insert({
              name: name,
              email: email,
              password: pass,
              favourite: favourite,
            });
          });
        });

        return res.redirect("login.html");
      } else {
        res.redirect("/admin/login.html");
      }
    });
    app.post("/customer_login", function (req, res) {
      var query = {
        name: req.body.name,
      };

      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("coupon");

        dbo
          .collection("customer")
          .find(query)
          .toArray(function (err, result) {
            if (err) throw err;

            if (result[0].password === req.body.password) {
              //    req.session.log = true;
              req.session.user = req.body.name;

              console.log("Name" + req.session.user);
              res.redirect("/admin/dashboard.html");
            } else {
              res.redirect("/admin/login");
            }
          });
      });
    });

    app.get("/admin/customers", function (req, res) {
      console.log("result fgfdhdfgh");
      if (req.session.user) {
        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("coupon");

          dbo
            .collection("customer")
            .find()
            .toArray(function (err, result) {
              res.render("customers", {
                customers: result,
              });
              console.log(result);
            });
        });
      } else {
        res.redirect("/admin/login.html");
      }
    });

    app.post("/deletecustomer", function (req, res) {
      if (req.session.user) {
        var o_id = new ObjectId(req.body.id);

        MongoClient.connect(url, function (err, client) {
          var dbo = client.db("coupon");

          dbo.collection("customer").remove(
            {
              _id: o_id,
            },
            1
          );
        });

        return res.redirect("/admin/panel");
      } else {
        res.redirect("/admin/login.html");
      }
    });
  };
})(module.exports);
