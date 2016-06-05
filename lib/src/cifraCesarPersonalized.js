function CrpCsar() {}

var alphabetDown = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var alphabetUp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var lengthReplace = 3;


CrpCsar.prototype.cript = function(msg, length) {
    if (msg === undefined) {
        return null;
    }
    var addLengthResponse = '';
    if (length !== undefined) {
        lengthReplace = length;
        addLengthResponse = length;
    }

    var array = msg.split('');
    var response = '';
    for (var index in array) {
        response += helper.convertLetter(array[index]);
    }
    return response + addLengthResponse;
};

CrpCsar.prototype.decript = function() {
	return null;
};

var helper = {
	convertLetter: function(letter) {
	    if (letter === ' ') {
	        return ' ';
	    }
	    var alphabet = alphabetDown;
	    var letterPosition = alphabet.indexOf(letter);

	    if (letterPosition === -1) {
	        alphabet = alphabetUp;
	        letterPosition = alphabet.indexOf(letter);
	    }
	    return alphabet[helper.reduceLetterPosition(letterPosition)];
	},
	reduceLetterPosition: function(position) {
	    var alphabetLength = alphabetUp.length;
	    var response = position + lengthReplace;

	    if (response > alphabetLength) {
	        response = response - alphabetLength;
	    }
	    return response;		
	}
};

module.exports = CrpCsar;