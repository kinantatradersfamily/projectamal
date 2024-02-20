<template>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-12/12 px-4">
        <CardSettings :field="field"/>
      </div>
    </div>
  </template>
  <script>
  import CardSettings from "@/components/Cards/CardSettings.vue";
  
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
            ]
        }
    }
  };
</script>
  