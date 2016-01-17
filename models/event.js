var mongoose = require('mongoose');

var Event = Mongoose.schema({
  creatorId: String,
  creatorPhone: String, //optional
  creatorEmail: String, //optional as well. can have them contact through app as well
  attendeeId: {type: Array},
  likes: {type: Number, default: 0},
  pendingOtherHosts: {type: Array}, //when you add people they go here first. they get a notification and have to accept from there.
  otherHosts: {type: Array}, //ID of other people involved with making the event. Picked from Friends list. if they accept, they can add their contact info if they like
  title: {type: String, required: true},
  dateCreated: {type: Date, default: Date.now},
  eventDate: {type: Date, required: true},
  recurring: {type: Boolean, default: false},//doing this will put it in an archived section and a completed section. if false, it will just go to completed section. There will be a counter for how many times the time has passed. All will be stored in creator's events as well and those who attended it.
  iteration: {type: Number}, //this will mark what number the event is on (second time taking place, 2)
  priceBoolean: {type: Boolean},
  price: {type: Number, default: 0.00},
  rules: {type: Array}, //rules attendees have to follow. ex. weapon props allowed?. Array for styling purposes. do input boxes. add after each one
  ageRestriction: {type: String}, //pg-13, family, adult, etc
  idRequired: {type: Boolean}, //do participants have to bring ID.
  cashOnly: {type: Boolean},
  description: {type: String, required: true},
  eventType: {type: String}, //dropdown list. there will be an Other as well which, wehn picked, opens up a input box that they can write in.
  address: {
    state: String,
    city: String,
    street: String,
    zip: String,
    addTwo: String //ex. apartment number, building number, floor, dorm, house, etc.
  },
  venuePhone: String, //not required.
  venueEmail: String, //also not required
  venueName: String,
  parking: {type: Boolean},
  adminPhotos: {type: Array}, //those added at creation or on event edit. only admin
  userPhotos: {type: Array} //those added from the event page. anyone
});
