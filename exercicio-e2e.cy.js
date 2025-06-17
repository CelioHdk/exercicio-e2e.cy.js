/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    
  
    /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */


      let dadosLogin

context('Funcionalidade Login', () => {
    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Login com sucesso usando Comando customizado', () => {
        cy.login(dadosLogin.usuario, dadosLogin.senha)
        cy.get('.page-title').should('contain', 'Minha conta')
    });

    it('Login usando fixture', () => {
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        cy.get('.page-title').should('contain', 'Minha conta')
    });

    it.skip('Deve fazer login com sucesso - sem otimização', () => {
        cy.get('#username').type(dadosLogin.usuario)
        cy.get('#password').type(dadosLogin.senha, { log: false })
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac')
    })
})

  //beforeEach(() => {
     // cy.visit('/')
  });





  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações

      import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {
    
        beforeEach(() => {
            produtosPage.visitarUrl()
        });

        it('Deve selecionar um produto da lista', () => {
            produtosPage.buscarProdutoLista('Bruno Compete Hoodie')                      
            cy.get ('#tab-title-description > a').should('contain', 'Descrição')     
    
            
        });

        it('Deve buscar um produto com sucesso', () => {
            let produto = 'Aether Gym Pant'
            produtosPage.buscarProduto(produto)
            cy.get('.product_title').should('contain', produto)

        });

        it('Deve visitar a pagina do produto', () => {
            produtosPage.visitarProduto('Thorpe Track Pant')
            cy.get('.product_title').should('contain', 'Thorpe Track Pant')

        } );

        it('Deve adicionar produto ao carrinho', () => {
            let qtd = 18
            produtosPage.buscarProduto('Ajax Full-Zip Sweatshirt')
            produtosPage.addProdutoCarrinho('L', 'Green', qtd)

            cy.get('.woocommerce-message').should('contain', qtd + ' ×  “Ajax Full-Zip Sweatshirt” foram adicionados no seu carrinho.')

        });

        it('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
            cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto(dados[2].nomeProduto)
            produtosPage.addProdutoCarrinho(
                dados[2].tamanho,
                dados[2].cor, 
                dados[2].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto)

            })            

        });

});
       
      
  });



  class ProdutosPage {


   visitarUrl() {
    cy.visit ('produtos')
   }

        buscarProduto(nomeProduto) {
            cy.get('[name="s"]').eq(1).type(nomeProduto)
            cy.get('.button-search').eq(1).click()
        }

        buscarProdutoLista(nomeProduto) {
            cy.get('.products > .row')
            .contains(nomeProduto)
            .click()

        }

        visitarProduto(nomeProduto) {
            //cy.visit(`produtos/ ${nomeProduto}`)
            const urlFormatada = nomeProduto.replace(/ /g, "-")
            cy.visit(`produtos/${urlFormatada}`)

        }

        addProdutoCarrinho(tamanho, cor, quantidade) {
            cy.get('.button-variable-item-' + tamanho).click() 
            cy.get(`.button-variable-item-${cor}`).click()
            cy.get('.input-text').clear().type(quantidade)
            cy.get('.single_add_to_cart_button').click()         
            
                                                                                                                                                  
        }


}



    export default new ProdutosPage()



    {
  "name": "teste-ebac-ui",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "npx cypress run --browser chrome",
    "cy-dash": "npx cypress run --record --key ecc21344-b9e1-44d1-83f1-d3d0f9a5c1a2"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@faker-js/faker": "^8.3.1",
    "cypress": "^13.6.0"
  }
}



///<reference types = "cypress"/>

describe('Seletores avançados com cypress', () => {

  beforeEach(() => {
    cy.visit('../../seletores.html')
  });

  it('Seleciona elementos que contêm um Texto específico', () => {
    cy.contains('Item 3').should('have.attr', 'class' , 'filho-3')
  });
    
  it('Seleciona o elemento com a classe pai', () => {
    cy.get('.pai').should('exist') 
  })

  it('Seleciona o elemento com o id Filho', () => {
    cy.get('#id-filho').should('exist') 
   })

  it('Seleciona um elemento filho dentro do elemento com a classe pai', () => {
    cy.get('.pai').find('.filho-2').should('contain', 'Item 2')
  });

  it('Seleciona o segundo elemento <span> com a classe irmao', () => {
    cy.get('.irmao + .irmao').should('contain' , 'Irmão 2')
  });

  it('Seleciona o próximo elemento irmão', () => {
    cy.get('#irmao-1').next().should('contain' , 'Irmão 2')
  });

  it('Seleciona o elemento irmão anterior', () => {
    cy.get('#irmao-2').prev().should('contain' , 'Irmão 1') 
  });

  it('Seleciona o irmão da div anterior', () => {
    cy.get('[name="nome-do-atributo"]').prev().should('contain' , 'Item 1') 
  });

  it('Seleciona o terceiro elemento <li> encontrado', () => {
    cy.get('li').eq(2).should('have.text','Item 3') 
  });

  it('Seleciona o elemento com o atributo data-test', () => {
    cy.get('[data-test="div-pai"]').should('exist') 
  });

  it('Seleciona o elemento com a classe pai do elemento com a classe filho', () => {
    cy.get('.filho-4').parent('[data-test="div-pai"]').should('have.attr', 'class', 'pai')
  });

  it('Seleciona o elemento com um valor em um select', () => {
    cy.get('[name="opcao"]').select('Muito') 
    cy.get('#id-enviar').click()
    cy.get('#mensagemFeedback').should('have.text', 'Obrigado por compartilhar conosco!')
  });

})