import * as yup from 'yup';

export const validationUser = {
  store: function (data) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      responsability: yup.string().required(),
    });
    schema
      .isValid({
        name: data.name,
        email: data.email,
        password: data.password,
        responsability: data.responsability,
      })
      .then((valid) => valid)
      .catch((err) => {
        console.log(err);
        return false;
      });
  },
};
