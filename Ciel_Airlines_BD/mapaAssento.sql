
-------------- MAPA ASSENTO
CREATE TABLE MAPA_ASSENTO (
ID_MAPA INTEGER NOT NULL PRIMARY KEY,
NUM_DE_FILEIRA INTEGER NOT NULL ,
NUM_POR_FILEIRA INTEGER NOT NULL
);

CREATE SEQUENCE ID_MAPA_SEQ START WITH 001 INCREMENT BY 1 MAXVALUE 9999 NOCYCLE NOCACHE;