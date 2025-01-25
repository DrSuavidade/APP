import React, { useState } from "react";
import "../CSS/ScoutsCreateEditPage.css";

// Navbar Component
function Navbar() {
return (
<header className="navbar">
    <div className="logo">
        <img src="/path/to/logo.png" alt="Logo" />
    </div>
    <div className="menu">
        <span>Plantel</span>
        <span>Jogadores</span>
        <span>Clubes</span>
        <span>Scouters</span>
        <span>Eventos</span>
        <span>Relatórios</span>
    </div>
</header>
);
}

// FormScouter Component
function FormScouter() {
const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
userType: "scouter",
});

const handleChange = (e) => {
const { id, value } = e.target;
setFormData({
...formData,
[id]: value,
});
};

const handleSubmit = (e) => {
e.preventDefault();
console.log("Submitting: ", formData);
// Aqui você pode integrar com a base de dados (ex: enviar via API)
};

return (
<div className="form-container">
    <h2>Adicionar Scouter</h2>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" placeholder="Nome completo" onChange={handleChange} />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" onChange={handleChange} />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" onChange={handleChange} />
        </div>
        <div className="form-group">
            <label htmlFor="userType">Tipo de Utilizador</label>
            <select id="userType" onChange={handleChange}>
                <option value="scouter">Scouter</option>
                <option value="admin">Administrador</option>
            </select>
        </div>
        <div className="form-group">
            <button type="submit">Adicionar</button>
        </div>
    </form>
</div>
);
}

// SidebarScouter Component
function SidebarScouter() {
const scouters = [
{ name: "Armando Silva", actions: "5 avaliações" },
{ name: "Ernesto Tava", actions: "1 avaliação" },
];

return (
<div className="sidebar">
    <h3>Histórico de Ações</h3>
    <div className="history-item">
        {scouters.map((scouter, index) => (
        <div key={index} className="scouter">
            <span className="name">{scouter.name}</span>
            <span className="details">{scouter.actions}</span>
        </div>
        ))}
    </div>
</div>
);
}

// Main App Component
function App() {
return (
<div className="main-container">
    <Navbar />
    <div className="content-container">
        <FormScouter />
        <SidebarScouter />
    </div>
</div>
);
}

export default App;