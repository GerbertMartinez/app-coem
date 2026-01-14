<template>

    <v-container class="text-center">

        <v-row  class="d-flex justify-center">

            <v-col cols="12" md="4" lg="4" xl="3" sm="6">

                <v-card hover>
                    <v-card-title>
                        <p class="text-h4 font-weight-black">
                            <v-icon color="grey" size="x-large">
                                mdi-account
                            </v-icon>
                        </p>
                        <p class="text-h4 font-weight-black">Personas</p>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="text-h6">
                        <v-row>
                            <v-col>En riesgo</v-col>
                            <v-col>{{ incidenceData.detail.priesgo }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Afectadas</v-col>
                            <v-col>{{ incidenceData.detail.pafectadas }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Damnificadas</v-col>
                            <v-col>{{ incidenceData.detail.pdanio }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Evacuadas</v-col>
                            <v-col>{{ incidenceData.detail.pevacuadas }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Albergadas</v-col>
                            <v-col>{{ incidenceData.detail.palvergadas }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Desaparecidas</v-col>
                            <v-col>{{ incidenceData.detail.pdesaparecidas }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Heridas</v-col>
                            <v-col>{{ incidenceData.detail.pheridas }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Fallecidas</v-col>
                            <v-col>{{ incidenceData.detail.pfallecidas }}</v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

            </v-col>
            <v-col cols="12" md="4" lg="4" xl="3" sm="6">

                <v-card hover>
                    <v-card-title>
                        <p class="text-h4 font-weight-black">
                            <v-icon color="grey" size="x-large">
                                mdi-home
                            </v-icon>
                        </p>
                        <p class="text-h4 font-weight-black">Viviendas</p>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="text-h6">
                        <v-row>
                            <v-col>En riesgo</v-col>
                            <v-col>{{ incidenceData.detail.vriesgo }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Daño Severo</v-col>
                            <v-col>{{ incidenceData.detail.vdanios }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Daño Moderado</v-col>
                            <v-col>{{ incidenceData.detail.vdaniom }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Daño Leve</v-col>
                            <v-col>{{ incidenceData.detail.vdaniol }}</v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

            </v-col>
            <v-col cols="12" md="4" lg="4" xl="3" sm="6">

                <v-card hover>
                    <v-card-title>
                        <p class="text-h4 font-weight-black">
                            <v-icon color="grey" size="x-large">
                                mdi-home-city
                            </v-icon>
                        </p>
                        <p class="text-h4 font-weight-black">Servicios</p>
                    </v-card-title>
                    <v-divider></v-divider>
                    <b>Carreteras</b>
                    <v-icon color="grey" size="x-large">
                        mdi-road-variant
                    </v-icon>
                    <v-card-text class="text-h6">
                        <v-row>
                            <v-col>Afectadas</v-col>
                            <v-col>{{ incidenceData.detail.cafectadas }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Destruidas</v-col>
                            <v-col>{{ incidenceData.detail.cdestruidas }}</v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <b>Puentes</b>
                    <v-icon color="grey" size="x-large">
                        mdi-bridge
                    </v-icon>
                    <v-card-text class="text-h6">
                        <v-row>
                            <v-col>Afectados</v-col>
                            <v-col>{{ incidenceData.detail.pafectados }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Destruidos</v-col>
                            <v-col>{{ incidenceData.detail.pdestruidos }}</v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <b>Escuelas</b>
                    <v-icon color="grey" size="x-large">
                        mdi-school
                    </v-icon>
                    <v-card-text class="text-h6">
                        <v-row>
                            <v-col>Afectadas</v-col>
                            <v-col>{{ incidenceData.detail.esafectadas }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Destruidas</v-col>
                            <v-col>{{ incidenceData.detail.esdestruidas }}</v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <b>Edificios</b>
                    <v-icon color="grey" size="x-large">
                        mdi-office-building
                    </v-icon>
                    <v-card-text class="text-h6">
                        <v-row>
                            <v-col>Afectados</v-col>
                            <v-col>{{ incidenceData.detail.edafectados }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Destruidos</v-col>
                            <v-col>{{ incidenceData.detail.eddestruidos }}</v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

            </v-col>

        </v-row>

        <v-row  class="d-flex justify-center">

            <v-col cols="12" md="12" lg="6" xl="6" sm="12">
                <v-textarea 
                    label="Descripción de la incidencia" 
                    variant="outlined"
                    disabled
                    v-model="incidenceData.detail.comentarios"
                />
            </v-col>

        </v-row>

        <v-row  class="d-flex justify-center" v-if="incidenceData.detail.estado !== 'F'">

            <v-col cols="12" md="4" lg="4" xl="3" sm="6">
                <v-btn color="yellow-darken-2" @click="incidenceData.gestionar()">Gestionar Recursos</v-btn>
                <v-btn color="green-darken-3" @click="incidenceData.finalizar()">Finalizar Incidencia</v-btn>
            </v-col>

        </v-row>

    </v-container>

</template>

<script setup>
import { useIncidence } from '@/stores/incidence';
const incidenceData = useIncidence();
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {

    incidenceData.idParam = route.params.id;
    incidenceData.getDetail();
    localStorage.setItem('incidencia',route.params.id);

})

</script>