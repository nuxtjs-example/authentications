<template>
  <div>
    <div class="h-screen flex flex-col mx-auto relative">
      <div class="w-full h-full">
        <div class="flex flex-col items-center justify-center h-full bg-white lg:bg-gray-100">
          <div class="w-full flex flex-col px-5 lg:py-6 lg:w-auto lg:bg-white lg:rounded lg:shadow-md lg:px-10">
            <h1 class="text-3xl text-teal-500 mx-auto mb-3 font-semibold">
              Welcome Back
            </h1>
            <div class="my-3 flex flex-col">
              <label for="email" class="mb-2 text-gray-800">Email Address</label>
              <input type="text" class="px-3 py-2 rounded border focus:outline-none focus:border-teal-400 focus:bg-teal-100" placeholder="Enter your email address...">
            </div>
            <div class="my-3 flex flex-col">
              <label for="password" class="mb-2 text-gray-800">Password</label>
              <input type="password" class="px-3 py-2 rounded border focus:outline-none focus:border-teal-400 focus:bg-teal-100" placeholder="Enter your password...">
            </div>
            <button class="my-3 block border rounded px-3 py-2 uppercase bg-teal-500 text-white hover:bg-teal-400 focus:bg-teal-400 focus:outline-none">
              Login
            </button>
            <div class="grid grid-cols-2 gap-2">
              <button class="border rounded px-3 py-2 uppercase bg-red-700 text-white font-semibold">
                Google
              </button>
              <button class="border rounded px-3 py-2 uppercase bg-blue-700 text-white font-semibold">
                Facebook
              </button>
            </div>
            <p class="text-gray-800 mt-3">
              Don't have an account?. Please <nuxt-link to="/register" class="text-teal-500 font-bold focus:outline-none focus:text-teal-400">
                Register
              </nuxt-link>
              here,
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
