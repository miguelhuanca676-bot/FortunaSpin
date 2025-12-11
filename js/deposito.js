document.getElementById("btnEnviar").onclick = () => {
    const file = archivo.files[0];
    const montoIngresado = document.getElementById("monto").value.trim();

    try {
        // Validar archivo
        if (!file) {
            throw "Selecciona un comprobante.";
        }

        // Validar monto vacío
        if (montoIngresado === "") {
            throw "Ingresa un monto.";
        }

        // Validar que sea número
        if (isNaN(montoIngresado)) {
            throw "El monto debe ser un número.";
        }

        // Validar que sea mayor a 0
        if (Number(montoIngresado) <= 0) {
            throw "El monto debe ser mayor a 0.";
        }

    } catch (error) {
        alert(error);
        return;
    }

    // Si pasó todas las validaciones → procesar comprobante
    const reader = new FileReader();

    reader.onload = (e) => {
        let comprobantes = JSON.parse(localStorage.getItem("comprobantes")) || [];
        const usuarioActivo = JSON.parse(localStorage.getItem("sesionActiva"));

        comprobantes.push({
            usuario: usuarioActivo,
            imagen: e.target.result,
            montoReportado: Number(montoIngresado),
            fecha: new Date().toISOString()
        });

        localStorage.setItem("comprobantes", JSON.stringify(comprobantes));

        alert("Comprobante enviado correctamente.");
        window.location.href = "ruleta.html";
    };

    reader.readAsDataURL(file);
};

document.getElementById("btnVolver").onclick = () => {
    window.location.href = "ruleta.html";
};
