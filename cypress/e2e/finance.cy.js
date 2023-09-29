

describe('Transações', () => {

    // hooks -> executar  antes ou depois / de cada ou de todos os testes
    // before
    // after
    // beforeEach
    // afterEach

    beforeEach(() => {
        cy.visit("https://dev-finance.netlify.app/#")
    });

    it('Cadastrar uma entrada', () => {
        criarTransacao("Freela", 300)

        cy.get("tbody tr td.description").should("have.text", "Freela")
    });

    it('Cadastrar uma saída', () => {
        criarTransacao("Cinema", -50)

        cy.get("tbody tr td.description").should("have.text", "Cinema")

    });

    it('Excluir transação',() => {
        criarTransacao("Freela", 100)
        criarTransacao("Mesada", 10)

        cy.contains(".description", "Freela") // td referencia
        .parent() //tr
        .find('img') // elemento procurado
        .click()        
    
        cy.get('tbody tr').should("have.length", 1)
    });
});

function criarTransacao(descricao, valor) {
    cy.contains("Nova Transação").click()
    cy.get('#description').type(descricao)
    cy.get('#amount').type(valor)
    cy.get('#date').type("2023-09-11") // yyyy-mm-dd

    cy.contains('button', 'Salvar').click()

}