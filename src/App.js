import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {

  state = {
    automata: {
      alfabeto: [],
      states: [],
      transitions: {},
      initialState: '',
      acceptanceStates: []
    },
    rows: 1,
    columns: 1
  };

  add = false;

  columns = this.state.automata.alfabeto.map((alfa) => <th scope="col">{alfa}</th>);
  rows = this.state.automata.states
    .map((state, index) => Row({
      isIntial: state === this.state.automata.initialState,
      isLast: index === this.state.automata.states.length - 1,
      state,
      transitions: this.state.automata.transitions[state]
    }));

  addState(state, isAnAcceptanceState) {
    if (isAnAcceptanceState) {
      this.state.automata.acceptanceStates.push(state);
    }

    if (this.state.automata.states.length === 0) {
      this.state.automata.initialState = state;
    }

    this.state.automata.states.push(state);
  }

  addRow(event) {
    
  }

  confirm() {

  }

  addColumn() {

  }

  removeRow() {

  }

  removeColumn() {

  }

  reset() {

  }

  render() {
    return (
      <div className="App container mt-5">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              {this.columns}
            </tr>
          </thead>
          <tbody>
            {this.rows}

            {this.add &&
              EditRow({addState: this.addState})
            }
          </tbody>
        </table>
        <button onClick={this.addRow}>Agregar Fila</button>

      </div>
    );
  }
}

function Row(props) {

  const state = props.isIntial ? `->${props.state}` : props.isLast ? `*${props.state}` : props.state;
  const transitions = Object.entries(props.transitions).map((transition) => Transition({ element: transition[1] }));

  return (
    <tr>
      <th scope="row">{state}</th>
      {transitions}
    </tr>
  );
}


function Transition(props) {
  return <td>{props.element}</td>;
}

class EditRow extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    state: '',
    transitions: {}
  }

  squares = null

  handleChange(e) {
    this.squares = this.props.alfabeto.map((alfa) => {
      this.transitions[this.state.state][alfa] = {};
      return <td><input type="text" value={this.state.transitions[this.state.state][alfa]} onChange={this.handleChangeTransition} /></td>
    });
    const values = e.target.value.split('');
    let isAnAcceptanceState = false;
    if (values[0] === '*') {
      isAnAcceptanceState = true;
      this.props.addState(values[1], isAnAcceptanceState);
    } else {
      this.props.addState(e.target.value, isAnAcceptanceState);
    }
  }

  handleChangeTransition(e) {
    const values = e.target.value.split('');
    let isAnAcceptanceState = false;
    if (values[0] === '*') {
      isAnAcceptanceState = true;
      this.props.addState(values[1], isAnAcceptanceState);
    } else {
      this.props.addState(e.target.value, isAnAcceptanceState);
    }
  }

  render() {
    return (
      <tr>
        <form onSubmit={this.handleSubmit}>
          <th scope="row">
            <input type="text" value={this.state.state} onChange={this.handleChange} />
          </th>
          
          {this.state.state != '' &&
            this.squares
          }
        </form>
      </tr>
    );
  }
}

export default App;

// automata: {
//   alfabeto: ['0', '1'],
//   states: ['p', 'q', 'r', 's', 't'],
//   transitions: {
//     p: { 0: 'p', 1: 'p,q' },
//     q: { 0: 'r', 1: '' },
//     r: { 0: 's', 1: '' },
//     s: { 0: 't', 1: '' },
//     t: { 0: '', 1: '' },
//   },
//   initialState: 'p',
//   acceptanceStates: ['t']
// }