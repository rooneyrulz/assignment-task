import { Container, Card } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

const DashboardScreen = () => {
  const userData = useAuth();

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 bg-light w-75">
          <span className="display-6">
            Hello {userData?.name}
            <span className="display-2">,</span>
          </span>
          <h1 className="dashboard-heading mb-4 display-3">
            Welcome to the application
          </h1>
        </Card>
      </Container>
    </div>
  );
};

export default DashboardScreen;
