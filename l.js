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
        break;
      }
    }
  }

  function readToken() {
    whiteSpacesEater();

    if (cursor >= str.length) {
      return Token.EOF;
    }

    let char = str[cursor];

    switch (char) {
      case "+":
        cursor++;
        return { type: Token.OperatorAdd, value: char };
      case "-":
        cursor++;
        return { type: Token.OperatorSub, value: char };
      case "*":
        cursor++;
        return { type: Token.OperatorMul, value: char };
      case "/":
        cursor++;
        return { type: Token.OperatorDiv, value: char };
      case "(":
        cursor++;
        return { type: Token.BracketOpen, value: char };
      case ")":
        cursor++;
        return { type: Token.BracketClose, value: char };
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

  let tokenStorage = [];
  let token = getToken();
  while (token !== Token.EOF) {
    tokenStorage.push(token);
    token = getToken();
  }
  tokenStorage.push(token);

  return tokenStorage;
}


export default lexer;
