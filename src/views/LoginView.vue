<template>
  <div class="login-spinner"></div>
  <div class="bg-loading-login">
  <section class="vh-100" style="background-color: #81C784;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <!-- Login -->
          <div class="card shadow-2-strong" id="divLogin" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">

              <h3 class="mb-5" style="color: #81C784;"><i class="far fa-comments" style="color: #81C784;"></i> Login</h3>

              
              <div class="mb-4">
                <input type="email" v-model="userLogin.email" name="email" required class="form-control form-control-lg" placeholder="Email" />
              </div>

              <div class="mb-4">
                <input type="password" v-model="userLogin.password" name="password" required id="password" class="form-control form-control-lg" placeholder="Senha" />
              </div>

              <!-- Checkbox -->
              <div class="form-check d-flex justify-content-start mb-4">
                <input class="form-check-input" type="checkbox" value="" id="viewPassLogin" @click="viewPass()"/>
                <label class="form-check-label" for="viewPassLogin"> Mostrar senha </label>
              </div>

              <button class="btn btn-lg btn-block" style="background-color:#81C784; color:white;" type="submit" @click="login">
                <div class="spinner-border spinner-border-sm" id="spin" style="visibility: hidden; position: absolute; margin-left: -20px; margin-top:2px;" role="status">
                </div>
                Login
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>

import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag';
import { useRouter } from 'vue-router';
import {reactive, ref} from 'vue';

//Login
const { mutate: login, onDone, onError } = useMutation(gql`
mutation Login {
  login(input: { username: "test@example.com", password: "password" }) {
    access_token
    expires_in
    refresh_token
    token_type
    user {
      email
      id
      name
    }
  }
}`);

const router = useRouter();
const userLogin = reactive({
  email: '',
  password: ''
});

//Pega resposta do login
onDone(({ data }) => {
  if (data) {
    sessionStorage.setItem('loginData', JSON.stringify(data.login));

    router.push({ path: '/chat' });

  }
});

</script>



<style scoped>
  .profile-userpic img {
    float: none;
    margin: 0 auto;
    object-fit: cover;
    border-style: solid;
    border-color: white;
    -webkit-border-radius: 50% !important;
    -moz-border-radius: 50% !important;
    border-radius: 50% !important;
  }
  #labelProfile{
    cursor: pointer;
  }
  #imgProfile{
    width: 100px;
    height: 100px;
  }
  #fileProfile{
     opacity: 0;
     position: absolute;
     z-index: -1;
  }
</style>