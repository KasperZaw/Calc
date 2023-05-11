function lexer(str) {
  let cursor = 0;
  let tokenStack = [];

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
   
  function eatWhiteSpaces() { //alternatywa z else if funkcia bedzie umieszczona na gorze readToken

  }

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

  function readToken() {
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
            return Token.Number + ":" + numValue;
          } else if (/\s/.test(char)) {
            cursor++; // Skip whitespace characters
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

// Example usage:
const input = "122 * 22";
console.log("start");
const tokens = lexer(input);
for (const token of tokens) {
  console.log(token);
}
console.log("finish");
