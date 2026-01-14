import { defineStore } from "pinia";

import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export const useIncidence = defineStore('incidence', {

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
            zones: [],
            incidentes: [],
            departamentos: [],
            municipios: [],
            loading: false,
            evento: null,
            incidencias: [],
            reportes: [],
            incidenciasHeader: [
                {title: 'Zona', key: 'zona', align: 'center' },
                {title: 'Incidente', key: 'incidente', align: 'center'},
                {title: 'Fecha Inicio', key: 'fecha', align: 'center' },
                {title: 'Reportó', key: 'usuario', align: 'center' },
                {title: 'Estado', key: 'estat', align: 'center' },
                {title: 'Asignado a', key: 'asignado', align: 'center' },
                {title: 'Acciones', key: 'acciones', align: 'center' }
            ],
            tareasHeader: [
                {title: 'Zona', key: 'zona', align: 'center' },
                {title: 'Incidente', key: 'incidente', align: 'center'},
                {title: 'Fecha Inicio', key: 'fecha', align: 'center' },
                {title: 'Reportó', key: 'usuario', align: 'center' },
                {title: 'Estado', key: 'estat', align: 'center' },
                {title: 'Acciones', key: 'acciones', align: 'center' }
            ],
            idParam: null,
            detail: {
                priesgo: 0,
                pafectadas: 0,
                pdanio: 0,
                pevacuadas: 0,
                palvergadas: 0,
                pdesaparecidas: 0,
                pheridas: 0,
                pfallecidas: 0,
                vriesgo: 0,
                vdanios: 0,
                vdaniom: 0,
                vdaniol: 0,
                cafectadas: 0,
                cdestruidas: 0,
                pafectados: 0,
                pdestruidos: 0,
                esafectadas: 0,
                esdestruidas: 0,
                edafectados: 0,
                eddestruidos: 0,
                comentarios: null
            },
            estados: [],
            protocolos: [],
            detalle: {
                incidente: {
                    nombre: null
                },
                usuario: {
                    institucion: {
                        nombre: null
                    }
                },
                area: {
                    nombre: null
                }
            },
            areas: [],
            modal: false,
            busqueda: {
                fecha_inicio: null,
                fecha_final: null,
                zona: null,
                protocolo: null,
                incidente: null
            },
            graficas: {},
            incidentes: [],
            grafica_protocolo: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Incidencias por protocolo'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: [{
                            enabled: true,
                            distance: -40,
                            format: '{point.percentage:.1f}%',
                            style: {
                                fontSize: '1.2em',
                                textOutline: 'none',
                                opacity: 0.7
                            },
                            filter: {
                                operator: '>',
                                property: 'percentage',
                                value: 10
                            }
                        }],
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: []
                }]
            },
            grafica_zonas: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Incidencias por zona'
                },
                xAxis: {
                    categories: [],
                    crosshair: true,
                    accessibility: {
                        description: 'Countries'
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                tooltip: {
                    valueSuffix: ''
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                series: [
                    {
                        name: 'Incidencias',
                        data: []
                    }
                ]
            },
            grafica_incidentes: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Incidencias por zona'
                },
                xAxis: {
                    categories: [],
                    crosshair: true,
                    accessibility: {
                        description: 'Countries'
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                tooltip: {
                    valueSuffix: ''
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                series: [
                    {
                        name: 'Incidencias',
                        data: []
                    }
                ]
            },
            personas: {
                riesgo: 0,
                afectadas: 0,
                damnificadas: 0,
                evacuadas: 0,
                albergadas: 0,
                desaparecidas: 0,
                heridas: 0,
                fallecidas: 0
            },
            viviendas: {
                riesgo: 0,
                danioS: 0,
                danioM: 0,
                danioL: 0
            },
            servicios: {
                carreterasA: 0,
                carreterasD: 0,
                puentesA: 0,
                puentesD: 0,
                escuelasA: 0,
                escuelasD: 0,
                edificiosA: 0,
                edificiosD: 0
            },
            instituciones: [],
            tareas: []
        }
    },

    actions: {

        obtenerIncidencias() {

            this.loading = true;

            let data = {
                evento: this.evento
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'obtener_incidencias',
                data
            )
            .then(response => {

                this.loading = false;
                this.incidencias = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        obtener_reportes() {

            this.loading = true;

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_reportes'
            )
            .then(response => {
                this.loading = false;
                this.reportes = response.data
            })
            .catch(error => {
                this.error(error);
            })

        },

        obtener_tareas() {

            this.loading = true;

            let data = {
                usuario: localStorage.getItem('usuario')
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'obtener_tareas',
                data
            )
            .then(response => {

                this.loading = false;
                this.tareas = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        sendData(data) {

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

            formData.append('usuario', localStorage.getItem('usuario'));
            formData.append('evento', this.evento);

            axios
            .post(
                import.meta.env.VITE_API_URL + 'grabar_incidencia',
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
                    this.activeStep = 1;
                    router.push('/menu');
                }

            })
            .catch(error => {
                this.error(error);
            });

        },

        getIncidences() {

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_incidentes'
            )
            .then(response => {

                this.incidentes = response.data;

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

        getAreas() {

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_areas'
            )
            .then(response => {

                this.areas = response.data;

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

        getEvent() {

            this.loading = true;

            axios
            .get(
                import.meta.env.VITE_API_URL + 'evento_activo'
            )
            .then(response => {

                this.loading = false;

                if (response.data.evento > 0) {

                    this.evento = response.data.evento;
                    this.obtenerIncidencias();
                    localStorage.setItem('evento',response.data.evento);

                }

                this.obtener_reportes();

            })
            .catch(error => {
                this.error(error);
            });

        },

        checkDetail(data) {

            router.push('/detIncidencia/' + data.id_incidencia);

        },

        checkStats() {

            router.push('/stats');

        },

        getDetail() {

            this.loading = true;

            let data = {
                id: this.idParam
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'obtener_incidencia',
                data
            )
            .then(response => {

                this.loading = false;
                this.detail = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        obtener_detalle(id) {

            this.loading = true;

            let data = {
                id: id
            };

            axios
            .post(
                import.meta.env.VITE_API_URL + 'obtener_detalle',
                data
            )
            .then(response => {

                this.loading = false;
                this.detalle = response.data;
                this.detalle.id_institucion = Number(this.detalle.id_institucion)
                if (this.detalle.id_institucion <= 0){
                    this.detalle.id_institucion = null;
                }

            })
            .catch(error => {
                this.error(error);
            });

        },

        finalizar() {

            Swal
            .fire({
                heightAuto: false,
                icon: 'question',
                title: 'Aviso',
                text: '¿Seguro desea finalizar esta incidencia?',
                showCancelButton: true,
                confirmButtonText: 'Si, finalizar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: ' #43A047',
                cancelButtonColor: '#92949c',
            }).then((result) => {
                if(result.isConfirmed){

                    let data = {
                        id: this.idParam
                    };

                    this.loading = true;
                    
                    axios   
                    .post(
                        import.meta.env.VITE_API_URL + 'finalizar_incidencia',
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
                        this.getEvent();
                        router.push('/detalleIncidencias');


                    })
                    .catch((error) => {

                        this.error(error);

                    })

                }
            })

        },

        finalizar_gestion() {

            Swal
            .fire({
                heightAuto: false,
                icon: 'question',
                title: 'Aviso',
                text: '¿Seguro desea finalizar esta incidencia?',
                showCancelButton: true,
                confirmButtonText: 'Si, finalizar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: ' #43A047',
                cancelButtonColor: '#92949c',
            }).then((result) => {
                if(result.isConfirmed){

                    let data = {
                        id: localStorage.getItem('incidencia')
                    };

                    this.loading = true;
                    
                    axios   
                    .post(
                        import.meta.env.VITE_API_URL + 'finalizar_gestion',
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
                        this.getEvent();
                        router.push('/detalleIncidencias');

                    })
                    .catch((error) => {

                        this.error(error);

                    })

                }
            })

        },

        gestionar() {

            let data = {
                id: this.idParam
            };

            this.loading = true;
            
            axios   
            .post(
                import.meta.env.VITE_API_URL + 'procesar_incidencia',
                data
            )
            .then((response) => {

                console.log(response);

            })
            .catch((error) => {

                this.error(error);

            })

            router.push('/gestIncidencia/' + this.idParam);

        },

        searchAA(distrito) {
            
            let data = {
                distrito: distrito,
                usuario: localStorage.getItem('usuario')
            };

            return axios
            .post(
                import.meta.env.VITE_API_URL + 'checkAA',
                data
            )
            .then(response => {
                return response;
            })
            .catch(error => {
                this.error(error);
                return error;
            })

        },

        obtener_estados() {

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_estados'
            )
            .then(response => {

                this.estados = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        obtener_protocolos() {

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_anual_prot'
            )
            .then(response => {

                this.protocolos = response.data;

            })
            .catch(error => {
                this.error(error);
            });

        },

        getInstituciones() {

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_instituciones_internas'
            )
            .then(response => {

                this.instituciones = response.data.map(item => ({
                    ...item,
                    id_institucion: Number(item.id_institucion)
                }));

                console.log(this.instituciones);

            })
            .catch(error => {
                this.error(error);
            });

        },

        clasificar_incidencia(data) {

            this.modal = false;
            this.loading = true;

            axios
            .post(
                import.meta.env.VITE_API_URL + 'clasificar_incidencia',
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

                this.obtener_reportes();
                this.obtener_tareas();
                this.obtener_detalle(response.data.id);
                this.loading = false;

            })
            .catch(error => {
                this.error(error);
            })

        },

        obtener_graficas() {

            this.loading = true;
            this.limpiar_graficas();

            axios
            .post(
                import.meta.env.VITE_API_URL + 'obtener_graficas',
                this.busqueda
            )
            .then(response => {

                this.loading = false;
                this.graficas = response.data;

                /*GRAFICA DE PROTOCOLOS*/
                const conteoPorProtocolo = {};
                this.graficas.forEach(item => {
                    const protocolo = item.protocolo?.nombre ?? 'Sin asignar';
                    conteoPorProtocolo[protocolo] = (conteoPorProtocolo[protocolo] || 0) + 1;
                });
                const datosProtocolo = Object.entries(conteoPorProtocolo).map(([protocolo, cantidad]) => ({
                    name: protocolo === 'Sin asignar' ? 'Sin asignar' : `Protocolo ${protocolo}`,
                    y: cantidad
                }));
                this.grafica_protocolo.series[0].data = datosProtocolo;

                /*GRAFICA DE ZONAS*/
                const conteoPorZona = {};
                this.graficas.forEach(item => {
                    const zona = item.zona;
                    conteoPorZona[zona] = (conteoPorZona[zona] || 0) + 1;
                });
                const categoriasZona = Object.keys(conteoPorZona);
                const valoresZona = Object.values(conteoPorZona);
                this.grafica_zonas.xAxis.categories = categoriasZona;
                this.grafica_zonas.series[0].data = valoresZona;

                /*GRAFICA DE INCIDENTES*/
                const conteoPorIncidente = {};
                this.graficas.forEach(item => {
                    const incidente = item.incidente.nombre;
                    conteoPorIncidente[incidente] = (conteoPorIncidente[incidente] || 0) + 1;
                });
                const categoriasIncidente = Object.keys(conteoPorIncidente);
                const valoresIncidente = Object.values(conteoPorIncidente);
                this.grafica_incidentes.xAxis.categories = categoriasIncidente;
                this.grafica_incidentes.series[0].data = valoresIncidente;

                /*CONTEO DE PERSONAS*/
                this.graficas.forEach(item => {
                    this.personas.riesgo += parseInt(item.personas_riesgo || 0, 10);
                    this.personas.afectadas += parseInt(item.personas_afectadas || 0, 10);
                    this.personas.damnificadas += parseInt(item.personas_damnificadas || 0, 10);
                    this.personas.evacuadas += parseInt(item.personas_evacuadas || 0, 10);
                    this.personas.albergadas += parseInt(item.personas_albergadas || 0, 10);
                    this.personas.desaparecidas += parseInt(item.personas_desaparecidas || 0, 10);
                    this.personas.heridas += parseInt(item.personas_heridas || 0, 10);
                    this.personas.fallecidas += parseInt(item.personas_fallecidas || 0, 10);
                    this.viviendas.riesgo += parseInt(item.viviendas_riesgo || 0, 10);
                    this.viviendas.danioS += parseInt(item.viviendas_danio_severo || 0, 10);
                    this.viviendas.danioM += parseInt(item.viviendas_danio_moderado || 0, 10);
                    this.viviendas.danioL += parseInt(item.viviendas_danio_leve || 0, 10);
                    this.servicios.puentesA += parseInt(item.puentes_afectados || 0, 10);
                    this.servicios.puentesD += parseInt(item.puentes_destruidos || 0, 10);
                    this.servicios.escuelasA += parseInt(item.escuelas_afectadas || 0, 10);
                    this.servicios.escuelasD += parseInt(item.escuelas_destruidas || 0, 10);
                    this.servicios.edificiosA += parseInt(item.edificios_afectados || 0, 10);
                    this.servicios.edificiosD += parseInt(item.edificios_destruidos || 0, 10);
                    this.servicios.carreterasA += parseInt(item.carreteras_afectadas || 0, 10);
                    this.servicios.carreterasD += parseInt(item.carreteras_destruidas || 0, 10);
                });

            })
            .catch(error => {
                this.error(error);
            })

        },

        limpiar_graficas() {

            this.personas.riesgo = 0;
            this.personas.afectadas = 0;
            this.personas.damnificadas = 0;
            this.personas.evacuadas = 0;
            this.personas.albergadas = 0;
            this.personas.desaparecidas = 0;
            this.personas.heridas = 0;
            this.personas.fallecidas = 0;

            this.viviendas.riesgo = 0;
            this.viviendas.danioS = 0;
            this.viviendas.danioM = 0;
            this.viviendas.danioL = 0;

            this.servicios.puentesA = 0;
            this.servicios.puentesD = 0;
            this.servicios.escuelasA = 0;
            this.servicios.escuelasD = 0;
            this.servicios.edificiosA = 0;
            this.servicios.edificiosD = 0;
            this.servicios.carreterasA = 0;
            this.servicios.carreterasD = 0;

            this.grafica_incidentes.xAxis.categories = [];
            this.grafica_incidentes.series[0].data = [];

            this.grafica_zonas.xAxis.categories = [];
            this.grafica_zonas.series[0].data = [];

            this.grafica_protocolo.series[0].data = [];

        },

        obtener_zonas() {

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_zonas'
            )
            .then(response => {

                this.zones = [
                    { id_zona: null, nombre: "Todas las zonas" },
                    ...response.data
                ];
                
            })
            .catch(error => {
                this.error(error);
            })

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_anual_prot'
            )
            .then(response => {

                this.protocolos = [
                    { id_protocolo: null, nombre: "Todos los protocolos" },
                    ...response.data,
                    { id_protocolo: 99, nombre: "Sin Asignar"}
                ];

            })
            .catch(error => {
                this.error(error);
            });

            axios
            .get(
                import.meta.env.VITE_API_URL + 'obtener_incidentes'
            )
            .then(response => {

                this.incidentes = [
                    { id_incidente: null, nombre: "Todos los incidentes" },
                    ...response.data
                ];

            })
            .catch(error => {
                this.error(error);
            });

        },

        error (error) {
            this.loading = false;
            console.log(error);
        }

    }

})