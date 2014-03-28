var assert = chai.assert;
 
 suite('Pruebas: ', function() {
    test('Prueba 1', function() {
        var original = "a = 2.";
 		assert.equal('[{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":2}}]', JSON.stringify(parse(original)));
    });

    test('Prueba 2 - operacion', function() {
        var original = "a = 2+3-4*5/7.";
 		assert.equal('[{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"-","left":{"type":"+","left":{"type":"NUM","value":2},"right":{"type":"NUM","value":3}},"right":{"type":"/","left":{"type":"*","left":{"type":"NUM","value":4},"right":{"type":"NUM","value":5}},"right":{"type":"NUM","value":7}}}}]', JSON.stringify(parse(original)));
     });

    test('Prueba 3 - if', function() {
        var original = "if a > 2 then b = 3.";
 		assert.equal('[{"type":"IF","left":{"type":">","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":2}},"right":{"type":"=","left":{"type":"ID","value":"b"},"right":{"type":"NUM","value":3}}}]', JSON.stringify(parse(original)));
     });

    test('Prueba 4 - while', function() {
        var original = "while a < 3 do b = b + 1.";
 		assert.equal('[{"type":"WHILE","left":{"type":"<","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":3}},"right":{"type":"=","left":{"type":"ID","value":"b"},"right":{"type":"+","left":{"type":"ID","value":"b"},"right":{"type":"NUM","value":1}}}}]', JSON.stringify(parse(original)));
     });

    test('Prueba 5 - parser', function() {
        var original = "procedure x;call x;begin  if x < a then a = a + 1 end.";
        assert.equal('[{"type":"PROCEDURE","value":"x","left":[{"type":"CALL","value":"x"}]},[{"type":"IF","left":{"type":"<","left":{"type":"ID","value":"x"},"right":{"type":"ID","value":"a"}},"right":{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"+","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":1}}}}]]', JSON.stringify(parse(original)));
     });

    test('Prueba 6 - parser 2', function() {
        var original = "var a, b;begin  if a > 0 then   while b >= 5 do    b = b - a end.";
        assert.equal('[{"type":"VAR","value":"a"},{"type":"VAR","value":"b"},[{"type":"IF","left":{"type":">","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":0}},"right":{"type":"WHILE","left":{"type":">=","left":{"type":"ID","value":"b"},"right":{"type":"NUM","value":5}},"right":{"type":"=","left":{"type":"ID","value":"b"},"right":{"type":"-","left":{"type":"ID","value":"b"},"right":{"type":"ID","value":"a"}}}}}]]', JSON.stringify(parse(original)));
     });

    test('Prueba 7 - error', function() {
        var input = "a = 2 + (5.";
        chai.expect(function () { window.parse(input) }).to.throw("Syntax Error. Expected ) found '.' near '.'");
     });

 });