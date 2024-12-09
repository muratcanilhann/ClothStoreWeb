import { useFormik } from 'formik';
import validationSchema from '../components/validation2';
import useAuthStore from '../../hooks/useAuth';
import { loginUser } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const { loader, setLoader } = useAuthStore();
  const navigate = useNavigate();

  const { handleSubmit, handleChange, errors, touched, handleBlur, values } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoader(true);
        const resp = await loginUser(values.email, values.password);
        login(resp);

        navigate("/");

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
    <div className="flex flex-col min-h-screen font-beatriceDisplayTrial w-full bg-noisy-background items-center pt-20 ">
      <div>
        <p>Login</p>
      </div>

      <form onSubmit={handleSubmit} className='w-1/3 max-md:w-2/3'>
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

        <button type="submit" className='w-[231px] h-[44px] bg-[#D9D9D9] max-lg:w-full mt-5'>
          Submit
        </button>
      </form>
    </div>
  );
}
