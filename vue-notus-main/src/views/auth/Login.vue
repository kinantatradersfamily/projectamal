<template>
  <div class="container mx-auto px-4 h-full">
    <div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500" v-if="noticeOfError">
          <span class="text-xl inline-block mr-5 align-middle">
            <i class="fas fa-bell"></i>
          </span>
          <span class="inline-block align-middle mr-8">
            <b class="capitalize">red!</b> {{messageError}}!
          </span>
          <button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"  @click="closeTheNotice">
            <span>×</span>
          </button>
        </div>
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0" style="margin-top: 2em;">
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                  v-model="username"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                  
                >
                  Password
                </label>
                <input
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button" 
                  @click="fetchDataPosts()"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >

import axios from 'axios';


export default {
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      username: '',
      password: '',
      messageError: '',

      noticeOfError: false,
    }
  },

  methods: {
    async closeTheNotice() {
      this.noticeOfError = false
    },

    async fetchDataPosts() {
      this.noticeOfError = false
      try {
        const response = await axios.post(`${this.baseUrl}/login`, {
          username: this.username,
          password: this.password
        })

        if(response.data) {
          localStorage.clear();
          localStorage.setItem("id_user", response.data.id);
          this.$router.push({path: '/admin/dashboard'})
        }
        
      } catch (error) {
        this.noticeOfError = true
        this.messageError = error.response.data
      }
    }
  }
}


</script>

