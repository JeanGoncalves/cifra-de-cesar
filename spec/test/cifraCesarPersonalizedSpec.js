describe("cifraCesar", function() {

	var CrpCsar = require('../../lib/dist/cifraCesarPersonalized.min');
	var crpCsar;

	beforeEach(function() {
		crpCsar = new CrpCsar();
	});

	describe('Criptografia', function() {
		it("verificando consistência da função crpCsar.cript()", function() {
			expect(crpCsar.cript()).toEqual(null);
		});

		it("validações para gerar criptografia enviando apenas a String", function() {
			expect(crpCsar.cript('A')).toEqual('D');
			expect(crpCsar.cript('B')).toEqual('E');
			expect(crpCsar.cript('CASA')).toEqual('FDVD');
			expect(crpCsar.cript('CASA azul')).toEqual('FDVD dcxo');
		});

		it("validações para gerar criptografia enviando String e Int", function() {
			expect(crpCsar.cript('A', 4)).toEqual('E4');
			expect(crpCsar.cript('CASA', 10)).toEqual('MKCK10');
		});
	});

	describe('Descriptografia', function() {
		it('verificando consistência da função crpCsar.decript()', function() {
			expect(crpCsar.decript()).toEqual(null);
		});
	});
});