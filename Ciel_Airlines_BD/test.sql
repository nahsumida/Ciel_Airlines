create table test(
    test_id integer not null,
    test_name varchar2(10) Not NULL,
    PRIMARY KEY(test_id)
)

select *  from trecho
insert into test values (1, 'nat')

select * from aeronave

    select * from cidade where id_cidade=9

insert into aeroporto (id_aeroporto, id_cidade, nome_aeroporto) values(ID_AEROPORTO_SEQ.NEXTVAL, 7, 'Aeroporto Internacional de Viracopos')

select * from aeronave

DROP TABLE trecho;

SELECT * FROM cidade WHERE ID_cidade=9;
INSERT INTO COMPANHIA_AEREA
(ID_COMPANHIA, NOME_COMPANHIA)
VALUES (ID_COMPANHIA_SEQ.NEXTVAL, 'aaaa')

Delete companhia_aerea where id_companhia = 11
DELETE CIDADE WHERE ID_CIDADE = 6

select * from trecho
SELECT
    T.ID_TRECHO,
    SAIDA.NOME_AEROPORTO AS AEROPORTO_SAIDA,
    CHEGADA.NOME_AEROPORTO AS AEROPORTO_CHEGADA
FROM
    TRECHO T
JOIN
    AEROPORTO SAIDA ON T.AERO_SAIDA = SAIDA.ID_AEROPORTO
JOIN
    AEROPORTO CHEGADA ON T.AERO_CHEGADA = CHEGADA.ID_AEROPORTO
where T.aero_saida=20 and t.aero_chegada=17

select * from aeroporto
SELECT
    A.ID_AEROPORTO,
    i.NOME_CIDADE,
    A.Sigla
FROM
    AEROPORTO A
JOIN
    CIDADE I ON I.ID_CIDADE = A.ID_CIDADE

select * from COMPANHIA_AEREA

UPDATE COMPANHIA_AEREA SET NOME_COMPANHIA = 'aaaaa' WHERE ID_COMPANHIA_AEREA = 28

select * from assento