import btoa from 'btoa'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

class IsMember extends React.Component {
    constructor(props) {
      super(props);
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

        const res = await fetch(`https://www.familias-numerosas.org/v2/ws/endpoint.php?user=${user}&data=${dataEncode}`)
        const isRegistered = await res.json()
        this.setState({
            isRegistered: isRegistered.Response
        })       
      event.preventDefault();
    }
  
    render() {
        console.log(`Hola: ${this.state.isRegistered}`)
        if (this.state.isRegistered == true) { 
            return (
                <section>
                    <div className='callout large alert fade-in'>
                        <p>¡ATENCIÓN!: <span>{this.state.HowTo}</span></p>
                    </div>
                        <style jsx>{`
                            .fade-in {
                            animation-name: fadeIn;
                            animation-duration: 1.3s;
                            animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
                            animation-fill-mode: forwards;
                            }
                            @keyframes fadeIn {
                            from {
                                opacity: 0;
                            }
                            to {
                                opacity: 1;
                            }
                            }
                        `}</style>
                </section>
            );
        } else 
            return (
                <section>
                    <div className='wrapper'>
                        <h1><span className='label alert file-label'>EXCLUSIVO SOCIOS.<br/>PARA SABER CÓMO CONSEGUIR LA OFERTA DEBES IDENFICARTE</span></h1>
                        <form>
                        <label>
                            Correo electrónico:
                            <input type="email" name='isEmail' value={this.state.isEmail} onChange={this.handleChange} required />
                        </label>
                        <label>
                            Contrasenya:
                            <input type="password" name='isPassword' value={this.state.isPassword} onChange={this.handleChange}required />
                        </label>
                        <div className='wrapper-input'><input type="button" className='button' onClick={this.handleSubmit} value="Enviar" /></div>
                        <p className='yellow margin-inverse'>¿Quieres participar de estos beneficios? Ahora te puedes hacer socio. ¡Fácil y rápido!</p>
                        <div className='wrapper-input'><Link href='/hazte-socio' prefetch><a className='button button-pink' >Sí, quiero hacerme socio</a></Link></div>
                        </form>
                    </div>
                    <style jsx>{`
                        @media screen and (min-width: 768px) {
                            .wrapper {
                            width: 80%;
                            margin: 0 auto;
                            }
                        }
                        @media screen and (min-width: 1024px) {
                            .wrapper {
                            width: 50%;
                            }
                        }
                        form {
                        padding: 2em;
                        background: #333333;
                        border-radius:6.5%;
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
                        .button-pink {
                        background:#cc3366;
                        margin:0 auto;
                        display:block;
                        width:50%;
                        color:#ffffff!important;
                        }
                        .button-pink:hover {
                        background:#a62953;
                        }
                        h1, label, p {
                            text-align:center;
                        }
                        .yellow {
                            color:#f3f303;
                        }
                        .margin-inverse {
                            margin-top:1em;
                            margin-bottom:0;
                        }
                        .file-label {
                            background:#cc0033;
                            color:#ffffff;
                            font-weight:bold;
                            padding:1em;
                            white-space:normal;
                        }
                        .fade-in {
                          animation-name: fadeIn;
                          animation-duration: 1.3s;
                          animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
                          animation-fill-mode: forwards;
                        }
                        @keyframes fadeIn {
                          from {
                            opacity: 0;
                          }
                          to {
                            opacity: 1;
                          }
                        }
                    `}</style>
                </section>
            ); 
    }
  }
  export default IsMember