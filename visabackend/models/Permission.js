// const mongoose = require('mongoose');

// const permissionSchema = new mongoose.Schema({
//   key: { type: String, required: true, unique: true }, // e.g. 'enquiry:create'
//   name: { type: String, required: true },              // Human readable
//   description: { type: String }
// }, { timestamps: true });

// module.exports = mongoose.model('Permission', permissionSchema);

const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  }, // Human readable name of the permission

  description: { 
    type: String 
  } // Optional description
}, 
{ 
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Permission', permissionSchema);
