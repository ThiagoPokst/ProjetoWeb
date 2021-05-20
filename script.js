var butEntrar = document.querySelector("#showUserButton"),
            butCadastrar = document.querySelector("#cadastrarButton"),
            butCadastro = document.querySelector(".hideCadastroLogin"),
            camposCadastro = document.querySelector(".camposCadastro"),
            hideUserLogin = document.querySelector(".campos"),
            firstButton = document.querySelector(".button1")
            hideButtonLogin = document.querySelector(".hideButtonLabel"),
            butLogin = document.querySelector("#loggingButton"),
            butLogoff = document.querySelector("#logoffButton"),
                        
            userInput = document.querySelector("#fname"),
            passInput = document.querySelector("#lname"),
            hidingText = document.querySelector("#wrongData"),

            pokInput = document.querySelector("#pokInput"),
            pokInputId = document.querySelector("#pokInputId"),
            pokInputWeight = document.querySelector("#pokInputWeight"),
            pokInputName = document.querySelector("#pokInputName"),
            searchDiv = document.querySelector("#searchDiv"),
            infoPokDiv = document.querySelector(".infoPokDiv"),
            pokeImg = document.querySelector("#pokeImg"),
            wrongSearchData = document.querySelector("#wrongSearchData"),
            searchButton = document.querySelector("#searchButton");


        butCadastrar.addEventListener("click", function(){
            butCadastrar.style.display= 'none';
            butCadastro.style.display = 'block';
            camposCadastro.style.display = 'block';
            hideUserLogin.className= 'campos none'
            firstButton.style.display= 'none';

            }); 

        butEntrar.addEventListener("click", function(){
            hideUserLogin.className= 'campos show'
            hideButtonLogin.className= 'hideLogin show'
            firstButton.style.display = 'none';
            butLogin.style.display= 'block';
            butCadastro.style.display = 'none';
            butCadastrar.style.display= 'none';
        });   
        
        butLogoff.addEventListener("click", function(){
            localStorage.setItem('acesso', 'false');
            stateToLog();
            infoPokDiv.style.display= 'none';
        });

        const searchApi =() =>{

            axios.get('https://finalspaceapi.com/api/v0/character/'+pokInput.value+'')
                .then(function (poke){
                    pokeImg.src = poke.data.img_url;
                    pokInputName.innerHTML = 'Name: '+ poke.data.name;
                    pokInputId.innerHTML = 'Gender: '+ poke.data.gender;
                    pokInputWeight.innerHTML = 'Specie: '+ poke.data.species+ '';
                }).catch(() => {
                    wrongSearchData.style.display='block';
                    infoPokDiv.style.display= 'none';
                    return false;
                });

            pokInput.value = '';
        }

        const stateLogged = () => {
            hideUserLogin.className= 'campos none';
            hideButtonLogin.className= 'hideLogin none';
            butLogin.style.display= 'none';
            firstButton.style.display = 'none';
            butLogoff.style.display= 'block';
            userInput.value = '';
            passInput.value = '';
            searchDiv.style.display='block';
        }
        
        const stateToLog = () => {
            butLogin.style.display= 'none';
            firstButton.style.display= 'block';
            butLogoff.style.display= 'none';
        }        

        if(localStorage.getItem('acesso') == 'true'){
            stateLogged();
        }else {
            stateToLog();
        }

        butLogin.addEventListener("click", function(event){
            event.preventDefault();

            
            if (userInput.value.length < 3 || passInput.value.length < 3){
                hidingText.style.display= 'block';
                hidingText.innerHTML = 'Os campos devem ter mais que 3 caracteres!';
                return false;
            }            

            fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userInput.value,
                    password: passInput.value,
                })
            }).then((response) =>{
                if(response.status != 200){
                    hidingText.style.display= 'block';
                    hidingText.innerHTML = 'Usuário invalido!';
                }else{
                    stateLogged();

                    localStorage.setItem('acesso', 'true');
                }
                return response.json();
            }).catch(() => {

            })  
        });