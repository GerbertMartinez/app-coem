<template>
    <v-app-bar>
        <img 
            :src="logo" 
            height="75"
            @click="irPrincipal()"
        />
    </v-app-bar>

    <v-container>
        <PrimerIngreso />
    </v-container>
</template>

<script setup>

import logo from '@/assets/header.jpg';
import { useRegister } from '@/stores/register';
const registerData = useRegister();

const irPrincipal = () => {
    registerData.goMain();
}

</script>