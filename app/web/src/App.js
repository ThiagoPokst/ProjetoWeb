import './style.css';
import React, { useState, useEffect ,useRef } from 'react';
import api from './services/api';

function App() {
  const [user, setUser] = useState('');
  const [bioUser, setBioUser] = useState('');
  const [ocupUser, setOcupUser] = useState('');

  const [post, setPost] = useState([]);
  
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [bio, setBio] = useState('');
  const [ocup, setOcup] = useState('');

  const [text, setText] = useState('');

  const cadastroButton = useRef(0);
  const cadastroCampos = useRef(1);
  const cadastrarButton = useRef(2);
  const loginCampos = useRef(3);
  const loginButton = useRef(4);
  const entrarButton = useRef(5);
  
  const cadstroSucesso = useRef(6);
  
  const sessionCampo = useRef(7);
  const mensagemCampo = useRef(8);
  
  const loggofButton = useRef(9);

  const wrongUser = useRef(10);  
  
  const postCampos = useRef(11);
  const inputMensagemCampo = useRef(12);

  useEffect(()=> {
    async function loadPost(){
      const response = await api.get('/post');

      setPost(response.data);
    }

    loadPost();
  }, []);

  const activeLogin = () => {
    cadastrarButton.current.style.display = 'none';
    cadastroCampos.current.style.display = 'none';
    cadastroButton.current.style.display = 'none';
    entrarButton.current.style.display = 'none';
    cadstroSucesso.current.style.display= 'none';

    loginButton.current.style.display = 'block';
    loginCampos.current.style.display = 'block';
  }  
  
  const activeCadastro = () => {
    loginButton.current.style.display = 'none';
    loginCampos.current.style.display = 'none';
    entrarButton.current.style.display = 'none';
    cadastrarButton.current.style.display = 'none';
    cadstroSucesso.current.style.display= 'none';

    cadastroButton.current.style.display = 'block';
    cadastroCampos.current.style.display = 'block';
  }

  const activeStartScreen = () => {
    loggofButton.current.style.display='none';
    entrarButton.current.style.display = 'block';
    cadastrarButton.current.style.display = 'block';

    sessionCampo.current.style.display = 'none';
    mensagemCampo.current.style.display = 'none';
    
    cadastroButton.current.style.display = 'none';
    cadastroCampos.current.style.display = 'none';
  }
  
  async function handleRealizarPost(e){
    e.preventDefault();
    const user = localStorage.getItem('id');
    const response = await api.post('/post', {
      text,
      user,
    })

    setText('');
    setPost([...post, response.data]);
  }

  async function handleCadastroUser(e){
    e.preventDefault();

    const response = await api.post('/users', {
      login,
      pass,
      bio,
      ocup,
    })
    
    setLogin('');
    setPass('');
    setBio('');
    setOcup('');
    cadstroSucesso.current.style.display= 'block';
    activeStartScreen();
  }

  async function handleLoginUser(e){
    e.preventDefault();

    try{
      const response = await api.post('/session', {login, pass })
      wrongUser.current.style.display='none';

      localStorage.setItem('user', response.data.user.login);
      localStorage.setItem('ocup', response.data.user.ocup);
      localStorage.setItem('bio', response.data.user.bio);
      localStorage.setItem('id', response.data.user._id);

      setUser(localStorage.getItem('user'));
      setBioUser(localStorage.getItem('bio'));
      setOcupUser(localStorage.getItem('ocup'));
      postCampos.current.style.display = 'block';

      
      setLoggedCampos();

    }catch(err){
      wrongUser.current.style.display='block';
    }
    setLogin('');
    setPass('');
  }

  
  function setLoggedCampos(){
    sessionCampo.current.style.display='block';
    mensagemCampo.current.style.display='block';

    loggofButton.current.style.display='block';
    
    loginButton.current.style.display = 'none';
    loginCampos.current.style.display = 'none';
  }
  
  return (
<html>
    <head>
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <link rel="icon" type="imagem/png" href="https://i.imgur.com/Dwt7WW5.png" />
    </head>
    <body>
        <header>
          <div className="cab">
                <div className="icone">
                        <div className="icone-fig">
                            <a href="https://rocketseat.com.br" >
                                <img src="https://i.imgur.com/zcbk0uI.png"/>
                            </a>
                        </div>
                        <div className="manifesto">
                            <a href="https://rocketseat.com.br/manifesto" >Manifesto</a>
                        </div>
                </div>
                 
                <form onSubmit={handleCadastroUser}>

                  <div className="camposCadastro" ref={cadastroCampos} style={{marginLeft:40 , marginTop:150 , display: 'none'}}>      
                      <label htmlFor="fname">Username:</label>
                      <input type="text" id="fname" name="fname" style={{color:"black"}}required value ={login} onChange={ e=> setLogin(e.target.value)}/><br/><br/>
                      <label htmlFor="lname">Senha:</label>
                      <input type="text" id="lname" name="lname" style={{color:"black"}}required value ={pass} onChange={ e=> setPass(e.target.value)}/><br/><br/>
                      <label htmlFor="lname">Biografia:</label>
                      <input type="text" id="lname" name="lname" style={{color:"black"}}required value ={bio} onChange={ e=> setBio(e.target.value)}/><br/><br/> 
                      <label htmlFor="lname">Ocupação:</label>
                      <input type="text" id="lname" name="lname" style={{color:"black"}}required value ={ocup} onChange={ e=> setOcup(e.target.value)}/><br/><br/> 

                      <button className="button" ref={cadastroButton} id='cadastroButton'>
                          Cadastro
                      </button> 
                  </div>

                  <label htmlFor="lname" ref={cadstroSucesso} style={{color:"#04d361" ,display: 'none' }}>Cadastro realizado!</label>  
                    
                  <div className="cadastrarButton" ref={cadastrarButton}>
                      <button className="button"  id='cadastrarButton' onClick={activeCadastro} >
                          Cadastrar
                      </button> 
                  </div>

                </form>
                
                <form onSubmit={handleLoginUser}>
                  <div className="campos" ref={loginCampos}  style={{marginTop:150}}>      
                      <label htmlFor="fname">Usuario:</label>
                      <input type="text" id="fname" name="fname" style={{color:"black"}} required value ={login} onChange={ e=> setLogin(e.target.value)}/><br/><br/>
                      <label htmlFor="lname">Senha:</label>
                      <input type="text" id="lname" name="lname" style={{color:"black"}} required value ={pass} onChange={ e=> setPass(e.target.value)}/><br/><br/>
                      <label htmlFor="lname" ref={wrongUser} id="wrongData" style={{color:"rgb(202, 7, 7)" ,display: 'none' }}>Usuario ou senha Inválidos</label>    

                      <button className="button"  ref={loginButton} id="loggingButton" >
                          Logar
                      </button>
                  </div>   
    
                  <div className="button1" ref={entrarButton} style={{marginRight:40}}>
                      <button  id='showUserButton'onClick={activeLogin}>
                          Entrar
                      </button> 
                  </div>
                </form>

                <div className="button2"  ref={loggofButton} style={{display: 'none'}}>
                    <button className="button" id='logoffButton'onClick={activeStartScreen}>
                        Sair
                    </button> 
                </div>
            </div>  

        </header>


        <div className="div1" style= {{marginTop:180}} >
            <h1 className="h1"> Timeline users<b>.</b> </h1>
        </div>

        <div className="div2">
            <p>Junte-se a milhares de devs e acelere<br/> na direção de seus objetivos.<br/><br/> Escreva abaixo sua experiencia com a rocketseat.</p>
            <div className="button" >
                <button className="button">
                    <a href="https://app.rocketseat.com.br/signup" >Embarcar no Foguete</a>
                </button>
            </div>
        </div>

        <form onSubmit={handleRealizarPost}>
          <div ref={postCampos} style={{display:'none', marginBottom:100 ,marginTop:150}}>
            <div style={{marginLeft:600, marginTop:50}}>

              <input type="text" id="fname" name="fname" style={{color:"black", width: 400 ,height: 100}} required value ={text} onChange={ e=> setText(e.target.value)}/><br/><br/>

            </div>

            <div>
              <button class="button1" style={{width: 150, position:'absolute', marginLeft: 850}}>
                  <a>Publicar</a>
              </button>
            </div>
          </div>
        </form>

        <div ref={sessionCampo} style={{backgroundColor: "#8257e6" , position:'absolute', marginLeft:130, display:'none',width:200 , height:80, zIndex:1}}>            
           
          <label htmlFor="lname" id="wrongData" style={{color: "black", display: 'block' }}>-Sessão Logada-</label>
          <label htmlFor="lname" id="wrongData" style={{color: "black", display: 'block' }}>Usuário: {user} </label>
          <label htmlFor="lname" id="wrongData" style={{color: "black", display: 'block' }}>Biografia: {bioUser} </label>
          <label htmlFor="lname" id="wrongData" style={{color: "black", display: 'block' }}>Ocupação: {ocupUser} </label>          

        </div>
        
        <div ref={mensagemCampo} style={{display: 'none'}}>
          {post.map(post =>(
          <div className="conteudo"  style={{display: 'block',marginLeft:600 , marginTop:50}}>
              <p>Usuário: {post.user.login}</p>
              <p>Ocupação: {post.user.ocup}</p>

              <div style={{backgroundColor: "#000" , position:'absolute', marginLeft:100, marginTop:0 , width:155, height:85, zIndex:1}}>

              </div>
              
              <div style={{backgroundColor: "#fff", position:'absolute', marginLeft:102, marginTop:2, width:150, height:80, zIndex:1}}>
                  <p style={{color:"#000"}}>Mensagem - {post.text} </p>
              
              </div>
          </div>

          ))}
      </div>

        
    </body>
</html>


)}

export default App;
