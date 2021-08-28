UI.registerHelper('isHandheld', function() {
	return isHandheld();
});


UI.registerHelper('resolution', function() {
	return $window.width()+'x'+$window.height();
});


UI.registerHelper('eq', function(v1, v2) {
	return v1==v2;
});


UI.registerHelper('neq', function(v1, v2) {
	return v1!=v2;
});


UI.registerHelper('gt', function(v1, v2) {
	return v1>v2;
});


UI.registerHelper('gte', function(v1, v2) {
	return v1>=v2;
});


UI.registerHelper('lt', function(v1, v2) {
	return v1<v2;
});


UI.registerHelper('lte', function(v1, v2) {
	return v1<=v2;
});


UI.registerHelper('and', function(v1, v2) {
	return v1 && v2;
});


UI.registerHelper('or', function(v1, v2) {
	return v1 || v2;
});


UI.registerHelper('not', function(v1) {
	return !v1;
});


UI.registerHelper('concat', function(v1, v2) {
	return v1+v2;
});


UI.registerHelper('photoPath', function() {
	return '';
	//return '/img/';
});


UI.registerHelper('localDateTime', function(t) {
	return new Date(t).toLocaleString();
});


UI.registerHelper('localDate', function(t) {
	return new Date(t).toLocaleDateString();
});


UI.registerHelper('getT9nList', function(list) {
	var items = [];
	$.each(getT9nList(list), function(value, text) {
		items.push({ value: value, text: text });
	})
	return items;
});


UI.registerHelper('getT9nListItem', function(list, value) {
	return getT9nListItem(list, value);
});
