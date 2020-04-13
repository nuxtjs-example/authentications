<template>
  <div>
    <div class="h-screen flex flex-col mx-auto relative">
      <div class="w-full h-full">
        <div class="flex flex-col items-center justify-center h-full bg-white lg:bg-gray-100">
          <div class="w-full flex flex-col px-5 lg:py-6 lg:w-auto lg:bg-white lg:rounded lg:shadow-md lg:px-10">
            <h1 class="text-3xl text-teal-500 mx-auto mb-3 font-semibold">
              Register
            </h1>
            <div class="grid lg:grid-cols-2 lg:gap-2">
              <div class="my-3 flex flex-col">
                <label for="first-name" class="mb-2 text-gray-800">First Name</label>
                <input type="text" class="px-3 py-2 rounded border focus:outline-none focus:border-teal-400 focus:bg-teal-100" placeholder="Enter your first name...">
                <span class="px-1 text-sm text-red-500">minimum 3 characters.</span>
              </div>
              <div class="my-3 flex flex-col">
                <label for="family-name" class="mb-2 text-gray-800">Family Name</label>
                <input type="text" class="px-3 py-2 rounded border focus:outline-none focus:border-teal-400 focus:bg-teal-100" placeholder="Enter your family name...">
              </div>
            </div>
            <div class="my-3 flex flex-col">
              <label for="email" class="mb-2 text-gray-800">Email Address</label>
              <input type="text" class="px-3 py-2 rounded border focus:outline-none focus:border-teal-400 focus:bg-teal-100" placeholder="Enter your email address...">
            </div>
            <div class="my-3 flex flex-col">
              <label for="password" class="mb-2 text-gray-800">Password</label>
              <input type="password" class="px-3 py-2 rounded border focus:outline-none focus:border-teal-400 focus:bg-teal-100" placeholder="Enter your password...">
            </div>
            <button class="my-3 block border rounded px-3 py-2 uppercase bg-teal-500 text-white hover:bg-teal-400 focus:bg-teal-400 focus:outline-none">
              Register
            </button>
            <p class="text-gray-800">
              Already have an account?. Please <nuxt-link to="/login" class="text-teal-500 font-bold focus:outline-none focus:text-teal-400">
                Login
              </nuxt-link>
              here,
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
