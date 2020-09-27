import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import React from "react";
import { TextFormField } from "components/TextField";
import { AppButton } from "./AppButton";
import { Grid } from "@material-ui/core";



export const EmailPass = ({
    haveUsername, ...props
}) => {

    const schema = yup.object({

        password: yup
            .string()
            .required()
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
        email: yup.string().email().required(),
        username: haveUsername ? yup.string().required().min(3) : yup.string(),

    });

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
                                        name="username"
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
