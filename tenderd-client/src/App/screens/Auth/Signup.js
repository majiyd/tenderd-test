import React, { useState } from "react";
import { connect } from "react-redux";
import { signup } from "../../../redux/actions/userActions";

const Signup = ({ setSignIn, signup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ email, password, name });
  };
  return (
    <div>
      Sign up
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
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

        <input value="Sign Up" type="submit" />
      </form>
      <div>
        <div onClick={setSignIn}> Have an account? Sign in</div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  signup,
};

export default connect(null, mapDispatchToProps)(Signup);
