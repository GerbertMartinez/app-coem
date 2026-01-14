<template>

    <v-card-text class="text-center">
        <h1>Formulario de registro</h1>
    </v-card-text>

    <v-form @submit.prevent="submitForm">

        <v-container fluid class="d-flex justify-center align-center text-center">
            <v-row class="d-flex justify-center">

                
                <v-col cols="12" md="8" lg="6" xl="4">

                    <v-stepper mobile alt-labels :items="['Datos inmueble']" v-model="registerData.activeStep">

                        <!-- Paso 1: Ubicación -->
                        <template v-slot:item.1>

                            <br>
                                <h1>
                                    <b>{{ registerData.institucion }}</b>
                                </h1>
                                <h3>
                                    <b>{{ registerData.direccion }}</b>
                                </h3>

                            <br>
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

                        <!-- Acciones generales para el Stepper -->
                        <template v-slot:actions>
                            <v-row justify="space-between" align="center" class="pa-3">
                                <v-col cols="auto">
                                </v-col>

                                <v-col cols="auto" class="text-right">
                                    <v-btn :loading="registerData.loading" color="success" @click="finishStepper">
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
.swal2-confirm {
    color: #fff !important;
}
.v-stepper__step {
  margin-right: 16px;
}

</style>

<script setup>

import { VNumberInput } from 'vuetify/labs/VNumberInput';
import { useField, useForm } from 'vee-validate';
import { useRegister } from '@/stores/register';
import { watch } from 'vue';
const registerData = useRegister();

const { handleSubmit, validate, setFieldValue } = useForm({
    initialValues: {
        id: registerData.idParam
    },
    validationSchema: {
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
        }
    }
});

watch(
    () => registerData.idParam,
    (newId) => {
        if (newId) {
            setFieldValue('id', newId);
        }
    },
    { immediate: true }
);
  
/* PESTAÑA 1 */
const protocolos = useField('protocolos');
const apoyo = useField('apoyo');
const plan = useField('plan');
const personal = useField('personal');
const discapacitados = useField('discapacitados');
const visitantes = useField('visitantes');

/* HIDDEN */
const id = useField('id');

const finishStepper = async () => {
    const isValid = await validate();
    if (isValid.valid) {
        submitForm();
    }
};

const submitForm = handleSubmit(values => {
    setFieldValue('id', registerData.idParam);
    registerData.savePreForm(values);
});

</script>