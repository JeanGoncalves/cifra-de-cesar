describe("cifraCesar", function() {

	var CrpCsar = require('../../lib/dist/cifraCesarPersonalized.min');
	var crpCsar;

	beforeEach(function() {
		crpCsar = new CrpCsar();
	});

	describe('Criptografia com um parâmetro', function() {
		it("retornar NULL quando não enviar parâmetro", function() {
			expect(crpCsar.cript()).toEqual(null);
		});

		it('quando enviar letra "A" no primeiro parâmentro, retornar "D"', function() {
			expect(crpCsar.cript('A')).toEqual('D');
		});

		it('quando enviar letra "B" no primeiro parâmentro, retornar "E"', function() {
			expect(crpCsar.cript('B')).toEqual('E');
		});

		it('quando enviar a palavra "CASA" no primeiro parâmentro, retornar "FDVD"', function() {
			expect(crpCsar.cript('CASA')).toEqual('FDVD');
		});

		it('quando enviar a frase "CASA azul" no primeiro parâmentro, retornar "FDVD dcxo"', function() {
			expect(crpCsar.cript('CASA')).toEqual('FDVD');
		});
	});

});