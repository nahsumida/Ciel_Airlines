
-------------- MAPA ASSENTO
create table MAPA_ASSENTO
(
    ID_MAPA     NUMBER not null
        primary key,
    ID_VOO      NUMBER not null
        constraint FK_ID_VOO
            references VOO,
    COD_ASSENTO NUMBER not null,
    STATUS      VARCHAR2(15)
)
/


CREATE SEQUENCE ID_MAPA_SEQ START WITH 001 INCREMENT BY 1 MAXVALUE 9999 NOCYCLE NOCACHE;

    select * from TRECHO

Update cidade set nome_cidade = 'teste' where id_cidade = 9