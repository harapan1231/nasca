import Inferno from 'inferno';
import Component from 'inferno-component';

class SubjectDropdown extends Component {
  constructor(props) {
    super(props);
    this.subjects = ["k", "l", "m"];
  }
  render() {
    return (
      <select className="column">{
        this.subjects.map((subject, i) => {
          return (
            <option>{ subject }</option>
          )
        })
      }</select>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      inputVal: 0, 
    };

    this.rows = [
      {name: "sale",  subject: "k", io: "i", amount: 10000},
      {name: "food",  subject: "l", io: "o", amount: 1000},
      {name: "paper", subject: "m", io: "o", amount: 2000},
      {name: "train", subject: "",  io: "o", amount: 1000},
      {name: "hotel", subject: "k", io: "o", amount: 5000},
    ];
    this.sum = 0;

    this.inputOnChange = this.inputOnChange.bind(this);
  }
  inputOnChange(e) {
    console.log(e);
    this.setState({
      inputVal: e.target.value
    });
  };

  render() {
    return (
      <div>
        <h1>Nasca</h1>
        <div className="container">
          <span>Counter is at: { this.state.counter }</span>
          {
            this.rows.map((row, i) => {
              return (
                <div className="row">
                  <span className="column">{ row.name }</span>
                  <SubjectDropdown />
                  <span className="column">{ row.io === "i" ? "Income" : "Outcome" }</span>
                  <input type="text" onInput={ this.inputOnChange } value={ this.state.inputVal } />
                </div>
              )
            })
          }
          <div className="row">{ this.rows.reduce((x, y) => { let z = x; z.amount += y.amount; return z }).amount }</div>
        </div>
      </div>
    )
  }
}

Inferno.render(
  <App />,
  document.getElementById("app")
);
