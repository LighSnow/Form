import { FormElement, InputData } from './types';

class Form {
  private readonly formWrapper: HTMLElement;

  private elements: Map<string, FormElement>;

  private readonly inputWrappers: HTMLDivElement[];

  private form: HTMLFormElement | null;

  constructor(private readonly wrapper: HTMLElement, private readonly formId: string, private readonly inputFields: InputData[]) {
    this.inputFields = inputFields;
    this.formWrapper = wrapper;
    this.formId = formId;
    this.form = null;
    this.elements = new Map();
    this.inputWrappers = [];
  }

  public createForm() {
    const form = document.createElement('form');
    const submitButton = document.createElement('button');

    this.createFormFields();

    form.id = this.formId;
    submitButton.id = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.type = 'button';
    submitButton.className = 'btn btn-primary';

    submitButton.addEventListener('click', () => {
      this.submitForm();
    });

    this.inputWrappers.forEach(inputWrapper => {
      form.append(inputWrapper);
    });

    form.append(submitButton);

    this.formWrapper.append(form);
    this.form = form;
  }

  private createFormFields() {
    this.inputFields.forEach(input => {
      const { type, id, placeholder, required, validation, errorText } = input;
      const inputWrapper = document.createElement('div');
      const label = document.createElement('label');
      const error = document.createElement('span');
      const element = document.createElement('input');

      label.htmlFor = id;
      label.textContent = placeholder;
      label.classList.add('form-label');

      element.id = id;
      element.type = type;
      element.placeholder = placeholder;
      element.classList.add('form-control');

      if (required) {
        element.addEventListener('blur', () => {
          this.validateInput(id);
        });
      }

      error.classList.add('error');

      inputWrapper.classList.add('mb-3', 'input-wrapper');
      inputWrapper.append(label, element, error);

      this.elements.set(id, {
        id,
        element,
        errorText,
        required,
        error,
        validation,
      });
      this.inputWrappers.push(inputWrapper);
    });
  }

  private validateInput(id: string) {
    const { error, element, validation, errorText } = this.elements.get(id) as FormElement;
    const value = element.value.trim();
    const elementWrapper = element.parentNode as HTMLElement;
    const isValid = validation(value);

    if (!isValid) {
      elementWrapper.classList.remove('is-valid');
      elementWrapper.classList.add('is-invalid');
      error.textContent = errorText;
    } else {
      elementWrapper.classList.remove('is-invalid');
      elementWrapper.classList.add('is-valid');

      error.textContent = 'Looks good!';
    }

    return isValid;
  }

  private resetForm() {
    this.form?.reset();
    this.inputWrappers.forEach(inputWrapper => {
      const error = inputWrapper.querySelector('.error') as HTMLSpanElement;

      inputWrapper.classList.remove('is-valid');
      error.textContent = '';
    });
  }

  public submitForm() {
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
      alert('Form submitted!');
    }
  }
}

export default Form;
