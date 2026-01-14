<template>

    <v-container fluid class="d-flex justify-center align-center text-center">
        <v-row class="d-flex justify-center">

            <v-col cols="12" md="8" lg="8" xl="6">

                <v-card>

                    <v-tabs
                        v-model="tab"
                        align-tabs="center"
                        bg-color="light-green-darken-1"
                    >
                        <v-tab :value="1">Recursos</v-tab>
                        <v-tab :value="2">
                            <v-badge :content="resourceData.pendientes" v-if="resourceData.pendientes > 0"  color="red-darken-3">
                                <div class="pr-3">Solicitudes</div>
                            </v-badge>
                            <div v-else>
                                Solicitudes
                            </div>
                        </v-tab>
                    </v-tabs>

                    <v-tabs-window v-model="tab">

                        <v-tabs-window-item :value="1">

                            <v-card>

                                <div class="table-wrapper">
                                
                                    <v-data-table
                                        :headers="resourceData.headers"
                                        :items="resourceData.recursos"
                                        :search="search"
                                        :loading="resourceData.loading"
                                        fixed-header
                                        class="custom-table"
                                    >

                                        <template v-slot:top>

                                            <v-toolbar>

                                                <v-toolbar-title>Mis Recursos</v-toolbar-title>

                                                <v-divider
                                                    class="mx-4"
                                                    inset
                                                    vertical
                                                />

                                                <v-spacer />

                                                <v-dialog
                                                    v-model="resourceData.dialog"
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
                                                            Nuevo recurso
                                                        </v-btn>
                                                    </template>

                                                    <v-card>

                                                        <v-card-title>
                                                            <span class="text-h5" v-if="resourceData.edit">Editar recurso</span>
                                                            <span class="text-h5" v-else>Nuevo recurso</span>
                                                        </v-card-title>

                                                        <v-card-text>
                                                            <v-container>
                                                                <v-row class="text-center">
                                                                    <v-col cols="12" md="6" sm="6">
                                                                        <v-select
                                                                            variant="outlined"
                                                                            label="Recurso"
                                                                            :items="resourceData.tipos_recursos"
                                                                            item-title="nombre"
                                                                            item-value="id_tipo_recurso"
                                                                            v-model="resourceData.editedItem.tipo_recurso"
                                                                            :error-messages="resourceData.errors.tipo_recurso"
                                                                        />
                                                                    </v-col>
                                                                    <v-col cols="10" md="5" sm="5">
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
                                                                @click="resourceData.save()"
                                                                :loading="resourceData.loading"
                                                            >
                                                                Guardar
                                                            </v-btn>

                                                        </v-card-actions>

                                                    </v-card>

                                                </v-dialog>

                                                <v-dialog v-model="resourceData.dialogDelete" max-width="500px">

                                                    <v-card>

                                                        <v-card-title class="text-h5">
                                                            ¿Seguro desea eliminar este recurso?
                                                            <br>
                                                            <div class="text-center">
                                                                {{ resourceData.deletedItem.nombre }}
                                                            </div>
                                                        </v-card-title>

                                                        <v-card-actions>

                                                            <v-spacer />

                                                            <v-btn 
                                                                color="red-darken-4"
                                                                variant="text" 
                                                                @click="resourceData.closeDelete()"
                                                            >
                                                                Cancelar
                                                            </v-btn>

                                                            <v-btn 
                                                                color="blue-darken-1" 
                                                                variant="text" 
                                                                @click="resourceData.deleteItemConfirm()"
                                                                :loading="resourceData.loading"
                                                            >
                                                                Si, eliminar
                                                            </v-btn>

                                                            <v-spacer />

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

                                        <template v-slot:item.actions="{ item }">
                                            <!-- <v-icon
                                                color="red-darken-4"
                                                @click="resourceData.deleteItem(item)"
                                                v-if="item.usado <= 0"
                                            >
                                                mdi-delete
                                            </v-icon> -->
                                        </template>

                                    </v-data-table>
                                </div>

                            </v-card>
                        </v-tabs-window-item>

                        <v-tabs-window-item :value="2">

                            <v-card>
                                <div class="table-wrapper">
                                    <v-data-table
                                        :headers="resourceData.solicitudesHeaders"
                                        :items="resourceData.solicitudes"
                                        :search="search2"
                                        :loading="resourceData.loading"
                                        fixed-header
                                        class="custom-table"
                                    >

                                        <template v-slot:top>

                                            <v-toolbar>

                                                <v-toolbar-title>Solicitudes</v-toolbar-title>

                                                <v-dialog persistent v-model="resourceData.dialogApRe" max-width="500px">

                                                    <v-card>

                                                        <v-card-title class="text-h5">
                                                            ¿Desea aprobar o rechazar la solicitud?
                                                            <br>
                                                            <v-table density="compact">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Recurso</th>
                                                                        <th>Cantidad</th>
                                                                        <th>Solicita</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody style="color: #757575;">
                                                                    <tr>
                                                                        <td>{{ resourceData.checkItem.nombre }}</td>
                                                                        <td>{{ resourceData.checkItem.cantidad }}</td>
                                                                        <td>{{ resourceData.checkItem.solicita }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </v-table>
                                                            <v-table density="compact">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Incidente</th>
                                                                        <th>Dirección</th>
                                                                        <th>Zona</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody  style="color: #757575;">
                                                                    <tr>
                                                                        <td>{{ resourceData.checkItem.incidente }}</td>
                                                                        <td>{{ resourceData.checkItem.direccion }}</td>
                                                                        <td>{{ resourceData.checkItem.zona }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </v-table>
                                                        </v-card-title>

                                                        <v-card-actions>

                                                            <v-spacer />

                                                            <v-btn 
                                                                color="grey-darken-1" 
                                                                variant="tonal"
                                                                @click="resourceData.closeApRe()"
                                                            >
                                                                Cancelar
                                                            </v-btn>

                                                            <v-btn 
                                                                color="red-darken-4" 
                                                                variant="tonal"
                                                                @click="resourceData.reject()"
                                                            >
                                                                Rechazar
                                                            </v-btn>

                                                            <v-btn 
                                                                color="green-darken-3" 
                                                                variant="tonal"
                                                                @click="resourceData.approve()"
                                                                :loading="resourceData.loading"
                                                            >
                                                                Aprobar
                                                            </v-btn>

                                                            <v-spacer />

                                                        </v-card-actions>

                                                    </v-card>

                                                </v-dialog>

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
                                            <v-badge dot v-if="item.estado == 'Ingresado'" color="red-darken-3">
                                                <v-btn
                                                    color="grey-darken-1"
                                                    @click="resourceData.showRequest(item)"
                                                >
                                                    Ver
                                                </v-btn>
                                            </v-badge>
                                        </template>

                                    </v-data-table>
                                </div>
                            </v-card>
                        </v-tabs-window-item>

                    </v-tabs-window>

                </v-card>

            </v-col>

        </v-row>
    </v-container>

</template>

<style scoped>
/* Contenedor con scroll horizontal */
.table-wrapper {
    width: 100%;
    overflow-x: auto;  /* Permite el scroll en pantallas pequeñas */
    display: block;  /* Evita que el contenedor colapse */
    white-space: nowrap;  /* Evita que el contenido se corte */
}

/* Forzar que la tabla no se corte */
.custom-table {
    min-width: 100%;
    width: max-content;  /* Hace que la tabla crezca según su contenido */
}

/* Asegurar que se vea bien en móviles */
@media (max-width: 600px) {
    .table-wrapper {
        max-width: 100vw;  /* Evita que la tabla se salga de la pantalla */
    }
}
</style>

<script setup>

import { VNumberInput } from 'vuetify/labs/VNumberInput';
import { useResources } from '@/stores/resources';
const resourceData = useResources();
import { onMounted, onUnmounted, ref, watch } from 'vue';

const search = ref('');
const search2 = ref('');
const tab = ref(1);

let interval;

onMounted(() => {

    resourceData.getEvent();
    resourceData.obtenerTiposRecursos();

    interval = setInterval(() => {
        resourceData.getEvent();
    }, 10000);

});

onUnmounted(() => {
    clearInterval(interval);
});

watch(() => resourceData.editedItem.tipo_recurso, (value) => {
    resourceData.errors.tipo_recurso = null;
    if (value) {
        // Busca el objeto que coincide con el id seleccionado
        const selectedResource = resourceData.tipos_recursos.find(
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

</script>