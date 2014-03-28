var assert = chai.assert;
 
 suite('Pruebas: ', function() {
    
  test('Suma', function(){  
    var input = pl0.parse("a = 5 + 8 + 2.");
    assert.equal('[{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"+","left":{"type":"+","left":{"type":"NUM","value":5},"right":{"type":"NUM","value":8}},"right":{"type":"NUM","value":2}}}]', JSON.stringify(input));
  });

  test('Resta a izquierdas', function(){  
    var input = pl0.parse("a = 7 - 2 - 5.");
    assert.equal('[{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"-","left":{"type":"-","left":{"type":"NUM","value":7},"right":{"type":"NUM","value":2}},"right":{"type":"NUM","value":5}}}]', JSON.stringify(input));
  });

  test('Multiplicación', function(){  
    var input = pl0.parse("a = 8 * 2 * 5.");
    assert.equal('[{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"*","left":{"type":"*","left":{"type":"NUM","value":8},"right":{"type":"NUM","value":2}},"right":{"type":"NUM","value":5}}}]', JSON.stringify(input));
  });

  test('División a izquierdas', function(){  
    var input = pl0.parse("a = 5 / 7 / 3.");
    assert.equal('[{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"/","left":{"type":"/","left":{"type":"NUM","value":5},"right":{"type":"NUM","value":7}},"right":{"type":"NUM","value":3}}}]', JSON.stringify(input));
  });

  test('Preferencia de operador - división', function(){  
    var input = pl0.parse("a = 4 + 2 / 2.");
    assert.equal('[{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"+","left":{"type":"NUM","value":4},"right":{"type":"/","left":{"type":"NUM","value":2},"right":{"type":"NUM","value":2}}}}]', JSON.stringify(input));
  });

  test('Preferencia de operador - multiplicación', function(){  
    var input = pl0.parse("a = 7 - 1 * 5.");
    assert.equal('[{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"-","left":{"type":"NUM","value":7},"right":{"type":"*","left":{"type":"NUM","value":1},"right":{"type":"NUM","value":5}}}}]', JSON.stringify(input));
  });

  test('Call', function(){  
    var input = pl0.parse("call prueba(24).");
    assert.equal('[{"type":"CALL","arguments":[{"type":"NUM","value":24}],"value":{"type":"PROCEDURE","value":"prueba"}}]', JSON.stringify(input));
  });

  test('Program', function(){  
    var input = pl0.parse("const a=50, b=200;var x,y;z = 10.");
    assert.equal('[{"type":"=","left":{"type":"CONST","value":"a"},"right":{"type":"NUM","value":50}},{"type":"=","left":{"type":"CONST","value":"b"},"right":{"type":"NUM","value":200}},{"type":"VAR","value":"x"},{"type":"VAR","value":"y"},{"type":"=","left":{"type":"ID","value":"z"},"right":{"type":"NUM","value":10}}]', JSON.stringify(input));
  });

  test('If', function(){  
    var input = pl0.parse("if a>0 then a=20.");
    assert.equal('[{"type":"IF","condition":{"type":">","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":0}},"st":{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":20}}}]', JSON.stringify(input));
  });

  test('If - Else', function(){  
    var input = pl0.parse("if a>0 then a=20 else a=50.");
    assert.equal('[{"type":"IFELSE","condition":{"type":">","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":0}},"st":{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":20}},"sf":{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":50}}}]', JSON.stringify(input));
  });

  test('While', function(){  
    var input = pl0.parse("while b>0 do b=b+1.");
    assert.equal('[{"type":"WHILE","condition":{"type":">","left":{"type":"ID","value":"b"},"right":{"type":"NUM","value":0}},"st":{"type":"=","left":{"type":"ID","value":"b"},"right":{"type":"+","left":{"type":"ID","value":"b"},"right":{"type":"NUM","value":1}}}}]', JSON.stringify(input));
  });

  test('Procedure', function(){  
    var input = pl0.parse("procedure a;var a, v;a = 3;v = 4. ");
    assert.equal('[{"type":"PROCEDURE","value":{"type":"PROCEDURE","value":"a"},"block":[{"type":"VAR","value":"a"},{"type":"VAR","value":"v"},{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":3}}]},{"type":"=","left":{"type":"ID","value":"v"},"right":{"type":"NUM","value":4}}]', JSON.stringify(input));
  });

  test('Error de Sintaxis: ', function(){
    assert.throws(function() { pl0.parse("a = 5+4."); }, /Expected "."/);
  });

 });