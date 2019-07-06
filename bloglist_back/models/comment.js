const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
	content: String,
	blog: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog'
	}
})

commentSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		if (!returnedObject._id) { return }
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})
module.exports = mongoose.model('Comment', commentSchema)
