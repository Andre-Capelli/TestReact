# Tasks

1. Adicionar campos no formulário
   I. Campo de Email
   II. Campo de Telefone com Prefixo
   a. Campo de Telefone e Prefixo tem que ficar em keys diferentes para salvar, seguir exemplo no ponto #3

2. Exibir lista de Items
   I. GET para obter os dados
   II. Criar componente do Item para renderização
   III. Exibir do Item: ID, Nome e Email, apenas informar que possuí telefone (colocar tag "common.has_phonenumber" se existir telefone cadastrado)
   IV. Criar Delete
   V. \*\*\* Se der tempo, tentar fazer o update do Item (Deixar por último)

3. Salvar dados do formulário
   I. Salvar novo item
   II. Fazer limpezas necessárias no form
   III. Atualizar lista de Items
   \*\* Objeto necessário para efetuar POST:
   {
   id: "CADASTRADO PELA API, NÂO NECESSÁRIO ENVIAR"
   name: "",
   email: "",
   phone_number: {
   phone: "",
   prefix: ""
   }
   }
