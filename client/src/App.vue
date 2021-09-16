<template>
  <div>  
        <div>
            <span v-on:click="openFolder('', 2)">Home</span>
        </div>
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
        let currentFolder = [];
        if (isFolder) {     
            if (filename == currentFolder[currentFolder.length - 1])
                return false;
            if (isFolder == 2) {
                // get folder name index + 1
                let changeFolderIndex = currentFolder.indexOf(filename) + 1;

                // if filename = '', go to home folder, else remove any folder after 'changeFolderIndex' from array
                currentFolder = (filename == '') ? [] : currentFolder.splice(0, changeFolderIndex);
            }else
                currentFolder.push(filename);

            this.fetch_data("http://localhost:5000/get/directory?path=" + encodeURIComponent(currentFolder.join("/")));
        }else{
          let dir = ((currentFolder.length  > 0) ?  "/" : "") + currentFolder.join("/");
        }
        this.breadCrumb=currentFolder;
    },
    getBreadCrumb(){

    }
    
  },
  created(){
    this.fetch_data('http://localhost:5000/get/directory');
  }
}
</script>

<style>

</style>
