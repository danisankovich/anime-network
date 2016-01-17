var mongoose = require('mongoose');

var Event = Mongoose.schema({
  creatorId: String,
  creatorPhone: String, //optional
  creatorEmail: String, //optional as well. can have them contact through app as well
  attendeeId: {type: Array}, // array of objects. userId, have they paid, are they going, or only maybe going, etc.
  inviteeId: {type: Array}, // this is just an array. if they say yes, no, or maybe, they are removed from this list.
  privateBoolean: {type: Boolean}, //if checked, only users that exist in the inviteeId or attendeeId can see the page. Othewise they see a page that says they can redirect back to the app, or they can send a request for an invite.
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
  usefulNotes: String,
  eventType: {type: String}, //dropdown list. there will be an Other as well which, wehn picked, opens up a input box that they can write in.
  address: {
    state: String,
    city: String,
    street: String,
    zip: String,
    addTwo: String //ex. apartment number, building number, floor, dorm, house, etc.
  },
  schedule: [{
    eventName: String,
    timeStart: {type: Date},
    timeEnd: {type: Date},
    host: {
      name: String,
      userBool: Boolean,
      userId: String,
      about: String,
      picture: String
    }, //just name or user id and name. If is user, they can pick it from the user selection. otherwise, they radio it as non-user
    description: String,
    ageRestriction: String,
    usefulNotes: String,
    location: String,
    entranceCap: Number, //max # of people?
    entranceMin: Number //min # of people?
  }],
  venuePhone: String, //not required.
  venueEmail: String, //also not required
  venueName: String,
  parking: {type: Boolean},
  adminPhotos: {type: Array}, //those added at creation or on event edit. only admin
  userPhotos: {type: Array}, //those added from the event page. anyone
  adminComments: {type: Array},
  userComments: {type: Array} //questions, reviews, asking if anyone else will be cosplaying, etc.
});

module.exports = Mongoose.model('Event', Event);
