<template>

    <div v-if="!coemData.showCard">
        <v-card-text class="text-center">
            <h1>Formulario de registro</h1>
        </v-card-text>

        <v-form @submit.prevent="submitForm">

            <v-container fluid class="d-flex justify-center align-center text-center">
                <v-row class="d-flex justify-center">

                    
                    <v-col cols="12" md="8" lg="6" xl="4">

                        <v-stepper mobile alt-labels :items="['Datos personales', 'Verificación']" v-model="coemData.activeStep">

                            <template v-slot:item.1>

                                <br>
                                <v-text-field
                                    variant="outlined"
                                    label="Nombre"
                                    v-model="nombre.value.value"
                                    :error-messages="nombre.errorMessage.value"
                                />

                                <v-text-field
                                    variant="outlined"
                                    label="Apellido"
                                    v-model="apellido.value.value"
                                    :error-messages="apellido.errorMessage.value"
                                />

                                <v-select
                                    variant="outlined"
                                    label="Institución"
                                    :items="coemData.instituciones"
                                    item-title="nombre"
                                    item-value="id_institucion"
                                    v-model="institucion.value.value"
                                    :error-messages="institucion.errorMessage.value"
                                />

                                <v-text-field
                                    variant="outlined"
                                    label="Correo electrónico"
                                    v-model="email.value.value"
                                    persistent-hint
                                    :error-messages="email.errorMessage.value"
                                    @update:modelValue="onEmailChange"
                                />

                            </template>
                            <!-- Paso 1: Ubicación -->
                            <template v-slot:item.2>

                                <v-card-title>Verifica tu correo</v-card-title>
                                <v-card-text>Enviamos un código a tu correo electrónico <b>{{ email.value.value }}</b></v-card-text>

                                <v-otp-input 
                                    :length="4" 
                                    v-model="otp"
                                    @update:model-value="onOtpChange"
                                    :loading="coemData.otploading"
                                    :error="coemData.otperror"
                                    :color="coemData.optcolor"
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
                                        <v-btn color="primary" @click="goPrev" v-if="coemData.activeStep > 1">
                                            Anterior
                                        </v-btn>
                                    </v-col>

                                    <v-col cols="auto" class="text-right">
                                        <v-btn color="primary" @click="goNext" v-if="coemData.activeStep < 2">
                                            Siguiente
                                        </v-btn>
                                        <v-btn :loading="coemData.loading" color="success" @click="finishStepper" v-if="coemData.activeStep === 2 && coemData.validated">
                                            Registrarse
                                        </v-btn>
                                        <v-btn disabled color="success" v-if="coemData.activeStep === 2 && !coemData.validated">
                                            Registrarse
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </template>

                        </v-stepper>

                    </v-col>

                </v-row>
            </v-container>

        </v-form>

    </div>

    <div v-if="coemData.showCard && coemData.mesa == 1">
        <v-card-text class="text-center">
            <h1>Por favor presentarse en:</h1>
        </v-card-text>
        <v-container class="d-flex justify-center align-center fill-height">
            <div class="card">
                <img :src="logo" alt="Escudo" class="logo">
                <div class="text">PLANIFICACIÓN</div>
                <div class="blue-dot"></div>
            </div>
        </v-container>
    </div>

    <div v-if="coemData.showCard && coemData.mesa == 2">
        <v-card-text class="text-center">
            <h1>Por favor presentarse en:</h1>
        </v-card-text>
        <v-container class="d-flex justify-center align-center fill-height">
            <div class="card">
                <img :src="logo" alt="Escudo" class="logo">
                <div class="text">OPERACIONES</div>
                <div class="red-dot"></div>
            </div>
        </v-container>
    </div>

    <div v-if="coemData.showCard && coemData.mesa == 3">
        <v-card-text class="text-center">
            <h1>Por favor presentarse en:</h1>
        </v-card-text>
        <v-container class="d-flex justify-center align-center fill-height">
            <div class="card">
                <img :src="logo" alt="Escudo" class="logo">
                <div class="text">LOGÍSTICA</div>
                <div class="yellow-dot"></div>
            </div>
        </v-container>
    </div>

    <div v-if="coemData.showCard && coemData.mesa == 4">
        <v-card-text class="text-center">
            <h1>Por favor presentarse en:</h1>
        </v-card-text>
        <v-container class="d-flex justify-center align-center fill-height">
            <div class="card">
                <img :src="logo" alt="Escudo" class="logo">
                <div class="text" style="bottom: 10px;">ADMINISTRACIÓN<br>Y FINANZAS</div>
                <div class="black-dot"></div>
            </div>
        </v-container>
    </div>

