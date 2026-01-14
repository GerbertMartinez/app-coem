<template>

    <v-card-text class="text-center">
        <h1>Formulario de registro</h1>
    </v-card-text>

    <v-form @submit.prevent="submitForm">

        <v-container fluid class="d-flex justify-center align-center text-center">
            <v-row class="d-flex justify-center">

                
                <v-col cols="12" md="8" lg="6" xl="4">

                    <v-stepper mobile alt-labels :items="['Datos personales', 'Datos inmueble', 'Ubicación', 'Verificación']" v-model="registerData.activeStep">

                        <!-- Paso 1: Ubicación -->
                        <template v-slot:item.1>

                            <br>
                            <v-text-field
                                variant="outlined"
                                label="Nombres"
                                v-model="nombres.value.value"
                                :error-messages="nombres.errorMessage.value"
                            />

                            <v-text-field
                                variant="outlined"
                                label="Apellidos"
                                v-model="apellidos.value.value"
                                :error-messages="apellidos.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="No. de DPI"
                                controlVariant="stacked"
                                v-model="dpi.value.value"
                                :error-messages="dpi.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Teléfono"
                                controlVariant="stacked"
                                v-model="telefono.value.value"
                                :error-messages="telefono.errorMessage.value"
                            />

                            <v-text-field
                                variant="outlined"
                                label="Correo electrónico"
                                v-model="email.value.value"
                                persistent-hint
                                :error-messages="email.errorMessage.value"
                                @update:modelValue="onEmailChange"
                            />

                            <v-radio-group
                                inline
                                v-model="anterior.value.value"
                                :error-messages="anterior.errorMessage.value"
                            >
                                <template v-slot:label>
                                    <div style="white-space: normal; text-align: left;">
                                        ¿Ha participado antes en un MacroSimulacro?
                                    </div>
                                </template>
                                <v-radio
                                    label="Si"
                                    value="S"
                                    color="green"
                                ></v-radio>
                                <v-radio
                                    label="No"
                                    value="N"
                                    color="red"
                                ></v-radio>
                            </v-radio-group>

                        </template>
                        <!-- Paso 1: Ubicación -->
                        <template v-slot:item.2>

                            <br>
                            <v-select
                                variant="outlined"
                                label="Tipo de inmueble"
                                :items="registerData.tiposInmuebles"
                                item-title="nombre"
                                item-value="id_tipo_inmueble"
                                v-model="tipoInmueble.value.value"
                                :error-messages="tipoInmueble.errorMessage.value"
                                @update:modelValue="onTypeChange"
                            ></v-select>

                            <v-text-field
                                variant="outlined"
                                label="Especifique el tipo de inmueble (Otro)"
                                v-model="otro.value.value"
                                persistent-hint
                                :error-messages="otro.errorMessage.value"
                                v-if="tipoInmueble.value.value == 27"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Niveles del inmueble"
                                controlVariant="stacked"
                                v-model="niveles.value.value"
                                :error-messages="niveles.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Año de construcción"
                                controlVariant="stacked"
                                v-model="construccion.value.value"
                                :error-messages="construccion.errorMessage.value"
                            />

                            <v-radio-group
                                inline
                                v-model="sismoresistencia.value.value"
                                :error-messages="sismoresistencia.errorMessage.value"
                            >
                                <template v-slot:label>
                                    <div style="white-space: normal; text-align: left;">
                                        ¿Su inmueble cuenta con disipadores o amortiguadores sísmicos?
                                    </div>
                                </template>
                                <v-radio
                                    label="Si"
                                    value="S"
                                    color="green"
                                ></v-radio>
                                <v-radio
                                    label="No"
                                    value="N"
                                    color="red"
                                ></v-radio>
                            </v-radio-group>

                            <v-radio-group
                                inline
                                v-model="institucion.value.value"
                                :error-messages="institucion.errorMessage.value"
                            >
                                <template v-slot:label>
                                    Tipo de institución:
                                </template>
                                <v-radio
                                    v-for="institucion in registerData.tiposInstituciones"
                                    :label="institucion.nombre"
                                    :value="institucion.id_tipo_institucion"
                                    color="blue"
                                ></v-radio>
                            </v-radio-group>

                            <v-text-field
                                variant="outlined"
                                label="Nombre de la institución"
                                v-model="empresa.value.value"
                                :error-messages="empresa.errorMessage.value"
                            />

                            <v-radio-group
                                inline
                                v-model="protocolos.value.value"
                                :error-messages="protocolos.errorMessage.value"
                            >
                                <template v-slot:label>
                                    <div style="white-space: normal; text-align: left;">
                                        ¿Cuenta con protocolos de evacuación?
                                    </div>
                                </template>
                                <v-radio
                                    label="Si"
                                    value="S"
                                    color="green"
                                ></v-radio>
                                <v-radio
                                    label="No"
                                    value="N"
                                    color="red"
                                ></v-radio>
                            </v-radio-group>

                            <v-radio-group
                                v-if="protocolos.value.value === 'N'"
                                inline
                                v-model="apoyo.value.value"
                                :error-messages="apoyo.errorMessage.value"
                            >
                                <template v-slot:label>
                                    <div style="white-space: normal; text-align: left;">
                                        ¿Le gustaría que la Municipalidad de Guatemala le apoye elaborando sus protocolos?
                                    </div>
                                </template>
                                <v-radio
                                    label="Si"
                                    value="S"
                                    color="green"
                                ></v-radio>
                                <v-radio
                                    label="No"
                                    value="N"
                                    color="red"
                                ></v-radio>
                            </v-radio-group>

                            <v-radio-group
                                inline
                                v-model="plan.value.value"
                                :error-messages="plan.errorMessage.value"
                            >
                                <template v-slot:label>
                                    <div style="white-space: normal; text-align: left;">
                                        ¿Cuenta con un plan institucional de respuesta?
                                    </div>
                                </template>
                                <v-radio
                                    label="Si"
                                    value="S"
                                    color="green"
                                ></v-radio>
                                <v-radio
                                    label="No"
                                    value="N"
                                    color="red"
                                ></v-radio>
                            </v-radio-group>

                            <v-number-input 
                                variant="outlined"
                                label="Cantidad de personal fijo"
                                controlVariant="stacked"
                                v-model="personal.value.value"
                                :error-messages="personal.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Cantidad de personal necesidades especiales"
                                controlVariant="stacked"
                                v-model="discapacitados.value.value"
                                :error-messages="discapacitados.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Cantidad de visitantes"
                                controlVariant="stacked"
                                v-model="visitantes.value.value"
                                :error-messages="visitantes.errorMessage.value"
                            />

                        </template>
                        <!-- Paso 1: Ubicación -->
                        <template v-slot:item.3>

                            <br>
                            <v-select
                                variant="outlined"
                                label="Departamento"
                                :items="registerData.departamentos"
                                item-title="nombre"
                                item-value="id_departamento"
                                v-model="departamento.value.value"
                                :error-messages="departamento.errorMessage.value"
                                @update:modelValue="onDepartmentChange"
                            />

                            <v-select
                                variant="outlined"
                                label="Municipio"
                                :items="registerData.municipios"
                                item-title="nombre"
                                item-value="id_municipio"
                                v-model="municipio.value.value"
                                :error-messages="municipio.errorMessage.value"
                                :loading="registerData.loading"
                            />

                            <v-select
                                variant="outlined"
                                label="Zona"
                                :items="registerData.zonas"
                                item-title="nombre"
                                item-value="id"
                                v-model="zona.value.value"
                                :error-messages="zona.errorMessage.value"
                            />

                            <v-text-field
                                variant="outlined"
                                label="Dirección del inmueble"
                                v-model="direccion.value.value"
                                :error-messages="direccion.errorMessage.value"
                            />

                            <div>
                                <h4>Por favor seleccione en el mapa la ubicación del inmueble</h4>
                            </div>

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

                        </template>
                        <!-- Paso 1: Ubicación -->
                        <template v-slot:item.4>

                            <v-card-title>Verifica tu correo</v-card-title>
                            <v-card-text>Enviamos un código a tu correo electrónico <b>{{ email.value.value }}</b></v-card-text>

                            <v-otp-input 
                                :length="4" 
                                v-model="otp"
                                @update:model-value="onOtpChange"
                                :loading="registerData.otploading"
                                :error="registerData.otperror"
                                :color="registerData.optcolor"
                            ></v-otp-input>

                            <v-card-text>¿No recibiste el código? 
                                <v-btn 
                                    size="small" 
                                    color="grey"
                                    :disabled="isResendDisabled" 
                                    @click="resendCode"
                                    type="button"
                                >
                                    {{ resendButtonText }}
                                </v-btn>
                            </v-card-text>

                        </template>

                        <!-- Acciones generales para el Stepper -->
                        <template v-slot:actions>
                            <v-row justify="space-between" align="center" class="pa-3">
                                <v-col cols="auto">
                                    <v-btn color="primary" @click="goPrev" v-if="registerData.activeStep > 1">
                                        Anterior
                                    </v-btn>
                                </v-col>

                                <v-col cols="auto" class="text-right">
                                    <v-btn color="primary" @click="goNext" v-if="registerData.activeStep < 4">
                                        Siguiente
                                    </v-btn>
                                    <v-btn :loading="registerData.loading" color="success" @click="finishStepper" v-if="registerData.activeStep === 4 && registerData.validated">
                                        Enviar
                                    </v-btn>
                                    <v-btn disabled color="success" v-if="registerData.activeStep === 4 && !registerData.validated">
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
.swal2-confirm {
    color: #fff !important;
}
.v-stepper__step {
  margin-right: 16px; /* Aumenta el espacio entre los pasos */
}

