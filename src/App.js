import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advancedMode: false,
      income: 0,
      expense: 0,
      tradeIncome: 0,
      dividends: 0,
      interests: 0,
      rentIncome: 0,
      royalty: 0,
      gains: 0,
      donations: 0,
      relief: 0,
      spouseRelief: 0,
      childRelief: 0,
      workingMotherChildRelief: 0,
      parentRelief: 0,
      grandParentRelief: 0,
      siblingRelief: 0,
      CPFRelief: 0,
      lifeInsuranceRelief: 0,
      courseFeesRelief: 0,
      domesticWorkerRelief: 0,
      CPFCashTopUpRelief: 0,
      SRSRelief: 0,
      NSRelief: 0,
      parenthoodRebate: 0,
    };
  }

  // explicit binding to **this** is not required for arrow syntax
  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;

    if (value === "") {
      value = 0;
    }

    this.setState({
      [name]: value,
    });
  };

  render() {
    let assessableIncome = 0,
      relief = 0;

    if (this.state.advancedMode) {
      assessableIncome =
        parseFloat(this.state.income) -
        parseFloat(this.state.expense) +
        parseFloat(this.state.tradeIncome) +
        parseFloat(this.state.dividends) +
        parseFloat(this.state.interests) +
        parseFloat(this.state.rentIncome) +
        parseFloat(this.state.royalty) +
        parseFloat(this.state.gains) -
        parseFloat(this.state.donations);

      relief =
        parseFloat(this.state.relief) +
        parseFloat(this.state.spouseRelief) +
        parseFloat(this.state.childRelief) +
        parseFloat(this.state.workingMotherChildRelief) +
        parseFloat(this.state.parentRelief) +
        parseFloat(this.state.grandParentRelief) +
        parseFloat(this.state.siblingRelief) +
        parseFloat(this.state.CPFRelief) +
        parseFloat(this.state.lifeInsuranceRelief) +
        parseFloat(this.state.courseFeesRelief) +
        parseFloat(this.state.domesticWorkerRelief) +
        parseFloat(this.state.CPFCashTopUpRelief) +
        parseFloat(this.state.SRSRelief) +
        parseFloat(this.state.NSRelief);

      // personal relief is capped at SGD 80,000.00
      if (relief > 80000) {
        relief = 80000;
      }
    } else {
      assessableIncome = parseFloat(this.state.income);
    }

    let taxableIncome = assessableIncome - relief;

    let tax = 0,
      taxRate = 0;

    if (isNaN(taxableIncome)) {
      taxableIncome = 0.0;
      // tax rates are progressive, no tax below earning SGD 20,000.00
    } else if (taxableIncome <= 20000) {
      tax = 0.0;
    } else if (taxableIncome <= 30000) {
      tax = ((taxableIncome - 20000) * 2.0) / 100;
    } else if (taxableIncome <= 40000) {
      tax = 200 + ((taxableIncome - 30000) * 3.5) / 100;
    } else if (taxableIncome <= 80000) {
      tax = 550 + ((taxableIncome - 40000) * 7.0) / 100;
    } else if (taxableIncome <= 120000) {
      tax = 3350 + ((taxableIncome - 80000) * 11.5) / 100;
    } else if (taxableIncome <= 160000) {
      tax = 7950 + ((taxableIncome - 120000) * 15.0) / 100;
    } else if (taxableIncome <= 200000) {
      tax = 13950 + ((taxableIncome - 160000) * 18.0) / 100;
    } else if (taxableIncome <= 240000) {
      tax = 21150 + ((taxableIncome - 200000) * 19.0) / 100;
    } else if (taxableIncome <= 280000) {
      tax = 28750 + ((taxableIncome - 240000) * 19.5) / 100;
    } else if (taxableIncome <= 320000) {
      tax = 36550 + ((taxableIncome - 280000) * 20.0) / 100;
    } else if (taxableIncome > 320000) {
      tax = 44550 + ((taxableIncome - 320000) * 22.0) / 100;
    }

    if (this.state.advancedMode) {
      tax = tax - parseFloat(this.state.parenthoodRebate);
    }

    // avoid indefinite taxRate
    if (assessableIncome === 0) {
      taxRate = null;
    } else {
      taxRate = ((tax * 100) / assessableIncome).toFixed(2);
    }

    return (
      <div className="container">
        <h3 style={{ color: "#15847b" }}>Singapore tax calculator</h3>
        <hr />
        <br />
        <p>
          This app calculates personal income tax for Singapore residents. Tax
          rates are last updated in January 2022 from{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/new-to-tax/individual-income-tax-rates"
          >
            IRAS website
          </a>
          .
        </p>
        <br />
        <form className="form">
          <label>
            <input
              type="checkbox"
              style={{ width: "25px" }}
              id="advancedMode"
              name="advancedMode"
              checked={this.state.advancedMode}
              onChange={this.handleChange}
            />
            Advanced Mode:{" "}
            {this.state.advancedMode ? (
              <span>
                On <i>(uncheck to switch off)</i>
              </span>
            ) : (
              <span>
                Off <i>(check to switch on)</i>
              </span>
            )}
          </label>
          <br />
          <br />

          {this.state.advancedMode ? (
            <div>
              <p>
                <i>
                  Please enter applicable values in Singapore dollar (all inputs
                  must be numbers):
                </i>
              </p>
              <table>
                <tbody>
                  <tr>
                    <td>Employment income</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="income"
                        name="income"
                        placeholder="0.00"
                        value={this.state.income || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Employment expenses</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="expense"
                        name="expense"
                        placeholder="0.00"
                        value={this.state.expense || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Income from trade, business etc.</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="tradeIncome"
                        name="tradeIncome"
                        placeholder="0.00"
                        value={this.state.tradeIncome || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Dividends earned</td>
                    <td>
                      {" "}
                      <input
                        type="number"
                        step="0.01"
                        id="dividends"
                        name="dividends"
                        placeholder="0.00"
                        value={this.state.dividends || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Interests earned</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="interests"
                        name="interests"
                        placeholder="0.00"
                        value={this.state.interests || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Rent from property</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="rentIncome"
                        name="rentIncome"
                        placeholder="0.00"
                        value={this.state.rentIncome || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Royalty, estate/trust income</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="royalty"
                        name="royalty"
                        placeholder="0.00"
                        value={this.state.royalty || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Gains/Profits of an income nature</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="gains"
                        name="gains"
                        placeholder="0.00"
                        value={this.state.gains || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Approved donations</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="donations"
                        name="donations"
                        placeholder="0.00"
                        value={this.state.donations || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Earned income relief</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="relief"
                        name="relief"
                        placeholder="0.00"
                        value={this.state.relief || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Spouse/handicapped spouse relief</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="spouseRelief"
                        name="spouseRelief"
                        placeholder="0.00"
                        value={this.state.spouseRelief || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Qualifying/handicapped child relief</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="childRelief"
                        name="childRelief"
                        placeholder="0.00"
                        value={this.state.childRelief || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Working mother's child relief</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="workingMotherChildRelief"
                        name="workingMotherChildRelief"
                        placeholder="0.00"
                        value={this.state.workingMotherChildRelief || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Parent/handicapped parent relief</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="parentRelief"
                        name="parentRelief"
                        placeholder="0.00"
                        value={this.state.parentRelief || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Grandparent caregiver relief</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="grandParentRelief"
                        name="grandParentRelief"
                        placeholder="0.00"
                        value={this.state.grandParentRelief || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Handicapped brother/sister relief</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="siblingRelief"
                        name="siblingRelief"
                        placeholder="0.00"
                        value={this.state.siblingRelief || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>CPF/provident fund relief</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="CPFRelief"
                        name="CPFRelief"
                        placeholder="0.00"
                        value={this.state.CPFRelief || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Life insurance relief</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="lifeInsuranceRelief"
                        name="lifeInsuranceRelief"
                        placeholder="0.00"
                        value={this.state.lifeInsuranceRelief || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Course fees relief</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="courseFeesRelief"
                        name="courseFeesRelief"
                        placeholder="0.00"
                        value={this.state.courseFeesRelief || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Foreign domestic worker levy relief</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="domesticWorkerRelief"
                        name="domesticWorkerRelief"
                        placeholder="0.00"
                        value={this.state.domesticWorkerRelief || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>CPF cash top-up relief</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="CPFCashTopUpRelief"
                        name="CPFCashTopUpRelief"
                        placeholder="0.00"
                        value={this.state.CPFCashTopUpRelief || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>SRS relief</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="SRSRelief"
                        name="SRSRelief"
                        placeholder="0.00"
                        value={this.state.SRSRelief || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>National Service relief</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="NSRelief"
                        name="NSRelief"
                        placeholder="0.00"
                        value={this.state.NSRelief || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Parenthood tax rebate</td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        id="parenthoodRebate"
                        name="parenthoodRebate"
                        placeholder="0.00"
                        value={this.state.parenthoodRebate || ""}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <p>
                Please enter your yearly taxable income (in Singapore dollar):
              </p>
              <input
                type="number"
                step="0.01"
                id="income"
                name="income"
                placeholder="0.00"
                value={this.state.income || ""}
                onChange={this.handleChange}
              />
            </div>
          )}
        </form>
        <br />
        <p>
          Payable tax:{" "}
          <code className="digit">
            {new Intl.NumberFormat(`en-SG`, {
              currency: `SGD`,
              style: "currency",
              minimumFractionDigits: 2,
            }).format(tax)}
          </code>
        </p>
        <p>
          Your take home amount:{" "}
          <code className="digit">
            {new Intl.NumberFormat(`en-SG`, {
              currency: `SGD`,
              style: "currency",
              minimumFractionDigits: 2,
            }).format(assessableIncome - tax)}
          </code>
        </p>
        <p>
          Effective tax rate = <code className="digit">{taxRate}</code> %
        </p>
        <br />
        <br />
        <footer>
          Made with <span className="love">♥</span> by{" "}
          <a href="https://pranabdas.github.io/">Pranab</a>.
        </footer>
      </div>
    );
  }
}

export default App;
