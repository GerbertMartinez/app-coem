<template>

    <v-card-text class="text-center">
        <h1>Resultados de Simulacro</h1>
    </v-card-text>

    <v-form @submit.prevent="submitForm">

        <v-container fluid class="d-flex justify-center align-center text-center" v-if="!registerData.loading">
            <v-row class="d-flex justify-center">

                
                <v-col cols="12" md="8" lg="6" xl="4">

                    <v-stepper mobile alt-labels :items="['Evacuados', 'Evidencia', 'Opinion']" v-model="registerData.activeStep">

                        <!-- Paso 1: Ubicación -->
                        <template v-slot:item.1>

                            <br>
                            <v-label>Personal evacuado:</v-label>
                            <br>
                            <br>
                            <v-number-input 
                                variant="outlined"
                                label="Personal fijo"
                                controlVariant="stacked"
                                v-model="personal.value.value"
                                :error-messages="personal.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Necesidades especiales"
                                controlVariant="stacked"
                                v-model="discapacitados.value.value"
                                :error-messages="discapacitados.errorMessage.value"
                            />

                            <v-number-input 
                                variant="outlined"
                                label="Visitantes"
                                controlVariant="stacked"
                                v-model="visitantes.value.value"
                                :error-messages="visitantes.errorMessage.value"
                            />

                            <br>

                            <v-label>Tiempo de evacuación:</v-label>
                            <br>
                            <br>
                            <v-row>
                                <v-col cols="12" md="6" lg="6" xl="6">
                                    <v-number-input 
                                        variant="outlined"
                                        label="Minutos"
                                        controlVariant="stacked"
                                        v-model="minutos.value.value"
                                        :error-messages="minutos.errorMessage.value"
                                    />
                                </v-col>
                                <v-col cols="12" md="6" lg="6" xl="6">
                                    <v-number-input 
                                        variant="outlined"
                                        label="Seguntos"
                                        controlVariant="stacked"
                                        v-model="segundos.value.value"
                                        :error-messages="segundos.errorMessage.value"
                                    />
                                </v-col>
                            </v-row>

                        </template>
                        <!-- Paso 1: Ubicación -->
                        <template v-slot:item.2>

                            <br>
                            <v-file-upload
                                title="Evidencia 1"
                                density="compact"
                                clearable
                                accept="image/jpeg, image/png"
                                v-model="foto1.value.value"
                                :error-messages="foto1.errorMessage.value"
                            />

                            <br />

                            <v-file-upload
                                title="Evidencia 2"
                                density="compact"
                                clearable
                                accept="image/jpeg, image/png"
                                v-model="foto2.value.value"
                                :error-messages="foto2.errorMessage.value"
                            />

                            <br />

                            <v-file-upload
                                title="Evidencia 3"
                                density="compact"
                                clearable
                                accept="image/jpeg, image/png"
                                v-model="foto3.value.value"
                                :error-messages="foto3.errorMessage.value"
                            />

                            <br />

                            <v-file-upload
                                title="Evidencia 4"
                                density="compact"
                                clearable
                                accept="image/jpeg, image/png"
                                v-model="foto4.value.value"
                                :error-messages="foto4.errorMessage.value"
                            />

                        </template>
                        <!-- Paso 1: Ubicación -->
                        <template v-slot:item.3>

                            <br>
                            <v-radio-group
                                v-model="organizacion.value.value"
                                inline
                                :error-messages="organizacion.errorMessage.value"
                            >
                                <template v-slot:label>
                                    <div style="white-space: normal;">
                                        ¿Cómo calificaría la organización del evento?
                                    </div>
                                </template>
                                <v-radio
                                    label="1"
                                    value="1"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="2"
                                    value="2"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="3"
                                    value="3"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="4"
                                    value="4"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="5"
                                    value="5"
                                    color="light-green-darken-1"
                                ></v-radio>
                            </v-radio-group>

                            <v-radio-group
                                v-model="comunicacion.value.value"
                                inline
                                :error-messages="comunicacion.errorMessage.value"
                            >
                                <template v-slot:label>
                                    <div style="white-space: normal;">
                                        ¿La comunicación e información del evento fue clara?
                                    </div>
                                </template>
                                <v-radio
                                    label="1"
                                    value="1"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="2"
                                    value="2"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="3"
                                    value="3"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="4"
                                    value="4"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="5"
                                    value="5"
                                    color="light-green-darken-1"
                                ></v-radio>
                            </v-radio-group>

                            <v-radio-group
                                v-model="entrenamiento.value.value"
                                inline
                                :error-messages="entrenamiento.errorMessage.value"
                            >
                                <template v-slot:label>
                                    <div style="white-space: normal;">
                                        ¿Como calificaría su actividad de evacuación?
                                    </div>
                                </template>
                                <v-radio
                                    label="1"
                                    value="1"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="2"
                                    value="2"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="3"
                                    value="3"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="4"
                                    value="4"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="5"
                                    value="5"
                                    color="light-green-darken-1"
                                ></v-radio>
                            </v-radio-group>

                            <v-radio-group
                                v-model="seguimiento.value.value"
                                inline
                                :error-messages="seguimiento.errorMessage.value"
                            >
                                <template v-slot:label>
                                    <div style="white-space: normal;">
                                        ¿Como sintió el apoyo de parte de la dirección de AVE?
                                    </div>
                                </template>
                                <v-radio
                                    label="1"
                                    value="1"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="2"
                                    value="2"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="3"
                                    value="3"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="4"
                                    value="4"
                                    color="light-green-darken-1"
                                ></v-radio>
                                <v-radio
                                    label="5"
                                    value="5"
                                    color="light-green-darken-1"
                                ></v-radio>
                            </v-radio-group>

                            <v-radio-group
                                v-model="proximo.value.value"
                                inline
                                :error-messages="proximo.errorMessage.value"
                            >
                                <template v-slot:label>
                                    <div style="white-space: normal;">
                                        ¿Desea participar en el próximo Macro Simulacro Municipal?
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

                            <v-textarea 
                                label="Explique por qué no"
                                variant="outlined"
                                v-model="razon.value.value"
                                v-if="proximo.value.value === 'N'"
                                :error-messages="razon.errorMessage.value"
                            />

                            <v-textarea 
                                label="Comentarios generales"
                                variant="outlined"
                                v-model="generales.value.value"
                            />

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
                                    <v-btn color="primary" @click="goNext" v-if="registerData.activeStep < 3">
                                        Siguiente
                                    </v-btn>
                                    <v-btn :loading="registerData.loading" color="success" @click="finishStepper" v-if="registerData.activeStep === 3">
                                        Enviar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </template>

                    </v-stepper>

                </v-col>

            </v-row>
        </v-container>
        
        <v-container fluid class="d-flex justify-center align-center text-center" v-else>
            <v-row class="d-flex justify-center">
                <v-col cols="12" md="8" lg="6" xl="4">
                    <v-skeleton-loader :elevation="5" type="article, article, article"></v-skeleton-loader>
                </v-col>
            </v-row>
        </v-container>

    </v-form>

