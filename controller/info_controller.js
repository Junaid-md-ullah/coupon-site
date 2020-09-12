(function(info_controller) {
  const http = require("http");
  const express = require("express");
  const path = require("path");
  const cors = require("cors");
  const bodyParser = require("body-parser");
  var ObjectId = require("mongodb").ObjectId;
  const app = express();
  const fs = require('fs');
  var MongoClient = require("mongodb").MongoClient;
  app.use(bodyParser.json());
  var multer = require("multer");
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/team");
    },

    // get group image file  resources

    filename: (req, file, cb) => {
      if (file != null) {
var path=file.originalname;

        console.log("File :" + path);
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
        cb(null, path);
      }
    }
  });
  var upload = multer({
    //file storage object
    storage: storage
  });
  var url = "mongodb://127.0.0.1:27017/";

  team_controller.init = function(app) {
   
    app.post("/save_info", upload.single("file"), function(req, res) {
      if (req.session.user) {

      if (req.file != null) {
        image = req.body.file.originalname;
      }


      MongoClient.connect(url, function(err, client) {
        var dbo = client.db("coupon");
        var path="/images/team/"+image;
        dbo.collection("info", function(err, collection) {
          collection.insert({
            name: req.body.name,
            email: req.body.post,
            title: req.body.title,
            address: req.body.address,
            image: path
          });
        });
      });

      return res.redirect("/admin/info");
    } else {

      res.redirect("/admin/login.html");
    }
    });

    app.get("/admin/info", function(req, res) {

      if (req.session.user) {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("coupon");

        dbo
          .collection("info")
          .find()
          .toArray(function(err, result) {
            res.render("info", {
              info: result
            });
          });
      });
    } else {

      res.redirect("/admin/login.html");
    }
    });

    app.get("/admin/editinfo/:id?", (req, res, next) => {
      if (req.session.user) {
      

      var o_id = new ObjectId(req.query.id);
      var query = {
        _id: o_id
      };
      MongoClient.connect(url, function(err, db) {
        var dbo = db.db("coupon");

        dbo
          .collection("info")
          .find(query)
          .toArray(function(err, result) {
            if (err) throw err;
            res.render("editinfo", {
              info: result
            });
            console.log(result);
          });
      });
    } else {

      res.redirect("/admin/login.html");
    }
    });

    app.post("/edit_info",upload.single("file"),  function(req, res) {
      if (req.session.user) {
        var image='';
      if (req.file != null) {
        image = req.file.originalname;
      }
      var pth = '';

      var o_id = new ObjectId(req.body.id);

      var query = {
        _id: o_id
      };


      MongoClient.connect(url, function (err, db) {
        var dbo = db.db("coupon");

        dbo
          .collection("info")
          .find(query)
          .toArray(function (err, result) {
            if (err) throw err;
            var pth = "public/"+result[0].image;

            fs.unlinkSync(pth);
         
          });
      });

      MongoClient.connect(url, function(err, client) {
        var dbo = client.db("coupon");
        var path = "/images/team/" + image;
        dbo.collection("info").update(
          {
            _id: o_id
          },
          {
            $set: {
              name: req.body.name,
              email: req.body.post,
              title: req.body.title,
              address: req.body.address,
              image: path
            }
          }
        );
      });

      return res.redirect("/admin/info");
    } else {

      res.redirect("/admin/login.html");
    }
    });

  };
})(module.exports);
