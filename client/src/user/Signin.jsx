import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from "@mui/material";
import auth from "./auth-helper.js";
import { Navigate, useLocation } from "react-router-dom";
import { signin } from "../styles/api-auth.js";

export default function Signin() {
  const location = useLocation();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { from } = location.state || { from: { pathname: "/" } };
  const { redirectToReferrer } = values;

  if (redirectToReferrer) {
    return <Navigate to={from} />;
  }

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "40px auto",
        textAlign: "center",
        p: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Sign In
        </Typography>

        <TextField
          id="email"
          type="email"
          label="Email"
          fullWidth
          sx={{ mb: 2 }}
          value={values.email}
          onChange={handleChange("email")}
        />

        <TextField
          id="password"
          type="password"
          label="Password"
          fullWidth
          sx={{ mb: 2 }}
          value={values.password}
          onChange={handleChange("password")}
        />

        {values.error && (
          <Typography color="error" sx={{ mt: 1 }}>
            <Icon color="error" sx={{ mr: 0.5 }}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" onClick={clickSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
