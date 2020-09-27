import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import React from "react";
import { TextFormField } from "components/TextField";
import { AppButton } from "./AppButton";
import { Grid } from "@material-ui/core";

const schema = yup.object({
    password: yup
        .string()
        .required()
        .min(3),
    email: yup.string().email().required(),

});

export const EmailPass = ({
    haveUsername, ...props
}) => {
    return (
        <Formik
            validationSchema={schema}
            initialValues={{ username: "", email: "" }}
            onSubmit={(values, { setSubmitting }) => alert(JSON.stringify(values, null, 2))}
        >
            {() => (
                <Form {...props}>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center">
                        <div>
                            {
                                haveUsername ?
                                    <Field
                                        label="Username"
                                        name="Username"
                                        type="Username"
                                        component={TextFormField}
                                    />
                                    :
                                    <></>
                            }
                        </div>
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
                        <div>
                            <AppButton type="submit" >
                                Submit
                        </AppButton>
                        </div>
                    </Grid>
                </Form>
            )
            }
        </Formik >
    );
};
