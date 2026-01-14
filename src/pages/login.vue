<template>
    <v-container class="d-flex justify-center align-center fill-height">
        <v-card class="pa-5" elevation="10" width="400">
            <v-card-title class="text-h5 text-center">
                Iniciar Sesión
            </v-card-title>
            <v-card-text>
                <form @submit.prevent="submitForm">

                    <v-text-field 
                        label="Usuario"
                        variant="outlined"
                        v-model="usuario.value.value"
                        :error-messages="usuario.errorMessage.value"
                    />
                    <v-text-field 
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        v-model="clave.value.value"
                        :error-messages="clave.errorMessage.value"
                    />

                    <v-btn
                        class="mt-4"
                        block
                        color="green"
                        type="submit"
                        :loading="mainData.loading"
                    >
                        Iniciar Sesión
                    </v-btn>

                </form>
            </v-card-text>
        </v-card>
    </v-container>


</template>

<style scoped>
.fill-height {
    height: 100vh;
}
</style>

<script setup>

import { useField, useForm } from 'vee-validate';
import { useMain } from '@/stores/main';
const mainData = useMain();

const { handleSubmit } = useForm({
    validationSchema: {
        usuario (value) {
            if (!value) {
                return 'Ingrese el usuario';
            }
            return true;
        },
        clave (value) {
            if (!value) {
                return 'Ingrese la contraseña';
            }
            return true;
        }
    }
});

const usuario = useField('usuario');
const clave = useField('clave');

const submitForm = handleSubmit(values => {
    mainData.login(values);
});

</script>