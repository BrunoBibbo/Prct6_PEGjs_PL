var assert = chai.assert;
 
 suite('Pruebas: ', function() {
    
  test('Resta a izquierdas', function(){  
    var input = pl0.parse("A = 3 - 4 - 1.");
    assert.equal('{\n  "type": "PROGRAM",\n  "bloque": [\n    [],\n    {\n      "type": "=",\n      "left": {\n        "type": "ID",\n        "value": "A"\n      },\n      "right": {\n        "type": "-",\n        "left": {\n          "type": "-",\n          "left": {\n            "type": "NUM",\n            "value": 3\n          },\n          "right": {\n            "type": "NUM",\n            "value": 4\n          }\n        },\n        "right": {\n          "type": "NUM",\n          "value": 1\n        }\n      }\n    }\n  ]\n}', JSON.stringify(input));
  });

 });