const Options = ( props => {
    console.log("here new props are used", props)
    return <option value={props.value}>{props.label}</option>    
 }
);

class SelectCity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: this.props.value,
        label: this.props.label
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    window.location.href=this.props.value;
    event.preventDefault();
  }

  render() {
    console.log("New props ", this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Selecciona la localidad
          <select value={this.state.value} onChange={this.handleChange}>
            <Options value={this.state.value} label={this.state.label} />
          </select>
        </label>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}
export default SelectCity