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
    const contact = await Contact.create(
        {name,email,phone}
    );
    res.status(201).json(contact);
});

//@desc Get contacts with id
//@route Get /api/contacts/:id
//@access public
const getContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("CContact not found")
    }
    res.status(200).json(contact);
});

//@desc Update contacts with id
//@route Put /api/contacts/:id
//@access public
const updateContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("CContact not found")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators:true
        }
    )
    res.status(200).json(updatedContact);
});

//@desc DElete contacts with id
//@route Delete /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    // if(!contact){
    //     res.status(404);
    //     throw new Error("Contact not found")
    // }
    // await contact.remove();
    res.status(200).json(contact);
});

 


module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact ,
    deleteContact};