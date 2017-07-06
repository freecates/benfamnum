const Options = ( props => {
  const renderedElements = props.options.map((option) => {
    <div value={option.value}>{option.label}</div>
    })
    console.log(`Rendered Elements. Count: ${renderedElements.length}`)
    console.log(renderedElements)
    return (<option>{renderedElements}</option>);    
 });

class SelectCity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        options: this.props.options,
        selectedValue: this.props.options[0].value
        //label: this.props.label
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({selectedValue: event.target.options[event.target.selectedIndex].value});
  }

  handleSubmit(event) {
    window.location.href=this.state.selectedValue;
    event.preventDefault();
  }

  render() {
    console.log("New props ", this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Selecciona la localidad
          <select onChange={this.handleChange}>
            <Options options={this.state.options} />
          </select>
        </label>
        <input className='button' type='submit' value='Enviar' />
      </form>
    );
  }
}
export default SelectCity