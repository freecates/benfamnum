class SelectCity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        elements: this.props.options,
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
    
    const renderedElements = this.state.elements.map((element) => {
      return ( <option value={element.value}>{element.label}</option> )
   })

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Selecciona la localidad
          <select onChange={this.handleChange}>
            {renderedElements}
          </select>
        </label>
        <input className='button' type='submit' value='Ver beneficios' />
      </form>
    );
  }
}
export default SelectCity