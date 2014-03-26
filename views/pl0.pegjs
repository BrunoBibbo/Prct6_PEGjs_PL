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
condition = t:exp r:(COMPARISON exp)* { return tree(t,r) }
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
ID       = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _ 
            { 
              return { type: 'ID', value: id }; 
            }
NUMBER   = _ digits:$[0-9]+ _ 
            { 
              return { type: 'NUM', value: parseInt(digits, 10) }; 
            }