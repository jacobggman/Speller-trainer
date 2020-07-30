import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import React from "react";
import { TextFormField } from "./TextField";

const schema = yup.object({
    password: yup
        .string()
        .required()
        .min(3),
    email: yup.string().email().required()
});

export const EmailPass = () => {
    return (
        <Formik
            validationSchema={schema}
            initialValues={{ username: "", email: "" }}
            onSubmit={() => { }}
        >
            {() => (
                <Form>
                    <div>
                        <Field label="Email" name="email" component={TextFormField} />
                    </div>
                    <div>
                        <Field
                            label="Password"
                            name="password"
                            type="password"
                            component={TextFormField}
                        />
                    </div>

                </Form>
            )}
        </Formik>
    );
};
