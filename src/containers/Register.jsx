import { Formik, Form, Field } from "formik";

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <Formik initialValues={{ firstName: "", email: "", password: "" }}>
        {() => {
          return (
            <Form>
              <div>
                <label>First Name</label>
                <Field name="firstName" type="text" />
              </div>
              <div>
                <label>Email</label>
                <Field name="email" type="email" />
              </div>
              <div>
                <label>Password</label>
                <Field name="password" type="password" />
              </div>
              <button type="submit">Register</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
