import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';
import bgLogin from "../../assets/images/bg-login.webp";
import "./Login.css";

function Login() {
  console.log("Login renderizado");
  
  const [formData, setFormData] = useState({
    correo: "",
    contraseña: ""
  });
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  // Precargar imagen de fondo
  useEffect(() => {
    const img = new Image();
    img.src = bgLogin;
  }, []);

  // Redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Login: Usuario ya autenticado, redirigiendo a /dashboard");
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensaje("Iniciando sesión...");

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        correo: formData.correo,
        contraseña: formData.contraseña,
      });

      if (response.status === 200) {
        setMensaje("Inicio de sesión exitoso.");
        login();
        navigate("/dashboard");
      } else {
        setMensaje("Credenciales inválidas. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response?.data || error.message);
      if (error.response && error.response.status === 400) {
        setMensaje(error.response.data.message || "Credenciales inválidas. Por favor, verifica tu correo y contraseña.");
      } else {
        setMensaje("Ocurrió un error al intentar iniciar sesión. Inténtalo más tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getMensajeClass = () => {
    if (mensaje.includes("inválidas") || mensaje.includes("error") || mensaje.includes("Ocurrió")) {
      return "login-message error";
    }
    if (mensaje.includes("exitoso")) {
      return "login-message success";
    }
    return "login-message loading";
  };

  return (
    <div className="login-container">
      <img 
        src={bgLogin} 
        alt="Background" 
        className="background-image"
      />
      
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión</h2>
        <p className="login-subtitle">
          Ingresa con tu cuenta para gestionar tus productos o servicios.
        </p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleInputChange}
            required
            className="form-input"
            disabled={isLoading}
          />

          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleInputChange}
            required
            className="form-input"
            disabled={isLoading}
          />

          <button 
            type="submit" 
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        {mensaje && (
          <div className={getMensajeClass()}>
            {mensaje}
          </div>
        )}

        <div className="forgot-password">
          <a href="/forgot-password" className="forgot-password-link">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;