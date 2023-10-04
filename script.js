document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Envie os dados para o servidor (backend)
        try {
            const response = await fetch("/cadastrar-usuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Usuário cadastrado com sucesso!");
                form.reset();
            } else {
                alert("Erro ao cadastrar usuário.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar usuário.");
        }
    });
});
