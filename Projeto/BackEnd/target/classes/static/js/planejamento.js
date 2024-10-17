const url ='http://localhost:8080/crud/aeronave/plano'
let token = sessionStorage.getItem('token');
const tbody = document.querySelector('#planejamentoTbody')


//Renderizaar o planejamento na tela
function inserirPlanejamento(planejamento) {
    let tr =document.createElement('tr');

    tr.innerHTML = `
        <td>${planejamento.modelo}</td>
        <td>${planejamento.autonomia}</td>
        <td>${planejamento.primeiraClasse}</td>
        <td>${planejamento.economicaClasse}</td>
        <td>${planejamento.pesoDisponivel}</td>
    `;
    tbody.appendChild(tr);
}

function loadPlanejamento(){
    fetch(url,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(planejamentos => {
            tbody.innerHTML = ''

            planejamentos.forEach((planejamento) => {
                inserirPlanejamento(planejamento);
            });
        })
}
loadPlanejamento()

document.addEventListener('DOMContentLoaded', (event) => {
    validateAndRedirect()
    verificarUsuario()
});

//autenticação
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function isTokenExpired(token) {
    const decodedToken = parseJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
}

function validateAndRedirect() {
    const token = sessionStorage.getItem('token');

    if (token) {
        if (!isTokenExpired(token)) {
            fetch('/validate-token', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        sessionStorage.removeItem('token');
                        window.location.href = '/login';
                    }
                })
                .catch(error => {
                    console.error('Erro ao validar token no backend:', error);
                    sessionStorage.removeItem('token');
                    window.location.href = '/login';
                });
        } else {
            sessionStorage.removeItem('token');
            window.location.href = '/login';
        }
    } else {
        window.location.href = '/login';
    }
}

function verificarUsuario() {
    const token = sessionStorage.getItem('token');

    if (token) {
        const decodedToken = parseJwt(token);
        const roles = decodedToken.roles; // Acesso correto ao array de roles

        // Verifica se a role "ROLE_ADMIN" está presente no array de roles
        if (roles.includes('ROLE_ADMIN')) {
            adicionarFuncionariosNaSidebar();
        }
    }
}

function adicionarFuncionariosNaSidebar() {
    const sidebar = document.getElementById('sidebar');
    const funcionariosItem = document.createElement('li');
    funcionariosItem.innerHTML = `
        <a href="funcionarios">
            <i><img src="images/equipe.png" alt=""></i> 
            <div>Funcionários</div>
        </a>
    `;
    sidebar.appendChild(funcionariosItem);
}
