<template>
    <div class="coming-soon">
      <h1>Coming Soon!</h1>
      <p>We're working hard to get our website up and running. Stay tuned!</p>
      <div class="email-signup">
        <input 
          type="email" 
          placeholder="Enter your email to get updates"
          v-model="email"
        />
        <button @click="subscribe">Subscribe</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  
  const subscribe = () => {
    if (email.value) {
      alert(`Thank you for subscribing with ${email.value}!`);
      email.value = '';
    } else {
      alert('Please enter a valid email address.');
    }
  };
  </script>
  
  <style scoped>
  .coming-soon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
    text-align: center;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .email-signup {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  input {
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>