</template>

<script setup>

import { VNumberInput } from 'vuetify/labs/VNumberInput';
import { VFileUpload } from 'vuetify/labs/VFileUpload';
import { useField, useForm } from 'vee-validate';
import { useRegister } from '@/stores/register';
const registerData = useRegister();

const { handleSubmit, validate } = useForm({
    validationSchema: {
        personal (value) {
            if (!/^[1-9]\d*$/.test(value)) {
                return 'Ingrese la cantidad válida de personal que evacuó';
            }
            // if (parseInt(value, 10) > registerData.fijos) {
            //     return 'No pueden ser mayores a los registrados (' + registerData.fijos + ')';
            // }
            return true;
        },
        discapacitados (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad válida de personal con necesidades especiales que evacuó';
            }
            return true;
        },
        visitantes (value) {
            if (!/^(0|[1-9]\d*)$/.test(value)) {
                return 'Ingrese la cantidad válida de visitantes que evacuó';
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
        foto2 (value) {
            if (!value || value.length === 0) {
                return 'Debe seleccionar una foto';
            }
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(value.type)) {
                return 'Solo se permiten archivos JPEG o PNG';
            }
            return true;
        },
        foto3 (value) {
            if (!value || value.length === 0) {
                return 'Debe seleccionar una foto';
            }
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(value.type)) {
                return 'Solo se permiten archivos JPEG o PNG';
            }
            return true;
        },
        foto4 (value) {
            if (!value || value.length === 0) {
                return 'Debe seleccionar una foto';
            }
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(value.type)) {
                return 'Solo se permiten archivos JPEG o PNG';
            }
            return true;
        },
        organizacion (value) {
            if (!value) {
                return 'Seleccione una opción';
            } 
            return true;
        },
        comunicacion (value) {
            if (!value) {
                return 'Seleccione una opción';
            } 
            return true;
        },
        entrenamiento (value) {
            if (!value) {
                return 'Seleccione una opción';
            } 
            return true;
        },
        seguimiento (value) {
            if (!value) {
                return 'Seleccione una opción';
            } 
            return true;
        },
        proximo (value) {
            if (!value) {
                return 'Seleccione una opción';
            } 
            return true;
        },
        razon (value) {
            if (proximo.value.value === 'N' && !value) {
                return 'La razón es obligatoria';
            } 
            return true;
        },
        generales (value) {
            if (!value) {
                return true;
            }
            return true;
        },
        minutos (value) {
            if (!/^\d+$/.test(value) && !segundos.value.value) {
                return 'Los minutos son obligatorios';
            }
            if (value <= 0 && segundos.value.value <= 0) {
                return 'Los minutos y segundos no pueden estar ambos en 0';
            }
            return true;
        },
        segundos (value) {
            if (!/^(0|[1-9]\d*)$/.test(value) && !minutos.value.value) {
                return 'Los segundos son obligatorios. (Puede ser 0)';
            }
            if (!/^\d{1,2}$/.test(value)) {
                return 'Valor incorrecto, (Puede ser 0)';
            }
            if (parseInt(value, 10) > 59) {
                return 'Los segundos no pueden ser mayor a 59';
            }
            return true;
        },
    }
});
  
