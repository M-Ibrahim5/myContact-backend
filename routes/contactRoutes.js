const express = require("express");
const router = express.Router();
const {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

//this will be the route

//this will validate each login req, 
router.use(validateToken);

//get all contact use get request
router.route("/").get(getContacts);
// get 1 contact with id use get request
router.route("/:id").get(getContact);
//create new contact use post request
router.route("/").post(createContact);
// update 1 contact with id use put request
router.route("/:id").put(updateContact);
// Delete 1 contact with id use get request
router.route("/:id").delete(deleteContact);

// can also simplify like this:
//                  (get all contact)  (create new contact)
// router.route("/").get(getContacts).post(createContact);

//                    (get 1 contact)  (update contact)    (delete contact)
//router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;