</style>

<script setup>

import { VNumberInput } from 'vuetify/labs/VNumberInput';
import { onMounted, watch, ref } from 'vue';
import L from 'leaflet';
import { useField, useForm } from 'vee-validate';
import { useRegister } from '@/stores/register';
const registerData = useRegister();

const isResendDisabled = ref(false); // Estado del botón reenviar
const resendButtonText = ref("Reenviar");
const otp = ref('');

onMounted(() => {

    registerData.getPropertyTypes();
    registerData.getInstitutionsTypes();
    registerData.getDepartments();

});

const initMap = () => {

    const map = L.map("mapContainer").setView([14.618302, -90.502968], 11);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    map.invalidateSize();

    var markerUp;

    function onMapClick(e) {

        if (markerUp != undefined) {

            map.removeLayer(markerUp);

        };

        ubicacion.value.value = e.latlng.lat + ', ' + e.latlng.lng;
        latitud.value.value = e.latlng.lat;
        longitud.value.value = e.latlng.lng;
        markerUp = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

    }

    map.on('click', onMapClick);

};

watch (
    [
        () => registerData.activeStep
    ], 
    (values) => {

        const activeStep = values[0];

        if(activeStep == 3){
            setTimeout(initMap, 0);
        }
        if(activeStep == 4){
            registerData.sendCode();
        } 

    }
);

