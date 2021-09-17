<template>
  <v-container>        
        <v-toolbar app dark color="blue-grey darken-1" class="hidden-xs-and-down">
          <v-toolbar-title>
              <v-icon style="font-size: 38px;" v-on:click="openFolder('', 2)"> mdi-home </v-icon>
              <span style="font-size: 20px;" v-for="i in breadCrumb" :key="i" v-on:click ="openFolder(i,2)">/ {{i}} </span>
          </v-toolbar-title>
        </v-toolbar>  
        <v-list>     
            <v-list-item-group>
              <v-list-item v-for="item in data" :key="item.name" v-on:click="openFolder(item.name, item.isFolder)">
                  <v-list-item-icon>
                    <v-icon v-if="item.isFolder"  >
                      {{icon}}
                    </v-icon>
                    <v-icon v-else >
                      mdi-file
                    </v-icon>
                  </v-list-item-icon>
                   &nbsp&nbsp&nbsp
                  <v-list-item-content>  
                      <v-list-item-title v-text="item.name">      
                      </v-list-item-title>
                  </v-list-item-content>
              </v-list-item>  
            </v-list-item-group>         
        </v-list>
        <div v-html="pdf">
            {{ pdf }}
        </div> 
        <PDFDocument v-show="show" />     
  </v-container>
</template>

<script>

import axios from 'axios'
import PDFDocument from './components/PDFDocument'

export default {
  name: 'App',
  data(){
    return {
       data: [],
       breadCrumb:[],  
       icon:'mdi-folder', 
       pdf:'',
       show: false,
    }
  },
  components:{
    PDFDocument,
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
          this.showComponent();
        }
        this.breadCrumb=this.$global;
        
    },
    showComponent(){
        this.show = !this.show;
    },
  },

  created(){
    this.fetch_data('http://localhost:5000/get/directory');
  }
}
</script>

<style>

</style>
