const protocolo = "http://"
const baseURL = "localhost:3000"

const verificarPagina = () => {
    const token = localStorage.getItem("token")

    if (token) {
        window.location.replace("http://localhost:3000/admin")
    }
}

const fazerLogin = async (event) => {
    event.preventDefault() // Evita que o form recarregue a página

    let emailLoginInput = document.querySelector("#emailLoginInput")
    let senhaLoginInput = document.querySelector("#senhaLoginInput")
    let emailLogin = emailLoginInput.value
    let senhaLogin = senhaLoginInput.value

    if (emailLogin && senhaLogin) {
        try {
            const loginEndpoint = "/login"
            const urlCompleta = `${protocolo}${baseURL}${loginEndpoint}`
            const response = await axios.post(urlCompleta, { email: emailLogin, senha: senhaLogin })
            const token = response.data.token
            localStorage.setItem("token", token) // Salva o token no local storage 
            emailLoginInput.value = ""
            senhaLoginInput.value = ""
            window.location.replace("http://localhost:3000/admin") // Redireciona para a página de administração
        } catch (e) {
            console.log(e.message)
            if (e.response) {
                console.log(e.response.data)
            }
        }
    }
    else {
        console.log("Por favor, preencha todos os campos!")
    }
}

const fazerLogout = async () => {
    localStorage.removeItem("token")
    window.location.replace("../index.html")
}


document.getElementById("login-form").addEventListener("submit", fazerLogin)