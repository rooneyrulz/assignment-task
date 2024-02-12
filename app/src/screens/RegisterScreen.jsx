import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/authApiSlice";

import { FormContainer, Loader } from "../components";

const REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]+$/;

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { accessToken } = useSelector((state) => state.auth);

  const registerUser = async () => {
    try {
      await register({ name, email, password }).unwrap();
      navigate("/dashboard");
      toast.success("Hello, Welcome! 😊");
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
    const areFieldsEmpty = [name, email, password].some(
      (field) => !field.trim()
    );

    if (areFieldsEmpty) {
      toast.error("Fill all required fields!");
      return;
    }

    if (!REGEX.test(password)) {
      toast.error(
        "Password must contain at least one letter, one number, and one special character"
      );
      return;
    }

    registerUser();
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [navigate, accessToken]);

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          {isLoading ? <Loader /> : "SIGN UP"}
        </Button>

        <Row className="py-3">
          <Col>
            Already have an account? <Link to="/"> Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
