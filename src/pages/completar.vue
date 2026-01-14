<template>

    <v-app-bar>
        <img 
            :src="logo" 
            height="75"
            @click="irPrincipal()"
        />
    </v-app-bar>

    <v-container>
        <CompleteForm />
    </v-container>

</template>

<script setup>

import logo from '@/assets/header.jpg';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useRegister } from '@/stores/register';
const registerData = useRegister();

const route = useRoute();

onMounted(() => {
    registerData.idParam = route.params.id;
    registerData.checkComplete();
})
</script>