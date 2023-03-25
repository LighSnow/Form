"use strict";
(() => {
  // assets/js/test/Form.ts
  var Form = class {
    constructor(wrapper, formId, inputFields2) {
      this.wrapper = wrapper;
      this.formId = formId;
      this.inputFields = inputFields2;
      this.inputFields = inputFields2;
      this.formWrapper = wrapper;
      this.formId = formId;
      this.form = null;
      this.elements = /* @__PURE__ */ new Map();
      this.inputWrappers = [];
    }
    createForm() {
      const form2 = document.createElement("form");
      const submitButton = document.createElement("button");
      this.createFormFields();
      form2.id = this.formId;
      submitButton.id = "submit";
      submitButton.textContent = "Submit";
      submitButton.type = "button";
      submitButton.className = "btn btn-primary";
      submitButton.addEventListener("click", () => {
        this.submitForm();
      });
      this.inputWrappers.forEach((inputWrapper) => {
        form2.append(inputWrapper);
      });
      form2.append(submitButton);
      this.formWrapper.append(form2);
      this.form = form2;
    }
    createFormFields() {
      this.inputFields.forEach((input) => {
        const { type, id, placeholder, required, validation, errorText } = input;
        const inputWrapper = document.createElement("div");
        const label = document.createElement("label");
        const error = document.createElement("span");
        const element = document.createElement("input");
        label.htmlFor = id;
        label.textContent = placeholder;
        label.classList.add("form-label");
        element.id = id;
        element.type = type;
        element.placeholder = placeholder;
        element.classList.add("form-control");
        if (required) {
          element.addEventListener("blur", () => {
            this.validateInput(id);
          });
        }
        error.classList.add("error");
        inputWrapper.classList.add("mb-3", "input-wrapper");
        inputWrapper.append(label, element, error);
        this.elements.set(id, {
          id,
          element,
          errorText,
          required,
          error,
          validation
        });
        this.inputWrappers.push(inputWrapper);
      });
    }
    validateInput(id) {
      const { error, element, validation, errorText } = this.elements.get(id);
      const value = element.value.trim();
      const elementWrapper = element.parentNode;
      const isValid = validation(value);
      if (!isValid) {
        elementWrapper.classList.remove("is-valid");
        elementWrapper.classList.add("is-invalid");
        error.textContent = errorText;
      } else {
        elementWrapper.classList.remove("is-invalid");
        elementWrapper.classList.add("is-valid");
        error.textContent = "Looks good!";
      }
      return isValid;
    }
    resetForm() {
      var _a;
      (_a = this.form) == null ? void 0 : _a.reset();
      this.inputWrappers.forEach((inputWrapper) => {
        const error = inputWrapper.querySelector(".error");
        inputWrapper.classList.remove("is-valid");
        error.textContent = "";
      });
    }
    submitForm() {
      const validValues = [...this.elements].filter(([, input]) => {
        const { id, required } = input;
        if (required) {
          const isValid = this.validateInput(id);
          return isValid;
        }
        return true;
      });
      if (validValues.length === this.elements.size) {
        this.resetForm();
        alert("Form submitted!");
      }
    }
  };
  var Form_default = Form;

  // assets/js/test/index.ts
  var inputFields = [
    {
      type: "text",
      id: "name",
      placeholder: "\u0418\u043C\u044F",
      required: true,
      validation: (value) => value.trim().length >= 3,
      errorText: "Enter your name"
    },
    {
      type: "text",
      id: "email",
      placeholder: "\u0415-\u043C\u044D\u0439\u043B",
      required: true,
      validation: (value) => {
        var _a;
        const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return Boolean((_a = value.match(validRegex)) == null ? void 0 : _a.length);
      },
      errorText: "Enter valid email"
    },
    {
      type: "number",
      id: "age",
      placeholder: "\u0412\u043E\u0437\u0440\u0430\u0441\u0442",
      required: true,
      validation: (value) => Number(value.trim()) >= 10,
      errorText: "Enter valid age more than 10"
    },
    {
      type: "date",
      id: "birthdate",
      placeholder: "\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F",
      required: true,
      validation: (value) => value.trim() !== "",
      errorText: "Enter your birthdate"
    }
  ];
  var form = document.querySelector(".wrapper");
  var myForm = new Form_default(form, "form", inputFields);
  myForm.createForm();
})();
