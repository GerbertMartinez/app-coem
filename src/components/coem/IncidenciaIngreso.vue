<template>

    <v-card-text class="text-center">
        <h1>Registrar incidencia</h1>
    </v-card-text>

    <v-form @submit.prevent="submitForm">

        <v-container fluid class="d-flex justify-center align-center text-center">
            <v-row class="d-flex justify-center">

                <v-col cols="12" md="8" lg="6" xl="4">

                    <v-stepper mobile alt-labels :items="['Ubicación', 'Personas', 'Viviendas', 'Infraestructura']" v-model="incidenceData.activeStep">
                        
                        <!-- Paso 1: Ubicación -->
                        <template v-slot:item.1>

                            <br>

                            <v-select
                                variant="outlined"
                                label="Departamento"
                                :items="incidenceData.departamentos"
                                item-title="nombre"
                                item-value="id_departamento"
                                v-model="departamento.value.value"
                                :error-messages="departamento.errorMessage.value"
                                @update:modelValue="onDepartmentChange"
                            />

                            <v-select
                                variant="outlined"
                                label="Municipio"
                                :items="incidenceData.municipios"
                                item-title="nombre"
                                item-value="id_municipio"
                                v-model="municipio.value.value"
                                :error-messages="municipio.errorMessage.value"
                                :loading="incidenceData.loading"
                            />

                            <v-select
                                variant="outlined"
                                label="Zona"
                                :items="incidenceData.zonas"
                                item-title="nombre"
                                item-value="id"
                                v-model="zona.value.value"
                                :error-messages="zona.errorMessage.value"
                            />

                            <v-text-field 
                                label="Dirección"
                                variant="outlined"
                                v-model="lugar.value.value"
                                :error-messages="lugar.errorMessage.value"
                            />

                            <div>
                                <h4>Por favor seleccione en el mapa la ubicación del incidente</h4>
                            </div>

                            <!-- <div id="mapContainer"></div> -->
                            <div class="map-container">
                                <div ref="viewDiv" class="view-div"></div>
                            </div>
                            <v-text-field 
                                readonly
                                label="Ubicación"
                                v-model="ubicacion.value.value"
                                :error-messages="ubicacion.errorMessage.value"
                            />

                            <input 
                                type="hidden"
                                v-model="latitud.value.value"
                            />

                            <input
                                type="hidden"
                                v-model="longitud.value.value"
                            />

                            <v-select
                                variant="outlined"
                                label="Area pertenece a"
                                :items="incidenceData.areas"
                                item-title="nombre"
                                item-value="id_area"
                                v-model="area.value.value"
                                :error-messages="area.errorMessage.value"
                            />

                            <v-select
                                variant="outlined"
                                label="Incidente"
                                :items="incidenceData.incidentes"
                                item-title="nombre"
                                item-value="id_incidente"
                                v-model="incidente.value.value"
                                :error-messages="incidente.errorMessage.value"
                            />

                            <v-textarea
                                variant="outlined"
                                label="Describa el incidente"
                                v-model="detalle.value.value"
                            />

                            <v-file-input
                                label="Foto del incidente"
                                variant="outlined"
                                accept="image/*"
                                v-model="foto1.value.value"
                                :error-messages="foto1.errorMessage.value"
                            />

                            <Datepicker 
                                v-model="fecha.value.value"
                                locale="es"
                                placeholder="Fecha"
                                :enable-time-picker="false"
                                auto-apply
                                :style="fecha.errorMessage.value ? 'border: 1px solid #B00020; color: #B00020 !important; border-radius: 5px' : 'border: 1.1px solid #ABABAB; color: #7A7A7A !important; border-radius: 5px'"
                                :format="formatDate"
                            />

                            <br>

                            <!-- <v-date-input 
                                label="Fecha"
                                variant="outlined"
                                prepend-icon=""
                                v-model="fecha.value.value"
                                :error-messages="fecha.errorMessage.value"
                            /> -->

                            <v-number-input 
                                variant="outlined"
                                label="Cantidad de albergues habilitados"
                                controlVariant="stacked"
                                v-model="albergues.value.value"
                                :error-messages="albergues.errorMessage.value"
                            />

                        </template>

                        <!-- Paso 2: Persona -->
                        <template v-slot:item.2>

                            <br>
                            <v-number-input 
                                variant="outlined"
                                label="Personas en Riesgo"
                                controlVariant="stacked"
                                v-model="personasRiesgo.value.value"
                                :error-messages="personasRiesgo.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Personas Afectadas"
                                controlVariant="stacked"
                                v-model="personasAfectadas.value.value"
                                :error-messages="personasAfectadas.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Personas Damnificadas"
                                controlVariant="stacked"
                                v-model="personasDamnificadas.value.value"
                                :error-messages="personasDamnificadas.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Personas Evacuadas"
                                controlVariant="stacked"
                                v-model="personasEvacuadas.value.value"
                                :error-messages="personasEvacuadas.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Personas Albergadas"
                                controlVariant="stacked"
                                v-model="personasAlbergadas.value.value"
                                :error-messages="personasAlbergadas.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Personas Desaparecidas"
                                controlVariant="stacked"
                                v-model="personasDesaparecidas.value.value"
                                :error-messages="personasDesaparecidas.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Personas Heridas"
                                controlVariant="stacked"
                                v-model="personasHeridas.value.value"
                                :error-messages="personasHeridas.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Personas Fallecidas"
                                controlVariant="stacked"
                                v-model="personasFallecidas.value.value"
                                :error-messages="personasFallecidas.errorMessage.value"
                            />

                        </template>

                        <!-- Paso 3: Vivienda -->
                        <template v-slot:item.3>
                            
                            <br>
                            <v-number-input 
                                variant="outlined"
                                label="Viviendas en Riesgo"
                                controlVariant="stacked"
                                v-model="viviendasRiesgo.value.value"
                                :error-messages="viviendasRiesgo.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Viviendas en Daño severo"
                                controlVariant="stacked"
                                v-model="viviendasDanioSevero.value.value"
                                :error-messages="viviendasDanioSevero.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Viviendas en Daño moderado"
                                controlVariant="stacked"
                                v-model="viviendasDanioModerado.value.value"
                                :error-messages="viviendasDanioModerado.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Viviendas en Daño leve"
                                controlVariant="stacked"
                                v-model="viviendasDanioLeve.value.value"
                                :error-messages="viviendasDanioLeve.errorMessage.value"
                            />

                        </template>

                        <template v-slot:item.4>
                            
                            <br>
                            <v-number-input 
                                variant="outlined"
                                label="Carreteras afectadas (Km)"
                                controlVariant="stacked"
                                v-model="carreterasAfectadas.value.value"
                                :error-messages="carreterasAfectadas.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Carreteras destruidas (Km)"
                                controlVariant="stacked"
                                v-model="carreterasDestruidas.value.value"
                                :error-messages="carreterasDestruidas.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Puentes afectados"
                                controlVariant="stacked"
                                v-model="puentesAfectados.value.value"
                                :error-messages="puentesAfectados.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Puentes destruidos"
                                controlVariant="stacked"
                                v-model="puentesDestruidos.value.value"
                                :error-messages="puentesDestruidos.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Escuelas afectadas"
                                controlVariant="stacked"
                                v-model="escuelasAfectadas.value.value"
                                :error-messages="escuelasAfectadas.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Escuelas destruidas"
                                controlVariant="stacked"
                                v-model="escuelasDestruidas.value.value"
                                :error-messages="escuelasDestruidas.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Edificios afectados"
                                controlVariant="stacked"
                                v-model="edificiosAfectados.value.value"
                                :error-messages="edificiosAfectados.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Edificios destruidos"
                                controlVariant="stacked"
                                v-model="edificiosDestruidos.value.value"
                                :error-messages="edificiosDestruidos.errorMessage.value"
                            />

                        </template>

                        <!-- Acciones generales para el Stepper -->
                        <template v-slot:actions>
                            <v-row justify="space-between" align="center" class="pa-3">
                                <!-- Botón de Anterior, alineado a la izquierda -->
                                <v-col cols="auto">
                                    <v-btn color="primary" @click="goPrev" v-if="incidenceData.activeStep > 1">
                                        Anterior
                                    </v-btn>
                                </v-col>

                                <!-- Botones de Siguiente o Finalizar, alineados a la derecha -->
                                <v-col cols="auto" class="text-right">
                                    <v-btn color="primary" @click="goNext" v-if="incidenceData.activeStep < 4">
                                        Siguiente
                                    </v-btn>
                                    <v-btn color="success" @click="finishStepper" v-if="incidenceData.activeStep === 4">
                                        Enviar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </template>

                    </v-stepper>

                </v-col>

            </v-row>
        </v-container>

    </v-form>

