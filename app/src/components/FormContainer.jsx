import { Row, Col } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const FormContainer = ({ children }) => {
  return (
    <div className="form-wrapper">
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6} className="card p-5">
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default FormContainer;
