describe("cifraCesar", function() {

	var CrpCsar = require('../../lib/src/cifraCesarPersonalized');
	var crpCsar;

	beforeEach(function() {
		crpCsar = new CrpCsar();
	});

	it("retornar NULL quando não enviar parâmetro", function() {
		expect(crpCsar.cript()).toEqual(null);
	});

	it('quando enviar letra A no primeiro parâmentro, retornar D', function() {
		expect(crpCsar.cript('A')).toEqual('D');
	});
});