
------------ TRECHO
CREATE TABLE TRECHO (
ID_TRECHO INTEGER NOT NULL PRIMARY KEY,
AERO_SAIDA INTEGER  NOT NULL,
AERO_CHEGADA INTEGER NOT NULL
);

CREATE SEQUENCE ID_TRECHO_SEQ START WITH 001 INCREMENT BY 1 MAXVALUE 9999 NOCYCLE NOCACHE;

ALTER TABLE TRECHO
ADD CONSTRAINT FK_AERO_SAIDA FOREIGN KEY(AERO_SAIDA) REFERENCES AEROPORTO(ID_AEROPORTO) ;

ALTER TABLE TRECHO
ADD CONSTRAINT FK_AERO_CHEGADA FOREIGN KEY(AERO_CHEGADA) REFERENCES  AEROPORTO(ID_AEROPORTO);

Select * from TRECHO

ALTER Table TRECHO ADD AERO_SAIDA INTEGER NOT NULL

ALTER Table TRECHO ADD AERO_CHEGADA INTEGER NOT NULL