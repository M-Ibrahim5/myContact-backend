const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route Get /api/contacts
//@access private
const getContacts = asyncHandler(async(req,res) => {
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts);
});

//@desc Create all contacts
//@route Post /api/contacts
//@access private
const createContact = asyncHandler(async(req,res) => {
    // console log the body that we get from client
    console.log(`The request body is: ${JSON.stringify(req.body)}`);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All firlds are mendatory");
    }
    const contact = await Contact.create(
        {
            name,
            email,
            phone,
            user_id: req.user.id
        }
    );
    res.status(201).json(contact);
});

//@desc Get contacts with id
//@route Get /api/contacts/:id
//@access private
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
//@access private
const updateContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("CContact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You are not authorized to update this contact")
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
//@access private
const deleteContact = asyncHandler(async(req,res) => {
    //const contact = await Contact.findByIdAndDelete(req.params.id);
    const contact = await Contact.findById(req.params.id);
     
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You are not authorized to delete this contact")
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
});



module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact ,
    deleteContact};