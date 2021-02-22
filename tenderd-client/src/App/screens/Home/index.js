import React from "react";
import { connect } from "react-redux";
import { getAllCompanies } from "../../../redux/actions/companyActions";
import { FullPageLoader } from "../../components/loader";

class Home extends React.Component {
  componentDidMount() {
    if (!this.props.user.companyID) {
      this.props.getAllCompanies();
    } else {
      // get requests
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user.companyID !== prevProps.user.companyID) {
      // get requests
    }
  }
  render() {
    console.log("this.props", this.props);
    const { loading, companies } = this.props;
    const { name, companyName, companyID } = this.props.user;
    return (
      <>
        <div>
          <h2>{name}</h2>
          <h3>{companyName}</h3>
          {!companyID && (
            <div>
              <p>Select A Company</p>

              <select name="cars" id="cars">
                {companies.map((company) => (
                  <option value={company.uuid} key={company.uuid}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        {loading && <FullPageLoader />}
      </>
    );
  }
}

const mapDispatchToProps = {
  getAllCompanies,
};
const mapStateToProps = (state) => {
  return {
    companies: state.company.companies,
    requests: state.requests.requests,
    user: state.user,
    loading: state.company.loading || state.requests.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
