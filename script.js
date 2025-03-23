// Inicialização do Stripe
let stripePublicKey;

// Buscar a chave pública do Stripe do servidor
fetch("/mira/stripe-key")
  .then((response) => response.json())
  .then((data) => {
    stripePublicKey = data.publicKey;
    stripe = Stripe(stripePublicKey);
  });

document
  .getElementById("checkout-button")
  .addEventListener("click", async () => {
    const duration = document.getElementById("duration").value;

    try {
      const response = await fetch("/mira/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration }),
      });

      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }

      const session = await response.json();
      window.location.href = session.url;
    } catch (error) {
      console.error("Erro:", error);
      alert(
        "Ocorreu um erro ao processar o pagamento. Por favor, tente novamente."
      );
    }
  });
