<template>
    <v-app>
        <v-app-bar>

            <v-toolbar-title class="font-weight-bold">
                <img :src="logo" height="50" @click="irPrincipal()" alt="Logo" />
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn
                    color="primary"
                    v-bind="props"
                    >
                        <v-icon class="mr-2" style="font-size: 30px;">mdi-cogs</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-title @click="dialog = true">Cambiar contraseña</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-btn color="red darken-3" text @click="cerrar()">
                <v-icon class="mr-2" style="font-size: 30px;">mdi-logout</v-icon>
            </v-btn>

        </v-app-bar>

        <div class="background">
            <v-container class="pa-5 text-center">

                <v-row dense justify="center" align="center">

                    <v-col cols="12" sm="6" md="4" lg="3" v-if="tipo == 'S' || tipo == 'C'">
                        <v-card
                            class="elevation-5"
                            :style="{
                                backgroundColor: '#1e3c72',
                                color: 'white',
                            }"
                            @click="ingresar_evento()"
                        >
                            <v-card-text>
                                <v-icon large class="mb-3" style="font-size: 60px;">mdi-calendar-plus</v-icon>
                                <h3 class="text-h6 font-weight-bold">Ingresar Evento</h3>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" v-if="tipo == 'S' || tipo == 'C'">
                        <v-card
                            class="elevation-5"
                            :style="{
                                backgroundColor: '#1e3c72',
                                color: 'white',
                            }"
                            @click="ver_eventos()"
                        >
                            <v-card-text>
                                <v-icon large class="mb-3" style="font-size: 60px;">mdi-calendar-search</v-icon>
                                <h3 class="text-h6 font-weight-bold">Ver Eventos</h3>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" v-if="tipo == 'E' || tipo == 'S'">
                        <v-card
                            class="elevation-5"
                            :style="{
                                backgroundColor: '#11998e',
                                color: 'white',
                            }"
                            @click="ingresar_incidencia()"
                        >
                            <v-card-text>
                                <v-icon large class="mb-3" style="font-size: 60px;">mdi-alert</v-icon>
                                <h3 class="text-h6 font-weight-bold">Ingresar Incidencia</h3>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" v-if="tipo == 'S' || mesa == 2 || tipo == 'C'">
                        <v-card
                            class="elevation-5"
                            :style="{
                                backgroundColor: '#11998e',
                                color: 'white',
                            }"
                            @click="ver_incidencias()"
                        >
                            <v-card-text>
                                <v-icon large class="mb-3" style="font-size: 60px;">mdi-calendar-search</v-icon>
                                <h3 class="text-h6 font-weight-bold">Ver Incidencias</h3>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" v-if="tipo == 'I' && mesa != 4 || tipo == 'S'">
                        <v-card
                            class="elevation-5"
                            :style="{
                                backgroundColor: '#11998e',
                                color: 'white',
                            }"
                            @click="ingresar_recurso()"
                        >
                            <v-card-text>
                                <v-icon large class="mb-3" style="font-size: 60px;">mdi-list-box</v-icon>
                                <h3 class="text-h6 font-weight-bold">Ingresar Recursos</h3>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" v-if="tipo == 'S' || mesa == 4">
                        <v-card
                            class="elevation-5"
                            :style="{
                                backgroundColor: '#1e3c72',
                                color: 'white',
                            }"
                            @click="ver_finanzas()"
                        >
                            <v-card-text>
                                <v-icon large class="mb-3" style="font-size: 60px;">mdi-cash</v-icon>
                                <h3 class="text-h6 font-weight-bold">Finanzas</h3>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" v-if="tipo == 'I'">
                        <v-card
                            class="elevation-5"
                            :style="{
                                backgroundColor: '#1e3c72',
                                color: 'white',
                            }"
                            @click="ver_tareas()"
                        >
                            <v-card-text>
                                <v-icon large class="mb-3" style="font-size: 60px;">mdi-table-check</v-icon>
                                <h3 class="text-h6 font-weight-bold">Tareas</h3>
                            </v-card-text>
                        </v-card>
                    </v-col>

                </v-row>
            </v-container>
        </div>

        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title class="text-h6">Cambiar Contraseña</v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-text-field
                        v-model="mainData.form.oldPass"
                        label="Contraseña actual"
                        :type="showOld ? 'text' : 'password'"
                        :append-inner-icon="showOld ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="showOld = !showOld"
                        :rules="[rules.required]"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="mainData.form.newPass"
                        label="Nueva contraseña"
                        :type="showNew ? 'text' : 'password'"
                        :append-inner-icon="showNew ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="showNew = !showNew"
                        :rules="[rules.required, rules.min]"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="mainData.form.conPass"
                        label="Confirmar nueva contraseña"
                        :type="showConfirm ? 'text' : 'password'"
                        :append-inner-icon="showConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="showConfirm = !showConfirm"
                        :rules="[rules.required, rules.match]"
                        required
                        ></v-text-field>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer />
                    <v-btn text @click="closeDialog()">Cancelar</v-btn>
                    <v-btn :disabled="!valid" color="primary" @click="submit" :loading="mainData.loading">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<style scoped>
.background {
  background-image: url('@/assets/fondo.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-card {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}
.v-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}
</style>

<script setup>

import logo from '@/assets/muniave.png';
import { useMain } from '@/stores/main';
const mainData = useMain();
import { ref } from 'vue';

const dialog = ref(false);
const valid = ref(false)

const showOld = ref(false);
const showNew = ref(false);
const showConfirm = ref(false);

const rules = {
    required: value => !!value || 'Campo obligatorio',
    min: value => value.length >= 6 || 'Mínimo 6 caracteres',
    match: value => value === mainData.form.newPass || 'Las contraseñas no coinciden'
};

const closeDialog = () => {
    dialog.value = false;
    mainData.resetForm();
};

const submit = () => {
    if (valid.value) {
        mainData.changePass();
        dialog.value = false;
    }
};

const cerrar = () => {
    mainData.logout();
}

const ingresar_incidencia = () => {
    mainData.createIncidence();
}

const ingresar_evento = () => {
    mainData.createEvent();
}

const ver_eventos = () => {
    mainData.viewEvents();
}

const ver_incidencias = () => {
    mainData.viewIncidences();
}

const ingresar_recurso = () => {
    mainData.createResource();
}

const ver_finanzas = () => {
    mainData.viewMoney();
}

const ver_tareas = () => {
    mainData.viewTasks();
}

const tipo = localStorage.getItem('tipo');
const mesa = localStorage.getItem('mesa');

</script>