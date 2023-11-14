
----------- AERONAVE

create table VOO
(
    ID_VOO NUMBER not null primary key,
    DATA DATE not null,
    TRECHO NUMBER not null
        constraint FK_TRECHO
            references TRECHO
                on delete cascade,
    HORA_PARTIDA VARCHAR2(5)  not null,
    HORA_CHEGADA VARCHAR2(5)  not null,
    PRECO        NUMBER(10)   not null,
    AERONAVE     VARCHAR2(20) not null
        constraint FK_AERONAVE
            references AERONAVE
                on delete cascade
)


