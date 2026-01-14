<template>
    <v-app-bar>
        <img 
            :src="logo" 
            height="75"
            @click="irPrincipal()"
        />
    </v-app-bar>

    <v-container>
        <EstadisticasIncidencias />
    </v-container>
</template>

<script setup>
import logo from '@/assets/muniave.png';
import { useMain } from '@/stores/main';
const mainData = useMain();

const irPrincipal = () => {
    mainData.goMainMenu();
}
</script>