function CrpCsar() {}

var alphabetDown = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var alphabetUp = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

CrpCsar.prototype.cript = function(msg) {
	if (msg === undefined) {
		return null;
	}

	var array = msg.split('');
	var response = '';
	for (var index in array) {
		var letterPosition = alphabetUp.indexOf(array[index]);
		response += alphabetUp[letterPosition + 3];
	}
	return response;
};

module.exports = CrpCsar;