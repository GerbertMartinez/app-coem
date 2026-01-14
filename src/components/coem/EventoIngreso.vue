<template>

    <v-card-text class="text-center">
        <h1>Registrar evento</h1>
    </v-card-text>

    <v-form @submit.prevent="submitForm">

        <v-container fluid class="d-flex justify-center align-center text-center">
            <v-row class="d-flex justify-center">

                <v-col cols="12" md="8" lg="6" xl="4">

                    <v-stepper alt-labels :items="['General', 'Instituciones', 'Alcaldías']" v-model="eventData.activeStep">
                        
                        <!-- Paso 1: Ubicación -->
                        <template v-slot:item.1>

                            <br>
                            <v-text-field 
                                label="Nombre de Evento"
                                variant="outlined"
                                v-model="nombre.value.value"
                                :error-messages="nombre.errorMessage.value"
                            />

                            <v-select
                                variant="outlined"
                                label="Protocolo"
                                :items="eventData.protocolos"
                                item-title="nombre"
                                item-value="id_protocolo"
                                v-model="protocolo.value.value"
                                :error-messages="protocolo.errorMessage.value"
                                @update:modelValue="onProtocoloChange"
                            />

                            <br>

                            <div>
                                <h4>Por favor seleccione en el mapa la ubicación del evento</h4>
                            </div>

                            <br>

                            <v-row justify="space-between" align="center">
                                <v-col cols="auto">
                                    <label>
                                        <input
                                            type="radio"
                                            name="drawMode"
                                            value="point"
                                            v-model="drawMode"
                                        />
                                        Punto
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="drawMode"
                                            value="circle"
                                            v-model="drawMode"
                                        />
                                        Círculo
                                    </label>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn @click="clearMap" color="error">Limpiar</v-btn>
                                </v-col>
                            </v-row>

                            <br>

                            <div id="mapContainer"></div>
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

                            <input
                                type="hidden"
                                v-model="radio.value.value"
                            />


                        </template>

                        <template v-slot:item.2>

                            <br>
                            <v-text-field 
                                readonly
                                label="Instituciones Seleccionadas"
                                v-model="instituciones.value.value"
                                :error-messages="instituciones.errorMessage.value"
                            />
                            
                            <v-card
                                flat
                            >
                                <template v-slot:text>
                                <v-text-field
                                    v-model="search"
                                    label="Search"
                                    prepend-inner-icon="mdi-magnify"
                                    variant="outlined"
                                    hide-details
                                    single-line
                                ></v-text-field>
                                </template>

                                <v-data-table 
                                    v-model="eventData.inselect"
                                    :items="eventData.instituciones"
                                    item-value="id_institucion"
                                    show-select
                                    return-object
                                    :search="search"
                                />

                                <input 
                                    type="hidden"
                                    v-model="detinst.value.value"
                                />
                            </v-card>

                        </template>

                        <template v-slot:item.3>

                            <br>
                            <v-text-field 
                                readonly
                                label="Alcaldías Seleccionadas"
                                v-model="alcaldias.value.value"
                                :error-messages="alcaldias.errorMessage.value"
                            />

                            <v-card
                                flat
                            >
                                <template v-slot:text>
                                <v-text-field
                                    v-model="search2"
                                    label="Search"
                                    prepend-inner-icon="mdi-magnify"
                                    variant="outlined"
                                    hide-details
                                    single-line
                                ></v-text-field>
                                </template>

                                <v-data-table 
                                    v-model="eventData.alselect"
                                    :items="eventData.alcaldias"
                                    item-value="id_institucion"
                                    show-select
                                    return-object
                                    :search="search2"
                                    @update:model-value="onDataChange"
                                />

                                <input 
                                    type="hidden"
                                    v-model="detalc.value.value"
                                />
                            </v-card>

                        </template>

                        <!-- Acciones generales para el Stepper -->
                        <template v-slot:actions>
                            <v-row justify="space-between" align="center" class="pa-3">
                                <!-- Botón de Anterior, alineado a la izquierda -->
                                <v-col cols="auto">
                                    <v-btn color="primary" @click="goPrev" v-if="eventData.activeStep > 1">
                                        Anterior
                                    </v-btn>
                                </v-col>

                                <!-- Botones de Siguiente o Finalizar, alineados a la derecha -->
                                <v-col cols="auto" class="text-right">
                                    <v-btn color="primary" @click="goNext" v-if="eventData.activeStep < 3">
                                        Siguiente
                                    </v-btn>
                                    <v-btn color="success" @click="finishStepper" v-if="eventData.activeStep === 3" :loading="eventData.loading">
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
#mapContainer {
    height: 300px;
    width: 100%;
    border: 2px solid gray;
}
</style>

<script setup>

import { useField, useForm } from 'vee-validate';
import { useEvent } from '@/stores/event';
const eventData = useEvent();
import L from 'leaflet';
import { onMounted, ref, watch } from 'vue';

const drawMode = ref('point');
let map, marker, dynamicCircle;
let drawing = false;
let centerPoint = null;

const search = ref('');
const search2 = ref('');

