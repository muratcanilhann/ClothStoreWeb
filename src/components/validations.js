import * as Yup from 'yup';


const validations = Yup.object({
  username: Yup.string().required("Zorunlu alan."),
  email: Yup.string().email().required(),
  password: Yup.string().min(5).required(),

  
  });

  export default validations;