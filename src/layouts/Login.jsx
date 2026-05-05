import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../layouts/login.css";// Asegúrate de que el archivo se llame exactamente así

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    try {

      await apiFetch(endpoints.login, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", "fake-token");

      successAlert("Login exitoso");

      navigate("/services");

    } catch (error) {
      errorAlert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="fondo"> {/* Mapea con .fondo del CSS */}
      <div className="contenedor-login"> {/* Mapea con .contenedor-login */}

        <div className="encabezado"> {/* Mapea con .encabezado */}
          <div className="logo">NEXUS</div>
          <h2>Bienvenido</h2>
          <p>Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Correo Electrónico</label>
          <input
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="botones"> {/* Mapea con .botones */}
            <button type="submit">Ingresar</button>
          </div>
        </form>

        <footer>
          <p>
            ¿No tienes cuenta?
            <Link to="/register" style={{ color: '#0b1f3a', fontWeight: 'bold' }}> Regístrate aquí</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}