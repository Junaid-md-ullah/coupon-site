(function (banner_controller) {
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
      cb(null, "./public/images/banner");
    },

    // get group image file  resources

    filename: (req, file, cb) => {
      if (file != null) {
        var path = file.originalname;

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
    },
  });
  var upload = multer({
    //file storage object
    storage: storage,
  });
  const password = "qsJ322HFC2uHXu3I";

  var url = `mongodb+srv://dbUser:${password}@cluster0.zzeuc.mongodb.net/coupon?retryWrites=true&w=majority`;

  banner_controller.init = function (app) {
    app.post("/save_banner", upload.single("file"), function (req, res) {
      if (req.session.user) {
        if (req.file != null) {
          image = req.file.originalname;
        }

        MongoClient.connect(url, function (err, client) {
          var dbo = client.db("coupon");
          var path = "/images/banner/" + image;
          dbo.collection("banner", function (err, collection) {
            collection.insert({
              image: path,
            });
          });
        });

        return res.redirect("/admin/banners");
      } else {
        res.redirect("/admin/login.html");
      }
    });

    app.get("/admin/editbanner/:id?", (req, res, next) => {
      if (req.session.user) {
        var o_id = new ObjectId(req.query.id);
        var query = {
          _id: o_id,
        };
        MongoClient.connect(url, function (err, db) {
          var dbo = db.db("coupon");

          dbo
            .collection("banner")
            .find(query)
            .toArray(function (err, result) {
              if (err) throw err;
              res.render("editbanner", {
                banner: result,
              });
            });
        });
      } else {
        res.redirect("/admin/login.html");
      }
    });

    app.post("/edit_banner", upload.single("file"), function (req, res) {
      if (req.session.user) {
        var image = "";

        if (req.file != null) {
          image = req.file.originalname;
        }

        //  var pth = '';
        var o_id = new ObjectId(req.body.id);

        var query = {
          _id: o_id,
        };

        MongoClient.connect(url, function (err, db) {
          var dbo = db.db("coupon");

          dbo
            .collection("banner")
            .find(query)
            .toArray(function (err, result) {
              if (err) throw err;
              var pth = "public/" + result[0].image;

              fs.unlinkSync(pth);
              console.log(result);
            });
        });

        MongoClient.connect(url, function (err, client) {
          var dbo = client.db("coupon");
          var path = "/images/banner/" + image;
          dbo.collection("banner").update(
            {
              _id: o_id,
            },
            {
              $set: {
                image: path,
              },
            }
          );
        });

        return res.redirect("/admin/banners");
      } else {
        res.redirect("/admin/login.html");
      }
    });

    app.get("/admin/banners", function (req, res) {
      if (req.session.user) {
        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("coupon");

          dbo
            .collection("banner")
            .find()
            .toArray(function (err, result) {
              res.render("banners", {
                banner: result,
              });
              console.log(result);
            });
        });
      } else {
        res.redirect("/admin/login.html");
      }
    });

    app.post("/save_category", function (req, res) {
      if (req.session.user) {
        var name = req.body.name;

        MongoClient.connect(url, function (err, client) {
          var dbo = client.db("coupon");

          dbo.collection("categories", function (err, collection) {
            collection.insert({
              name: name,
            });
          });
        });

        return res.redirect("/admin/category");
      } else {
        res.redirect("/admin/login.html");
      }
    });

    app.get("/admin/category", function (req, res) {
      if (req.session.user) {
        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("coupon");

          dbo
            .collection("categories")
            .find()
            .toArray(function (err, result) {
              res.render("category", {
                category: result,
              });
              console.log(result);
            });
        });
      } else {
        res.redirect("/admin/login.html");
      }
    });

    app.get("/admin/editcategory/:id?", (req, res, next) => {
      if (req.session.user) {
        console.log("Hit" + req.query.id);

        var o_id = new ObjectId(req.query.id);
        var query = {
          _id: o_id,
        };
        MongoClient.connect(url, function (err, db) {
          var dbo = db.db("coupon");

          dbo
            .collection("categories")
            .find(query)
            .toArray(function (err, result) {
              if (err) throw err;
              res.render("editcategory", {
                category: result,
              });
              console.log(result);
            });
        });
      } else {
        res.redirect("/admin/login.html");
      }
    });

    app.post("/edit_category", function (req, res) {
      if (req.session.user) {
        var o_id = new ObjectId(req.body.id);

        MongoClient.connect(url, function (err, client) {
          var dbo = client.db("coupon");

          dbo.collection("categories").update(
            {
              _id: o_id,
            },
            {
              $set: {
                name: req.body.name,
              },
            }
          );
        });

        return res.redirect("/admin/category");
      } else {
        res.redirect("/admin/login.html");
      }
    });
    //junaid api
    app.post("/save_shop", upload.single("file"), function (req, res) {
      if (req.session.user) {
        if (req.file != null) {
          var image = req.file.originalname;
        }
        var name = req.body.name;
        let shopArray = [];

        let shopObject = {};
        if (
          req.body.coupon1 != null &&
          req.body.couponDetails &&
          req.body.moreDetails
        ) {
          shopObject.coupon = req.body.coupon1;
          shopObject.couponDetails = req.body.couponDetails;
          shopObject.moreDetails = req.body.moreDetails;
          shopArray.push(shopObject);
        }

        let shopObject2 = {};
        if (req.body.coupon2 != null && req.body.couponDetails2) {
          shopObject2.coupon = req.body.coupon2;
          shopObject2.couponDetails = req.body.couponDetails2;
          shopArray.push(shopObject2);
        }
        let shopObject3 = {};
        if (req.body.coupon3 != null && req.body.couponDetails3) {
          shopObject3.coupon = req.body.coupon3;
          shopObject3.couponDetails = req.body.couponDetails3;
          shopArray.push(shopObject3);
        }
        let shopObject4 = {};
        if (req.body.coupon4 != null && req.body.couponDetails4) {
          shopObject4.coupon = req.body.coupon4;
          shopObject4.couponDetails = req.body.couponDetails4;
          shopArray.push(shopObject4);
        }
        let shopObject5 = {};
        if (req.body.coupon5 != null && req.body.couponDetails5) {
          shopObject5.coupon = req.body.coupon5;
          shopObject5.couponDetails = req.body.couponDetails5;
          shopArray.push(shopObject5);
        }

        // var coupon1 = req.body.coupon1;
        // var couponDetails = req.body.couponDetails;

        MongoClient.connect(url, function (err, client) {
          var dbo = client.db("coupon");
          var path = "/images/banner/" + image;
          dbo.collection("shop", function (err, collection) {
            collection.insert({
              name: name,
              // coupon: [
              //   { coupon: coupon1, couponDetails: couponDetails },
              //   { coupon: coupon2, couponDetails: couponDetails2 },
              // ],
              coupon: shopArray,
              image: path,
            });
          });
        });

        return res.redirect("/admin/shop");
      } else {
        res.redirect("/admin/login.html");
      }
    });
    //test save coupon

    app.post("/save_coupon", function (req, res) {
      if (req.session.user) {
        var shop_id;
        var category_id;
        var coupon_code;
        var description;
        var validity;
        if (
          req.body.shop ||
          req.body.categories ||
          req.body.coupon_code ||
          req.body.description ||
          req.body.validity
        ) {
          shop_id = req.body.shop;
          category_id = req.body.categories;
          coupon_code = req.body.coupon_code;
          console.log(coupon_code);
          description = req.body.description;
          validity = req.body.validity;
        }

        // var coupon1 = req.body.coupon1;
        // var couponDetails = req.body.couponDetails;

        MongoClient.connect(url, function (err, client) {
          var dbo = client.db("coupon");
          dbo.collection("shop", function (err, collection) {
            collection.update(
              { _id: ObjectId(shop_id) },
              {
                $push: {
                  coupon: {
                    coupon: coupon_code,
                    couponDetails: description,
                    category: ObjectId(category_id),
                    validity: validity,
                  },
                },
              }

              // coupon: [
              //   { coupon: coupon1, couponDetails: couponDetails },
              //   { coupon: coupon2, couponDetails: couponDetails2 },
              // // ],
              // coupon: shopArray,
              // image: path,
            );
          });
        });

        return res.redirect("/admin/shop");
      } else {
        res.redirect("/admin/login.html");
      }
    });

    //junaid end

    app.get("/admin/shop", function (req, res) {
      if (req.session.user) {
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
              console.log(result);
            });
        });
      } else {
        res.redirect("/admin/login.html");
      }
    });

    app.get("/admin/editshop/:id?", (req, res, next) => {
      if (req.session.user) {
        console.log("Hit" + req.query.id);

        var o_id = new ObjectId(req.query.id);
        var query = {
          _id: o_id,
        };
        MongoClient.connect(url, function (err, db) {
          var dbo = db.db("coupon");

          dbo
            .collection("shop")
            .find(query)
            .toArray(function (err, result) {
              if (err) throw err;
              res.render("editshop", {
                shop: result,
              });
              console.log(result);
            });
        });
      } else {
        res.redirect("/admin/login.html");
      }
    });

    app.post("/edit_shop", function (req, res) {
      if (req.session.user) {
        var o_id = new ObjectId(req.body.id);
        console.log(req.body.coupon);
        console.log(req.body.couponDetails);

        MongoClient.connect(url, function (err, client) {
          var dbo = client.db("coupon");

          dbo.collection("shop").update(
            {
              _id: o_id,
            },
            {
              $set: {
                name: req.body.name,
                coupon: [
                  {
                    coupon: req.body.coupon,
                    couponDetails: req.body.couponDetails,
                  },
                ],
              },
            }
          );
        });

        return res.redirect("/admin/shop");
      } else {
        res.redirect("/admin/login.html");
      }
    });
  };
})(module.exports);
