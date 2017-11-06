import btoa from 'btoa'
import fetch from 'isomorphic-unfetch'

class IsMember extends React.Component {
    constructor(props) {
      super(props);
      console.log(this.props.dataOK);
      this.state = {
          isEmail: '',
          isPassword:'',
          isRegistered: false,
          HowTo: this.props.dataOK

    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
  
    handleSubmit = async function (event) {

        const user = 'beneficios'
        const method = 'isAssociated'
        const params = {
            user: this.state.isEmail,
            pass:this.state.isPassword
        }
        const jsonData = JSON.stringify(params)
        const jsonDataEncode = btoa(jsonData)
        const data = {
            method: method,
            params: jsonDataEncode
        }
        const dataEncode = JSON.stringify(data)

        const res = await fetch(`http://www.familias-numerosas.org/v2/ws/endpoint.php?user=${user}&data=${dataEncode}`)
        const isRegistered = await res.json()
        this.setState({
            isRegistered: isRegistered.Response
        })
        
      event.preventDefault();
    }
  
    render() {
        if (this.state.isRegistered != true) {
            return (
                <section>
                    <div className='wrapper'>
                        <h1><span className='label alert file-label'>EXCLUSIVO SOCIOS.<br/>PARA SABER CÓMO CONSEGUIR LA OFERTA DEBES IDENFICARTE</span></h1>
                        <form>
                        <label>
                            Correo electrónico:
                            <input type="email" name='isEmail' value={this.state.isEmail} onChange={this.handleChange} />
                        </label>
                        <label>
                            Contrasenya:
                            <input type="password" name='isPassword' value={this.state.isPassword} onChange={this.handleChange} />
                        </label>
                        <div className='wrapper-input'><input type="button" className='button' onClick={this.handleSubmit} value="Enviar" /></div>
                        </form>
                    </div>
                    <style jsx>{`
                        @media screen and (min-width: 1024px) {
                            .wrapper {
                            width: 50%;
                            margin: 0 auto;
                            }
                        }
                        form {
                        padding: 2em;
                        background: #333333;
                        }
                        label {
                        color:#ffffff;
                        }
                        .wrapper-input {
                        width:100%;
                        padding:1em;
                        }
                        input[type=button] {
                        background:#009933;
                        margin:0 auto;
                        display:block;
                        width:50%;
                        }
                        input[type=button]:hover {
                        background:#007e2a;
                        }
                        h1, label {
                            text-align:center;
                        }
                        .file-label {
                            background:#cc0033;
                            color:#ffffff;
                            font-weight:bold;
                            padding:1em;
                            white-space:normal;
                        }
                    `}</style>
                </section>
            );
        } else 
        return (
            <div className='callout large alert'>
                <p>¡ATENCIÓN!: <span>{this.state.HowTo}</span></p>
            </div>
        ); 
    }
  }
  export default IsMember