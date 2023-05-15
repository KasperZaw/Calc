import lexer from "./l.js";

function parser(input) {
  const tokens = lexer(input);
  let currentToken = 0;
  // kolejnosc wykonywania
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
        right: rightNode, // syntax tree (AST) poczytaj więcej.
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

  const parsedExpression = expressionParse();
  const result = evaluate(parsedExpression);
  console.log(result);
}

function evaluate(node) {
  switch (node.type) {
    case "NUMBER":
      return parseFloat(node.value);
    case "OPERATOR_ADD":
      return evaluate(node.left) + evaluate(node.right);
    case "OPERATOR_SUB":
      return evaluate(node.left) - evaluate(node.right);
    case "OPERATOR_MUL":
      return evaluate(node.left) * evaluate(node.right);
    case "OPERATOR_DIV":
      return evaluate(node.left) / evaluate(node.right);
    default:
      throw new Error("Invalid node type: " + node.type);
  }
}
const input = "100 + 5 * 5";
console.log("start");
parser(input);
console.log("finish");

