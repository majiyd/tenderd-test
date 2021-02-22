import React, { useState } from "react";
import { connect } from "react-redux";
import { signin } from "../../../redux/actions/userActions";

const Signin = ({ setSignUp, signin, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("object", email, password);
    signin({ email, password });
  };

  return (
    <div>
      Sign in
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <input value="Sign In" type="submit" x />
      </form>
      <div>
        <div onClick={setSignUp}> Don't have an account? Create Instead</div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  signin,
};

export default connect(null, mapDispatchToProps)(Signin);
