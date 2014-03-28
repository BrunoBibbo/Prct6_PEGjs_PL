var assert = chai.assert;
 
 suite('Pruebas: ', function() {
    
    test('Suma: ', function(){
    object = pl0.parse("x = 12 + 7 .")
    assert.equal(object.block.st.right.type, "+")
  });

 });