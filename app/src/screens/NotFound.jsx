import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="notfound">
      <FaExclamationCircle
        style={{ fontSize: "120px", color: "red", marginBottom: "10px" }}
      />
      <h1 className="display-6">Page does not exist!</h1>
      <Link to="/">Homepage</Link>
    </div>
  );
};

export default NotFound;
