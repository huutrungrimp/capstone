import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { userLogout } from "../../store/actions/authActions";

const Logout = ({ userLogout, history }) => {
  console.log(history);

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    userLogout();
    history.push("/");
  };

  return (
    <div class="formClass">
      <div
        class="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Are your sure to logout?
      </div>
      <div
        class="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button sm={3} variant="primary" onClick={handleSubmit}>
          Yes
        </Button>
        <Button sm={3} variant="primary" onClick={history.goBack}>
          No
        </Button>
      </div>


    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogout: () => {
      dispatch(userLogout());
    },
  };
};
export default connect(null, mapDispatchToProps)(Logout);