</template>

<style scoped>
.mapContainer {
    height: 300px;
    width: 100%;
    border: 2px solid gray;
}
.view-div {
  height: 400px;
}
.info {
  position: absolute;
  top: 10px;
  left: 10px;
  background: white;
  padding: 10px;
  font-size: 14px;
  z-index: 100;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}
.borde-rojo {
  border: 1px solid red;
}
</style>

<script setup>

import { useField, useForm } from 'vee-validate';
import { useIncidence } from '@/stores/incidence';
const incidenceData = useIncidence();
//import L from 'leaflet';
import { onMounted, ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { VNumberInput } from 'vuetify/labs/VNumberInput';

import Swal from "sweetalert2";

const viewDiv = ref(null);

const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

onMounted(() => {

    incidenceData.getEvent();
    incidenceData.getIncidences();
    incidenceData.getDepartments();
    incidenceData.getAreas();

    window.require([
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/GeoJSONLayer',
        'esri/Graphic',
    ], (Map, MapView, GeoJSONLayer, Graphic) => {

        const map = new Map({
            basemap: 'satellite'
        });

        const view = new MapView({
            container: viewDiv.value,
            map: map,
            center: [-90.5,14.6326],
            zoom: 13
        });

        const zonasLayer = new GeoJSONLayer({
            url: 'data/zonas.json',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'simple-fill',
                    color: [0, 255, 255, 0.09],
                    outline: { 
                        color: 'red', 
                        width: 2 
                    }
                }
            }
        });

        const distritosLayer = new GeoJSONLayer({
            url: 'data/distritos_mdgt.json',
            labelingInfo: {
                labelExpressionInfo: {
                    expression: "$feature['cod']"
                },
                symbol: {
                    type: 'text',
                    color: 'black',
                    haloColor: [255, 255, 255, 0.8],
                    haloSize: 1.6
                }
            },
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'simple-fill',
                    color: [0, 0, 0, 0.09],
                    outline: {
                        color: 'white',
                        width: 0.5
                    }
                }
            }
        });

        map.addMany([zonasLayer, distritosLayer]);

        view.on("click", (event) => {

            view.graphics.removeAll();
            ubicacion.value.value = null;
            latitud.value.value = null;
            longitud.value.value = null;

            const pointGraphic = new Graphic({
                geometry: event.mapPoint,
                symbol: {
                    type: "simple-marker",
                    color: [0, 155, 255],
                    size: "12px",
                    outline: {
                        color: [255, 255, 255],
                        width: 1
                    }
                }
            });

            let distritoValor = "0";

            distritosLayer.queryFeatures({
                geometry: event.mapPoint,
                spatialRelationship: "within",
                returnGeometry: false,
                outFields: ["cod"]
            }).then((result) => {
                if (result.features.length > 0) {
                    distritoValor = result.features[0].attributes.cod || "0";
                    incidenceData.searchAA(distritoValor)
                    .then((response) => {
                        if (response.data.code == 200){
                            ubicacion.value.value = event.mapPoint.latitude.toFixed(10) + ', ' + event.mapPoint.longitude.toFixed(10);
                            latitud.value.value = event.mapPoint.latitude.toFixed(10);
                            longitud.value.value = event.mapPoint.longitude.toFixed(10);
                            view.graphics.add(pointGraphic);
                        } else {
                            Swal
                            .fire({
                                heightAuto: false,
                                icon: "error",
                                title: "Fuera de zona",
                                text: "Asegurese de que el punto se encuentre dentro de la zona asignada"
                            });
                        }
                    })
                    .catch((error) => {
                        alert('Error: ' + error.message);
                    });
                }
            });

        });

    });
    // const map = L.map("mapContainer").setView([14.618302, -90.502968], 11);

    // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //     maxZoom: 19,
    // }).addTo(map);

    // map.invalidateSize();

    // var markerUp;

    // function onMapClick(e) {

    //     if (markerUp != undefined) {

    //         map.removeLayer(markerUp);

    //     };

    //     ubicacion.value.value = e.latlng.lat + ', ' + e.latlng.lng;
    //     latitud.value.value = e.latlng.lat;
    //     longitud.value.value = e.latlng.lng;
    //     markerUp = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

    // }

    // map.on('click', onMapClick);

});

