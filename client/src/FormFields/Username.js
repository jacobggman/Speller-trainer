import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import React from "react";
import { TextFormField } from "./TextField";

const schema = yup.object({
    username: yup
        .string()
        .required()
        .min(3),
});

export const Username = () => {
    return (

        <Formik
            validationSchema={schema}
            initialValues={{ username: "" }}
            onSubmit={() => { }}
        >
            {() => (
                <Form>
                    <div>
                        <Field
                            label="Username"
                            name="username"
                            component={TextFormField}
                        />
                    </div>
                </Form>
            )}
        </Formik>

    );
};
