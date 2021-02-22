import React from "react";

const Signup = ({ setSignIn }) => {
  return (
    <div>
      Sign in
      <form>
        <div>
          <input placeholder="name" />
        </div>
        <div>
          <input placeholder="email" />
        </div>
        <div>
          <input placeholder="password" type="password" />
        </div>

        <input value="Sign In" type="submit" />
      </form>
      <div>
        <div onClick={setSignIn}> Have an account? Sign in</div>
      </div>
    </div>
  );
};

export default Signup;
