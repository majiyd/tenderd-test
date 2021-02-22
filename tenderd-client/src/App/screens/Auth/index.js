import React, { useState } from "react";
import { connect } from "react-redux";
import { FullPageLoader } from "../../components/loader";
import Signin from "./Signin";
import Signup from "./Signup";

const Auth = ({ loading }) => {
  const [isSignIn, setSignIn] = useState(true);
  return (
    <>
      <div>
        {isSignIn ? (
          <Signin setSignUp={() => setSignIn(false)} />
        ) : (
          <Signup setSignIn={() => setSignIn(true)} />
        )}
      </div>
      {loading && <FullPageLoader />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
  };
};

export default connect(mapStateToProps)(Auth);
