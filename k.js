function lexer(str) {
  let cursor = 0;
  let tokenStack = []; // storage dla odkladanych tokenow

  const OperatorAdd = "OPERATOR_ADD";
  const OperatorSub = "OPERATOR_SUB";
  const OperatorMul = "OPERATOR_MUL";
  const OperatorDiv = "OPERATOR_DIV";
  const BracketOpen = "BRACKET_OPEN";
  const BracketClose = "BRACKET_CLOSE";
  const Number = "NUMBER";
  const EOF = "EOF";

  let Token = {
    OperatorAdd,
    OperatorSub,
    OperatorMul,
    OperatorDiv,
    BracketOpen,
    BracketClose,
    Number,
    EOF,
  };

  function putToken(token) {
    tokenStack.push(token);
  }

  function getToken() {
    if (tokenStack.length > 0) {
      return tokenStack.pop();
    } else {
      return readToken();
    }
  }
  
  
  function whiteSpacesEater() {
    const whitespaceRegex = /\s+/;
  
    while (cursor < str.length) {
      const remainingStr = str.slice(cursor);
      const match = remainingStr.match(whitespaceRegex);
  
      if (match && match.index === 0) {
        const whitespace = match[0];
        cursor += whitespace.length; 
      } else {
        break; // <-- ważne
      }
    }
  }
  
  

 

  function readToken() {
    whiteSpacesEater(); // wywolanie

    while (cursor < str.length) {
      let char = str[cursor];

      switch (char) {
        case "+":
          cursor++;
          return Token.OperatorAdd;
        case "-":
          cursor++;
          return Token.OperatorSub;
        case "*":
          cursor++;
          return Token.OperatorMul;
        case "/":
          cursor++;
          return Token.OperatorDiv;
        case "(":
          cursor++;
          return Token.BracketOpen;
        case ")":
          cursor++;
          return Token.BracketClose;
        default:
          if (/[0-9]/.test(char)) {
            let numStr = "";
            while (cursor < str.length && /[0-9]/.test(str[cursor])) {
              numStr += str[cursor];
              cursor++;
            }
            const numValue = parseFloat(numStr);
            return { type: Token.Number, value: numValue };
          } else {
            throw new Error("Unexpected character: " + char);
          }
      }
    }

    return Token.EOF;
  }



  let tokens = [];
  let token = getToken();
  while (token !== Token.EOF) {
    tokens.push(token);
    token = getToken();
  }
  tokens.push(token);

  return tokens;
}


const input = "122 * 22 + 2 + 30";
console.log("start");
const tokens = lexer(input);
for (const token of tokens) {
  console.log(token);
}
console.log("finish");
