<template>

    <v-app-bar>
        <img 
            :src="logo" 
            height="65"
            @click="irPrincipal()"
            style="margin-left: 10px;"
        />
    </v-app-bar>

    <v-container>
        <PreRegisterForm />
    </v-container>

</template>

<script setup>

import logo from '@/assets/header2.png';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useRegister } from '@/stores/register';
const registerData = useRegister();

const route = useRoute();

onMounted(() => {
    registerData.idParam = route.params.id;
    registerData.checkPreRegister();
})
</script>