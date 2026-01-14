<template>

    <v-container fluid class="justify-center align-center text-center">
        <v-row class="d-flex justify-center">

            <v-col>

                <v-card color="green-darken-1" class="text-center">

                    <h2>Graficas y reportes</h2>

                </v-card>

            </v-col>

        </v-row>
        <v-row>
            <v-col>
                <v-card color="grey-lighten-3" class="pa-4">
                    <v-row>
                        <v-col>
                            <Datepicker 
                                locale="es"
                                placeholder="Fecha inicio"
                                :enable-time-picker="false"
                                auto-apply
                                style="border: 1.1px solid #ABABAB; color: #7A7A7A !important; border-radius: 5px"
                                :format="formatDate"
                                v-model="incidenceData.busqueda.fecha_inicio"
                            />
                        </v-col>
                        <v-col>
                            <Datepicker 
                                locale="es"
                                placeholder="Fecha final"
                                :enable-time-picker="false"
                                auto-apply
                                style="border: 1.1px solid #ABABAB; color: #7A7A7A !important; border-radius: 5px"
                                :format="formatDate"
                                v-model="incidenceData.busqueda.fecha_final"
                            />
                        </v-col>
                        <v-col>
                            <v-select 
                                variant="outlined"
                                label="Zona"
                                bg-color="white"
                                item-value="id_zona"
                                item-title="nombre"
                                :items="incidenceData.zones"
                                v-model="incidenceData.busqueda.zona"
                            />
                        </v-col>
                        <v-col>
                            <v-select 
                                variant="outlined"
                                label="Protocolo"
                                bg-color="white"
                                item-value="id_protocolo"
                                item-title="nombre"
                                :items="incidenceData.protocolos"
                                v-model="incidenceData.busqueda.protocolo"
                            />
                        </v-col>
                        <v-col>
                            <v-select 
                                variant="outlined"
                                label="Incidente"
                                bg-color="white"
                                item-value="id_incidente"
                                item-title="nombre"
                                :items="incidenceData.incidentes"
                                v-model="incidenceData.busqueda.incidente"
                            />
                        </v-col>
                        <v-col cols="1">
                            <v-btn 
                                class="mt-2" 
                                color="primary"
                                @click="incidenceData.obtener_graficas()"
                            >
                                Buscar
                            </v-btn>
                        </v-col>
                        <v-col cols="1">
                            <v-btn
                                class="mt-2"
                                @click="descargar_excel()"
                            >
                                Descargar
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card class="mt-4 rounded-lg" color="grey-lighten-3">
                                <chart :options="incidenceData.grafica_zonas" />
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card class="mt-4 rounded-lg" color="grey-lighten-3">
                                <chart :options="incidenceData.grafica_protocolo" />
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card class="mt-4 rounded-lg" color="grey-lighten-3">
                                <chart :options="incidenceData.grafica_incidentes" />
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-divider class="mt-7 mb-7" :thickness="5">
                        <span class="text-h5">Personas</span>
                    </v-divider>

                    <v-row class="justify-center">
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>En Riesgo</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.personas.riesgo }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Afectadas</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.personas.afectadas }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Damnificadas</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.personas.damnificadas }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Evacuadas</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.personas.evacuadas }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Albergadas</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.personas.albergadas }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Desaparecidas</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.personas.desaparecidas }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Heridas</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.personas.heridas }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Fallecidas</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.personas.fallecidas }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-divider class="mt-7 mb-7" :thickness="5">
                        <span class="text-h5">Viviendas</span>
                    </v-divider>

                    <v-row class="justify-center">
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>En Riesgo</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.viviendas.riesgo }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Daño Severo</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.viviendas.danioS }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Daño Moderado</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.viviendas.danioM }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Daño Leve</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.viviendas.danioL }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-divider class="mt-7 mb-7" :thickness="5">
                        <span class="text-h5">Carreteras</span>
                    </v-divider>

                    <v-row class="justify-center">
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Afectadas</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.servicios.carreterasA }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Destruidas</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.servicios.carreterasD }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-divider class="mt-7 mb-7" :thickness="5">
                        <span class="text-h5">Puentes</span>
                    </v-divider>

                    <v-row class="justify-center">
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Afectados</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.servicios.puentesA }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Destruidos</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.servicios.puentesD }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-divider class="mt-7 mb-7" :thickness="5">
                        <span class="text-h5">Escuelas</span>
                    </v-divider>

                    <v-row class="justify-center">
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Afectadas</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.servicios.escuelasA }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Destruidas</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.servicios.escuelasD }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-divider class="mt-7 mb-7" :thickness="5">
                        <span class="text-h5">Edificios</span>
                    </v-divider>

                    <v-row class="justify-center">
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Afectados</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.servicios.edificiosA }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title>Destruidos</v-card-title>
                                <v-card-text>
                                    {{ incidenceData.servicios.edificiosD }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script setup>

import { exportToExcel } from '@/utils/excelExport';

import { useIncidence } from '@/stores/incidence';
const incidenceData = useIncidence();

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import { onMounted } from 'vue';

import { Chart } from 'highcharts-vue';

const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const descargar_excel = () => {
    exportToExcel(incidenceData.graficas, 'reporte_incidencias.xlsx');
};

onMounted(() => {
    incidenceData.obtener_graficas();
    incidenceData.obtener_zonas();
});

</script>