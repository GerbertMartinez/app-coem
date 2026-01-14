<template>

    <v-container class="text-center">

        <v-row  class="d-flex justify-center">

            <v-col cols="12" md="8" lg="8" xl="6">
                
                <v-card>

                    <v-tabs
                        v-model="tab"
                        align-tabs="center"
                        bg-color="light-green-darken-1"
                    >
                        <v-tab :value="1">Recursos</v-tab>
                        <v-tab :value="2">Compras</v-tab>
                    </v-tabs>

                    <v-tabs-window v-model="tab">

                        <v-tabs-window-item :value="1">

                            <v-data-table
                                :headers="resourceData.headersS"
                                :items="resourceData.recursosS"
                                :search="search"
                                :loading="resourceData.loading"
                            >

                                <template v-slot:top>

                                    <v-toolbar>

                                        <v-toolbar-title>Recursos</v-toolbar-title>

                                        <v-divider
                                            class="mx-4"
                                            inset
                                            vertical
                                        />

                                        <v-spacer />

                                        <v-dialog
                                            v-model="resourceData.dialog"
                                            max-width="1200"
                                            persistent
                                        >

                                            <template v-slot:activator="{ props }">
                                                <v-btn
                                                    class="mb-2"
                                                    color="success"
                                                    dark
                                                    v-bind="props"
                                                    variant="elevated"
                                                >
                                                    Solicitar Recurso
                                                </v-btn>
                                            </template>

                                            <v-card>

                                                <v-card-title>
                                                    <span class="text-h5">Solicitar recurso</span>
                                                </v-card-title>

                                                <v-card-text>
                                                    <v-container>
                                                        <v-row class="text-center">
                                                            <v-col cols="12" md="4" sm="4">
                                                                <v-select
                                                                    variant="outlined"
                                                                    label="Recurso"
                                                                    :items="resourceData.tipos_recursosS"
                                                                    item-title="nombre"
                                                                    item-value="id_tipo_recurso"
                                                                    v-model="resourceData.editedItem.tipo_recurso"
                                                                    :error-messages="resourceData.errors.tipo_recurso"
                                                                    @update:modelValue="onRecursoChange"
                                                                />
                                                            </v-col>
                                                            <v-col cols="12" md="4" sm="4">
                                                                <v-select
                                                                    variant="outlined"
                                                                    label="Recurso"
                                                                    :items="resourceData.disponibles"
                                                                    item-title="nombre"
                                                                    item-value="id_recurso"
                                                                    v-model="resourceData.editedItem.disponible"
                                                                    :error-messages="resourceData.errors.disponible"
                                                                    :loading="resourceData.loading"
                                                                    @update:modelValue="onDisponibleChange"
                                                                />
                                                            </v-col>
                                                            <v-col cols="10" md="4" sm="4">
                                                                <v-number-input 
                                                                    variant="outlined"
                                                                    label="Cantidad"
                                                                    controlVariant="stacked"
                                                                    v-model="resourceData.editedItem.cantidad"
                                                                    :error-messages="resourceData.errors.cantidad"
                                                                    :hint="resourceData.hint"
                                                                    persistent-hint
                                                                    @update:modelValue="onCantidadChange"
                                                                />
                                                            </v-col>
                                                        </v-row>
                                                    </v-container>
                                                </v-card-text>

                                                <v-card-actions>

                                                    <v-spacer />

                                                    <v-btn
                                                        color="red-darken-4"
                                                        variant="text"
                                                        @click="resourceData.close()"
                                                    >
                                                        Cancelar
                                                    </v-btn>

                                                    <v-btn
                                                        color="green-darken-3"
                                                        variant="text"
                                                        @click="resourceData.saveS()"
                                                        :loading="resourceData.loading"
                                                    >
                                                        Solicitar
                                                    </v-btn>

                                                </v-card-actions>

                                            </v-card>

                                        </v-dialog>

                                    </v-toolbar>

                                    <v-card flat>
                                        <v-text-field
                                            v-model="search"
                                            label="Search"
                                            append-inner-icon="mdi-magnify"
                                            variant="outlined"
                                            hide-details
                                            single-line
                                        />
                                    </v-card>

                                </template>

                                <template v-slot:item.state="{ item }">
                                    <v-badge
                                        color="green-darken-3"
                                        content="Aprobado"
                                        inline
                                        v-if="item.estado == 'Aprobado'"
                                    />
                                    <v-badge
                                        color="red-darken-4"
                                        content="Rechazado"
                                        inline
                                        v-if="item.estado == 'Rechazado'"
                                    />
                                    <v-badge
                                        color="yellow-darken-1"
                                        content="Pendiente"
                                        inline
                                        v-if="item.estado == 'Ingresado'"
                                    />
                                </template>
                                <template v-slot:item.act="{ item }">
                                    <v-icon
                                        color="red-darken-4"
                                        @click="resourceData.cancel(item)"
                                        v-if="item.estado == 'Ingresado'"
                                    >
                                        mdi-delete
                                    </v-icon>
                                    <v-dialog
                                        v-model="resourceData.dialog3"
                                        @update:modelValue="dialogChange(item)"
                                        max-width="1200"
                                        persistent
                                    >

                                        <template v-slot:activator="{ props }">
                                            <v-btn
                                                color="indigo-darken-3"
                                                size="small"
                                                v-if="item.estado == 'Aprobado' && item.devuelto <= 0"
                                                v-bind="props"
                                            >
                                                Devolver
                                            </v-btn>
                                        </template>

                                        <v-card>

                                            <v-card-title>
                                                <span class="text-h5">Devolver recurso</span>
                                                <v-row class="text-center">
                                                    <v-col>
                                                        {{ item.recurso }}
                                                    </v-col>
                                                </v-row>
                                            </v-card-title>

                                            <v-card-text>
                                                <v-container>
                                                    <v-row class="text-center">
                                                        <v-col cols="12" md="4" sm="4">
                                                            <v-number-input 
                                                                variant="outlined"
                                                                label="Cantidad utilizada"
                                                                controlVariant="stacked"
                                                                v-model="resourceData.original"
                                                                :hint="resourceData.hint"
                                                                persistent-hint
                                                                disabled
                                                            />
                                                        </v-col>
                                                        <v-col cols="10" md="4" sm="4">
                                                            <v-number-input 
                                                                variant="outlined"
                                                                label="Cantidad a devolver"
                                                                controlVariant="stacked"
                                                                v-model="resourceData.cantidad"
                                                                :error-messages="resourceData.errors.devolver"
                                                                :hint="resourceData.hint"
                                                                persistent-hint
                                                                @update:modelValue="onChangeDevolver()"
                                                            />
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>

                                            <v-card-actions>

                                                <v-spacer />

                                                <v-btn
                                                    color="red-darken-4"
                                                    variant="text"
                                                    @click="resourceData.closeD()"
                                                >
                                                    Cancelar
                                                </v-btn>

                                                <v-btn
                                                    color="green-darken-3"
                                                    variant="text"
                                                    @click="resourceData.return()"
                                                    :loading="resourceData.loading"
                                                >
                                                    Devolver
                                                </v-btn>

                                            </v-card-actions>

                                        </v-card>

                                    </v-dialog>
                                    <v-badge
                                        color="light-blue-darken-3"
                                        :content="'Devuelto: ' + item.devuelto"
                                        inline
                                        v-if="item.devuelto > 0"
                                    />
                                </template>

                            </v-data-table>

                        </v-tabs-window-item>
                        <v-tabs-window-item :value="2">

                            <v-card>
                                <v-data-table
                                    :headers="resourceData.headersC"
                                    :items="resourceData.recursosC"
                                    :search="search2"
                                    :loading="resourceData.loading"
                                >

                                    <template v-slot:top>

                                        <v-toolbar>

                                            <v-toolbar-title>Compras</v-toolbar-title>

                                            <v-divider
                                                class="mx-4"
                                                inset
                                                vertical
                                            />

                                            <v-spacer />

                                            <v-dialog
                                                v-model="resourceData.dialog2"
                                                max-width="500"
                                                persistent
                                            >

                                                <template v-slot:activator="{ props }">
                                                    <v-btn
                                                        class="mb-2"
                                                        color="success"
                                                        dark
                                                        v-bind="props"
                                                        variant="elevated"
                                                    >
                                                        Solicitar Compra
                                                    </v-btn>
                                                </template>

                                                <v-card>

                                                    <v-card-title>
                                                        <span class="text-h5">Solicitar compra de recurso</span>
                                                    </v-card-title>

                                                    <v-card-text>
                                                        <v-container>
                                                            <v-row class="text-center">
                                                                <v-col cols="12" md="6" sm="6">
                                                                    <v-select
                                                                        variant="outlined"
                                                                        label="Recurso"
                                                                        :items="resourceData.tipos_recursosC"
                                                                        item-title="nombre"
                                                                        item-value="id_tipo_recurso"
                                                                        v-model="resourceData.buyItem.disponible"
                                                                        :error-messages="resourceData.errors.tipo_recurso"
                                                                    />
                                                                </v-col>
                                                                <v-col cols="12" md="6" sm="6">
                                                                    <v-number-input 
                                                                        variant="outlined"
                                                                        label="Cantidad"
                                                                        controlVariant="stacked"
                                                                        v-model="resourceData.buyItem.cantidad"
                                                                        :error-messages="resourceData.errors.cantidad"
                                                                        :hint="resourceData.hint"
                                                                        persistent-hint
                                                                        @update:modelValue="onCantidadChange"
                                                                    />
                                                                </v-col>
                                                            </v-row>
                                                        </v-container>
                                                    </v-card-text>

                                                    <v-card-actions>

                                                        <v-spacer />

                                                        <v-btn
                                                            color="red-darken-4"
                                                            variant="text"
                                                            @click="resourceData.closeC()"
                                                        >
                                                            Cancelar
                                                        </v-btn>

                                                        <v-btn
                                                            color="green-darken-3"
                                                            variant="text"
                                                            @click="resourceData.saveC()"
                                                            :loading="resourceData.loading"
                                                        >
                                                            Solicitar
                                                        </v-btn>

                                                    </v-card-actions>

                                                </v-card>

                                            </v-dialog>

                                        </v-toolbar>

                                        <v-card flat>
                                            <v-text-field
                                                v-model="search"
                                                label="Search"
                                                append-inner-icon="mdi-magnify"
                                                variant="outlined"
                                                hide-details
                                                single-line
                                            />
                                        </v-card>

                                    </template>

                                    <template v-slot:item.state="{ item }">
                                        <v-badge
                                            color="green-darken-3"
                                            content="Aprobado"
                                            inline
                                            v-if="item.estado == 'Aprobado'"
                                        />
                                        <v-badge
                                            color="red-darken-4"
                                            content="Rechazado"
                                            inline
                                            v-if="item.estado == 'Rechazado'"
                                        />
                                        <v-badge
                                            color="yellow-darken-1"
                                            content="Pendiente"
                                            inline
                                            v-if="item.estado == 'Ingresado'"
                                        />
                                    </template>
                                    <template v-slot:item.act="{ item }">
                                        <v-icon
                                            color="red-darken-4"
                                            @click="resourceData.cancel(item)"
                                            v-if="item.estado == 'Ingresado'"
                                        >
                                            mdi-delete
                                        </v-icon>
                                    </template>

                                </v-data-table>
                            </v-card>

                        </v-tabs-window-item>

                    </v-tabs-window>

                </v-card>

            </v-col>

        </v-row>
        <v-row  class="d-flex justify-center" v-if="incidenceData.detail.estado !== 'F'">

            <v-col cols="12" md="4" lg="4" xl="3" sm="6">
                <v-btn color="green-darken-3" @click="incidenceData.finalizar_gestion()">Finalizar Incidencia</v-btn>
            </v-col>

        </v-row>
    
    </v-container>

