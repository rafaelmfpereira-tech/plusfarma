let carrinho = [];

fetch("api/medicamentos.json")
  .then(res => res.json())
  .then(data => carregarProdutos(data));

function carregarProdutos(produtos) {
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";

  produtos.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.imagem}">
      <h3>${p.nome}</h3>
      <p>${p.categoria}</p>
      <p>${p.descricao}</p>
      <p class="preco">${p.preco.toLocaleString()} Kz</p>
      <button onclick="addCarrinho('${p.nome}', ${p.preco})">
        Adicionar ao carrinho
      </button>
    `;

    lista.appendChild(card);
  });
}

function addCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  document.getElementById("cart-count").innerText = carrinho.length;

  const lista = document.getElementById("cart-items");
  const li = document.createElement("li");
  li.textContent = `${nome} - ${preco.toLocaleString()} Kz`;
  lista.appendChild(li);
}

function toggleCarrinho() {
  document.getElementById("carrinho").classList.toggle("hidden");
}

function togglePerfil() {
  document.getElementById("perfil").classList.toggle("hidden");
}
