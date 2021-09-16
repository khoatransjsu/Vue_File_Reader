<template>
  <div>
      <h1> Hello World </h1>
      <ul>
        <li v-for="item in data" :key="item.name">
            {{ item.name }}
        </li>
      </ul>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'App',
  
  data(){
    return {
       data: []
    }
  },
  components: {
    
  },
  methods: {
    async fetchData(){
      try {
        const response = await axios.get('http://localhost:5000/get/directory');
        this.data = response.data;

        console.log(this.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
  created(){
    this.fetchData();
  }
}
</script>

<style>

</style>
