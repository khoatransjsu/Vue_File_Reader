<template>
  <div>  
        <div>
            <span v-on:click="openFolder('', 2)">Home</span>
            <span v-for="i in breadCrumb" :key="i" v-on:click ="openFolder(i,2)"> / {{i}} </span>
        </div>
        <br>
        <div>
          <ul>
            <li v-for="item in data" :key="item.name" v-on:click="openFolder(item.name, item.isFolder)">
                          {{ item.name }}
            </li>
          </ul>
        </div>
    
  </div>
</template>

<script>

import axios from 'axios'

export default {

  name: 'App',
  data(){
    return {
       data: [],
       breadCrumb:[],  
       
    }
  },
  methods: {
    async fetch_data(url) {
        let response = await axios.get(url);
        this.data = response.data
    },

    openFolder(filename, isFolder){
        if (isFolder) {     
            if (filename == this.$global[this.$global.length - 1])
                return false;
            if (isFolder == 2) {
                // get folder name index + 1
                let changeFolderIndex = this.$global.indexOf(filename) + 1;

                // if filename = '', go to home folder, else remove any folder after 'changeFolderIndex' from array
                this.$global= (filename == '') ? [] : this.$global.splice(0, changeFolderIndex);
            }else
                this.$global.push(filename);

            this.fetch_data("http://localhost:5000/get/directory?path=" + encodeURIComponent(this.$global.join("/")));

        }else{
          let dir = ((this.$globallength  > 0) ?  "/" : "") + this.$global.join("/");
          this.count++;
        }
        this.breadCrumb=this.$global;
    },
  
  },
  created(){
    this.fetch_data('http://localhost:5000/get/directory');
  }
}
</script>

<style>

</style>
