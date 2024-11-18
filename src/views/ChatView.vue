<template>
<div class="vh-100" style="background-color: #81C784;">
  <h2 style="margin-left:2%;">{{ storedData?.user?.name }}</h2>

  <br>
  
  <div class="fixed-bottom">
    <!-- Área do chat -->
    <div class="chat-container">
      <div class="message received">Olá! Como posso ajudar você?</div>
      <div class="message user">Oi! Quero saber mais sobre seu sistema.</div>
      <div class="message received">Claro, me diga o que você precisa!</div>

    </div>

    <!-- Campo de entrada (sem funcionalidade) -->
    <div class="input-container">
      <input type="text" placeholder="Digite sua mensagem...">
      <button>Enviar</button>
    </div>
  </div>
</div>
  
</template>

<script setup>
const storedData = JSON.parse(sessionStorage.getItem('loginData'));

</script>

<style scoped>

/* Área do chat */
.chat-container {
  height: 80vh;
  flex: 1;
  padding: 10px;
  background-color: #f4f4f4;
  overflow-y: auto;
}

/* Estilo das mensagens */
.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  max-width: 70%;
}

/* Mensagens enviadas pelo usuário */
.message.user {
  align-self: flex-end;
  background-color: #d1e7dd;
  color: #0f5132;
}

/* Mensagens recebidas */
.message.received {
  align-self: flex-start;
  background-color: #e7e9eb;
  color: #343a40;
}

/* Campo de entrada */
.input-container {
  display: flex;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
}

.input-container input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

.input-container button {
  padding: 10px 20px;
  background-color: #0d6efd;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.input-container button:hover {
  background-color: #0b5ed7;
}
</style>