const onEmailChange = (value) => {
    registerData.email = value;
};

const onDepartmentChange = (value) => {
    registerData.getMunicipalities(value);
    municipio.value.value = null;
};

const onTypeChange = (value) => {
    console.log(value);
    otro.value.value = null;
}

const onOtpChange = (value) => {
    if (value.length == 4){

        registerData.otploading = true;

        setTimeout(() => {
            if (value == registerData.code){
                registerData.otploading = false;
                registerData.validated = true;
                registerData.otperror = false;
                registerData.optcolor = "success";
            } else {
                registerData.otperror = true;
                registerData.validated = false;
                registerData.otploading = false;
            }
        }, 1000);

    }
}

const resendCode = () => {
    isResendDisabled.value = true;
    resendButtonText.value = "Reenviar en 30s";
    let countdown = 30;

    // Temporizador
    const timer = setInterval(() => {
    countdown--;
    resendButtonText.value = `Reenviar en ${countdown}s`;

    if (countdown === 0) {
        clearInterval(timer);
        isResendDisabled.value = false;
        resendButtonText.value = "Reenviar";
    }
    }, 1000);

    // Lógica para reenviar el código aquí
    registerData.sendCode();
};

const { handleSubmit, validate } = useForm({
    validationSchema: {
        nombres (value) {
            if (!value) {
                return 'Los nombres son obligatorios';
            }
            return true;
        },
        apellidos (value) {
            if (!value) {
                return 'Los apellidos son obligatorios';
            }
            return true;
        },
        dpi (value) {
            if (!value) {
                return 'El número de DPI es obligatorio';
            }
            if (!/^\d{13}$/.test(value)) {
                return 'El número de DPI debe tener 13 dígitos';
            }
            return true;
        },
        protocolos (value) {
            if (!value) {
                return 'Seleccione una opción';
            } 
            return true;
        },
        apoyo (value) {
            if (protocolos.value.value === 'N' && !value) {
                return 'Seleccione una opción';
            } 
            return true;
        },
        plan (value) {
            if (!value) {
                return 'Seleccione una opción';
            } 
            return true;
        },
        tipoInmueble (value) {
            if (!value) {
                return 'Seleccione el tipo de inmueble';
            } 
            return true;
        },
        niveles (value) {
            if (!/^[1-9]\d*$/.test(value)) {
                return 'Ingrese la cantidad de niveles del inmueble';
            }
            return true;
        },
        institucion (value) {
            if (!value) {
                return 'Seleccione una opción';
            } 
            return true;
        },
        empresa (value) {
            if (!value) {
                return 'El nombre es obligatorio';
            }
            return true;
        },
        personal (value) {
            if (!/^[1-9]\d*$/.test(value)) {
                return 'Ingrese la cantidad de personal';
            }
            return true;
        },
        discapacitados (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad de personal con necesidades especiales';
            }
            return true;
        },
        visitantes (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad de visitantes';
            }
            return true;
        },
        direccion (value) {
            if (!value) {
                return 'Ingrese la dirección del inmueble';
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
        email (value) {
            if (!value) {
                return 'El correo electrónico es obligatorio';
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return 'Ingrese una dirección válida de correo electrónico';
            }
            return true;
        },
        telefono (value) {
            if (!value) {
                return 'El número de teléfono es obligatorio';
            }
            if (!/^\d{8}$/.test(value)) {
                return 'Ingrese un número de teléfono válido (8 dígitos)';
            }
            return true;
        },
        anterior (value) {
            if (!value) {
                return 'Seleccione una opción';
            } 
            return true;
        },
        construccion (value) {
            const currentYear = new Date().getFullYear();
            const year = Number(value);
            if (!/^\d{4}$/.test(value)) {
                return 'Ingrese un año válido de 4 dígitos';
            }
            if (year < 1700 || year > currentYear) {
                return 'Verifique que el año sea correcto';
            }
            return true;
        },
        sismoresistencia (value) {
            if (!value) {
                return 'Seleccione una opción';
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
        },
        otro (value) {
            if (tipoInmueble.value.value == 27 && !value) {
                return 'Especifique el tipo de inmueble';
            } 
            return true;
        }
    }
});
  
/* PESTAÑA 1 */
const nombres = useField('nombres');
const apellidos = useField('apellidos');
const dpi = useField('dpi');
const telefono = useField('telefono');
const email = useField('email');
const anterior = useField('anterior');

/* PESTAÑA 2 */
const protocolos = useField('protocolos');
const apoyo = useField('apoyo');
const plan = useField('plan');
const tipoInmueble = useField('tipoInmueble');
const sismoresistencia = useField('sismoresistencia');
const niveles = useField('niveles');
const construccion = useField('construccion');
const institucion = useField('institucion');
const empresa = useField('empresa');
const personal = useField('personal');
const discapacitados = useField('discapacitados');
const visitantes = useField('visitantes');
const otro = useField('otro');

/* PESTAÑA 3 */
const direccion = useField('direccion');
const departamento = useField('departamento');
const municipio = useField('municipio');
const zona = useField('zona');
const ubicacion = useField('ubicacion');
const latitud = useField('latitud');
const longitud = useField('longitud');

/* PESTAÑA 4 */

const goNext = async () => {
    
    let isValid = false;
    if (registerData.activeStep === 1) {

        const [
            nombresValid, 
            apellidosValid, 
            dpiValid, 
            telefonoValid,
            emailValid,
            anteriorValid
        ] = await Promise.all([
            nombres.validate(),
            apellidos.validate(),
            dpi.validate(),
            telefono.validate(),
            email.validate(),
            anterior.validate()
        ]);

        isValid =   nombresValid.valid && 
                    apellidosValid.valid && 
                    dpiValid.valid && 
                    telefonoValid.valid &&
                    emailValid.valid && 
                    anteriorValid.valid;

    } else if (registerData.activeStep === 2) {
        
        const [
            tipoInmuebleValid, 
            nivelesValid,
            construccionValid,
            institucionValid,
            empresaValid,
            protocolosValid,
            apoyoValid,
            planValid,
            personalValid,
            discapacitadosValid,
            visitantesValid,
            sismoresistenciaValid,
            otroValid
        ] = await Promise.all([
            tipoInmueble.validate(),
            niveles.validate(),
            construccion.validate(),
            institucion.validate(),
            empresa.validate(),
            protocolos.validate(),
            apoyo.validate(),
            plan.validate(),
            personal.validate(),
            discapacitados.validate(),
            visitantes.validate(),
            sismoresistencia.validate(),
            otro.validate()
        ]);

        isValid =   tipoInmuebleValid.valid &&
                    nivelesValid.valid &&
                    construccionValid.valid &&
                    institucionValid.valid &&
                    empresaValid.valid &&
                    protocolosValid.valid &&
                    apoyoValid.valid &&
                    planValid.valid &&
                    personalValid.valid &&
                    discapacitadosValid.valid &&
                    visitantesValid.valid && 
                    sismoresistenciaValid.valid &&
                    otroValid.valid;

    } else if (registerData.activeStep === 3) {

        const [
            direccionValid,
            zonaValid,
            ubicacionValid,
            departamentoValid,
            municipioValid
        ] = await Promise.all([
            direccion.validate(),
            zona.validate(),
            ubicacion.validate(),
            departamento.validate(),
            municipio.validate()
        ]);

        isValid =   direccionValid.valid &&
                    zonaValid.valid && 
                    ubicacionValid.valid &&
                    departamentoValid.valid &&
                    municipioValid.valid;

    } 

    if (isValid) {
        if (registerData.activeStep < 4) {
            registerData.activeStep++;
        }
    }
};

const goPrev = () => {
    if (registerData.activeStep > 1) {
        registerData.activeStep--;
    }
};

const finishStepper = async () => {
    const isValid = await validate();
    if (isValid.valid) {
        submitForm();
    }
};

const submitForm = handleSubmit(values => {
    registerData.saveForm(values);
});

</script>