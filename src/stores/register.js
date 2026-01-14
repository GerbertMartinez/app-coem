import { defineStore } from "pinia";

import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export const useRegister = defineStore('register', {

    state: () => {
        return {
            activeStep: 1,
            zonas: [
                {id:99, nombre: "(Sin Zona)"},
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
            tiposInmuebles: [],
            tiposInstituciones: [],
            email: null,
            code: null,
            otploading: false,
            validated: false,
            otperror: false,
            optcolor: null,
            idParam: null,
            loading: false,
            fijos: null,
            discapacitados: null,
            visitantes: null,
            departamentos: [],
            municipios: [],
            institucion: null,
            direccion: null
        }
    }, 

    actions: {

        goRegister() {
            
            // Swal
            // .fire({
            //     heightAuto: false,
            //     icon: "info",
            //     title: "Tiempo finalizado",
            //     text: "Ha finalizado el período de inscripción, te invitamos a participar el próximo año"
            // });

            router.push('/registro');
        },

        goMain() {
            router.push('/');
        },

        getPropertyTypes() {

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_tipos_inmuebles'
            )
            .then(response => {

                this.tiposInmuebles = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        getInstitutionsTypes() {

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_tipos_instituciones'
            )
            .then(response => {

                this.tiposInstituciones = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        getDepartments() {

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_departamentos'
            )
            .then(response => {

                this.departamentos = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        getMunicipalities(id) {

            this.loading = true;

            let data = {
                id: id
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'obtener_municipios',
                data
            )
            .then(response => {

                this.loading = false;
                this.municipios = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        sendCode() {

            let data = {
                email: this.email
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'obtener_codigo',
                data
            )
            .then(response => {

                this.code = response.data.codigo

            })
            .catch(error => {
                this.error(error);
            });

        },

        saveForm(data) {

            this.loading = true;

            axios
            .post(
                import.meta.env.VITE_API_URL + 'registrar',
                data
            )
            .then(response => {

                Swal
                .fire({
                    heightAuto: false,
                    icon: "success",
                    title: "Guardado",
                    text: "Se guardaron los datos"
                });

                if (response.data.code == 200) {
                    this.loading = false;
                    this.activeStep = 1;
                    this.optcolor = "";
                    this.validated = false;
                    this.code = null;
                    router.push('/');
                }

            })
            .catch(error => {
                this.error(error);
            });

        },

        savePreForm(data) {

            this.loading = true;

            axios
            .post(
                import.meta.env.VITE_API_URL + 'preregistrar',
                data
            )
            .then(response => {

                if (response.data.code == 200) {

                    Swal
                    .fire({
                        heightAuto: false,
                        icon: "success",
                        title: "Guardado",
                        text: "Se guardaron los datos"
                    });

                    this.loading = false;
                    this.activeStep = 1;
                    router.push('/');
                }

            })
            .catch(error => {
                this.error(error);
            });

        },

        checkComplete() {

            this.loading = true;

            let data = {
                id: this.idParam
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'check_completar',
                data
            )
            .then(response => {

                this.loading = false;

                if (response.data.code == 200) {
                    Swal
                    .fire({
                        heightAuto: false,
                        icon: "success",
                        title: "¡Gracias!",
                        text: "Ya se han enviado los datos de este inmueble"
                    });
                    router.push('/');
                } else if (response.data.code == 800) {
                    Swal
                    .fire({
                        heightAuto: false,
                        icon: "info",
                        title: "Espera!",
                        text: "Aun no está habilitado para ingresar la información"
                    });
                    router.push('/');
                } else {
                    this.fijos = response.data.fijos;
                    this.discapacitados = response.data.discapacitados;
                    this.visitantes = response.data.visitantes;
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
                router.push('/');
            });

        },

        checkPreRegister() {

            this.loading = true;

            let data = {
                id: this.idParam
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'check_preregistro',
                data
            )
            .then(response => {

                this.loading = false;

                if (response.data.code == 200) {
                    Swal
                    .fire({
                        heightAuto: false,
                        icon: "success",
                        title: "¡Gracias!",
                        text: "Ya se ha incrito con éxito al Macro Simulacro 2026"
                    });
                    router.push('/');
                }

                this.institucion = response.data.institucion;
                this.direccion = response.data.direccion;

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
                router.push('/');
            });

        },

        sendComplete(data) {

            this.loading = true;

            // Crear un objeto FormData
            const formData = new FormData();

            // Agregar los datos al FormData
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const value = data[key];
                    if (value instanceof File) {
                        // Si el valor es un archivo, agrégalo como tal
                        formData.append(key, value);
                    } else if (Array.isArray(value)) {
                        // Si es un array (opcional, dependiendo de tu estructura), agregar uno a uno
                        value.forEach((item, index) => formData.append(`${key}[${index}]`, item));
                    } else {
                        // Otros valores (e.g., strings, numbers)
                        formData.append(key, value);
                    }
                }
            }

            formData.append('id', this.idParam);

            axios
            .post(
                import.meta.env.VITE_API_URL + 'registrar_complemento',
                formData
            )
            .then(response => {

                Swal
                .fire({
                    heightAuto: false,
                    icon: "success",
                    title: "Guardado",
                    text: "Se guardaron los datos"
                });

                if (response.data.code == 200) {
                    this.loading = false;
                    this.activeStep = 1;
                    this.idParam = null;
                    router.push('/');
                }

            })
            .catch(error => {
                this.error(error);
            });

        },

        error(error) {
            this.loading = false;
            Swal
            .fire({
                heightAuto: false,
                icon: 'error',
                title: 'Error',
                confirmButtonColor: '#3171E0',
                text: error
            });
            console.log(error);
        }

    }

});