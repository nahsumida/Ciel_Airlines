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

select * from trecho;
SELECT
    T.ID_TRECHO,
    T.AERO_SAIDA,
    T.AERO_CHEGADA,
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

select * from aeronave;
INSERT INTO AEROPORTO
        (ID_AEROPORTO, ID_CIDADE, NOME_AEROPORTO, SIGLA)
        VALUES (ID_AEROPORTO_SEQ.NEXTVAL, '',`+nomeAeroporto+`,`+sigla+`)

SELECT
    A.ID_AERONAVE,
    C.NOME_COMPANHIA,
    A.MODELO,
    A.ANO_FABRICACAO,
    A.FABRICANTE,
    A.NUM_IDENTIFICACAO,
    A.ANO_FABRICACAO
FROM
    AERONAVE A
JOIN
    COMPANHIA_AEREA C ON C.ID_COMPANHIA_AEREA = A.COMPANHIA_AEREA

select * from COMPANHIA_AEREA

UPDATE COMPANHIA_AEREA SET NOME_COMPANHIA = 'aaaaa' WHERE ID_COMPANHIA_AEREA = 28

select * from COMPANHIA_AEREA

select * from companhia_Aerea

INSERT INTO AERONAVE (ID_AERONAVE, MODELO, NUM_IDENTIFICACAO, FABRICANTE, ANO_FABRICACAO, COMPANHIA_AEREA, NUMASSENTOS) VALUES (ID_AERONAVE_SEQ.nextval, 'AIRBUS 380', '1234', 'AIRBUS', 2010, 19, 36)

select * from voo;

select * from assento
update aeropoto set nome_aeroporto=' ', sigla=' ' where id_aeronave =

alter table aeroporto modify  nome_aeroporto varchar2(150)
SELECT
                                A.ID_AEROPORTO,
                                i.NOME_CIDADE,
                                A.Sigla
                            FROM
                                AEROPORTO A
                            JOIN
                                CIDADE I ON I.ID_CIDADE = A.ID_CIDADE
                            WHERE A.ID_AEROPORTO =

update AEROPORTO set id_cidade= 9 ,nome_aeroporto='bb', sigla='JES' where ID_AEROPORTO = 27

select * from AEROPORTO


select * from aeronave


select * from trecho

insert into voo (ID_VOO, TRECHO, AERONAVE, DATA, HORA_PARTIDA, HORA_CHEGADA, PRECO) VALUES (id_voo_seq.nextval, 47, 1,TO_DATE('03/12/2023', 'dd/mm/yyyy'), '8:00', '10:00', 120.0)


select * from venda


SELECT
    v.ID_VOO,
    v.data,
    v.HORA_PARTIDA,
    v.HORA_CHEGADA,
    v.PRECO,
    a.NUM_IDENTIFICACAO,
    chegada.SIGLA,
    saida.SIGLA
FROM
    VOO V
JOIN
    trecho T on t.ID_TRECHO = v.TRECHO
Join
    aeronave A on a.ID_AERONAVE = v.AERONAVE
join
    AEROPORTO saida on saida.ID_AEROPORTO = t.AERO_saida
join
    AEROPORTO chegada on chegada.ID_AEROPORTO = t.AERO_chegada
where v.data = TO_DATE('2023-12-03', 'yyyy-mm-dd') and v.TRECHO = 47

select * from trecho
select id_trecho from trecho where AERO_SAIDA = 20 and aero_chegada = 17

select * from aeronave;

insert into venda (id_venda, nome_passageiro, EMAIL_PASSAGEIRO, ASSENTO, id_voo, pagamento) values (ID_VENDA_SEQ.nextval, 'jessica linda', 'jessiquinha@gmail.com', 146, 4, 1)
update assento set status='INDISPONIVEL' where ID_ASSENTO = 154

SELECT
    v.ID_VENDA,
    v.NOME_PASSAGEIRO,
    v.EMAIL_PASSAGEIRO,
    A.CODIGO,
    M.NOME_METODO,
    ve.HORA_PARTIDA,
    ve.HORA_CHEGADA,
    ve.DATA,
    saida.NOME_AEROPORTO,
    chegada.NOME_AEROPORTO
FROM
    VENDA V
JOIN
    ASSENTO A ON A.ID_ASSENTO = V.ASSENTO
Join
    METODO_PAGAMENTO M ON M.ID_METODO_PAGAMENTO = V.PAGAMENTO
join
    voo ve on ve.ID_VOO = v.ID_VOO
JOIN
    trecho T on t.ID_TRECHO = ve.TRECHO
join
    AEROPORTO saida on saida.ID_AEROPORTO = t.AERO_SAIDA
join
    AEROPORTO chegada on chegada.ID_AEROPORTO = t.AERO_CHEGADA
where v.ASSENTO = 154

select * from trecho
ALTER TABLE aeronave modify numAssentos number not null;
update aeronave set NUMASSENTOS = 36 where ID_AERONAVE=3;

select * from ASSENTO where ID_ASSENTO=148

update ASSENTO set status='INDISPONIVEL' WHERE ID_ASSENTO=
Update assento set status = 'INDISPONIVEL' where id_assento = 153

    select * from AERONAVE;

update aeronave set modelo='aaa', NUM_IDENTIFICACAO = 'aaa', FABRICANTE = 'aaa', ANO_FABRICACAO=2002, COMPANHIA_AEREA = 21 where ID_AERONAVE = 6