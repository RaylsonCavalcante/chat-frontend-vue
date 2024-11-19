<template>
<div class="vh-100" style="background-color: #81C784;">
  <h2 style="margin-left:2%;">{{ storedData?.user?.name }}</h2>

  <br>
  
  <div class="fixed-bottom">
    <!-- Área do chat -->
    <div class="chat-container">
      <!-- Aqui exibe as mensagens -->
    </div>

    <!-- Campo de entrada -->
    <div class="input-container">
      <input type="text" placeholder="Digite sua mensagem..." v-model="text">
      <button @click="sendMessagePublic">Enviar</button>
    </div>
  </div>
</div>
  
</template>

<script setup>
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import {reactive, ref, onMounted} from 'vue';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

//Pega dados Login User
const storedData = JSON.parse(sessionStorage.getItem('loginData'));

//Variáveis
const text = ref('');

//Config echo
window.Echo = new Echo({
  broadcaster: 'reverb',
  key: 't1ebsy2hyoupzp5mfv75',
  wsHost: 'localhost',
  wsPort: '8080',
  forceTLS: false,
  enabledTransports: ['ws']
});

onMounted(async () => {
    
  //Public
  window.Echo.channel('chat-channel')
  .listen('MessageEvent', (e) => {
    if(e.user_id != parseInt(storedData.user.id)){
        
        //Mostra a mensagem do client.
        $(".chat-container").append(
        `<div class="text-dark float-start w-100">${e.message}</div>`
        );
    }
  })

});

//Envia Messagem - GraphQL
const { mutate: sendMessagePublic, onDone, onError } = useMutation(gql`
  mutation SendMessage ($user_id: Int!, $text: String!){
    sendMessage(user_id: $user_id, content: $text) 
  }`, () => ({
    variables: {
      user_id: parseInt(storedData.user.id),
      text: text.value,
    },
  })
)

//Pega resposta do sendMessage
onDone(({ data }) => {
  if (data) {
    if(data.sendMessage){
      //Mostra a mensagem do User logado.
      $(".chat-container").append(
        `<div class="text-success float-end w-100 text-end">${text.value}</div>`
        );

      //Limpa campo
      text.value = "";
    }

  }
});
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