</template>

<style scoped>
.swal2-confirm {
    color: #fff !important;
}
.v-stepper__step {
  margin-right: 16px; /* Aumenta el espacio entre los pasos */
}

.card {
    width: 400px;
    height: 200px;
    background: linear-gradient(160deg, #ccc 50%, #ffffff 50%);
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
}
.logo {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 150px;
}
.yellow-dot {
    position: absolute;
    right: 20px;
    bottom: 50px;
    width: 50px;
    height: 50px;
    background-color: #FFEB3B;
    border-radius: 50%;
}
.blue-dot {
    position: absolute;
    right: 20px;
    bottom: 50px;
    width: 50px;
    height: 50px;
    background-color: #1A237E;
    border-radius: 50%;
}
.red-dot {
    position: absolute;
    right: 20px;
    bottom: 50px;
    width: 50px;
    height: 50px;
    background-color: #B71C1C;
    border-radius: 50%;
}
.black-dot {
    position: absolute;
    right: 20px;
    bottom: 50px;
    width: 50px;
    height: 50px;
    background-color: #000000;
    border-radius: 50%;
}
.text {
    position: absolute;
    bottom: 25px;
    right: 100px;
    font-size: 20px;
    font-weight: bold;
}
</style>

<script setup>

import logo from '@/assets/muniave.png';
import { useField, useForm } from 'vee-validate';
import { useCoem } from '@/stores/coem';
const coemData = useCoem();
import { onMounted, ref, watch } from 'vue';

const { handleSubmit, validate } = useForm({
    validationSchema: {
        nombre (value) {
            if (!value) {
                return 'El nombre es obligatorio';
            }
            return true;
        },
        apellido (value) {
            if (!value) {
                return 'El apellido es obligatorio';
            }
            return true;
        },
        institucion (value) {
            if (!value) {
                return 'Seleccione una institución';
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
    }
});

const nombre = useField('nombre');
const apellido = useField('apellido');
const institucion = useField('institucion');
const email = useField('email');

const otp = ref('');
const isResendDisabled = ref(false);
const resendButtonText = ref("Reenviar");

onMounted(() => {

    coemData.getInstitutions();

});

watch (
    [
        () => coemData.activeStep
    ], 
    (values) => {

        const activeStep = values[0];

        if(activeStep == 2){
            coemData.sendCode();
        } 

    }
);

const resendCode = () => {

    isResendDisabled.value = true;
    resendButtonText.value = "Reenviar en 30s";
    let countdown = 30;

    const timer = setInterval(() => {
    countdown--;
    resendButtonText.value = `Reenviar en ${countdown}s`;

    if (countdown === 0) {
        clearInterval(timer);
        isResendDisabled.value = false;
        resendButtonText.value = "Reenviar";
    }
    }, 1000);

    coemData.sendCode();
};

const onEmailChange = (value) => {
    coemData.email = value;
};

const onOtpChange = (value) => {
    if (value.length == 4){

        coemData.otploading = true;

        setTimeout(() => {
            if (value == coemData.code){
                coemData.otploading = false;
                coemData.validated = true;
                coemData.otperror = false;
                coemData.optcolor = "success";
            } else {
                coemData.otperror = true;
                coemData.validated = false;
                coemData.otploading = false;
            }
        }, 1000);

    }
}

const goNext = async () => {
    
    let isValid = false;
    if (coemData.activeStep === 1) {

        const [
            nombreValid, 
            apellidoValid, 
            institucionValid, 
            emailValid,
        ] = await Promise.all([
            nombre.validate(),
            apellido.validate(),
            institucion.validate(),
            email.validate()
        ]);

        isValid =   nombreValid.valid && 
                    apellidoValid.valid && 
                    institucionValid.valid && 
                    emailValid.valid;

    } 

    if (isValid) {
        if (coemData.activeStep < 2) {
            coemData.activeStep++;
        }
    }
};

const goPrev = () => {
    if (coemData.activeStep > 1) {
        coemData.activeStep--;
    }
};

const finishStepper = async () => {
    const isValid = await validate();
    if (isValid.valid) {
        submitForm();
    }
};

const submitForm = handleSubmit(values => {
    coemData.saveForm(values);
});

</script>