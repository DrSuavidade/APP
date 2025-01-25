import React, { useState } from "react";
import "../CSS/PlayerCreatePage.css";

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

// Form Component
function Form() {
const [formData, setFormData] = useState({
name: "",
link: "",
birthdate: "",
gender: "male",
nationality: "portuguese",
club: "club1",
team: "team1",
educationData: null,
});

const handleChange = (e) => {
const { id, value, files } = e.target;
setFormData({
...formData,
[id]: files ? files[0] : value,
});
};

const handleSubmit = (e) => {
e.preventDefault();
console.log("Submitting: ", formData);
// Aqui você pode integrar com a base de dados (ex: enviar via API)
};

return (
<div className="form-container">
    <h2>Adicionar Jogador</h2>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" placeholder="Nome completo" onChange={handleChange} />
        </div>
        <div className="form-group">
            <label htmlFor="link">Link</label>
            <input type="url" id="link" placeholder="Link da federação" onChange={handleChange} />
        </div>
        <div className="form-group">
            <label htmlFor="birthdate">Data de Nascimento</label>
            <input type="date" id="birthdate" onChange={handleChange} />
        </div>
        <div className="form-row">
            <div className="form-group">
                <label htmlFor="gender">Gênero</label>
                <select id="gender" onChange={handleChange}>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                    <option value="other">Outro</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="nationality">Nacionalidade</label>
                <select id="nationality" onChange={handleChange}>
                    <option value="portuguese">Português</option>
                    <option value="spanish">Espanhol</option>
                    <option value="other">Outro</option>
                </select>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="club">Clube</label>
            <select id="club" onChange={handleChange}>
                <option value="club1">Clube 1</option>
                <option value="club2">Clube 2</option>
                <option value="club3">Clube 3</option>
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="team">Equipa</label>
            <select id="team" onChange={handleChange}>
                <option value="team1">Equipa 1</option>
                <option value="team2">Equipa 2</option>
                <option value="team3">Equipa 3</option>
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="educationData">Dados Encarregados de Educação</label>
            <input type="file" id="educationData" accept=".pdf,.doc,.docx" onChange={handleChange} />
        </div>
        <div className="form-group">
            <button type="submit">Adicionar</button>
        </div>
    </form>
</div>
);
}

// Sidebar Component
function Sidebar() {
const players = [
{ name: "Adriano Lopes", details: "★★★★★" },
{ name: "Marco Santos", details: "★★★★☆" },
{ name: "João Pereira", details: "★★★☆☆" },
{ name: "Pedro Costa", details: "★★☆☆☆" },
{ name: "Davi", details: "★☆☆☆☆" },
];

return (
<div className="sidebar">
    <h3>Histórico de Ações</h3>
    <div className="history-item">
        {players.map((player, index) => (
        <div key={index} className="player">
            <span className="name">{player.name}</span>
            <span className="details">{player.details}</span>
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
        <Form />
        <Sidebar />
    </div>
</div>
);
}

export default App;