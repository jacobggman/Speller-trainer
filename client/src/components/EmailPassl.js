import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import React from "react";
import { TextFormField } from "components/TextField";
import { AppButton } from "./AppButton";
import { Checkbox, Grid, Typography } from "@material-ui/core";
import axios from 'axios';
import { useHistory } from "react-router-dom";


// words:
// route it
// get it
// taking and button
// correct

export const EmailPass = ({
    haveUsername, ...props
}) => {

    const history = useHistory();


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

    const sendUserData = (values) => {
        const path = `/api/user/${haveUsername ? 'register' : 'login'}`;
        if (haveUsername) {
            values.name = values.username;
        }
        else {
            delete values.name;
        }
        delete values.username;
        axios({
            url: path,
            method: 'POST',
            data: values
        }).then((response) => {
            const token = response.data.token;
            localStorage.setItem('x-auth-token', token);
            props.setUserName(response.data.username);
            history.push("/game");
        }).catch((err, req) => {
            alert(err.response.data);
        });;
        //alert(JSON.stringify(values, null, 2))
    }

    return (
        <Formik
            validationSchema={schema}
            initialValues={{ username: "", email: "" }}
            onSubmit={(values, { setSubmitting }) => sendUserData(values)}
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

                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                            >
                            </Grid>
                        </div>
                        <AppButton type="submit" >
                            Submit
                        </AppButton>
                    </Grid>
                </Form>
            )
            }
        </Formik >
    );
};
