
--------------- METODOS DE PAGAMENTO
CREATE TABLE METODO_PAGAMENTO(
ID_METODO INTEGER NOT NULL PRIMARY KEY,
NOME_METODO VARCHAR(20) NOT NULL
);

CREATE SEQUENCE ID_METODO_SEQ START WITH 001 INCREMENT BY 1 MAXVALUE 9999 NOCYCLE NOCACHE;