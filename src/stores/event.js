import { defineStore } from "pinia";

import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export const useEvent = defineStore('event', {

    state: () => {
        return {
            activeStep: 1,
            zonas: [
                {id:1, nombre:"Zona 1"},
                {id:2, nombre:"Zona 2"},
                {id:3, nombre:"Zona 3"},
                {id:4, nombre:"Zona 4"},
                {id:5, nombre:"Zona 5"},
                {id:6, nombre:"Zona 6"},
                {id:7, nombre:"Zona 7"},
                {id:8, nombre:"Zona 8"},
                {id:9, nombre:"Zona 9"},
                {id:10, nombre:"Zona 10"},
                {id:11, nombre:"Zona 11"},
                {id:12, nombre:"Zona 12"},
                {id:13, nombre:"Zona 13"},
                {id:14, nombre:"Zona 14"},
                {id:15, nombre:"Zona 15"},
                {id:16, nombre:"Zona 16"},
                {id:17, nombre:"Zona 17"},
                {id:18, nombre:"Zona 18"},
                {id:19, nombre:"Zona 19"},
                {id:21, nombre:"Zona 21"},
                {id:24, nombre:"Zona 24"},
                {id:25, nombre:"Zona 25"}
            ],
            selInstituciones: null,
            protocolo: null,
            protocolos: [],
            instituciones:[],
            inselect: [],
            alcaldias: [],
            alselect: [],
            loading: false,
            events: [],
            eventsHeader: [
                {title: 'Id', value: 'id_evento'},
                {title: 'Nombre', value: 'nombre'},
                {title: 'Fecha Inicio', value: 'fecha_inicio'},
                {title: 'Fecha Final', value: 'fecha_final'},
                {title: 'Acciones', value: 'acciones'}
            ]
        }
    },

    actions: {

        checkActive() {

            this.loading = true;

            axios
            .get(
                import.meta.env.VITE_API_URL + 'check_activo'
            )
            .then(response => {

                this.loading = false;

                if (response.data.eventos > 0) {
                    Swal
                    .fire({
                        heightAuto: false,
                        icon: "error",
                        title: "No se puede",
                        text: "No se puede ingresar un evento nuevo ya que hay uno sin finalizar"
                    });
                    router.push('/menu');
                }

            })
            .catch(error => {
                this.error(error);
                Swal
                .fire({
                    heightAuto: false,
                    icon: "error",
                    title: "Lo sentimos",
                    text: "Hubo un error inesperado por favor intente nuevamente"
                });
                router.push('/menu');
            });

        },

        sendData(data) {

            this.loading = true;

            axios
            .post(
                import.meta.env.VITE_API_URL + 'grabar_evento',
                data
            )
            .then(response => {

                this.loading = false;

                Swal
                .fire({
                    heightAuto: false,
                    icon: "success",
                    title: "Guardado",
                    text: "Se guardaron los datos"
                });

                if (response.data.code == 200) {
                    this.activeStep = 1;
                    router.push('/menu');
                }

            })
            .catch(error => {
                this.error(error);
            });

        },

        getProtocols() {

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_protocolos'
            )
            .then(response => {

                this.protocolos = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        getInstitutions() {

            let data = {
                id_protocolo: this.protocolo
            };
            
            axios
            .post(
                import.meta.env.VITE_API_URL + 'obtener_instituciones_evento',
                data
            )
            .then(response => {

                this.instituciones = response.data.instituciones;
                this.inselect = response.data.institucionesSel;
                this.alcaldias = response.data.alcaldias;

            })
            .catch(error => {
                this.error(error);
            });

        },

        getEvents() {
            
            this.loading = true;

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_eventos'
            )
            .then(response => {

                this.loading = false;
                this.events = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        finalizarEvento(value) {

            Swal
            .fire({
                heightAuto: false,
                icon: 'question',
                title: 'Aviso',
                text: '¿Seguro desea finalizar este evento?',
                showCancelButton: true,
                confirmButtonText: 'Si, finalizar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: ' #eb445a',
                cancelButtonColor: '#92949c',
            }).then((result) => {
                if(result.isConfirmed){

                    let data = {
                        evento: value.id_evento
                    };

                    this.loading = true;
                    
                    axios   
                    .post(
                        import.meta.env.VITE_API_URL + 'finalizar_evento',
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
                        this.getEvents();

                    })
                    .catch((error) => {

                        this.error(error);

                    })

                }
            })

        },

        error(error) {

            this.loading = false;
            console.log(error);
            
        }

    }

});