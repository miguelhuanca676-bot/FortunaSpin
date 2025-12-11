document.addEventListener("DOMContentLoaded", () => {

    // ========================
    // FUNCIONES DE VALIDACIÓN
    // ========================

    function validarSoloLetras(texto) {
        try {
            if (!/^[a-zA-Z\s]+$/.test(texto)) {
                throw "Solo deben ingresarse letras.";
            }
        } catch (error) {
            alert(error);
            return false;
        }
        return true;
    }

    function validarSoloNumeros(texto) {
        try {
            if (!/^[0-9]+$/.test(texto)) {
                throw "Solo deben ingresarse números.";
            }
        } catch (error) {
            alert(error);
            return false;
        }
        return true;
    }

    function validarCorreo(correo) {
        try {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
                throw "Correo electrónico inválido.";
            }
        } catch (error) {
            alert(error);
            return false;
        }
        return true;
    }

    function validarNoVacio(valor, campo) {
        try {
            if (!valor.trim()) {
                throw "El campo " + campo + " no puede estar vacío.";
            }
        } catch (error) {
            alert(error);
            return false;
        }
        return true;
    }



    // ================================
    //      REGISTRO PASO 1
    // ================================
    const form1 = document.getElementById("formPaso1");

    if (form1) {
        form1.addEventListener("submit", (e) => {
            e.preventDefault();

            const pais = document.getElementById("pais").value;
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const usuario = document.getElementById("usuario").value;
            const correo = document.getElementById("correo").value;
            const password = document.getElementById("password").value;
            const celular = document.getElementById("celular").value;

            // VALIDACIONES CON TRY/CATCH
            if (!validarNoVacio(pais, "País")) return;
            if (!validarNoVacio(nombre, "Nombre")) return;
            if (!validarNoVacio(apellido, "Apellido")) return;
            if (!validarNoVacio(usuario, "Usuario")) return;
            if (!validarNoVacio(correo, "Correo")) return;
            if (!validarNoVacio(password, "Contraseña")) return;
            if (!validarNoVacio(celular, "Celular")) return;

            if (!validarSoloLetras(pais)) return;
            if (!validarSoloLetras(nombre)) return;
            if (!validarSoloLetras(apellido)) return;

            if (!validarCorreo(correo)) return;

            if (!validarSoloNumeros(celular)) return;

            // Validación de usuario duplicado
            try {
                const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
                const existe = usuariosGuardados.some(u => u.usuario === usuario);

                if (existe) {
                    throw "Ese nombre de usuario ya existe, elige otro.";
                }
            } catch (error) {
                alert(error);
                return;
            }

            // Guardar temporal
            const datosPaso1 = { pais, nombre, apellido, usuario, correo, password, celular };
            localStorage.setItem("registroTemporal", JSON.stringify(datosPaso1));

            window.location.href = "registro2.html";
        });
    }



    // ================================
    //      REGISTRO PASO 2
    // ================================
    const form2 = document.getElementById("formPaso2");

    if (form2) {
        form2.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre2 = document.getElementById("nombre2").value;
            const apellido2 = document.getElementById("apellido2").value;
            const nacimiento = document.getElementById("nacimiento").value;
            const direccion = document.getElementById("direccion").value;

            // Validaciones
            if (!validarNoVacio(nombre2, "Nombre")) return;
            if (!validarNoVacio(apellido2, "Apellido")) return;
            if (!validarNoVacio(nacimiento, "Nacimiento")) return;
            if (!validarNoVacio(direccion, "Dirección")) return;

            if (!validarSoloLetras(nombre2)) return;
            if (!validarSoloLetras(apellido2)) return;

            // Validar fecha con try/catch
            try {
                if (isNaN(Date.parse(nacimiento))) {
                    throw "Fecha de nacimiento inválida.";
                }
            } catch (error) {
                alert(error);
                return;
            }

            // Unir datos
            let paso1;
            try {
                paso1 = JSON.parse(localStorage.getItem("registroTemporal"));
                if (!paso1) throw "No se encontraron datos del paso anterior.";
            } catch (error) {
                alert(error);
                return;
            }

            const usuarioFinal = { ...paso1, nombre: nombre2, apellido: apellido2, nacimiento, direccion, saldo: 0 };

            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            usuarios.push(usuarioFinal);

            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            localStorage.removeItem("registroTemporal");

            window.location.href = "login.html";
        });
    }

});
