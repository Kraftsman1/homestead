<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/useAuthStore';

const router = useRouter();
const authStore = useAuthStore();

// Dropdown visibility
const isDropdownVisible = ref(false);

function handleLogout() {
  // Call the logout method from the auth store and then redirect to login page
  authStore.logout();
  router.push('/auth/login');
}

// Toggle dropdown visibility
function toggleDropdown() {
  isDropdownVisible.value = !isDropdownVisible.value;
}

</script>
<template>
  <!-- component -->
  <nav class="bg-white w-full flex relative justify-around lg:justify-between items-center mx-auto px-8 h-16 shadow-lg">
    <!-- logo -->
    <div class="inline-flex">
      <a href="/">
        <h2 class="py-2">DC Engine</h2>
      </a>
      <!-- search bar -->
      <!-- <div class="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
        <Search />
      </div> -->
      <!-- end search bar -->
    </div>

    <!-- end logo -->

    <!-- login -->
    <div class="flex-initial">
      <div class="flex justify-end items-center relative">
        <div class="flex mr-4 items-center">
          <a class="inline-block py-2 px-3 hover:bg-gray-200 rounded-full" href="/properties">
            <div class="flex items-center relative cursor-pointer whitespace-nowrap">
              Explore
            </div>
          </a>
          <a class="inline-block py-2 px-3 hover:bg-gray-200 rounded-full" href="#">
            <div class="flex items-center relative cursor-pointer whitespace-nowrap">
              Become a host
            </div>
          </a>
          <div v-if="authStore.isLoggedIn" class="block relative">
            <!-- Dropdown toggle button -->
            <button class="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg"
              @click="toggleDropdown">
              <div class="pl-1">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                  focusable="false" style="
                    display: block;
                    fill: none;
                    height: 16px;
                    width: 16px;
                    stroke: currentcolor;
                    stroke-width: 3;
                    overflow: visible;
                  ">
                  <g fill="none" fill-rule="nonzero">
                    <path d="m2 16h28"></path>
                    <path d="m2 24h28"></path>
                    <path d="m2 8h28"></path>
                  </g>
                </svg>
              </div>
            </button>
            <!-- Dropdown content -->
            <div v-show="isDropdownVisible" class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-10">
              <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</a>
              <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</a>
              <button @click="handleLogout()" class="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">Logout</button>
            </div>
          </div>
          <a v-else class="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow" href="/auth/login">
            Login
          </a>
          <div class="block relative">
            <button type="button" class="inline-block py-2 px-3 hover:bg-gray-200 rounded-full relative">
              <div class="flex items-center h-5">
                <div class="_xpkakx">
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                    focusable="false" style="
                      display: block;
                      height: 16px;
                      width: 16px;
                      fill: currentcolor;
                    ">
                    <path
                      d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z">
                    </path>
                  </svg>
                </div>
              </div>
            </button>
          </div>

        </div>


      </div>
    </div>
    <!-- end login -->
  </nav>
</template>
