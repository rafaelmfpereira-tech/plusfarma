let carrinho = [];

fetch("api/medicamentos.json")
  .then(res => res.json())
  .then(data => mostrarMedicamentos(data));

function mostrarMedicamentos(medicamentos) {
  const lista = document.getElementById("lista-medicamentos");
  lista.innerHTML = "";

  medicamentos.forEach(m => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${m.nome}</h3>
      <p>${m.descricao}</p>
      <p><strong>${m.farmacia}</strong></p>
      <p class="preco">${m.preco.toLocaleString()} Kz</p>
      <button onclick="addCarrinho('${m.nome}', ${m.preco})">Adicionar</button>
    `;
    lista.appendChild(card);
  });
}

function addCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  document.getElementById("cart-count").innerText = carrinho.length;
  renderCarrinho();
}

function renderCarrinho() {
  const lista = document.getElementById("cart-items");
  lista.innerHTML = "";
  carrinho.forEach(i => {
    const li = document.createElement("li");
    li.textContent = `${i.nome} - ${i.preco.toLocaleString()} Kz`;
    lista.appendChild(li);
  });
}

function toggleCarrinho() {
  document.getElementById("carrinho").classList.toggle("hidden");
}

function toggleLogin() {
  document.getElementById("login").classList.toggle("hidden");
}

function login() {
  alert("Login simulado com sucesso");
}
