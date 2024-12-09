import {useFormik} from 'formik';
import validationSchema from '../components/validations';
import useAuthStore from '../../hooks/useAuth';
import {registerUser} from '../api.js';
import startSession from "../../lib/session.js";
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const {login} = useAuth();
  const {loader, setLoader} = useAuthStore();

  const navigate = useNavigate();

  const {handleSubmit, handleChange, errors, touched, handleBlur, values} = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoader(true);
        const resp = await registerUser(values.username,values.email,values.password);
        startSession(resp.user, resp.jwt);
        login(resp);
        alert(("Başarıyla kayıt olundu"));
        navigate("/user");

      } catch (error) {
        console.error("An error occurred:", error);
        alert("Bir hata oldu");
      } finally {
        setLoader(false); 
        setSubmitting(false); 
      }
    }
  });

  return (
    <>
      <div className='flex  flex-col font-beatriceDisplayTrial w-full bg-noisy-background items-center pt-20'>
        <div>
          <p>Sign Up</p>
        </div>

        <form onSubmit={handleSubmit} className='w-1/3 max-md:w-2/3 '>



         
         


          <label htmlFor="username">Username</label>
          <input
            className='mt-[12px] w-full border-[1px] border-solid border-[#D9D9D9] pl-4 p-3'
            id="username"
            name="username"
            placeholder="Enter your username"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.username && touched.username && (<div>{errors.username}</div>)}

         


          <label htmlFor="email">Email</label>
          <input
            className='mt-[12px] w-full border-[1px] border-solid border-[#D9D9D9] pl-4 p-3'
            id="email"
            name="email"
            placeholder="example@gmail.com"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (<div>{errors.email}</div>)}

          <label htmlFor="password">Password</label>
          <input
            className='mt-[12px] w-full border-[1px] border-solid border-[#D9D9D9] pl-4 p-3'
            id="password"
            name="password"
            value={values.password}
            placeholder="Password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (<div>{errors.password}</div>)}

        


            
          

          <button type="submit"
            className='w-[231px] h-[44px] bg-[#D9D9D9] max-lg:w-full mt-5'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
