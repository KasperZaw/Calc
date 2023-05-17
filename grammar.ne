@lexer lexer

expression -> _ additionSubtraction _ {
  return $2;
}

additionSubtraction -> _ (OperatorAdd | OperatorSub) _ multiplicationDivision {
  $$ = {
    operator: $2,
    left: $1,
    right: $3
  };
}

multiplicationDivision -> _ (OperatorMul | OperatorDiv) _ num {
  $$ = {
    operator: $2,
    left: $1,
    right: $3
  };
}
