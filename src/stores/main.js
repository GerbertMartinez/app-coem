import { defineStore } from "pinia";

import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export const useMain = defineStore('main', {

    state: () => {
        return {
            usuario: [],
            loading: false,
            form: {
                usuario: null,
                oldPass: null,
                newPass: null,
                conPass: null
            }
        }
    },

    actions: {

        login(data) {

            this.loading = true;

            axios
            .post(
                import.meta.env.VITE_API_URL + 'login',
                data
            )
            .then(response => {

                if (response.data.code == 200) {
                    localStorage.setItem('token', '123456');
                    localStorage.setItem('tipo', response.data.usuario.tipo);
                    localStorage.setItem('usuario', response.data.usuario.id_usuario);
                    localStorage.setItem('mesa', response.data.usuario.institucion.id_mesa);
                    router.push('/menu');
                    this.usuario = response.data.usuario;
                    this.loading = false;
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

        logout() {

            this.usuario = [];
            localStorage.removeItem('token');
            localStorage.removeItem('tipo');
            localStorage.removeItem('usuario');
            localStorage.removeItem('mesa');
            router.push('/login');

        },

        goMain() {
            router.push('/menu')
        },

        goMainMenu() {
            router.push('/detalleIncidencias')
        },

        createIncidence() {
            router.push('/ingresoIncidencia')
        },

        createResource() {
            router.push('/ingresoRecurso')
        },

        createEvent() {
            router.push('/ingresoEvento')
        },

        viewEvents() {
            router.push('/detalleEventos')
        },

        viewIncidences() {
            router.push('/detalleIncidencias')
        },

        viewMoney(){
            router.push('/gestFinanzas');
        },

        viewTasks(){
            router.push('/tareas');
        },

        resetForm() {
            this.form.usuario = null;
            this.form.oldPass = null;
            this.form.newPass = null;
            this.form.conPass = null;
        },

        changePass() {

            this.loading = true;
            this.form.usuario = localStorage.getItem('usuario');

            axios
            .post(
                import.meta.env.VITE_API_URL + 'change_pass',
                this.form
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
            })

        },

        error(error) {
            this.loading = false;
            console.log(error);
        }

    }

})