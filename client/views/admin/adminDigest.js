Template.digestList.helpers({
	'digests' : function(){
		return Digests.find({}, {sort: {datePublished: -1}});
	}
});

Template.digestDetail.helpers({
	'digest' : function() {
		var digestId = this._id;
		return Digests.findOne(digestId);
	}
});

Template.digestDetail.events({
	'click #activateDigest': function(event) {
		event.preventDefault();

		var digestId = this._id;

		Digests.update(this._id, {$set: {isDraft:false}});
	},

	'click #deactivateDigest' : function(event) {
		event.preventDefault();

		var digestId = this._id;

		Digests.update(this._id, {$set: {isDraft:true}});
	},

	'click #deleteDigest' : function(event) {

		var digestId = this._id;

		Digests.remove(digestId);
	}
});

Template.digestAdd.events({
	'submit form': function(event, template) {

		event.preventDefault();

		var digestNumber = event.target.digestNumber.value;

		Digests.insert({
			digestNumber: digestNumber,
			datePublished: new Date(),
			isDraft: true 
		});

		Router.go('digestList');
	}

})