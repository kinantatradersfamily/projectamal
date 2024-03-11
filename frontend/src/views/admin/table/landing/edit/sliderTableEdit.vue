<template>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-12/12 px-4">
        <CardSettings :field="field" :fieldValue="fieldEditCarousel" />
      </div>
    </div>
  </template>
  <script>
  
  import axios from 'axios';
  import CardSettings from '../../../../../components/Cards/CardSettings.vue'
  
  export default {
    components: {
      CardSettings,
    },
    data(){
        return {
            field: [
              {
                name: 'title',
                type: 'text'
              },
              {
                name: 'description',
                type: 'text'
              },
              {
                name: 'image',
                type: 'file'
              }
            ],
          fieldEditCarousel: {},
          detailLanding: [],
          baseUrl: 'http://localhost:3000'
        }
    },

    mounted() {
      this.initializeData()
      console.log(this.$store, 'ew')
    },

    methods: {
      async initializeData() {
        try {
          const token = localStorage.getItem('detail_user')
          const contents =  await axios.get(`${this.baseUrl}/carrousel/${this.$route.params.id}`, {headers: {"Authorization": token}})
          const objField = {
            title: contents.data.message.title,
            description: contents.data.message.description,
            image: contents.data.message.content
          }
          this.fieldEditCarousel = await JSON.parse(JSON.stringify(objField))
        } catch (error) {
          console.log(error)
        }
        
      }
    },


   
  };
</script>
  