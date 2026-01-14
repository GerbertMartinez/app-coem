<template>

    <v-card-text class="text-center">
        <h1>Eventos</h1>
    </v-card-text>

    <v-container fluid class="d-flex justify-center align-center text-center">
        <v-row  class="d-flex justify-center">

            <v-col cols="12" md="8" lg="8" xl="6">

                    <v-card>

                        <!-- <template v-slot:text>
                            <v-text-field
                                v-model="search"
                                label="Search"
                                prepend-inner-icon="mdi-magnify"
                                variant="outlined"
                                hide-details
                                single-line
                            ></v-text-field>
                        </template> -->
                        <div class="table-wrapper">

                            <v-data-table 
                                :items="eventData.events"
                                :headers="eventData.eventsHeader"
                                :search="search"
                                :loading="eventData.loading"
                                fixed-header
                                class="custom-table"
                            >
                                <template v-slot:item.acciones="{item}">
                                    <v-btn 
                                        size="small" 
                                        color="red" 
                                        v-if="!item.fecha_final"
                                        @click="eventData.finalizarEvento(item)"
                                    >
                                        Finalizar evento
                                    </v-btn>
                                    <!-- <v-btn size="small" color="primary" v-if="item.fecha_final">
                                        Ver Detalles
                                    </v-btn> -->
                                </template>
                            </v-data-table>
                        </div>
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

import { useEvent } from '@/stores/event';
const eventData = useEvent();
import { onMounted, ref } from 'vue';

const search = ref('');

onMounted(() => {

    eventData.getEvents();

})

</script>