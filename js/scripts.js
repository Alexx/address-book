// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  // Code below here is new!
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})

// function AddressBook() {
//   this.contacts = [];
//   this.currentId = 0;
// };
//
//
// AddressBook.prototype.addContact = function(contact) {
//   contact.id = this.assignId();
//   this.contacts.push(contact);
// };
//
// AddressBook.prototype.assignId = function() {
//   this.currentId += 1;
//   return this.currentId;
// }
//
// function Contact(firstName, lastName, phoneNumber, iq) {
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.phoneNumber = phoneNumber;
//   this.iq = iq;
// };
//
// Contact.prototype.info = function() {
//   return this.firstName + " " + this.lastName;
// };
// //clears the inputs when the button is pressed
// function clearInputs() {
// $("input:text[name=fNameInput]").val("");
// $("input:text[name=lNameInput]").val("");
// $("input:text[name=pNumberInput]").val("");
// $("input:text[name=iqInput]").val("");
// };
//
// AddressBook.prototype.findContact = function(name) {
//   for (var i = 0; i < this.contacts.length; i++) {
//     if(this.contacts[i]) {
//       if (this.contacts[i].firstName == name) {
//         return this.contacts[i];
//       }
//     }
//   };
//   return false;
// };
//
// AddressBook.prototype.deleteContact = function(name) {
//   for (var i = 0; i < this.contacts.length; i++) {
//     if(this.contacts[i]) {
//       if (this.contacts[i].firstName == name) {
//         delete this.contacts[i];
//         return true;
//       }
//     }
//   };
//   return false;
// };
//
// var addressBook = new AddressBook();
//
// $(document).ready(function() {
//   $(".form").submit(function(event) {
//     event.preventDefault();
//     var firstName = $("input:text[name=fNameInput]").val();
//     var lastName = $("input:text[name=lNameInput]").val();
//     var phoneNumber = $("input:text[name=pNumberInput]").val();
//     var iq = $("input:text[name=iqInput]").val();
//
//     var currentContact = new Contact(firstName, lastName, phoneNumber, iq);
//     clearInputs();
//
//     addressBook.addContact(currentContact);
//     $(".output").append(currentContact.info() + "<br>");
//   });
// });
