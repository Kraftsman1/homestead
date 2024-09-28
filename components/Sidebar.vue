<template>
    <div class="w-1/6 bg-gray-300 h-screen ">
        <div class="flex flex-col items-center">
            <div class="flex flex-col items-center mt-10">
                <img src="" alt="logo" class="w-20 h-20" />
                <h1 class="text-white
                    text-2xl font-bold mt-2">DC Engine</h1>
            </div>
            <div class="mt-6 space-y-1">
                <ul class="flex flex-col space-y-2">
                    <li>
                        <nuxt-link to="/admin"
                            class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">Dashboard</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/admin/users"
                            class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">Users</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/admin/roles"
                            class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">Roles</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/admin/permissions"
                            class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">Permissions</nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>