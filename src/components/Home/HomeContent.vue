<template>

    <v-container class="d-flex flex-column justify-center align-center text-center" style="height: 100vh;">
        <v-row class="d-flex justify-center">
            <v-col cols="12" md="8" lg="6" xl="4">
                <img 
                    :src="redes" 
                    style="width: 75%; cursor: pointer;"
                    @click="goLinkTree()"
                />
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col cols="12" md="8" lg="6" xl="5">
                <img 
                    :src="hero" 
                    style="width: 100%;"
                />
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col cols="12" md="8" lg="6" xl="5">

                <img 
                    :src="boton" 
                    style="width: 100%; cursor: pointer;"
                    @click="irRegistro()"
                />

                    <v-btn 
                        variant="tonal"
                        color="indigo-darken-4"
                        href="https://youtu.be/He-5Ehu_eB4?si=IyF2StiSekURgJf_"
                        size="x-large"
                    >
                        Tutorial de registro
                    </v-btn>
                    
            </v-col>
        </v-row>
    </v-container>

</template>

<style scoped>

.link {
    cursor: pointer;
}

</style>

<script setup>

import redes from '@/assets/redes.jpg';
import hero from '@/assets/header2.png';
import boton from '@/assets/boton.jpg'

import { useRegister } from '@/stores/register';
const registerData = useRegister();

const irRegistro = () => {
    registerData.goRegister();
};

const goLinkTree = () => {
    window.open('https://linktr.ee/AveMuniguate', '_blank');
};

// const goFacebook = () => {
//     window.open('https://www.facebook.com/AVEMuniGuate', '_blank');
// };
// const goInstagram = () => {
//     window.open('https://www.instagram.com/avemuniguate/', '_blank');
// }
// const goTiktok = () => {
//     window.open('https://www.tiktok.com/@avemuniguate', '_blank');
// }
// const goX = () => {
//     window.open('https://x.com/avemuniguate?s=21', '_blank');
// }
// const goThreads = () => {
//     window.open('https://www.threads.net/@avemuniguate', '_blank');
// }

</script>