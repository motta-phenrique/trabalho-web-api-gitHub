document.getElementById('search-button').addEventListener('click', function() {
    const username = document.getElementById('username-input').value; 

    if (!username) {
        document.getElementById('error-message').textContent = 'Por favor, insira um nome de usuário.';
        document.getElementById('user-info').style.display = 'none';
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
    .then(res => {
        if (!res.ok) {
            if (res.status === 404) {
                throw new Error('Usuário não encontrado');
            } else {
                throw new Error(`Erro: ${res.status}`);
            }
        }
        return res.json();
    })
    .then(data => {
       
        document.getElementById('user-avatar').src = data.avatar_url;
        document.getElementById('user-name').textContent = `Nome: ${data.name || 'Nome não disponível'}`;
        document.getElementById('user-bio').textContent = `Bio: ${data.bio || 'Sem bio disponível'}`;

        document.getElementById('user-info').style.display = 'block';
        document.getElementById('error-message').textContent = ''; 
    })
    .catch(error => {
    
        document.getElementById('error-message').textContent = error.message;
        document.getElementById('user-info').style.display = 'none'; 
    });
});