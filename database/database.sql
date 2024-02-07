CREATE TABLE customer (
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT null PRIMARY key,
  phone VARCHAR(255) NOT NULL,
  location_x FLOAT NOT NULL,
  location_y FLOAT not null,
  search tsvector
);

CREATE INDEX search_index ON customer USING GIN(search);
