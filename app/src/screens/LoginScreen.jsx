import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { useLoginMutation } from "../slices/authApiSlice";

import { FormContainer, Loader } from "../components";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { accessToken } = useSelector((state) => state.auth);

  const loginUser = async () => {
    try {
      await login({ email, password }).unwrap();
      navigate("/dashboard");
      toast.success("Login successful!");
    } catch (error) {
      toast.error(
        error?.data?.message ??
          error?.data?.response?.message ??
          "Something went wrong"
      );
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const areFieldsEmpty = [email, password].some((field) => !field.trim());

    if (areFieldsEmpty) {
      toast.error("Fill all required fields!");
      return;
    }

    loginUser();
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [navigate, accessToken]);

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your awesome email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your cool password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          {isLoading ? <Loader /> : "SIGN IN"}
        </Button>

        <Row className="py-3">
          <Col>
            Do not have account? <Link to="/register"> Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
