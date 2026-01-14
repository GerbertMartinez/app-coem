<template>
    <v-app-bar
    >
        <img 
            :src="logo" 
            height="65"
            @click="irPrincipal()"
            style="margin-left: 10px;"
        />
    </v-app-bar>

    <v-container>
        <RegisterForm />
    </v-container>
</template>

<script setup>

import logo from '@/assets/header2.png';
import { useRegister } from '@/stores/register';
const registerData = useRegister();

const irPrincipal = () => {
    registerData.goMain();
}

</script>