const onDepartmentChange = (value) => {
    incidenceData.getMunicipalities(value);
    municipio.value.value = null;
};

const { handleSubmit, validate } = useForm({
    validationSchema: {
        lugar (value) {
            if (!value) {
                return 'El lugar es obligatorio';
            }
            return true;
        },
        zona (value) {
            if (!value) {
                return 'Seleccione una zona';
            } 
            return true;
        },
        ubicacion (value) {
            if (!value) {
                return 'Seleccione la ubicación en el mapa';
            }
            return true;
        },
        area (value) {
            if (!value) {
                return 'Seleccione una opción';
            }
            return true;
        },
        incidente (value) {
            if (!value) {
                return 'Seleccione un incidente';
            } 
            return true;
        },
        foto1 (value) {
            if (!value || value.length === 0) {
                return 'Debe seleccionar una foto';
            }
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(value.type)) {
                return 'Solo se permiten archivos JPEG o PNG';
            }
            return true;
        },
        fecha (value) {
            if (!value) {
                return 'La fecha es obligatoria';
            }
            return true;
        },
        albergues (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad de albergues';
            }
            return true;
        },
        personasRiesgo (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        personasAfectadas (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        personasDamnificadas (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        personasEvacuadas (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        personasAlbergadas (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        personasDesaparecidas (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        personasHeridas (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        personasFallecidas (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        viviendasRiesgo (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        viviendasDanioSevero (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        viviendasDanioModerado (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        viviendasDanioLeve (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        carreterasAfectadas (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        carreterasDestruidas (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        puentesAfectados (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        puentesDestruidos (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        escuelasAfectadas (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        escuelasDestruidas (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        edificiosAfectados (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        edificiosDestruidos (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad solicitada';
            }
            return true;
        },
        departamento (value) {
            if (!value) {
                return 'Seleccione un departamento';
            } 
            return true;
        },
        municipio (value) {
            if (!value) {
                return 'Seleccione un municipio';
            } 
            return true;
        }
    }
});

/* Pestaña 1 */
const lugar = useField('lugar');
const zona = useField('zona');
const latitud = useField('latitud');
const longitud = useField('longitud');
const ubicacion = useField('ubicacion');
const area = useField('area');
const incidente = useField('incidente');
const foto1 = useField('foto1');
const fecha = useField('fecha');
const albergues = useField('albergues');
const municipio = useField('municipio');
const departamento = useField('departamento');
const detalle = useField('detalle');

municipio.value.value = 1;
departamento.value.value = 1;
incidenceData.getMunicipalities(1);

/* Pestaña 2 */
const personasRiesgo = useField('personasRiesgo');
const personasAfectadas = useField('personasAfectadas');
const personasDamnificadas = useField('personasDamnificadas');
const personasEvacuadas = useField('personasEvacuadas');
const personasAlbergadas = useField('personasAlbergadas');
const personasDesaparecidas = useField('personasDesaparecidas');
const personasHeridas = useField('personasHeridas');
const personasFallecidas = useField('personasFallecidas');

/* Pestaña 3 */
const viviendasRiesgo = useField('viviendasRiesgo');
const viviendasDanioSevero = useField('viviendasDanioSevero');
const viviendasDanioModerado = useField('viviendasDanioModerado');
const viviendasDanioLeve = useField('viviendasDanioLeve');

/* Pestaña 4 */
const carreterasAfectadas = useField('carreterasAfectadas');
const carreterasDestruidas = useField('carreterasDestruidas');
const puentesAfectados = useField('puentesAfectados');
const puentesDestruidos = useField('puentesDestruidos');
const escuelasAfectadas = useField('escuelasAfectadas');
const escuelasDestruidas = useField('escuelasDestruidas');
const edificiosAfectados = useField('edificiosAfectados');
const edificiosDestruidos = useField('edificiosDestruidos');


const goNext = async () => {
    
    let isValid = false;
    if (incidenceData.activeStep === 1) {

        const [
            lugarValid, 
            zonaValid, 
            ubicacionValid,
            areaValid, 
            incidenteValid, 
            foto1Valid,
            fechaValid, 
            alberguesValid,
            municipioValid,
            departamentoValid
        ] = await Promise.all([
            lugar.validate(),
            zona.validate(),
            ubicacion.validate(),
            area.validate(),
            incidente.validate(),
            foto1.validate(),
            fecha.validate(),
            albergues.validate(),
            municipio.validate(),
            departamento.validate()
        ]);

        isValid =   lugarValid.valid && 
                    zonaValid.valid && 
                    ubicacionValid.valid &&
                    areaValid.valid && 
                    incidenteValid.valid && 
                    foto1Valid.valid &&
                    fechaValid.valid && 
                    alberguesValid.valid &&
                    municipioValid.valid &&
                    departamentoValid.valid;

    } else if (incidenceData.activeStep === 2) {
        
        const [
            personasRiesgoValid, 
            personasAfectadasValid,
            personasDamnificadasValid,
            personasEvacuadasValid,
            personasAlbergadasValid,
            personasDesaparecidasValid,
            personasHeridasValid,
            personasFallecidasValid
        ] = await Promise.all([
            personasRiesgo.validate(),
            personasAfectadas.validate(),
            personasDamnificadas.validate(),
            personasEvacuadas.validate(),
            personasAlbergadas.validate(),
            personasDesaparecidas.validate(),
            personasHeridas.validate(),
            personasFallecidas.validate()
        ]);

        isValid =   personasRiesgoValid.valid &&
                    personasAfectadasValid.valid &&
                    personasDamnificadasValid.valid &&
                    personasEvacuadasValid.valid &&
                    personasAlbergadasValid &&
                    personasDesaparecidasValid &&
                    personasHeridasValid &&
                    personasFallecidasValid;

    } else if (incidenceData.activeStep === 3) {

        const [
            viviendasRiesgoValid,
            viviendasDanioSeveroValid,
            viviendasDanioModeradoValid,
            viviendasDanioLeveValid
        ] = await Promise.all([
            viviendasRiesgo.validate(),
            viviendasDanioSevero.validate(),
            viviendasDanioModerado.validate(),
            viviendasDanioLeve.validate()
        ]);

        isValid =   viviendasRiesgoValid.valid &&
                    viviendasDanioSeveroValid.valid && 
                    viviendasDanioModeradoValid.valid &&
                    viviendasDanioLeveValid.valid;

    } else if (incidenceData.activeStep === 4) {
        
        const [
            carreterasAfectadasValid,
            carreterasDestruidasValid,
            puentesAfectadosValid,
            puentesDestruidosValid,
            escuelasAfectadasValid,
            escuelasDestruidasValid,
            edificiosAfectadosValid,
            edificiosDestruidosValid
        ] = await Promise.all([
            carreterasAfectadas.validate(),
            carreterasDestruidas.validate(),
            puentesAfectados.validate(),
            puentesDestruidos.validate(),
            escuelasAfectadas.validate(),
            escuelasDestruidas.validate(),
            edificiosAfectados.validate(),
            edificiosDestruidos.validate()
        ]);

        isValid =   carreterasAfectadasValid.valid &&
                    carreterasDestruidasValid.valid &&
                    puentesAfectadosValid.valid &&
                    puentesDestruidosValid.valid &&
                    escuelasAfectadasValid.valid &&
                    escuelasDestruidasValid.valid &&
                    edificiosAfectadosValid.valid &&
                    edificiosDestruidosValid.valid;

    }

    if (isValid) {
        if (incidenceData.activeStep < 4) {
            incidenceData.activeStep++;
        }
    }
};

const goPrev = () => {
    if (incidenceData.activeStep > 1) {
        incidenceData.activeStep--;
    }
};

const finishStepper = async () => {
    const isValid = await validate();
    if (isValid.valid) {
        submitForm();
    }
};

const submitForm = handleSubmit(values => {
    incidenceData.sendData(values);
});

</script>