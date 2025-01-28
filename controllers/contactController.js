const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route Get /api/contacts
//@access public
const getContacts = asyncHandler(async(req,res) => {
    const contacts = await Contact.find()
    res.status(200).json(contacts);
});

//@desc Create all contacts
//@route Post /api/contacts
//@access public
const createContact = asyncHandler(async(req,res) => {
    // console log the body that we get from client
    console.log(`The request body is: ${JSON.stringify(req.body)}`);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All firlds are mendatory");
    }
    res.status(201).json({ message: "Create new contacts" });
});

//@desc Get contacts with id
//@route Get /api/contacts/:id
//@access public
const getContact = asyncHandler(async(req,res) => {
    res.status(200).json({message: `Get the contact for id: ${req.params.id}`});
});

//@desc Update contacts with id
//@route Put /api/contacts/:id
//@access public
const updateContact = asyncHandler(async(req,res) => {
    res.status(200).json({message: `Update the contact for id: ${req.params.id}`});
});

//@desc DElete contacts with id
//@route Delete /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req,res) => {
    res.status(200).json({message: `Delete the contact for id: ${req.params.id}`});
});




module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact ,
    deleteContact};