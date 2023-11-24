        /*função para alterar a visibilidade de uma seção dentro de um bloco*/
        function sectionView(sectionOn, sectionsOff ){

            /*para cada seção de invisibilidade desejada,
            caso diferentes da seção de visibilidade, mudar o display para none*/
            sectionsOff.forEach(function(sectionsOff){
                if(sectionsOff!== sectionOn){
                    sectionsOff.style.display = 'none';
                }
            });
            /* caso o display da section for none atribui valor block*/
            if(window.getComputedStyle(sectionOn).display === 'none') {
                sectionOn.style.display = 'block';
            } else {
                sectionOn.style.display = 'none';
            }
        }

        
        /*var btnAero = document.querySelector('#btnAeronave');

        btnAero.addEventListener('click', function() {
            sectionView([containerAero, containerCadastrar], [containerExcluir, containerAlterar])
        });*/


        /*atribuindo valores as variaveis */
        //cadastrar
        var btnCadastrar = document.querySelector('#btn-s-cadastrar');
        var containerCadastrar = document.querySelector('.sectionCadastrar');
        //excluir
        var btnExcluir = document.querySelector('#btn-s-excluir');
        var containerExcluir = document.querySelector('.sectionExcluir');
        //escolher id alterar
        var containerAlterar = document.querySelector('.sectionAlterar');
        var btnAlterar = document.querySelector('#btn-s-alterar');
        //alterar info
        var btnAlterarInfo = document.querySelector('#btnConfirmarAltInfo');
        var containerAltInfo = document.querySelector('#AlterarInfo');

        btnCadastrar.addEventListener('click', function() {
            sectionView(containerCadastrar, [containerAlterar, containerAltInfo, containerExcluir])
        });
        btnExcluir.addEventListener('click', function() {
            sectionView(containerExcluir, [containerCadastrar, containerAlterar])
        });
        btnAlterar.addEventListener('click', function() {
            sectionView(containerAlterar, [containerCadastrar, containerExcluir])
        });
        btnAlterarInfo.addEventListener('click', function() {
            sectionView(containerAltInfo, [containerCadastrar, containerExcluir])
        });