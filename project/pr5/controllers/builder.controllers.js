const mongoose = require("mongoose")
const multer = require("multer")
const Builder = require("../model/builder.model")
const fs = require("fs")
const path = require("path");


const homePage =async (req,res) => {
    const allBuilder = await Builder.find();
    return res.render("table",{allBuilder});
}

const addbuilderpage = (req,res) => {
    return res.render("form");
}

const editbuilderpage = (req,res) => {
    return res.render("edit");
}

const addBuilder = async (req, res) => {

    if (req.file) {
        // DB me relative path store karna BEST practice
        req.body.image = "/uploads/" + req.file.filename;
    }

    console.log(req.body); // yaha image path dikhega
    await Builder.create(req.body);

    return res.redirect("/");
};
``


const updateBuilder = async (req, res) => {

    const builderId = req.body.id;
    const oldBuilder = await Builder.findById(builderId);

    // ✅ SINGLE FILE → req.file
    if (req.file) {

        // delete old image
        if (oldBuilder.image) {
            const oldImagePath = path.join(__dirname, "..", oldBuilder.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // save new image path
        req.body.image = "/uploads/" + req.file.filename;
    }

    await Builder.findByIdAndUpdate(builderId, req.body);
    return res.redirect("/");
};



const deletebtn = async (req,res) => {
    console.log(req.params.id);
    const deletedBuilder =await Builder.findByIdAndDelete(req.params.id)
    fs.unlink(deletedBuilder.image, (err) => { })
    return res.redirect("/");
}

const editbtn = async (req,res) => {
    const builderId = await Builder.findById(req.params.id);
    console.log(req.params.id);
    
    return res.render("edit",{builderId}) 
}

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,"uploads/")
    },
    filename : (req,file,cb) => {
        cb(null, Date.now()+`-`+file.originalname)
    }
})

const upload = multer({storage})

module.exports = {homePage,editbuilderpage,addbuilderpage,addBuilder,deletebtn,editbtn,updateBuilder,upload}