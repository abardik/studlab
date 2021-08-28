ownsDocument = function(userId, doc) {
	return userId && doc.userId === userId;
};

ownsOrder = function(userId, doc) {
	return userId && doc.customerId === userId;
};