/* PESTAÑA 1 */
const personal = useField('personal');
const discapacitados = useField('discapacitados');
const visitantes = useField('visitantes');
const minutos = useField('minutos');
const segundos = useField('segundos');

/* PESTAÑA 2 */
const foto1 = useField('foto1');
const foto2 = useField('foto2');
const foto3 = useField('foto3');
const foto4 = useField('foto4');

/* PESTAÑA 3 */
const organizacion = useField('organizacion');
const comunicacion = useField('comunicacion');
const entrenamiento = useField('entrenamiento');
const seguimiento = useField('seguimiento');
const proximo = useField('proximo');
const razon = useField('razon');
const generales = useField('generales');

/* PESTAÑA 4 */

const goNext = async () => {
    
    let isValid = false;
    if (registerData.activeStep === 1) {

        const [
            personalValid, 
            discapacitadosValid, 
            visitantesValid,
            minutosValid,
            segundosValid
        ] = await Promise.all([
            personal.validate(),
            discapacitados.validate(),
            visitantes.validate(),
            minutos.validate(),
            segundos.validate()
        ]);

        isValid =   personalValid.valid && 
                    discapacitadosValid.valid && 
                    visitantesValid.valid &&
                    minutosValid.valid &&
                    segundosValid.valid;

    } else if (registerData.activeStep === 2) {
        
        const [
            foto1Valid,
            foto2Valid,
            foto3Valid,
            foto4Valid
        ] = await Promise.all([
            foto1.validate(),
            foto2.validate(),
            foto3.validate(),
            foto4.validate()
        ]);

        isValid =   foto1Valid.valid &&
                    foto2Valid.valid &&
                    foto3Valid.valid &&
                    foto4Valid.valid;

    } else if (registerData.activeStep === 3) {

        const [
            organizacionValid,
            comunicacionValid,
            entrenamientoValid,
            seguimientoValid,
            proximoValid,
            razonValid,
            generalesValid
        ] = await Promise.all([
            organizacion.validate(),
            comunicacion.validate(),
            entrenamiento.validate(),
            seguimiento.validate(),
            proximo.validate(),
            razon.validate(),
            generales.validate()
        ]);

        isValid =   organizacionValid.valid &&
                    comunicacionValid.valid &&
                    entrenamientoValid.valid &&
                    seguimientoValid.valid &&
                    proximoValid.valid &&
                    razonValid.valid &&
                    generalesValid.valid;

    } 

    if (isValid) {
        if (registerData.activeStep < 3) {
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
    registerData.sendComplete(values);
});

</script>