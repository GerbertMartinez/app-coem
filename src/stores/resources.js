import { defineStore } from "pinia";

import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export const useResources = defineStore('resources', {

    state: () => {
        return {
            recursos: [],
            headers: [
                { title: 'Nombre', key: 'nombre',  align: 'center'},
                { title: 'Cantidad', key: 'cantidad', align: 'center' },
                { title: 'Disponible', key: 'disponible', align: 'center'},
                { title: 'Medida', key: 'unidad_medida', align: 'center' },
                { title: 'Acciones', key: 'actions', sortable: false, align: 'center' },
            ],
            recursosS: [],
            headersS: [
                { title: 'Recurso', key: 'recurso', align: 'center' },
                { title: 'Solicitud A', key: 'solicita', align: 'center' },
                { title: 'Cantidad', key: 'cantidad', align: 'center' },
                { title: 'Pide', key: 'pide', align: 'center' },
                { title: 'Estado', key: 'state', align: 'center' },
                { title: 'Acciones', key: 'act', align: 'center'}
            ],
            recursosC: [],
            headersC: [
                { title: 'Recurso', key: 'recurso', align: 'center' },
                { title: 'Cantidad', key: 'cantidad', align: 'center' },
                { title: 'Pide', key: 'pide', align: 'center' },
                { title: 'Estado', key: 'state', align: 'center' },
                { title: 'Acciones', key: 'act', align: 'center'}
            ],
            dialog: false,
            dialog2: false,
            dialog3: false,
            dialogDelete: false,
            dialogApRe: false,
            edit: false,
            editedItem: {
                tipo_recurso: null,
                cantidad: 0,
                disponible: 0,
                recurso: 0
            },
            deletedItem: {
                nombre: null,
                recurso: 0
            },
            buyItem: {
                disponible: null,
                cantidad: 0
            },
            checkItem: {
                nombre: null,
                cantidad: 0,
                solicita: null,
                transaccion: null,
                zona: null,
                direccion: null,
                incidente: null
            },
            tipos_recursos: [],
            tipos_recursosS: [],
            tipos_recursosC: [],
            errors: {
                tipo_recurso: null,
                cantidad: null,
                disponible: null,
                devolver: null
            },
            disponibles: [],
            hint: null,
            loading: false,
            evento: null,
            incidencia: null,
            disp: 0,
            solicitar: null,
            solicitudes: [],
            solicitudesHeaders: [
                { title: 'Recurso', key: 'recurso', align: 'center' },
                { title: 'Cantidad', key: 'cantidad', align: 'center' },
                { title: 'Pide', key: 'pide', align: 'center' },
                { title: 'Estado', key: 'state', align: 'center' },
            ],
            solicitudesC: [],
            solicitudesCHeaders: [
                { title: 'Recurso', key: 'recurso', align: 'center' },
                { title: 'Cantidad', key: 'cantidad', align: 'center' },
                { title: 'Pide', key: 'pide', align: 'center' },
                { title: 'Estado', key: 'state', align: 'center' },
            ],
            pendientes: 0,
            cantidad: 0,
            original: null,
            recurso: null,
            razon: null,
            devolv: null
        }
    },

    actions: {

        obtenerRecursos() {

            this.loading = true;

            let data = {
                usuario: localStorage.getItem('usuario'),
                evento: this.evento
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'obtener_recursos',
                data
            )
            .then(response => {

                this.loading = false;
                this.recursos = response.data;

            })
            .catch(error => {
                this.error(error);
            });

            let data2 = {
                usuario: localStorage.getItem('usuario'),
                evento: this.evento
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'obtener_solicitudes',
                data2
            )
            .then(response => {

                this.loading = false;
                this.solicitudes = response.data;

                this.pendientes = response.data.filter(item => item.estado === 'Ingresado').length;

            })
            .catch(error => {
                this.error(error);
            });

            axios
            .post(
                import.meta.env.VITE_API_URL + 'obtener_solicitudesC',
                data2
            )
            .then(response => {

                this.loading = false;
                this.solicitudesC = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        obtenerRecursosS() {

            this.loading = true;

            let data = {
                usuario: localStorage.getItem('usuario'),
                evento: localStorage.getItem('evento'),
                incidencia: localStorage.getItem('incidencia')
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'obtener_recursosS',
                data
            )
            .then(response => {

                this.loading = false;
                this.recursosS = response.data;

            })
            .catch(error => {
                this.error(error);
            });

            axios
            .post(
                import.meta.env.VITE_API_URL + 'obtener_recursosC',
                data
            )
            .then(response => {

                this.loading = false;
                this.recursosC = response.data;

            })
            .catch(error => {
                this.error(error);
            });

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_tipos_recursos'
            )
            .then(response => {

                this.loading = false;
                this.tipos_recursosC = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        obtenerTiposRecursos () {

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_tipos_recursos'
            )
            .then(response => {

                this.tipos_recursos = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        obtenerTiposRecursosS () {

            let data = {
                evento: localStorage.getItem('evento')
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'obtener_tipos_recursosS',
                data
            )
            .then(response => {

                this.tipos_recursosS = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        obtenerDisponibles () {

            this.loading = true;

            let data = {
                id: this.editedItem.tipo_recurso,
                evento: localStorage.getItem('evento')
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'obtener_disponibles',
                data
            )
            .then(response => {

                this.loading = false;
                this.disponibles = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        close () {
            this.dialog = false;
            this.editedItem.tipo_recurso = null;
            this.editedItem.cantidad = 0;
            this.editedItem.recurso = 0;
            this.editedItem.disponible = null;
            this.edit = false;
            this.errors.cantidad = null;
            this.errors.tipo_recurso = null;
            this.errors.disponible = null;
            this.hint = null;
        },

        closeC () {
            this.dialog2 = false;
            this.buyItem.disponible = null;
            this.buyItem.cantidad = null;
            this.errors.cantidad = null;
            this.errors.tipo_recurso = null;
            this.hint = null;
        },

        closeD () {
            this.dialog3 = false;
            this.cantidad = 0;
            this.original = null;
            this.errors.devolver = null;
        },

        save () {

            if (this.editedItem.tipo_recurso) {

                if (this.editedItem.cantidad > 0 && Number.isInteger(this.editedItem.cantidad)){

                    this.loading = true;
    
                    let data = {
                        data: this.editedItem,
                        usuario: localStorage.getItem('usuario'),
                        evento: this.evento
                    };
    
                    if (this.edit) {

                        axios
                        .post(
                            import.meta.env.VITE_API_URL + 'editar_recurso',
                            data
                        )
                        .then(response => {

                            Swal
                            .fire({
                                heightAuto: false,
                                icon: response.data.icon,
                                title: response.data.title,
                                text: response.data.text
                            });

                            if (response.data.code == 200) {
                                this.loading = false;
                                this.close();
                                this.obtenerRecursos();
                            }

                        })
                        .catch(error => {
                            this.error(error);
                        });

                    } else {

                        axios
                        .post(
                            import.meta.env.VITE_API_URL + 'grabar_recurso',
                            data
                        )
                        .then(response => {

                            Swal
                            .fire({
                                heightAuto: false,
                                icon: response.data.icon,
                                title: response.data.title,
                                text: response.data.text
                            });

                            if (response.data.code == 200) {
                                this.loading = false;
                                this.close();
                                this.obtenerRecursos();
                            }

                        })
                        .catch(error => {
                            this.error(error);
                        });

                    }
    
                } else {
                    this.errors.cantidad = 'Ingrese una cantidad sin decimales';
                }

            } else {
                this.errors.tipo_recurso = 'Seleccione uno';
            }
            

        },

        saveS() {
            if (this.editedItem.tipo_recurso) {
                if (this.editedItem.disponible) {
                    if (this.editedItem.cantidad > 0 && Number.isInteger(this.editedItem.cantidad)) {
                        if (this.editedItem.cantidad <= this.disp) {

                            this.loading = true;
    
                            let data = {
                                data: this.editedItem,
                                usuario: localStorage.getItem('usuario'),
                                evento: localStorage.getItem('evento'),
                                incidencia: localStorage.getItem('incidencia'),
                                solicitar: this.solicitar,
                                compra: 'N'
                            };

                            axios
                            .post(
                                import.meta.env.VITE_API_URL + 'grabar_solicitud',
                                data
                            )
                            .then(response => {

                                Swal
                                .fire({
                                    heightAuto: false,
                                    icon: response.data.icon,
                                    title: response.data.title,
                                    text: response.data.text
                                });

                                if (response.data.code == 200) {
                                    this.loading = false;
                                    this.close();
                                    this.obtenerRecursosS();
                                }

                            })
                            .catch(error => {
                                this.error(error);
                            });

                        } else {
                            this.errors.cantidad = 'La cantidad supera al disponible';
                        }
                    } else {
                        this.errors.cantidad = 'Ingrese una cantidad sin decimales';
                    }
                } else {
                    this.errors.disponible = 'Seleccione uno';    
                }
            } else {
                this.errors.tipo_recurso = 'Seleccione uno';
            }
        },

        saveC() {
            
            if (this.buyItem.disponible) {

                if (this.buyItem.cantidad > 0 && Number.isInteger(this.buyItem.cantidad)){

                    this.loading = true;
                    
                    let data = {
                        data: this.buyItem,
                        usuario: localStorage.getItem('usuario'),
                        evento: localStorage.getItem('evento'),
                        incidencia: localStorage.getItem('incidencia'),
                        solicitar: 0,
                        compra: 'S'
                    };

                    axios
                    .post(
                        import.meta.env.VITE_API_URL + 'grabar_solicitud',
                        data
                    )
                    .then(response => {

                        Swal
                        .fire({
                            heightAuto: false,
                            icon: response.data.icon,
                            title: response.data.title,
                            text: response.data.text
                        });

                        if (response.data.code == 200) {
                            this.loading = false;
                            this.closeC();
                            this.obtenerRecursosS();
                        }

                    })
                    .catch(error => {
                        this.error(error);
                    });


                } else {
                    this.errors.cantidad = 'Ingrese una cantidad sin decimales';
                }
            } else {
                this.errors.tipo_recurso = 'Seleccione uno';
            }

        },

        approve() {

            this.loading = true;

            let data = {
                data: this.checkItem,
                usuario: localStorage.getItem('usuario')
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'aprobar_solicitud',
                data
            )
            .then(response => {

                Swal
                .fire({
                    heightAuto: false,
                    icon: response.data.icon,
                    title: response.data.title,
                    text: response.data.text
                });

                if (response.data.code == 200) {
                    this.loading = false;
                    this.closeApRe();
                    this.obtenerRecursos();
                }

            })
            .catch(error => {
                this.error(error);
            });

        },

        reject() {

            this.loading = true;

            let data = {
                data: this.checkItem,
                usuario: localStorage.getItem('usuario')
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'rechazar_solicitud',
                data
            )
            .then(response => {

                Swal
                .fire({
                    heightAuto: false,
                    icon: response.data.icon,
                    title: response.data.title,
                    text: response.data.text
                });

                if (response.data.code == 200) {
                    this.loading = false;
                    this.closeApRe();
                    this.obtenerRecursos();
                }

            })
            .catch(error => {
                this.error(error);
            });

        },

        editItem (item) {
            this.edit = true;
            this.dialog = true;
            this.editedItem.cantidad = parseInt(item.cantidad);
            this.editedItem.tipo_recurso = item.id_tipo_recurso;
            this.editedItem.recurso = item.id_recurso;
        },

        deleteItem (item) {
            this.deletedItem.recurso = item.id_recurso;
            this.deletedItem.nombre = item.nombre;
            this.dialogDelete = true
        },

        showRequest (item) {
            this.dialogApRe = true;
            this.checkItem.nombre = item.recurso;
            this.checkItem.cantidad = item.cantidad;
            this.checkItem.solicita = item.pide;
            this.checkItem.transaccion = item.id_transaccion;
            this.checkItem.incidente = item.incidente;
            this.checkItem.direccion = item.direccion;
            this.checkItem.zona = item.zona;
        },

        closeDelete () {
            this.dialogDelete = false;
            this.deletedItem.nombre = null;
            this.deletedItem.recurso = 0;
        },

        closeApRe () {
            this.dialogApRe = false;
            this.checkItem.nombre = null;
            this.checkItem.cantidad = null;
            this.checkItem.solicita = null;
            this.checkItem.transaccion = null;
            this.checkItem.incidente = null;
            this.checkItem.direccion = null;
            this.checkItem.zona = null;
        },

        deleteItemConfirm () {

            this.loading = true;

            let data = {
                data: this.deletedItem,
                usuario: localStorage.getItem('usuario')
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'eliminar_recurso',
                data
            )
            .then(response => {

                Swal
                .fire({
                    heightAuto: false,
                    icon: response.data.icon,
                    title: response.data.title,
                    text: response.data.text
                });

                if (response.data.code == 200) {
                    this.loading = false;
                    this.close();
                    this.closeDelete();
                    this.obtenerRecursos();
                }

            })
            .catch(error => {
                this.error(error);
            });

        },

        cancel(item) {

            Swal
            .fire({
                heightAuto: false,
                icon: 'question',
                title: 'Aviso',
                text: '¿Seguro desea cancelar esta solicitud?',
                showCancelButton: true,
                confirmButtonText: 'Si, cancelarla',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: ' #eb445a',
                cancelButtonColor: '#92949c',
            }).then((result) => {
                if(result.isConfirmed){

                    let data = {
                        id: item.id_transaccion
                    };

                    this.loading = true;
                    
                    axios   
                    .post(
                        import.meta.env.VITE_API_URL + 'cancelar_solicitud',
                        data
                    )
                    .then((response) => {
                        
                        this.loading = false;
                        
                        Swal
                        .fire({
                            heightAuto: false,
                            icon: response.data.icon,
                            title: response.data.title,
                            confirmButtonColor: '#3171E0',
                            text: response.data.text
                        })
                        this.obtenerRecursosS();

                    })
                    .catch((error) => {

                        this.error(error);

                    })

                }
            })

        },

        return() {

            if (this.cantidad > this.original) {
                this.errors.devolver = "La cantidad que está devolviendo es superior a la que solicitó inicialmente"
            } else if (!Number.isInteger(this.cantidad)) {
                this.errors.devolver = "Ingrese una cantidad sin decimales";
            } else if (this.cantidad <= 0) {
                this.errors.devolver = "No puede ser igual o menor a 0";
            } else if (this.cantidad < this.original) {

                this.dialog3 = false;

                Swal
                .fire({
                    heightAuto: false,
                    icon: 'question',
                    title: 'Aviso',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Devolver',
                    confirmButtonColor: ' #2E7D32',
                    cancelButtonColor: '#92949c',
                    input: 'text',
                    inputLabel: 'Explique por que faltan recursos:',
                    inputValidator: (value) => {
                        if (!value) {
                            return "Por favor escriba una razón";
                        } else {
                            this.razon = value;
                        }
                    },
                    customClass: {
                        confirmButton: 'swal-confirm-button',
                        cancelButton: 'swal-cancel-button'
                    }
                }).then((result) => {
                    if(result.isConfirmed){

                        let data = {
                            id: this.devolv,
                            cantidad: this.cantidad,
                            razon: this.razon
                        };

                        this.loading = true;
                        
                        axios   
                        .post(
                            import.meta.env.VITE_API_URL + 'devolver_solicitud',
                            data
                        )
                        .then((response) => {
                            
                            this.loading = false;
                            
                            Swal
                            .fire({
                                heightAuto: false,
                                icon: response.data.icon,
                                title: response.data.title,
                                confirmButtonColor: '#3171E0',
                                text: response.data.text
                            })
                            this.obtenerRecursosS();

                        })
                        .catch((error) => {

                            this.error(error);

                        })

                    } else {
                        this.dialog3 = true;
                    }
                })

            } else {
                
                let data = {
                    id: this.devolv,
                    cantidad: this.cantidad,
                };

                this.loading = true;
                
                axios   
                .post(
                    import.meta.env.VITE_API_URL + 'devolver_solicitud',
                    data
                )
                .then((response) => {
                    
                    this.loading = false;
                    
                    Swal
                    .fire({
                        heightAuto: false,
                        icon: response.data.icon,
                        title: response.data.title,
                        confirmButtonColor: '#3171E0',
                        text: response.data.text
                    })
                    this.obtenerRecursosS();

                })
                .catch((error) => {

                    this.error(error);

                })

            }

        },

        getEvent() {

            this.loading = true;

            axios
            .get(
                import.meta.env.VITE_API_URL + 'evento_activo'
            )
            .then(response => {

                this.loading = false;

                if (response.data.evento <= 0) {

                    Swal
                    .fire({
                        heightAuto: false,
                        icon: "error",
                        title: "No se puede",
                        text: "No se puede ingresar recursos ya que no hay un evento activo"
                    });

                    router.push('/menu');

                } else {

                    this.evento = response.data.evento;
                    this.obtenerRecursos();

                }

            })
            .catch(error => {
                this.error(error);
            });

        },

        error (error) {
            this.loading = false;
            console.log(error);
        },

    }

});