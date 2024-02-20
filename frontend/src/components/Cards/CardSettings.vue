<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
  >
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">{{ titleTableAdd }}</h6>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form>
        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          User Information
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4" v-for="(item, index) of field" :key="index">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                {{ item.name }}
              </label>
              <input
                :type="item.type"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300" />

        
      </form>
      <div class="text-right">
        <button style="margin-right:15px ;" class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-6 py-3  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>


<script>
// import axios from 'axios';

export default {
  props: {
    field: {type: Array, default: null},
    titleTableAdd: {type: String, default: 'Title'}
  },
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      fieldTemp: [
        {
          name: 'User',
          type: 'number'
        }
      ]
    }
  },
  mounted() {
  },  

  methods: {
    async initilizeDataUser() {

    }
  }
}

</script>