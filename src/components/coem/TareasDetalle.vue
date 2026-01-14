<template>

    <v-container fluid class="d-flex justify-center align-center text-center">
        <v-row class="d-flex justify-center">

            <v-col cols="12" md="8" lg="8" xl="6">

                <v-card>

                    <div class="table-wrapper">

                        <v-data-table 
                            :items="incidenceData.tareas"
                            :headers="incidenceData.tareasHeader"
                            :search="search2"
                            :loading="incidenceData.loading"
                            fixed-header
                            class="custom-table"
                        >
                            <template v-slot:top>

                                <v-toolbar class="bg-green">

                                    <v-toolbar-title><b>Tareas</b></v-toolbar-title>

                                    <v-divider
                                        class="mx-4"
                                        inset
                                        vertical
                                    />

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
                            <template v-slot:item.estat="{item}">
                                <v-badge
                                    color="green-darken-3"
                                    content="Finalizado"
                                    inline
                                    v-if="item.estado == 'Finalizado'"
                                />
                                <v-badge
                                    color="grey-darken-1"
                                    content="En proceso"
                                    inline
                                    v-if="item.estado == 'En proceso'"
                                />
                                <v-badge
                                    color="yellow-darken-1"
                                    content="Ingresado"
                                    inline
                                    v-if="item.estado == 'Ingresado'"
                                />
                            </template>
                            <template v-slot:item.acciones="{item}">
                                <v-btn 
                                    size="small" 
                                    color="primary"
                                    @click="openModal(item)"
                                >
                                    Ver
                                </v-btn>
                            </template>
                        </v-data-table>

                    </div>

                </v-card>

            </v-col>

        </v-row>
    </v-container>

    <v-dialog
        v-model="incidenceData.modal"
        transition="dialog-bottom-transition"
        @after-enter="onDialogOpen"
    >
        <v-card v-if="incidenceData.loading">
            <v-card-text class="text-center">
                <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
                />
            </v-card-text>
        </v-card>
        <v-card v-else>
            <v-card-title class="text-right">
                <v-fab
                    color="red-darken-2"
                    :app="true"
                    location="top-right"
                    size="large"
                    icon
                    @click="incidenceData.modal = false"
                    style="top: 5px !important"
                >
                    <v-icon>mdi-close</v-icon>
                </v-fab>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col>
                        <v-card color="yellow-lighten-4">
                            <v-container>
                                <v-row>
                                    <v-col class="text-center">
                                        <h1>{{ incidenceData.detalle.incidente.nombre }} en zona {{ incidenceData.detalle.zona }}</h1>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>

                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card>
                            <v-container>
                                <v-text-field
                                    variant="outlined"
                                    label="Reporta"
                                    readonly
                                    v-model="incidenceData.detalle.usuario.institucion.nombre"
                                    bg-color="grey-lighten-2"
                                />
                                <v-text-field
                                    variant="outlined"
                                    label="Fecha dd/mm/aaaa"
                                    readonly
                                    v-model="fechaFormateada"
                                    bg-color="grey-lighten-2"
                                />
                                <v-text-field
                                    variant="outlined"
                                    label="Dirección"
                                    readonly
                                    v-model="incidenceData.detalle.direccion"
                                    bg-color="grey-lighten-2"
                                />
                                <v-textarea
                                    variant="outlined"
                                    label="Descripción"
                                    readonly
                                    v-model="incidenceData.detalle.descripcion"
                                    bg-color="grey-lighten-2"
                                />
                                <v-text-field 
                                    variant="outlined"
                                    label="Tipo de lugar"
                                    readonly
                                    v-model="incidenceData.detalle.area.nombre"
                                    bg-color="grey-lighten-2"
                                />
                                <v-select
                                    variant="outlined"
                                    label="Protocolo"
                                    :items="incidenceData.protocolos"
                                    item-title="nombre"
                                    item-value="id_protocolo"
                                    readonly
                                    v-model="incidenceData.detalle.id_protocolo"
                                    :error-messages="error"
                                    @update:model-value="protocoloChange()"
                                    bg-color="grey-lighten-2"
                                />
                                <v-select 
                                    variant="outlined"
                                    label="Estado"
                                    :items="incidenceData.estados"
                                    item-title="nombre"
                                    item-value="estado"
                                    v-model="incidenceData.detalle.estado"
                                />
                                <v-select 
                                    variant="outlined"
                                    label="Entidad"
                                    :items="incidenceData.instituciones"
                                    item-title="nombre"
                                    item-value="id_institucion"
                                    readonly
                                    v-model="incidenceData.detalle.id_institucion"
                                    :error-messages="error2"
                                    @update:model-value="institucionChange()"
                                    bg-color="grey-lighten-2"
                                />
                                <div class="text-right">
                                    <v-btn color="green-darken-2" @click="grabar()">Grabar</v-btn>
                                </div>
                            </v-container>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card>
                            <v-container>
                                <div class="map-container">
                                    <div ref="viewDiv" class="view-div"></div>
                                </div>
                                <v-row>
                                    <v-col>
                                        <img 
                                            :src="incidenceData.detalle.foto" 
                                            class="responsive-img"
                                        />
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-card color="blue-lighten-5">
                            <v-card-title class="text-center">Detalle del reporte:</v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>

                        <v-card>
                            <v-table class="carta">
                                <template v-slot:top>
                                    <v-row>
                                        <v-col class="text-center">
                                            <p class="text-h4 font-weight-black">
                                                <v-icon size="x-large">
                                                    mdi-human-male-female-child
                                                </v-icon>
                                            </p>
                                        </v-col>
                                    </v-row>
                                </template>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th>Personas</th>
                                            <th>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>En riesgo</td>
                                            <td>{{ incidenceData.detail.priesgo }}</td>
                                        </tr>
                                        <tr>
                                            <td>Afectadas</td>
                                            <td>{{ incidenceData.detail.pafectadas }}</td>
                                        </tr>
                                        <tr>
                                            <td>Damnificadas</td>
                                            <td>{{ incidenceData.detail.pdanio }}</td>
                                        </tr>
                                        <tr>
                                            <td>Evacuadas</td>
                                            <td>{{ incidenceData.detail.pevacuadas }}</td>
                                        </tr>
                                        <tr>
                                            <td>Albergadas</td>
                                            <td>{{ incidenceData.detail.palvergadas }}</td>
                                        </tr>
                                        <tr>
                                            <td>Desaparecidas</td>
                                            <td>{{ incidenceData.detail.pdesaparecidas }}</td>
                                        </tr>
                                        <tr>
                                            <td>Heridas</td>
                                            <td>{{ incidenceData.detail.pheridas }}</td>
                                        </tr>
                                        <tr>
                                            <td>Fallecidas</td>
                                            <td>{{ incidenceData.detail.pfallecidas }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-table>
                        </v-card>

                    </v-col>
                    <v-col>

                        <v-card>
                            <v-table class="carta">
                                <template v-slot:top>
                                    <v-row>
                                        <v-col class="text-center">
                                            <p class="text-h4 font-weight-black">
                                                <v-icon size="x-large">
                                                    mdi-home
                                                </v-icon>
                                            </p>
                                        </v-col>
                                    </v-row>
                                </template>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th>Viviendas</th>
                                            <th>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>En riesgo</td>
                                            <td>{{ incidenceData.detail.vriesgo }}</td>
                                        </tr>
                                        <tr>
                                            <td>Daño Severo</td>
                                            <td>{{ incidenceData.detail.vdanios }}</td>
                                        </tr>
                                        <tr>
                                            <td>Daño Moderado</td>
                                            <td>{{ incidenceData.detail.vdaniom }}</td>
                                        </tr>
                                        <tr>
                                            <td>Daño Leve</td>
                                            <td>{{ incidenceData.detail.vdaniol }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-table>
                        </v-card>
                        <br>
                        <v-card>
                            <v-table class="carta">
                                <template v-slot:top>
                                    <v-row>
                                        <v-col class="text-center">
                                            <p class="text-h4 font-weight-black">
                                                <v-icon size="x-large">
                                                    mdi-road-variant
                                                </v-icon>
                                            </p>
                                        </v-col>
                                    </v-row>
                                </template>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th>Carreteras</th>
                                            <th>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Afectadas</td>
                                            <td>{{ incidenceData.detail.cafectadas }}</td>
                                        </tr>
                                        <tr>
                                            <td>Destruidas</td>
                                            <td>{{ incidenceData.detail.cdestruidas }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-table>
                        </v-card>

                    </v-col>

                    <v-col>

                        <v-card>
                            <v-table class="carta">
                                <template v-slot:top>
                                    <v-row>
                                        <v-col class="text-center">
                                            <p class="text-h4 font-weight-black">
                                                <v-icon size="x-large">
                                                    mdi-bridge
                                                </v-icon>
                                            </p>
                                        </v-col>
                                    </v-row>
                                </template>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th>Puentes</th>
                                            <th>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Afectadas</td>
                                            <td>{{ incidenceData.detail.pafectados }}</td>
                                        </tr>
                                        <tr>
                                            <td>Destruidas</td>
                                            <td>{{ incidenceData.detail.pdestruidos }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-table>
                        </v-card>
                        <br>
                        <v-card>
                            <v-table class="carta">
                                <template v-slot:top>
                                    <v-row>
                                        <v-col class="text-center">
                                            <p class="text-h4 font-weight-black">
                                                <v-icon size="x-large">
                                                    mdi-school
                                                </v-icon>
                                            </p>
                                        </v-col>
                                    </v-row>
                                </template>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th>Escuelas</th>
                                            <th>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Afectadas</td>
                                            <td>{{ incidenceData.detail.esafectadas }}</td>
                                        </tr>
                                        <tr>
                                            <td>Destruidas</td>
                                            <td>{{ incidenceData.detail.esdestruidas }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-table>
                        </v-card>
                        <br>
                        <v-card>
                            <v-table class="carta">
                                <template v-slot:top>
                                    <v-row>
                                        <v-col class="text-center">
                                            <p class="text-h4 font-weight-black">
                                                <v-icon size="x-large">
                                                    mdi-domain
                                                </v-icon>
                                            </p>
                                        </v-col>
                                    </v-row>
                                </template>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th>Edificios</th>
                                            <th>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Afectadas</td>
                                            <td>{{ incidenceData.detail.edafectados }}</td>
                                        </tr>
                                        <tr>
                                            <td>Destruidas</td>
                                            <td>{{ incidenceData.detail.eddestruidos }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-table>
                        </v-card>

                    </v-col>
                </v-row>
                
            </v-card-text>
        </v-card>

    </v-dialog>

</template>

<style scoped>

.responsive-img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
}

.carta {
    background-color: #d4d4d4 !important;
}
/* Contenedor con scroll horizontal */
.table-wrapper {
    width: 100%;
    overflow-x: auto;  
    display: block;  
    white-space: nowrap;
}

.mapContainer {
    height: 300px;
    width: 100%;
    border: 2px solid gray;
}
.view-div {
  height: 400px;
}

/* Forzar que la tabla no se corte */
.custom-table {
    min-width: 100%;
    width: max-content;
}

/* Asegurar que se vea bien en móviles */
@media (max-width: 600px) {
    .table-wrapper {
        max-width: 100vw;  /* Evita que la tabla se salga de la pantalla */
    }
}
</style>

<script setup>

import { useIncidence } from '@/stores/incidence';
const incidenceData = useIncidence();
import { onMounted, ref, nextTick } from 'vue';

const search = ref('');
const search2 = ref('');
const tab = ref(1);
const viewDiv = ref(null);
const error = ref(null);
const error2 = ref(null);

const onDialogOpen = async () => {
  await nextTick();
  setTimeout(() => {
    if (viewDiv.value) {
      initMap();
    } else {
      console.warn('viewDiv no está montado aún');
    }
  }, 1500);
};

function initMap() {

    window.require([
        'esri/Map',
        'esri/views/MapView',
        'esri/Graphic'
    ], (Map, MapView, Graphic) => {

        const map = new Map({
            basemap: 'satellite'
        });

        const lat = parseFloat(incidenceData.detalle.latitud);
        const lon = parseFloat(incidenceData.detalle.longitud);

        const view = new MapView({
            container: viewDiv.value,
            map: map,
            center: [lon, lat],
            zoom: 19
        });
    
        const pointGraphic = new Graphic({
            geometry: {
                type: 'point',
                longitude: lon,
                latitude: lat
            },
            symbol: {
                type: "simple-marker",
                style: "triangle",
                color: [255, 0, 0],
                size: "18px",
                outline: {
                    color: [255, 255, 0],
                    width: 1
                }
            }
        });

        view.graphics.add(pointGraphic);

    });

};

const fechaFormateada = computed(() => {
  const fecha = new Date(incidenceData.detalle.fecha_inicio)
  const dia = String(fecha.getDate()).padStart(2, '0')
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const anio = fecha.getFullYear()
  return `${dia}/${mes}/${anio}`
});

const openModal = (item) => {
    incidenceData.idParam = item.id_incidencia;
    incidenceData.getDetail();
    incidenceData.modal = true;
    incidenceData.obtener_detalle(item.id_incidencia);
    incidenceData.obtener_estados();
    incidenceData.obtener_protocolos();
};

const protocoloChange = () => {
    error.value = null;
};

const institucionChange = () => {
    error2.value = null;
}

const grabar = () => {

    if (incidenceData.detalle.id_protocolo != null){

        if (incidenceData.detalle.id_institucion != null){

            let data = {
                id: incidenceData.detalle.id_incidencia,
                estado: incidenceData.detalle.estado,
                protocolo: incidenceData.detalle.id_protocolo,
                institucion: incidenceData.detalle.id_institucion
            }

            incidenceData.clasificar_incidencia(data);

        } else {
            error2.value = "Seleccione una opción";
        }

    } else {
        error.value = "Seleccione una opción";
    }

};

onMounted(() => {

    incidenceData.getEvent();
    incidenceData.getInstituciones();
    incidenceData.obtener_tareas();

});

</script>