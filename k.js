function lexer(str) {
  let cursor = 0;

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

  function readToken() {
    while (cursor < str.length) {
      let char = str[cursor];

      if (char === "+") {
        cursor++;
        return Token.OperatorAdd;
      } else if (char === "-") {
        cursor++;
        return Token.OperatorSub;
      } else if (char === "*") {
        cursor++;
        return Token.OperatorMul;
      } else if (char === "/") {
        cursor++;
        return Token.OperatorDiv;
      } else if (char === "(") {
        cursor++;
        return Token.BracketOpen;
      } else if (char === ")") {
        cursor++;
        return Token.BracketClose;
      } else if (/[0-9]/.test(char)) {
        let numStr = "";
        while (cursor < str.length && /[0-9]/.test(str[cursor])) {
          numStr += str[cursor];
          cursor++;
        }
        const numValue = parseFloat(numStr); // Zapamiętaj parseFloat Converts a string to a floating-point number
        return Token.Number + ":" + numValue;
      } else if (/\s/.test(char)) {
        cursor++; // to skip whitespaces
      } else {
        throw new Error("Unexpected character: " + char);
      }
    }

    return Token.EOF;
  }

  let tokens = []; // to jest nasz storage i w nim zapisujemy nasze token make sens
  let token = readToken();
  while (token !== Token.EOF) {
    tokens.push(token);
    token = readToken();
  }
  tokens.push(token); // eof nie wyswietlal sie przez to ze uzyles go w warunku while
  return tokens;
}

const input = "122 * 22";
console.log("start");
const tokens = lexer(input);
for (const token of tokens) {
  console.log(token);
}
console.log("finish");
