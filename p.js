import lexer from "./l.js";

function parser(input) {
  const tokens = lexer(input);
  let currentToken = 0;

  function expressionParse() {
    let node = additionSubtractionParse();
    while (
      currentToken < tokens.length &&
      (tokens[currentToken].type === "OPERATOR_ADD" ||
        tokens[currentToken].type === "OPERATOR_SUB")
    ) {
      const operator = tokens[currentToken];
      currentToken++;
      const rightNode = additionSubtractionParse();

      node = {
        type: operator.type,
        operator: operator.value,
        left: node,
        right: rightNode,
      };
    }

    return node;
  }

  function additionSubtractionParse() {
    let node = multiplicationDivisionParse();
    while (
      currentToken < tokens.length &&
      (tokens[currentToken].type === "OPERATOR_ADD" ||
        tokens[currentToken].type === "OPERATOR_SUB")
    ) {
      const operator = tokens[currentToken];
      currentToken++;
      const rightNode = multiplicationDivisionParse();

      node = {
        type: operator.type,
        operator: operator.value,
        left: node,
        right: rightNode,
      };
    }

    return node;
  }

  function multiplicationDivisionParse() {
    let node = numParse();

    while (
      currentToken < tokens.length &&
      (tokens[currentToken].type === "OPERATOR_MUL" ||
        tokens[currentToken].type === "OPERATOR_DIV")
    ) {
      const operator = tokens[currentToken];
      currentToken++;
      const rightNode = numParse();

      node = {
        type: operator.type,
        operator: operator.value,
        left: node,
        right: rightNode,
      };
    }

    return node;
  }

  function numParse() {
    const token = tokens[currentToken];
    currentToken++;

    if (token.type === "NUMBER") {
      return {
        type: token.type,
        value: token.value,
      };
    } else if (token.type === "BRACKET_OPEN") {
      const node = expressionParse();

      if (
        currentToken < tokens.length &&
        tokens[currentToken].type === "BRACKET_CLOSE"
      ) {
        currentToken++;
        return node;
      } else {
        throw new Error("Oops, something went wrong: Mismatched parentheses");
      }
    } else {
      throw new Error("Unexpected token: " + token.type);
    }
  }

  function printAST(node) {
    if (node.type === "NUMBER") {
      return {
        type: "NUMBER",
        value: node.value
      };
    } else if (
      node.type === "OPERATOR_ADD" ||
      node.type === "OPERATOR_SUB" ||
      node.type === "OPERATOR_MUL" ||
      node.type === "OPERATOR_DIV"
    ) {
      return {
        type: node.type,
        operator: node.operator,
        left: printAST(node.left),
        right: printAST(node.right)
      };
    }
  }
  const parsedExpression = expressionParse();
  console.log("start");
  console.log(JSON.stringify(printAST(parsedExpression), null, 2));
  console.log("finish");
}
const input = "100 + 5 * 5";
parser(input);

// grammar.ne


// npm install nearley
// expression -> _ additionSubtraction* _
// additionSubtraction -> _ (OPERATOR_ADD | OPERATOR_SUB) _ multiplicationDivision
// multiplicationDivision -> _ (OPERATOR_MUL | OPERATOR_DIV) _ num
// num -> NUMBER | BRACKET_OPEN _ expression _ BRACKET_CLOSE

// _ -> " "*

