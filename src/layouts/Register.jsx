import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmarPassword: "",
    aceptar: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.nombre ||
      !form.correo ||
      !form.password ||
      !form.confirmarPassword
    ) {
      Swal.fire("Campos incompletos", "Debes llenar todo el formulario", "warning");
      return;
    }

    if (form.password !== form.confirmarPassword) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    if (!form.aceptar) {
      Swal.fire("Aviso", "Debes aceptar términos y condiciones", "info");
      return;
    }

    Swal.fire("Registro exitoso", "Tu cuenta fue creada correctamente", "success");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="register-container">
      {/* Lado izquierdo */}
      <div className="register-left">
        <div className="overlay">
          <h1>NEXUS</h1>
          <p>Conecta tus ideas con el futuro</p>
        </div>
      </div>

      {/* Lado derecho */}
      <div className="register-right">
        <div className="register-box">
          <h2>Crear Cuenta</h2>
          <p>Completa los datos para registrarte</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={form.nombre}
              onChange={handleChange}
            />

            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={form.correo}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmarPassword"
              placeholder="Confirmar contraseña"
              value={form.confirmarPassword}
              onChange={handleChange}
            />

            <label className="check-box">
              <input
                type="checkbox"
                name="aceptar"
                checked={form.aceptar}
                onChange={handleChange}
              />
              Acepto términos y condiciones
            </label>

            <button type="submit">Registrarme</button>
          </form>

          <p className="login-link">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;