onMounted(() => {

    eventData.checkActive();
    eventData.getProtocols();

    map = L.map("mapContainer").setView([14.618302, -90.502968], 11);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
    }).addTo(map);

    map.invalidateSize();

    // Habilitar arrastre con Control
    const enableDragWithControl = (event) => {
        if (event.key === 'Control') {
            map.dragging.enable();
        }
    };

    const disableDragWithControl = (event) => {
        if (event.key === 'Control') {
            map.dragging.disable();
        }
    };

    // Listener para detectar tecla Control
    window.addEventListener('keydown', enableDragWithControl);
    window.addEventListener('keyup', disableDragWithControl);

    // Evento para dibujar en el mapa
    map.on('mousedown', (e) => {
        if (drawMode.value === 'circle') {
            if (marker) {
                map.removeLayer(marker);
                marker = null;
            }
            centerPoint = e.latlng;
            drawing = true;

            if (dynamicCircle) {
                map.removeLayer(dynamicCircle);
            }

            dynamicCircle = L.circle(centerPoint, { radius: 0, color: 'blue' }).addTo(map);
        }
    });

    map.on('mousemove', (e) => {
        if (drawing && drawMode.value === 'circle' && centerPoint) {
            const radius = map.distance(centerPoint, e.latlng);
            dynamicCircle.setRadius(radius);
        }
    });

    map.on('mouseup', () => {
        if (drawMode.value === 'circle') {
            drawing = false;

            // Imprimir los datos del círculo
            if (centerPoint && dynamicCircle) {
                latitud.value.value = centerPoint.lat;
                longitud.value.value = centerPoint.lng;
                radio.value.value = dynamicCircle.getRadius().toFixed(2);
                ubicacion.value.value = centerPoint.lat + ', ' + centerPoint.lng + '| ' + dynamicCircle.getRadius().toFixed(2);
            }
        }
    });

    map.on('click', (e) => {
        if (drawMode.value === 'point') {
            if (dynamicCircle) {
                map.removeLayer(dynamicCircle);
                dynamicCircle = null;
            }

            if (marker) {
                map.removeLayer(marker);
            }

            marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

            latitud.value.value = e.latlng.lat;
            longitud.value.value = e.latlng.lng;
            ubicacion.value.value = e.latlng.lat + ', ' + e.latlng.lng;
        }
    });

    // Deshabilitar el drag al montar
    map.dragging.disable();

});

// Limpiar el mapa
const clearMap = () => {
    if (marker) {
        map.removeLayer(marker);
        marker = null; // Reiniciar la referencia
    }
    if (dynamicCircle) {
        map.removeLayer(dynamicCircle);
        dynamicCircle = null; // Reiniciar la referencia
    }

    // Opcional: limpiar las coordenadas de ubicación y otros datos
    ubicacion.value.value = null;
    latitud.value.value = null;
    longitud.value.value = null;
    radio.value.value = null;

};

const onProtocoloChange = (value) => {
    eventData.protocolo = value;
};

watch(() => eventData.inselect, (value) => {
    instituciones.value.value = value.length;
    detinst.value.value = value;
});

const onDataChange = (value) => {
    alcaldias.value.value = value.length;
    detalc.value.value = value;
};

const { handleSubmit, validate } = useForm({
    validationSchema: {
        nombre (value) {
            if (!value) {
                return 'El nombre del evento es obligatorio';
            }
            return true;
        },
        protocolo (value) {
            if (!value) {
                return 'Seleccione un protocolo';
            } 
            return true;
        },
        ubicacion (value) {
            if (!value) {
                return 'Seleccione la ubicación en el mapa';
            }
            return true;
        },
        instituciones (value) {
            if (!/^[1-9]\d*$/.test(value)) {
                return 'Selecciona al menos una institución';
            }
            return true;
        },
        alcaldias (value) {
            if (!/^[1-9]\d*$/.test(value)) {
                return 'Selecciona al menos una alcaldía';
            }
            return true;
        }
    }
});

/* Pestaña 1 */
const nombre = useField('nombre');
const protocolo = useField('protocolo');
const ubicacion = useField('ubicacion');
const latitud = useField('latitud');
const longitud = useField('longitud');
const radio = useField('radio');

/* Pestaña 2 */
const instituciones = useField('instituciones');
const detinst = useField('detinst');

/* Pestaña 3 */
const alcaldias = useField('alcaldias');
const detalc = useField('detalc');

const goNext = async () => {
    
    let isValid = false;
    if (eventData.activeStep === 1) {

        const [
            nombreValid,
            protocoloValid,
            ubicacionValid
        ] = await Promise.all([
            nombre.validate(),
            protocolo.validate(),
            ubicacion.validate()
        ]);

        isValid =   nombreValid.valid &&
                    protocoloValid.valid &&
                    ubicacionValid.valid;

        if (protocoloValid.valid) {
            eventData.protocolo = protocolo.value.value;
            eventData.getInstitutions();
        }

    } else if (eventData.activeStep === 2) {
        
        const [
            institucionesValid, 
        ] = await Promise.all([
            instituciones.validate()
        ]);

        isValid =   institucionesValid.valid;
        

    } else if (eventData.activeStep === 3) {

        const [
            alcaldiasValid
        ] = await Promise.all([
            alcaldias.validate()
        ]);

        isValid = alcaldiasValid.valid;

    }

    if (isValid) {
        if (eventData.activeStep < 3) {
            eventData.activeStep++;
        }
    }
};

const goPrev = () => {
    if (eventData.activeStep > 1) {
        eventData.activeStep--;
    }
};

const finishStepper = async () => {
    const isValid = await validate();
    if (isValid.valid) {
        submitForm();
    }
};

const submitForm = handleSubmit(values => {
    eventData.sendData(values);
});

</script>