</template>

<style>
.swal-confirm-button {
    color: white !important; /* Cambia el color del texto del botón "confirmar" */
}

.swal-cancel-button {
    color: black !important; /* Cambia el color del texto del botón "cancelar" */
}
</style>

<script setup>

import { VNumberInput } from 'vuetify/labs/VNumberInput';
import { useIncidence } from '@/stores/incidence';
const incidenceData = useIncidence();
import { useResources } from '@/stores/resources';
const resourceData = useResources();

import { onMounted, onUnmounted, ref, watch } from 'vue';

const search = ref('');
const search2 = ref('');
const tab = ref(1);

let interval;

onMounted(() => {

    resourceData.evento = incidenceData.evento;
    resourceData.incidencia = incidenceData.idParam;
    resourceData.obtenerTiposRecursosS();
    resourceData.obtenerRecursosS();

    interval = setInterval(() => {
        resourceData.obtenerRecursosS();
    }, 10000);

});

onUnmounted(() => {
    clearInterval(interval);
});

const dialogChange = (item) => {
    resourceData.errors.devolver = null;
    resourceData.original = parseInt(item.cantidad);
    resourceData.devolv = item.id_transaccion
};

const onChangeDevolver = () => {
    resourceData.errors.devolver = null;
};

watch(() => resourceData.editedItem.tipo_recurso, (value) => {
    resourceData.errors.tipo_recurso = null;
    if (value) {
        
        const selectedResource = resourceData.tipos_recursosS.find(
            (item) => item.id_tipo_recurso === value
        );

        if (selectedResource) {
            resourceData.hint = selectedResource.unidad_medida;
        } else {
            console.log("No se encontró el recurso seleccionado");
        }
    }
});

watch(() => resourceData.buyItem.disponible, (value) => {
    resourceData.errors.tipo_recurso = null;
    if (value) {
        // Busca el objeto que coincide con el id seleccionado
        const selectedResource = resourceData.tipos_recursosC.find(
            (item) => item.id_tipo_recurso === value
        );

        if (selectedResource) {
            resourceData.hint = selectedResource.unidad_medida;
        } else {
            console.log("No se encontró el recurso seleccionado");
        }
    }
});

const onCantidadChange = () => {
    resourceData.errors.cantidad = null;
};

const onRecursoChange = () => {

    resourceData.obtenerDisponibles()
    resourceData.editedItem.disponible = null

};

const onDisponibleChange = (selectedId) => {

    resourceData.errors.disponible = null;
    const selectedResource = resourceData.disponibles.find(item => item.id_recurso === selectedId);

    resourceData.disp = selectedResource.cantidad;
    resourceData.solicitar = selectedResource.responsable;

};

</script>