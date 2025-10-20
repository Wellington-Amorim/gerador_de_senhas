const tamanhoSenha = document.getElementById('tamanhoSenha');
const saidaTamanhoSenha = document.getElementById('saidaTamanhoSenha');
const maiusculo = document.getElementById('maiusculo');
const minusculo = document.getElementById('minusculo');
const numero = document.getElementById('numero');
const simbolo = document.getElementById('simbolo');
const emoji = document.getElementById('emoji');
const senhaGerada = document.getElementById('senhaGerada')
const copiarBtn = document.getElementById('copiarBtn');
const forcaSenha = document.getElementById('forcaSenha');


tamanhoSenha.addEventListener('input', () => {
    saidaTamanhoSenha.textContent = tamanhoSenha.value
});

function gerarSenha() {
    let caracteres = '';
    if (maiusculo.checked) caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (minusculo.checked) caracteres += 'abcdefghijklmnopqrstuvwxyz';
    if (numero.checked) caracteres += '0123456789';
    if (simbolo.checked) caracteres += '!@#$%^&*()_+[]{}|;:,.<>?';
    if (emoji.checked) caracteres += '🐶🙂☠️👽😈👻💩🤖👾😽🐭🐲👁️👍💋';

    if (caracteres === '') {
        return 'Selecione pelo menos uma das opções!';
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha.value; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indice];
    }
    return senha;
}

document.getElementById('gerarBtn').addEventListener('click', () => {
    const novaSenha = gerarSenha();
    senhaGerada.innerText = novaSenha;

    if (novaSenha === 'Selecione pelo menos uma das opções!') {
        forcaSenha.textContent = '';
        return;
    }

    const forca = verificarForca(novaSenha);
    forcaSenha.textContent = `${forca.texto}`;
    forcaSenha.style.color = forca.cor;
});

copiarBtn.addEventListener('click', () => {
  const senha = senhaGerada.innerText;
  if (!senha || senha.startsWith('Selecione')) {
    copiarBtn.innerText = 'Gere uma senha válida antes de copiar!';
    setTimeout(voltarTituloCopia, 2000);
    return;
  }

  navigator.clipboard.writeText(senha)
    .then(() => {
      copiarBtn.innerText = 'Senha copiada com sucesso!';
      copiarBtn.style.backgroundColor = 'rgba(0, 255, 42, 0.47)';
      setTimeout(voltarTituloCopia, 2000);
    })
    .catch(err => {
      console.error('Erro ao copiar a senha:', err);
      copiarBtn.innerText = 'Não foi possível copiar a senha.';
    });
});

function voltarTituloCopia () {
    copiarBtn.innerText = 'Copiar para a área de transferência';
    copiarBtn.style.backgroundColor = 'transparent';
}

function verificarForca(senha) {
  let pontuacao = 0;

  if (senha.length >= 8) pontuacao++;
  if (senha.length >= 12) pontuacao++;
  if (senha.length >= 16) pontuacao++;
  if (senha.length >= 20) pontuacao++;
  if (senha.length >= 25) pontuacao++;
  if (/[A-Z]/.test(senha)) pontuacao++;
  if (/[a-z]/.test(senha)) pontuacao++;
  if (/[0-9]/.test(senha)) pontuacao++;
  if (/[^A-Za-z0-9]/.test(senha)) pontuacao++;

  if (pontuacao <= 3) return { texto: 'FRACA', cor: 'red' };
  if (pontuacao <= 6) return { texto: 'MEDIA', cor: 'tomato' };
  if (pontuacao <= 8) return { texto: 'FORTE', cor: 'green' };
  return { texto: 'EXCELENTE', cor: 'limegreen' };
}