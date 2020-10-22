import methods from "validator";

class Validator {
  constructor(rules) {
    this.rules = rules;
    this.initial();
  }

  initial = () => {
    this.isValid = true;
    this.errors = {};
  };

  validate = (state) => {
    this.initial();
    this.rules.forEach((rule) => {
      if (this.errors[rule.field]) return;

      const fieldValue = state[rule.field] || "";
      const args = rule.args || [];
      const validationMethod =
        typeof rule.method === "string" ? methods[rule.method] : rule.method;

      if (validationMethod(fieldValue, ...args, state) !== rule.validWhen) {
        this.errors[rule.field] = rule.message;
        this.isValid = false;
      }
    });
    return this.errors;
  };

  isEmptyObject = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
}

export default Validator;
