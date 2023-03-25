import Form from './Form';
import { InputData } from './types';

import '../../styles/index.scss';

const inputFields: InputData[] = [
  {
    type: 'text',
    id: 'name',
    placeholder: 'Имя',
    required: true,
    validation: value => value.trim().length >= 3,
    errorText: 'Enter your name',
  },
  {
    type: 'text',
    id: 'email',
    placeholder: 'Е-мэйл',
    required: true,
    validation: value => {
      const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return Boolean(value.match(validRegex)?.length);
    },
    errorText: 'Enter valid email',
  },
  {
    type: 'number',
    id: 'age',
    placeholder: 'Возраст',
    required: true,
    validation: value => Number(value.trim()) >= 10,
    errorText: 'Enter valid age more than 10',
  },
  {
    type: 'date',
    id: 'birthdate',
    placeholder: 'Дата рождения',
    required: true,
    validation: value => value.trim() !== '',
    errorText: 'Enter your birthdate',
  },
];

const form = document.querySelector('.wrapper') as HTMLElement;
const myForm = new Form(form, 'form', inputFields);

myForm.createForm();
