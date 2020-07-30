import React from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { TextFormField } from "./FormFields/TextField";
import { EmailPass } from "./FormFields/EmaiPassl";
import { Username } from "./FormFields/Username";


const App = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: 300, margin: "auto" }}>
        <Username></Username>
        <EmailPass></EmailPass>
      </div>
    </div >
  );
};

export default App;