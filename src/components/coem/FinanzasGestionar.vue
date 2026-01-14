<template>

    <v-container fluid class="d-flex justify-center align-center text-center">
        <v-row class="d-flex justify-center">

            <v-col cols="12" md="8" lg="8" xl="6">

                <v-card>

                    <v-tabs
                        v-model="tab"
                        align-tabs="center"
                        bg-color="light-green-darken-1"
                    >
                        <v-tab :value="1">Solicitudes</v-tab>
                    </v-tabs>

                    <v-tabs-window v-model="tab">

                        <v-tabs-window-item :value="1">

                            <v-card>

                                <div class="table-wrapper">
                                    <v-data-table
                                        :headers="resourceData.solicitudesCHeaders"
                                        :items="resourceData.solicitudesC"
                                        :search="search2"
                                        :loading="resourceData.loading"
                                        fixed-header
                                        class="custom-table"
                                    >

                                        <template v-slot:top>

                                            <v-toolbar>

                                                <v-toolbar-title>Solicitudes</v-toolbar-title>

                                                <v-dialog persistent v-model="resourceData.dialogApRe" max-width="500px">

                                                    <v-card>

                                                        <v-card-title class="text-h5">
                                                            ¿Desea aprobar o rechazar la solicitud?
                                                            <br>
                                                            <v-table density="compact">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Recurso</th>
                                                                        <th>Cantidad</th>
                                                                        <th>Solicita</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody style="color: #757575;">
                                                                    <tr>
                                                                        <td>{{ resourceData.checkItem.nombre }}</td>
                                                                        <td>{{ resourceData.checkItem.cantidad }}</td>
                                                                        <td>{{ resourceData.checkItem.solicita }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </v-table>
                                                            <v-table density="compact">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Incidente</th>
                                                                        <th>Dirección</th>
                                                                        <th>Zona</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody  style="color: #757575;">
                                                                    <tr>
                                                                        <td>{{ resourceData.checkItem.incidente }}</td>
                                                                        <td>{{ resourceData.checkItem.direccion }}</td>
                                                                        <td>{{ resourceData.checkItem.zona }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </v-table>
                                                        </v-card-title>

                                                        <v-card-actions>

                                                            <v-spacer />

                                                            <v-btn 
                                                                color="grey-darken-1" 
                                                                variant="tonal"
                                                                @click="resourceData.closeApRe()"
                                                            >
                                                                Cancelar
                                                            </v-btn>

                                                            <v-btn 
                                                                color="red-darken-4" 
                                                                variant="tonal"
                                                                @click="resourceData.reject()"
                                                            >
                                                                Rechazar
                                                            </v-btn>

                                                            <v-btn 
                                                                color="green-darken-3" 
                                                                variant="tonal"
                                                                @click="resourceData.approve()"
                                                                :loading="resourceData.loading"
                                                            >
                                                                Aprobar
                                                            </v-btn>

                                                            <v-spacer />

                                                        </v-card-actions>

                                                    </v-card>

                                                </v-dialog>

                                            </v-toolbar>

                                            <v-card flat>
                                                <v-text-field
                                                    v-model="search2"
                                                    label="Search"
                                                    append-inner-icon="mdi-magnify"
                                                    variant="outlined"
                                                    hide-details
                                                    single-line
                                                />
                                            </v-card>

                                        </template>

                                        <template v-slot:item.state="{ item }">
                                            <v-badge
                                                color="green-darken-3"
                                                content="Aprobado"
                                                inline
                                                v-if="item.estado == 'Aprobado'"
                                            />
                                            <v-badge
                                                color="red-darken-4"
                                                content="Rechazado"
                                                inline
                                                v-if="item.estado == 'Rechazado'"
                                            />
                                            <v-badge dot v-if="item.estado == 'Ingresado'" color="red-darken-3">
                                                <v-btn
                                                    color="grey-darken-1"
                                                    @click="resourceData.showRequest(item)"
                                                >
                                                    Ver
                                                </v-btn>
                                            </v-badge>
                                        </template>

                                    </v-data-table>
                                </div>
                            </v-card>
                        </v-tabs-window-item>

                    </v-tabs-window>

                </v-card>

            </v-col>

        </v-row>
    </v-container>

</template>

<style scoped>
/* Contenedor con scroll horizontal */
.table-wrapper {
    width: 100%;
    overflow-x: auto;  /* Permite el scroll en pantallas pequeñas */
    display: block;  /* Evita que el contenedor colapse */
    white-space: nowrap;  /* Evita que el contenido se corte */
}

/* Forzar que la tabla no se corte */
.custom-table {
    min-width: 100%;
    width: max-content;  /* Hace que la tabla crezca según su contenido */
}

/* Asegurar que se vea bien en móviles */
@media (max-width: 600px) {
    .table-wrapper {
        max-width: 100vw;  /* Evita que la tabla se salga de la pantalla */
    }
}
</style>

<script setup>

import { useResources } from '@/stores/resources';
const resourceData = useResources();
import { onMounted, onUnmounted, ref } from 'vue';

const search2 = ref('');
const tab = ref(1);

let interval;

onMounted(() => {

    resourceData.getEvent();

    interval = setInterval(() => {
        resourceData.getEvent();
    }, 10000);

});

onUnmounted(() => {
    clearInterval(interval);
});

</script>