import { defineStore } from 'pinia';

const getDefaultState = () => {
    return {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        accessToken: '',
        refreshToken: '',
        isLoggedIn: false,
        error: null,
    };
};

export const useAuthStore = defineStore('auth', {
    // Persist this store in localStorage
    persist: true,
    state: () => {
        return getDefaultState();
    },
    actions: {
        logout() {
            this.setUser(getDefaultState());
            this.isLoggedIn = false;

        },
        setUser(user) {

            // Update user properties dynamically and store in local storage
            Object.keys(user).forEach(key => {
                this[key] = user[key];
            });

            // Update login state and store in local storage
            this.isLoggedIn = true;

            console.log(user);


        },
        // set accesstoken from response data
        setAccessToken(access_token) {
            this.accessToken = access_token;
        },
    },
});
