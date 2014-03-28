var assert = chai.assert;
 
 suite('Pruebas: ', function() {
    
  test('Resta a izquierdas', function(){  
    var input = pl0.parse("A = 3 - 4 - 1.");
    assert.equal('[{"type":"=","left":{"type":"ID","value":"A"},"right":{"type":"-","left":{"type":"-","left":{"type":"NUM","value":3},"right":{"type":"NUM","value":4}},"right":{"type":"NUM","value":1}}}]', JSON.stringify(input));
  });

 });