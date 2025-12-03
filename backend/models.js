/**
 * BACKEND MODELS REFERENCE
 * Note: This code is intended for the Node.js backend server.
 * The frontend currently uses 'services/mockDb.ts' for the preview.
 */

const mongoose = require('mongoose');

// Team Member Schema
const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  imageUrl: { type: String }
});

// Event Schema
const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String }
});

// News/Post Schema
const NewsPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  imageUrl: { type: String },
  publishedAt: { type: Date, default: Date.now },
  category: { type: String }
});

module.exports = {
  TeamMember: mongoose.model('TeamMember', TeamMemberSchema),
  Event: mongoose.model('Event', EventSchema),
  NewsPost: mongoose.model('NewsPost', NewsPostSchema)
};
