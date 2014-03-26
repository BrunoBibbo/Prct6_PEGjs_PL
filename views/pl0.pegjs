{
  var tree = function(f, r) {
    if (r.length > 0) {
      var last = r.pop();
      var result = {
        type:  last[0],
        left: tree(f, r),
        right: last[1]
      };
    }
    else {
      var result = f;
    }
    return result;
  }
}

program = b:block PUNTO {return b;}

//Definicion de constantes
const = c1:const_igualdad c2:const_igualdad_sig* PCOMA {return [c1].concat(c2); }

//Definicion de igualdad entre constantes
const_igualdad = CONST i:CONST_ID ASSIGN n:NUMBER { return {type: '=', left: i, right: n}; }

//Definicion de igualdad entre las constantes posteriores
const_igualdad_sig = COMA i:CONST_ID ASSIGN n:NUMBER { return {type: '=', left: i, right: n}; }

//Definicion de variables
vars = VAR v1:VAR_ID v2:(COMA v:VAR_ID {return v})* PCOMA {return [v1].concat(v2); }

//Definicion de procedimiento
proc = PROCEDURE i:PROC_ID arg:proc_parametros? PCOMA b:block PCOMA {return arg != null? {type: 'PROCEDURE', value: i, parameters: arg, block: b} :{type: "PROCEDURE", value: i, block: b}; }

//Definicion del paso de parametros a un procedimiento
proc_parametros = LEFTPAR i:(i1:ID i2:(COMA i:ID {return i;})* {return [i1].concat(i2)})? RIGHTPAR {return i};

block = constantes:(const)? variables:(vars)? procedimiento:(proc)* s:st{
        var r = [];

        if(constantes) r = r.concat(constantes);
        if(variables)  r = r.concat(variables);
        if(procedimiento) r = r.concat(procedimiento);

        return r.concat(s);
} 

st     = i:ID ASSIGN e:exp        
            { return {type: '=', left: i, right: e}; }
       
       / CALL i:ID
            { return {type: 'CALL', right: i}; }

       / P e:exp
            { return {type: 'P', right: e}; }

       / BEGIN s:st s1:(PCOMA s2:st {return s2;})* END
            { return {type: 'BEGIN', value: [s].concat(s1)} }

       / IF e:condition THEN st:st ELSE sf:st
           {
             return {
               type: 'IFELSE',
               condition:  e,
               st: st,
               sf: sf,
             };
           }
       / IF e:condition THEN st:st    
           {
             return {
               type: 'IF',
               condition:  e,
               st: st
             };
           }
       / WHILE e:condition DO st:st    
           {
             return {
               type: 'WHILE',
               condition:  e,
               st: st
             };
           }

condition = ODD t:exp { return {type: 'ODD', value: t}; }
            / t:exp r:(COMPARISON exp)* { return tree(t,r) }

exp    = t:term  r:(ADD term)*  { return tree(t,r); }

term   = f:factor r:(MUL factor)* { return tree(f,r); }

factor = NUMBER
       / ID
       / LEFTPAR t:exp RIGHTPAR   { return t; }

_ = $[ \t\n\r]*

ASSIGN   = _ op:'=' _  { return op; }
ADD      = _ op:[+-] _ { return op; }
MUL      = _ op:[*/] _ { return op; }
PCOMA    = _ op:';' _  { return op; }
COMA     = _ op:"," _  { return op; }
PUNTO    = _ op:'.' _  { return op; }
COMPARISON = _ op:$([<>!=]'='/[<>]) _ { return op; }
LEFTPAR  = _"("_
RIGHTPAR = _")"_
IF       = _ "if" _
THEN     = _ "then" _
ELSE     = _ "else" _
WHILE    = _ "while" _
DO       = _ "do" _
P        = _ "p" _
CALL     = _ "call" _
BEGIN    = _ "begin" _
END      = _ "end" _
ODD      = _ "odd" _
PROCEDURE= _ "procedure" _
CONST    = _ "const" _
VAR      = _ "var" _
ID       = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _ 
            { 
              return { type: 'ID', value: id }; 
            }
CONST_ID = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _ 
            { 
              return { type: 'CONST', value: id }; 
            }
VAR_ID   = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _ 
            { 
              return { type: 'VAR', value: id }; 
            }
PROC_ID  = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _ 
            { 
              return { type: 'PROCEDURE', value: id }; 
            }
NUMBER   = _ digits:$[0-9]+ _ 
            { 
              return { type: 'NUM', value: parseInt(digits, 10) }; 
            }