# Loterias Brasil - Extensão de Navegador

![Loterias Brasil](https://github.com/LuanOrtega/loterias-brasil-extension/blob/main/icons/logo.png)  
*Extensão para Chrome e Opera que permite conferir resultados de loterias brasileiras de forma rápida e fácil.*

## 📌 Descrição
O **Loterias Brasil** é uma extensão de navegador que permite aos usuários:
- Conferir resultados de diferentes loterias brasileiras: Mega-Sena, Quina, Lotofácil e Dupla-Sena.
- Inserir suas apostas manualmente e verificar quantos números foram acertados.
- Consultar informações adicionais como premiações, acumulados e estimativa do próximo prêmio.
- Receber alertas e mensagens visuais sobre acertos de forma clara e intuitiva.

A extensão utiliza a API [Loterias Caixa](https://loteriascaixa-api.herokuapp.com/) para obter os resultados oficiais.

## 🎯 Funcionalidades
- Seleção de jogo (Mega-Sena, Quina, Lotofácil, Dupla-Sena).
- Inserção de número do concurso para consulta específica.
- Inserção de múltiplos jogos (uma aposta por linha).
- Validação automática da quantidade mínima e máxima de números por jogo.
- Exibição de acertos de cada aposta com cores e mensagens especiais:
  - **Mega-Sena:** Quina, Quadra, Sena.
  - **Quina:** Duque, Terno, Quadra, Quina.
  - **Lotofácil:** Acertos de 11 a 15 números.
  - **Dupla-Sena:** Quadra, Quina, Sena.
- Exibição de premiações oficiais e valores de cada faixa.
- Indicação de acúmulo e estimativa do próximo prêmio.

## 💻 Instalação para Teste Local
1. Clone o repositório:
```bash
git clone https://github.com/LuanOrtega/loterias-brasil-extension.git
```
2. Abra o navegador e acesse a página de extensões:
   - **Chrome:** `chrome://extensions/`
   - **Opera:** `opera://extensions/`
3. Ative o **Modo Desenvolvedor**.
4. Clique em **“Carregar sem compactação”** ou **“Load unpacked”** e selecione a pasta do projeto.
5. A extensão será carregada e o ícone aparecerá na barra do navegador. Agora você pode testar todas as funcionalidades.

## 🛠️ Uso
1. Selecione o tipo de loteria no menu suspenso.
2. Insira o número do concurso que deseja consultar.
3. Digite suas apostas no campo de texto (uma aposta por linha, números separados por vírgula).
4. Clique em **“Buscar Resultado”**.
5. Confira os resultados, acertos e premiações diretamente no pop-up.

## 🎨 Tecnologias Utilizadas
- HTML5
- CSS3
- JavaScript (Vanilla)
- Fetch API para requisições HTTP

## ⚠️ Observações
- A extensão depende da API [Loterias Caixa](https://loteriascaixa-api.herokuapp.com/) para obter os resultados. Caso a API esteja fora do ar, os resultados não serão exibidos.
- Os valores monetários e premiações são informativos e fornecidos pela Caixa Econômica Federal.

## 📂 Estrutura do Projeto
```
loterias-brasil-extension/
│
├─ popup.html       # Interface da extensão
├─ popup.js         # Lógica de consulta e validação
├─ style.css        # Estilos do pop-up
├─ manifest.json    # Arquivo de configuração da extensão
├─ icons/           # Pasta com ícones da extensão
└─ README.md        # Este arquivo
```

## 📄 Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

## 🔗 Links
- Repositório: [https://github.com/LuanOrtega/loterias-brasil-extension](https://github.com/LuanOrtega/loterias-brasil-extension)
- API utilizada: [https://loteriascaixa-api.herokuapp.com/](https://loteriascaixa-api.herokuapp.com/)

## ✨ Contribuição
Contribuições são bem-vindas! Você pode abrir issues, sugerir melhorias ou enviar pull requests.

## 👨‍💻 Autor
**Luan Ortega**  
[GitHub](https://github.com/LuanOrtega) | [LinkedIn](https://www.linkedin.com/in/luan-carlos-ortega-a73422199)
