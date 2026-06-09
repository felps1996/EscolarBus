-- Tabela principal de autenticação
CREATE TABLE usuarios (
    id BIGSERIAL PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL, -- Nunca salvamos a senha em texto puro
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela complementar (Perfil do Aluno) - Relacionamento 1:1
CREATE TABLE perfis_alunos (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL UNIQUE,
    escola VARCHAR(150),
    endereco VARCHAR(255),
    telefone VARCHAR(20),
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);