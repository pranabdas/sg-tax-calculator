import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      income: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  render() {
    let income = parseFloat(this.state.input);

    let tax = 0.0,
      taxRate = 0.0;

    if (isNaN(income)) {
      income = 0.0;
    } else if (income <= 20000) {
      tax = 0.0;
    } else if (income <= 30000) {
      tax = ((income - 20000) * 2.0) / 100;
    } else if (income <= 40000) {
      tax = 200 + ((income - 30000) * 3.5) / 100;
    } else if (income <= 80000) {
      tax = 550 + ((income - 40000) * 7.0) / 100;
    } else if (income <= 120000) {
      tax = 3350 + ((income - 80000) * 11.5) / 100;
    } else if (income <= 160000) {
      tax = 7950 + ((income - 120000) * 15.0) / 100;
    } else if (income <= 200000) {
      tax = 13950 + ((income - 160000) * 18.0) / 100;
    } else if (income <= 240000) {
      tax = 21150 + ((income - 200000) * 19.0) / 100;
    } else if (income <= 280000) {
      tax = 28750 + ((income - 240000) * 19.5) / 100;
    } else if (income <= 320000) {
      tax = 36550 + ((income - 280000) * 20.0) / 100;
    } else if (income > 320000) {
      tax = 44550 + ((income - 320000) * 22.0) / 100;
    }

    // avoid indefinite taxRate
    if (income === 0) {
      taxRate = null;
    } else {
      taxRate = ((tax * 100) / income).toFixed(2);
    }

    return (
      <div className="container">
        <h3 style={{ color: "#15847b" }}>Singapore tax calculator</h3>
        <hr />
        <br />
        <p>
          This app calculates personal income tax for Singapore residents. Tax
          rates are last checked in January 2022 from{" "}
          <a href="https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/new-to-tax/individual-income-tax-rates">
            IRAS website
          </a>
          .
        </p>
        <br />
        <form className="form">
          <p>Please enter your yearly taxable income (in Singapore dollar):</p>
          <input
            type="number"
            step="0.01"
            id="income"
            name="income"
            // short circuit to replace undefined value
            value={this.state.input || ""}
            onChange={this.handleChange}
          ></input>
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
            }).format(income - tax)}
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
