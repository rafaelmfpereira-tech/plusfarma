fetch("api/medicamentos.json")
  .then(response => response.json())
  .then(data => {
    const lista = document.getElementById("lista-medicamentos");

    data.forEach(med => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${med.nome}</h3>
        <p>${med.descricao}</p>
        <p><strong>Farmácia:</strong> ${med.farmacia}</p>
        <p class="preco">${med.preco.toLocaleString()} Kz</p>
        <button onclick="addCarrinho(${med.id})">
          Adicionar ao carrinho
        </button>
      `;

      lista.appendChild(card);
    });
  });

