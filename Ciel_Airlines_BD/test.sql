create table test(
    test_id integer not null,
    test_name varchar2(10) Not NULL,
    PRIMARY KEY(test_id)
)

select *  from trecho
insert into test values (1, 'nat')

select * from aeroporto

insert into aeroporto (id_aeroporto, id_cidade, nome_aeroporto) values(ID_AEROPORTO_SEQ.NEXTVAL, 7, 'Aeroporto Internacional de Viracopos')

select * from trecho

DROP TABLE trecho;

INSERT INTO COMPANHIA_AEREA
(ID_COMPANHIA, NOME_COMPANHIA)
VALUES (ID_COMPANHIA_SEQ.NEXTVAL, 'aaaa')

Delete companhia_aerea where id_companhia = 11
DELETE CIDADE WHERE ID_CIDADE = 6