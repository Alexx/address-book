function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
};

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

function Contact(firstName, lastName, phoneNumber, iq) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.iq = iq;
};

Contact.prototype.info = function() {
  return this.firstName + " " + this.lastName;
};
//clears the inputs when the button is pressed
function clearInputs() {
$("input:text[name=fNameInput]").val("");
$("input:text[name=lNameInput]").val("");
$("input:text[name=pNumberInput]").val("");
$("input:text[name=iqInput]").val("");
};

AddressBook.prototype.findContact = function(name) {
  for (var i = 0; i < this.contacts.length; i++) {
    if(this.contacts[i]) {
      if (this.contacts[i].firstName == name) {
        return this.contacts[i];
      }
    }
  };
  return false;
};

AddressBook.prototype.deleteContact = function(name) {
  for (var i = 0; i < this.contacts.length; i++) {
    if(this.contacts[i]) {
      if (this.contacts[i].firstName == name) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
};

var addressBook = new AddressBook();

$(document).ready(function() {
  $(".form").submit(function(event) {
    event.preventDefault();
    var firstName = $("input:text[name=fNameInput]").val();
    var lastName = $("input:text[name=lNameInput]").val();
    var phoneNumber = $("input:text[name=pNumberInput]").val();
    var iq = $("input:text[name=iqInput]").val();

    var currentContact = new Contact(firstName, lastName, phoneNumber, iq);
    clearInputs();

    addressBook.addContact(currentContact);
  });
});
