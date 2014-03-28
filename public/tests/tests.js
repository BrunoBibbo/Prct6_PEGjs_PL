var assert = chai.assert;
 
 suite('Pruebas: ', function() {
    
  test('Suma', function(){  
    var input = pl0.parse("a = 5 + 8 + 2.");
    assert.equal('hola', JSON.stringify(input));
  });

  test('Resta a izquierdas', function(){  
    var input = pl0.parse("a = 7 - 2 - 5.");
    assert.equal('hola', JSON.stringify(input));
  });

  test('Multiplicación', function(){  
    var input = pl0.parse("a = 8 * 2 * 5.");
    assert.equal('hola', JSON.stringify(input));
  });

  test('División a izquierdas', function(){  
    var input = pl0.parse("a = 5 / 7 / 3.");
    assert.equal('hola', JSON.stringify(input));
  });

  test('Preferencia de operador - división', function(){  
    var input = pl0.parse("a = 4 + 2 / 2.");
    assert.equal('hola', JSON.stringify(input));
  });

  test('Preferencia de operador - multiplicación', function(){  
    var input = pl0.parse("a = 7 - 1 * 5.");
    assert.equal('hola', JSON.stringify(input));
  });

  test('Call', function(){  
    var input = pl0.parse("call prueba(24).");
    assert.equal('hola', JSON.stringify(input));
  });

  test('Program', function(){  
    var input = pl0.parse("const a=50, b=200;var x,y;z = 10.");
    assert.equal('hola', JSON.stringify(input));
  });

  test('If', function(){  
    var input = pl0.parse("if a>0 then a=20.");
    assert.equal('hola', JSON.stringify(input));
  });

  test('If - Else', function(){  
    var input = pl0.parse("if a>0 then a=20 else a=50.");
    assert.equal('hola', JSON.stringify(input));
  });

  test('While', function(){  
    var input = pl0.parse("while b>0 do b=b+1.");
    assert.equal('hola', JSON.stringify(input));
  });

  test('Procedure', function(){  
    var input = pl0.parse("procedure a;var a, v;a = 3;v = 4. ");
    assert.equal('hola', JSON.stringify(input));
  });

  test('Error de Sintaxis: ', function(){
    assert.throws(function() { pl0.parse("a = (5+4."); }, /Expected ")"/);
  });

 });