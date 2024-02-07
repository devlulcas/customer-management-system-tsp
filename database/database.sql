-- Tabela de clientes com campos de nome, email, telefone, coordenadas de localização e campo adicional para full text search
CREATE TABLE clients if not exists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  location POINT NOT NULL,
  search tsvector
);

-- Index para busca full text
CREATE INDEX search_index ON clients USING GIN(search);

-- Trigger para atualizar campo de busca full text
CREATE TRIGGER ts_search_update BEFORE INSERT OR UPDATE
ON clients FOR EACH ROW EXECUTE FUNCTION tsvector_update_trigger(search, 'pg_catalog.portuguese', name, email, phone);
