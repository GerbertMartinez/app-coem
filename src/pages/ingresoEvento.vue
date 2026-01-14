<template>
    <v-app-bar>
        <img 
            :src="logo" 
            height="75"
            @click="irPrincipal()"
        />
    </v-app-bar>

    <v-container>
        <EventoIngreso />
    </v-container>
</template>

<script setup>
import logo from '@/assets/header.jpg';
import { useMain } from '@/stores/main';
const mainData = useMain();

const irPrincipal = () => {
    mainData.goMain();
}
</script>