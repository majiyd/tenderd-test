import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);
    formData.append("username", "Groucho");
    console.log("formData", formData);
    axios
      .post(
        "http://localhost:5001/tenderd-ac353/us-central1/app/requests",
        formData,
        {
          headers: {
            "x-access-token":
              "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlYmMyZmI5N2QyNWE1MmQ5MjJhOGRkNTRiZmQ4MzhhOTk4MjE2MmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVuZGVyZC1hYzM1MyIsImF1ZCI6InRlbmRlcmQtYWMzNTMiLCJhdXRoX3RpbWUiOjE2MTM5NjQxODMsInVzZXJfaWQiOiJ4c3ltM2pOVVdPZlhyWUVhMFJ0UGE3QVVxeWUyIiwic3ViIjoieHN5bTNqTlVXT2ZYcllFYTBSdFBhN0FVcXllMiIsImlhdCI6MTYxMzk2NDE4NCwiZXhwIjoxNjEzOTY3Nzg0LCJlbWFpbCI6InN1bGVpbWFubWFqaXlkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzdWxlaW1hbm1haml5ZEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.XQinxG7Z9nuRmOO9XM3Fg4iGJ7W8tlYUNxd9wHjFXdxyU8dfoKtZm63-BkSYa-_VGoox0u_B056ChrKisoYbJaTn-PXhMuRfX_1muGAs5fynZy37m6lXwqZ-mf_eIm9PE8frYyukhPgGkBUH1YINchghAtPipts8tuo31nhTIvwyKWaCgpbtH5Q6HMB-Z18pGoe5eaPiARyUSaszCOJkg0RV_rZrFJWNL6bWzpxj4_N-hfQvT8-jl0Kon-M8Gx2Q4WeMwZIvTDcGv0xjDXZOHAE1HHxVamALzXZsUhof205Qc-Jq7IuLTyvi4OXjXHsCDyubOTQInRm1eHDHbrLo9Q",
          },
        }
      )
      .then((res) => {
        alert("File Upload success");
      })
      .catch((err) => alert(err.message));
  };

  const handleFileSelect = (e) => {
    console.log("e", e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };
  return (
    <div className="App">
      <header className="App-header">
        <form encType="multipart/form-data">
          <label htmlFor="file">Select a file:</label>
          <input
            type="file"
            id="myfile"
            name="file"
            onChange={(e) => handleFileSelect(e)}
          />
          <button onClick={submitForm}>Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
