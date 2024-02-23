
import * as Yup from 'yup';

export const requiredFieldMessage: string = 'поле обязательно для заполнения';
const inValidNameMessage: string = 'не корректное имя';
const inValidNickNameMessage: string = 'не корректное Nickname';
const inValidSurnameMessage: string = 'не корректная фамалия';
const inValidCheckboxMessage: string = 'необходимо отметить минимум один пункт';
const inValidRadioMessage: string = 'необходимо выбрать один пункт';
const inValidEmptyInputMessage: string = 'поле не может быть пустым'

export const FirstPage = Yup.object().shape({
    nickname: Yup.string()
        .min(2, inValidNickNameMessage)
        .matches(/^[a-zA-Zа-яА-Я0-9]+$/, inValidNickNameMessage)
        .max(30, inValidNickNameMessage)
        .required(requiredFieldMessage),
    name: Yup.string()
        .min(2, inValidNameMessage)
        .matches(/^[a-zA-Zа-яА-Я]+$/, inValidNameMessage)
        .max(50, inValidNameMessage)
        .required(requiredFieldMessage),
    surname: Yup.string()
        .min(2, inValidSurnameMessage)
        .matches(/^[a-zA-Zа-яА-Я]+$/, inValidSurnameMessage)
        .max(50, inValidSurnameMessage)
        .required(requiredFieldMessage),
    sex: Yup.string()
        .strict(true)
        .required(requiredFieldMessage)
})

export const SecondPage = Yup.object().shape({
    advantages: Yup.array()
        .of(
            Yup.string()
            .required(inValidEmptyInputMessage)
        ),
    checked: Yup.array()
        .min(1, inValidCheckboxMessage)
        .of(
            Yup.number()
            .required())
        .required(),
    picked: Yup.number()
        .required(inValidRadioMessage)
});

export const ThirdPage = Yup.object().shape({
    about: Yup.string()
        .required(requiredFieldMessage)
        .transform((str) => str.split(' ').join('')).max(200, 'не более 200 символов')
})