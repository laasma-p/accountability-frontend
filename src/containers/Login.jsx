import { Formik, Form, Field } from "formik";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <Formik initialValues={{ email: "", password: "" }}>
        {() => {
          return (
            <Form>
              <div>
                <label>E-mail</label>
                <Field name="email" type="email" />
              </div>
              <div>
                <label>Password</label>
                <Field name="password" type="password" />
              </div>
              <button type="submit">Log In</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
