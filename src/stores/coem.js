import { defineStore } from "pinia";

import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export const useCoem = defineStore('coem', {

    state: () => {
        return {
            instituciones: [],
            otploading: false,
            otperror: false,
            optcolor: null,
            activeStep: 1,
            loading: false,
            validated: false,
            email: null,
            code: null,
            showCard: false,
            mesa: null
        }
    },

    actions: {

        getInstitutions() {

            this.loading = true;

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_invitados'
            )
            .then(response => {

                this.loading = false;
                this.instituciones = response.data;

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
                import.meta.env.VITE_API_URL + 'obtener_codigo_coem',
                data
            )
            .then(response => {

                this.code = response.data.codigo

            })
            .catch(error => {
                this.error(error);
            });

        },

        saveForm(values) {
            
            this.loading = true;

            axios
            .post(
                import.meta.env.VITE_API_URL + 'registrar_ingreso',
                values
            )
            .then(response => {

                if (response.data.code == 200) {

                    Swal
                    .fire({
                        heightAuto: false,
                        icon: response.data.icon,
                        title: response.data.title,
                        text: response.data.text
                    });

                    this.loading = false;
                    this.activeStep = 1;
                    this.optcolor = "";
                    this.validated = false;
                    this.code = null;
                    this.showCard = true;
                    this.mesa = response.data.mesa;

                } else {

                    Swal
                    .fire({
                        heightAuto: false,
                        icon: response.data.icon,
                        title: response.data.title,
                        text: response.data.text
                    });
                    this.loading = false;

                }

            })
            .catch(error => {
                this.error(error);
            });

        },

        error(error) {
            this.loading = false;
            console.log(error);
        }

    }

});