document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.getElementById('extractBtn').addEventListener('click', extractQuestionsFromPDF);
document.getElementById('loadTheme3Btn').addEventListener('click', loadTheme3);

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let pdfDocument = null;

// JSON del tema 3
const tema3 = [
    {
        "question": "¿Cuáles son los tipos de preguntas según su finalidad?",
        "options": [
            {"text": "a) Fundamentación, motivadoras, verificadoras, disciplinadoras e integradoras", "correct": true},
            {"text": "b) Fundamentación, evaluativas, creativas y verificadoras", "correct": false},
            {"text": "c) Motivadoras, integradoras, deductivas y analíticas", "correct": false}
        ]
    },
    {
        "question": "¿Qué se entiende por el método de investigación en la educación?",
        "options": [
            {"text": "a) Un enfoque que busca ampliar y profundizar los conocimientos.", "correct": true},
            {"text": "b) Una estrategia para organizar las actividades del aula y optimizar la enseñanza.", "correct": false},
            {"text": "c) Una técnica destinada a establecer normas de conducta para ejecutar tareas correctamente.", "correct": false}
        ]
    },
    {
        "question": "¿Qué caracteriza al método deductivo?",
        "options": [
            {"text": "a) Se basa en experiencias", "correct": false},
            {"text": "b) Fomenta comparaciones", "correct": false},
            {"text": "c) Va de lo general a lo particular", "correct": true}
        ]
    },
    {
        "question": "¿Qué define el método basado en la psicología del alumno?",
        "options": [
            {"text": "a) Parte de lo general a lo particular", "correct": false},
            {"text": "b) Parte de los intereses y motivaciones del alumno", "correct": true},
            {"text": "c) Impone un orden cronológico", "correct": false}
        ]
    },
    {
        "question": "¿Cómo se clasifica el método simbólico?",
        "options": [
            {"text": "a) Es el más interactivo", "correct": false},
            {"text": "b) Se basa en explicaciones orales o escritas", "correct": true},
            {"text": "c) Utiliza experiencias directas", "correct": false}
        ]
    },
    {
        "question": "Para una lección magistral efectiva, ¿qué aspectos debe cuidar el docente?",
        "options": [
            {"text": "a) Entonación, ritmo, claridad y uso de ejemplos prácticos", "correct": true},
            {"text": "b) Uso exclusivo de fórmulas teóricas y ejercicios", "correct": false},
            {"text": "c) Ambas son correctas", "correct": false}
        ]
    },
    {
        "question": "¿Cuál es una de las principales ventajas de la lección magistral?",
        "options": [
            {"text": "a) Fomenta la participación activa de los alumnos", "correct": false},
            {"text": "b) Permite transmitir conocimientos a un gran número de personas de forma rápida", "correct": true},
            {"text": "c) Se adapta a las necesidades individuales de cada alumno", "correct": false}
        ]
    },
    {
        "question": "¿Cuál es la principal diferencia entre las preguntas abiertas y las cerradas?",
        "options": [
            {"text": "a) Las abiertas permiten respuestas libres, mientras que las cerradas exigen una respuesta concreta", "correct": true},
            {"text": "b) Las cerradas fomentan la reflexión, mientras que las abiertas limitan las ideas", "correct": false},
            {"text": "c) Las abiertas se usan para evaluar, y las cerradas para motivar", "correct": false}
        ]
    },
    {
        "question": "¿Cuál es un ejemplo del método demostrativo?",
        "options": [
            {"text": "a) Imitar tareas realizadas por el formador", "correct": true},
            {"text": "b) Facilita la participación del alumnado", "correct": false},
            {"text": "c) Ambas son correctas", "correct": false}
        ]
    },
    {
        "question": "¿Qué caracteriza a las metodologías centradas en los procesos de aplicación?",
        "options": [
            {"text": "a) Fomentan la creatividad y el pensamiento crítico", "correct": true},
            {"text": "b) Requieren memorización", "correct": false},
            {"text": "c) Evitan la toma de decisiones", "correct": false}
        ]
    },
    {
        "question": "¿Qué tipo de preguntas busca evaluar cómo sigue el aprendizaje del alumno?",
        "options": [
            {"text": "a) De relación", "correct": false},
            {"text": "b) De evaluación", "correct": true},
            {"text": "c) Motivadoras", "correct": false}
        ]
    },
    {
        "question": "¿Qué ventaja tiene el método expositivo?",
        "options": [
            {"text": "a) Transmitir información a muchos rápidamente", "correct": true},
            {"text": "b) Fomenta la interacción alumno-profesor", "correct": false},
            {"text": "c) Se adapta a todos los ritmos", "correct": false}
        ]
    },
    {
        "question": "¿Qué fomenta el principio de reflexión?",
        "options": [
            {"text": "a) Pensamiento reflexivo", "correct": true},
            {"text": "b) Creatividad", "correct": false},
            {"text": "c) Experiencias directas", "correct": false}
        ]
    },
    {
        "question": "¿Qué ventaja tiene el método por descubrimiento?",
        "options": [
            {"text": "a) Es rápido de implementar", "correct": false},
            {"text": "b) Fomenta la cohesión de grupo y la toma de decisiones", "correct": true},
            {"text": "c) Es aplicable a grandes grupos", "correct": false}
        ]
    },
    {
        "question": "¿Qué define al método mixto de trabajo?",
        "options": [
            {"text": "a) Tareas estrictamente individuales", "correct": false},
            {"text": "b) Combinación de actividades individuales y grupales", "correct": true},
            {"text": "c) Solo trabajo grupal", "correct": false}
        ]
    },
    {
        "question": "¿Qué tipo de preguntas facilitan la retención de conceptos?",
        "options": [
            {"text": "a) De evaluación", "correct": false},
            {"text": "b) De síntesis", "correct": true},
            {"text": "c) Disciplinadoras", "correct": false}
        ]
    },
    {
        "question": "¿Qué tipos de lenguaje han de ser dominados por el docente para conseguir una comunicación efectiva?",
        "options": [
            {"text": "a) Corporal, de signos y gráfico", "correct": false},
            {"text": "b) Escrito, didáctico y humorístico", "correct": false},
            {"text": "c) Verbal, escrito y corporal", "correct": true}
        ]
    },
    {
        "question": "¿Qué es fundamental conocer respecto al refuerzo en la motivación del alumno?",
        "options": [
            {"text": "a) Los objetivos, los procedimientos y los resultados", "correct": true},
            {"text": "b) La vida privada del alumno y la relación con su familia", "correct": false},
            {"text": "c) El temario a impartir y los gráficos utilizados", "correct": false}
        ]
    },
    {
        "question": "De los estilos didácticos que puede emplear un profesor, ¿cuáles corresponden al democrático?",
        "options": [
            {"text": "a) Enfoque pedagógico, autosuficiente y distante", "correct": false},
            {"text": "b) Ausencia de límites y vínculos inestables", "correct": false},
            {"text": "c) Planificación, dominio de sesiones y fomento de la participación", "correct": true}
        ]
    },
    {
        "question": "Para la organización de la acción formativa, ¿qué aspectos se tienen que tener en cuenta?",
        "options": [
            {"text": "a) Pensamiento crítico y social y cooperación e interacción", "correct": false},
            {"text": "b) Resultados de aprendizaje, grupo de aprendizaje, contenidos, recursos y organización", "correct": true},
            {"text": "c) Organización, recursos, contenidos digitales", "correct": false}
        ]
    },
    {
        "question": "¿Qué estrategias centradas en el/la Docente creés que se tienen que tener en consideración?",
        "options": [
            {"text": "a) Retener lo más importante para poder improvisar durante la clase.", "correct": false},
            {"text": "b) Realizar un trabajo posterior fuera de clase con el alumno escuchándolo con atención e interés.", "correct": false},
            {"text": "c) Disponer de conocimientos previos, fomentar la cooperación entre iguales y escuchar con atención e interés.", "correct": true}
        ]
    },
    {
        "question": "¿Dentro de las estrategias centradas en el docente podemos mencionar?",
        "options": [
            {"text": "a) Escuchar con atención e interés y fomentar la cooperación entre iguales", "correct": false},
            {"text": "b) Disponer de conocimientos previos.", "correct": false},
            {"text": "c) Ambas son correctas", "correct": true}
        ]
    },
    {
        "question": "En el enfoque de las estrategias centradas en el estudiante, ¿cuál es una técnica efectiva?",
        "options": [
            {"text": "a) Impartir clases con temperatura agradable", "correct": false},
            {"text": "b) Aprendizaje basado en problemas (ABP).", "correct": true},
            {"text": "c) Enfocar la clase en trabajos basados en la cooperación internacional", "correct": false}
        ]
    },
    {
        "question": "Entre las habilidades docentes esenciales durante la enseñanza-aprendizaje, la capacidad de aplicar los conocimientos en situaciones concretas se define como:",
        "options": [
            {"text": "a) Saber ser", "correct": false},
            {"text": "b) Saber hacer", "correct": true},
            {"text": "c) Saber estar", "correct": false}
        ]
    },
    {
        "question": "Las Estrategias Metodológicas permiten al estudiante:",
        "options": [
            {"text": "a) Facilita la adquisición de conocimientos", "correct": false},
            {"text": "b) Promueven el aprendizaje significativo", "correct": false},
            {"text": "c) Ambas son correctas", "correct": true}
        ]
    },
    {
        "question": "¿Un factor que influye en la elección de las estrategias metodológicas?",
        "options": [
            {"text": "a) Metas Educativas", "correct": true},
            {"text": "b) El grupo de Aprendizaje", "correct": false},
            {"text": "c) La resolución de conflicto", "correct": false}
        ]
    },
    {
        "question": "¿Cuáles son los elementos clave de la sesión formativa?",
        "options": [
            {"text": "a) Desarrollo del tema, cerrar sesión y última sesión.", "correct": false},
            {"text": "b) Presentación de participantes, presentación curso, desarrollo del tema y cierre de sesión.", "correct": true},
            {"text": "c) Presentación de participantes, presentación de curso, desarrollar tema y merendola.", "correct": false}
        ]
    },
    {
        "question": "En la última sesión se debe tener en cuenta lo siguiente. Marque la incorrecta.",
        "options": [
            {"text": "a) Dejar un correo electrónico para consultas.", "correct": false},
            {"text": "b) Recordar las conclusiones del curso.", "correct": false},
            {"text": "c) Realizar una convivencia con la dirección del centro.", "correct": true}
        ]
    },
    {
        "question": "En una sesión formativa se debe planificar antes de la sesión. Marque la incorrecta.",
        "options": [
            {"text": "a) Recursos y materiales que se necesitarán.", "correct": false},
            {"text": "b) Tener un plan B para posibles imprevistos.", "correct": false},
            {"text": "c) Saber el teléfono del conserje.", "correct": true}
        ]
    },
    {
        "question": "Señala la opción que define las técnicas de simulación.",
        "options": [
            {"text": "a) Feedback, materiales de protocolo y debate.", "correct": false},
            {"text": "b) Role playing, materiales de protocolo, análisis de incidentes críticos y estudio de casos.", "correct": true},
            {"text": "c) Role playing, dinámica de la telaraña y foro.", "correct": false}
        ]
    },
    {
        "question": "Uno de los inconvenientes de la simulación docente es:",
        "options": [
            {"text": "a) Todos los aspectos de la realidad se pueden simular.", "correct": false},
            {"text": "b) Se debe utilizar para desarrollar todas las habilidades del alumno.", "correct": false},
            {"text": "c) Es fundamental combinar diferentes métodos y recursos para la formación y evaluación docente.", "correct": true}
        ]
    },
    {
        "question": "Señala el orden correcto de las fases de la simulación docente:",
        "options": [
            {"text": "a) Fase de preparación, fase de entrenamiento, fase de desarrollo, fase de informe final.", "correct": true},
            {"text": "b) Fase de desarrollo, fase de entretenimiento, fase de informe final.", "correct": false},
            {"text": "c) Fase de preparación, fase de desarrollo, fase de entrenamiento, informe final.", "correct": false}
        ]
    },
    {
        "question": "Algunos criterios de evaluación de la simulación docente son:",
        "options": [
            {"text": "a) Vestimenta, tono de voz y pizarra.", "correct": false},
            {"text": "b) Materiales y recursos, corrección del alumno y adecuación del lenguaje.", "correct": true},
            {"text": "c) Manejo del idioma, rapidez de escritura en pizarra y lenguaje corporal.", "correct": false}
        ]
    },
    {
        "question": "En la teleformación, el aula virtual es: (Marca la incorrecta)",
        "options": [
            {"text": "a) El centro de la clase.", "correct": false},
            {"text": "b) El foro de discusión.", "correct": false},
            {"text": "c) Un lugar donde tienes que estar conectado 24h al día.", "correct": true}
        ]
    },
    {
        "question": "Herramientas del docente en el aula virtual:",
        "options": [
            {"text": "a) Comunicación, rotuladores, gestión de contenidos y photocall.", "correct": false},
            {"text": "b) Gestión de contenidos, recursos web, conexión a netflix.", "correct": false},
            {"text": "c) Presentaciones multimedia, blogs, foros y wikis.", "correct": true}
        ]
    },
    {
        "question": "¿Qué acción del docente es imprescindible para el éxito del estudiante en el aula virtual?",
        "options": [
            {"text": "a) Ser fotogénico.", "correct": false},
            {"text": "b) Dar feedback del progreso.", "correct": true},
            {"text": "c) a y b son incorrectas.", "correct": false}
        ]
    },
    {
        "question": "¿Cuáles son los retos para el estudiante en el aula virtual? (Marque la incorrecta)",
        "options": [
            {"text": "a) Aprender independientemente.", "correct": false},
            {"text": "b) Aprender mediante decisiones y resoluciones virtuales.", "correct": false},
            {"text": "c) Conocer presencialmente a sus compañeros.", "correct": true}
        ]
    }
];

const evaluacion = [
        {
            "question": "UD1 - Según los apuntes del MF, 'La estimación subjetiva de conocimientos, aptitudes y rendimiento del alumnado' es la definición de...",
            "options": [
                { "text": "a) Medir", "correct": false },
                { "text": "b) Categorizar", "correct": false },
                { "text": "c) Evaluar", "correct": true },
                { "text": "d) Valorar", "correct": false }
            ]
        },
        {
            "question": "UD1 - ¿Qué elemento se incluye de forma diferenciada en la planificación de la evaluación en la modalidad de teleformación, que no está en la presencial?",
            "options": [
                { "text": "a) Evaluación final", "correct": false },
                { "text": "b) Cabecera de identificación", "correct": false },
                { "text": "c) Actividades de evaluación continua", "correct": false },
                { "text": "d) Acciones de evaluación de tutoría presenciales", "correct": true }
            ]
        },
        {
            "question": "UD1 - Según los apuntes del MF, 'La comparación del resultado individual con el grupo de referencia' es...",
            "options": [
                { "text": "a) La evaluación con referencia a la subjetividad", "correct": false },
                { "text": "b) La evaluación con referencia a la norma", "correct": true },
                { "text": "c) La evaluación con referencia al grupo", "correct": false },
                { "text": "d) La evaluación con referencia al criterio", "correct": false }
            ]
        },
        {
            "question": "UD1 - Según los apuntes del MF, ¿cuál NO es una de las modalidades de evaluación?",
            "options": [
                { "text": "a) En función del momento", "correct": false },
                { "text": "b) En función de quién la realiza", "correct": false },
                { "text": "c) En función de la norma", "correct": true },
                { "text": "d) En función de la finalidad", "correct": false }
            ]
        },
        {
            "question": "UD1 - Según la normativa que regula los CPs, ¿qué porcentaje de asistencia mínima debe haber para no perder el derecho a la evaluación final?",
            "options": [
                { "text": "a) Del 70% sin excepciones", "correct": false },
                { "text": "b) Del 75% sin excepciones", "correct": false },
                { "text": "c) Del 70% con excepciones", "correct": false },
                { "text": "d) Del 75% con excepciones", "correct": true }
            ]
        },
        {
            "question": "UD1 - Según los apuntes del MF, la evaluación orientadora se realiza...",
            "options": [
                { "text": "a) En función del momento", "correct": false },
                { "text": "b) En función de la finalidad", "correct": true },
                { "text": "c) En función de quién la realiza", "correct": false },
                { "text": "d) En función de la norma", "correct": false }
            ]
        },
        {
            "question": "UD1 - Según los apuntes del MF, la evaluación sumativa se realiza...",
            "options": [
                { "text": "a) Durante la formación", "correct": true },
                { "text": "b) Depende del criterio docente", "correct": false },
                { "text": "c) Al finalizar la formación", "correct": false },
                { "text": "d) Antes de empezar", "correct": false }
            ]
        },
        {
            "question": "UD1 - Según la normativa que regula los CPs, ¿cuántas fases tiene el proceso de evaluación y acreditación de competencias profesionales?",
            "options": [
                { "text": "a) 4", "correct": false },
                { "text": "b) 5", "correct": true },
                { "text": "c) 3", "correct": false },
                { "text": "d) 6", "correct": false }
            ]
        },
        {
            "question": "UD1 - En cuanto a la documentación del MF, ¿qué documento NO forma parte de aquellos a cumplimentar para CPs?",
            "options": [
                { "text": "a) Planificación de la evaluación", "correct": false },
                { "text": "b) Programación didáctica", "correct": true },
                { "text": "c) Acta de evaluación", "correct": false },
                { "text": "d) Evaluación individualizada", "correct": false }
            ]
        },
        {
            "question": "UD1 - Según los apuntes del MF, ¿qué elemento NO forma parte de las características técnicas del proceso de evaluación?",
            "options": [
                { "text": "a) Efectividad", "correct": false },
                { "text": "b) Subjetividad", "correct": true },
                { "text": "c) Fiabilidad", "correct": false },
                { "text": "d) Sistematicidad", "correct": false }
            ]
        },
    

            {
                "question": "UD2 - ¿Qué debe incluir el pie de página de una prueba objetiva según el manual?",
                "options": [
                    {"text": "a) Referencia a criterios de evaluación", "correct": false},
                    {"text": "b) Fecha de corrección", "correct": false},
                    {"text": "c) Logos de las entidades financiadoras", "correct": true},
                    {"text": "d) Instrucciones específicas", "correct": false}
                ]
            },
            {
                "question": "UD2 - ¿Cómo debe vincularse la tabla de especificaciones con los objetivos de aprendizaje?",
                "options": [
                    {"text": "a) Vinculando contenidos básicos únicamente", "correct": false},
                    {"text": "b) Mediante el análisis y ponderación de niveles cognitivos", "correct": true},
                    {"text": "c) Solo con los criterios de evaluación", "correct": false},
                    {"text": "d) Relacionándola exclusivamente con el nivel de síntesis", "correct": false}
                ]
            },
            {
                "question": "UD2 - ¿Qué tipo de preguntas permite evaluar habilidades de síntesis en aprendizajes complejos?",
                "options": [
                    {"text": "a) Ejercicios interpretativos", "correct": false},
                    {"text": "b) Ensayos", "correct": true},
                    {"text": "c) Verdadero/falso", "correct": false},
                    {"text": "d) Selección múltiple", "correct": false}
                ]
            },
            {
                "question": "UD2 - ¿Qué nivel de preguntas suele tener mayor peso en las evaluaciones?",
                "options": [
                    {"text": "a) Intermedias", "correct": true},
                    {"text": "b) Fáciles", "correct": false},
                    {"text": "c) Difíciles", "correct": false},
                    {"text": "d) Muy difíciles", "correct": false}
                ]
            },
            {
                "question": "UD2 - ¿Qué determina la cantidad de preguntas a realizar por criterio de evaluación en la tabla de especificaciones?",
                "options": [
                    {"text": "a) La cantidad de alumnos/as evaluados/as", "correct": false},
                    {"text": "b) El número de niveles cognitivos cubiertos", "correct": false},
                    {"text": "c) La ponderación asignada a cada criterio", "correct": true},
                    {"text": "d) La duración de la prueba", "correct": false}
                ]
            },
            {
                "question": "UD2 - ¿Qué nivel de la Taxonomía de Bloom implica reunir información para formar un todo?",
                "options": [
                    {"text": "a) Evaluación", "correct": false},
                    {"text": "b) Comprensión", "correct": false},
                    {"text": "c) Análisis", "correct": true},
                    {"text": "d) Síntesis", "correct": false}
                ]
            },
            {
                "question": "UD2 - ¿Qué herramienta facilita la alineación entre los contenidos evaluados y los objetivos del aprendizaje, de cara al diseño de las pruebas de evaluación?",
                "options": [
                    {"text": "a) La tabla de especificaciones", "correct": true},
                    {"text": "b) La estructura de la prueba", "correct": false},
                    {"text": "c) El esquema de ponderación", "correct": false},
                    {"text": "d) La rúbrica de calificación", "correct": false}
                ]
            },
            {
                "question": "UD2 - ¿Qué estrategia es fundamental al redactar ítems de correspondencia?",
                "options": [
                    {"text": "a) Asegurar que todos los conceptos tengan opciones de respuesta claras", "correct": true},
                    {"text": "b) Permitir combinaciones abiertas entre conceptos", "correct": false},
                    {"text": "c) Limitar los conceptos a vincular a un solo grupo", "correct": false},
                    {"text": "d) Usar términos que puedan interpretarse de múltiples formas", "correct": false}
                ]
            },
            {
                "question": "UD2 - ¿Qué elemento NO forma parte del encabezado de una prueba objetiva?",
                "options": [
                    {"text": "a) Título de la prueba", "correct": false},
                    {"text": "b) Referencia a la rúbrica de calificación", "correct": true},
                    {"text": "c) Identificación del alumno/a", "correct": false},
                    {"text": "d) Nombre del docente", "correct": false}
                ]
            },
            {
                "question": "UD2 - ¿Cuál es un error común al elaborar preguntas de selección múltiple?",
                "options": [
                    {"text": "a) Alternar las respuestas correctas entre las opciones a, b, c y d", "correct": false},
                    {"text": "b) Incluir respuestas incorrectas plausibles", "correct": false},
                    {"text": "c) Formular opciones ambiguas o incompletas", "correct": true},
                    {"text": "d) Usar enunciados claros y directos", "correct": false}
                ]
            },
    
        



    
    
        {
            "question": "UD3 - En pruebas actitudinales, ¿cuál es el instrumento más comúnmente usado?",
            "options": [
                {"text": "a) Escalas numéricas", "correct": false},
                {"text": "b) Listas de cotejo", "correct": false},
                {"text": "c) Observación directa", "correct": true},
                {"text": "d) Hojas de evaluación", "correct": false}
            ]
        },
        {
            "question": "UD3 - En pruebas procedimentales, ¿qué tarea es común y más sencilla?",
            "options": [
                {"text": "a) Describir un procedimiento", "correct": false},
                {"text": "b) Ejecutar un procedimiento", "correct": false},
                {"text": "c) Ejecutar una tarea", "correct": false},
                {"text": "d) Identificar un procedimiento", "correct": true}
            ]
        },
        {
            "question": "UD3 - ¿Qué caracteriza a una escala de calificación ponderada?",
            "options": [
                {"text": "a) Se adapta a prioridades asignando pesos diferentes a los criterios", "correct": true},
                {"text": "b) Es exclusivamente cualitativa", "correct": false},
                {"text": "c) Evalúa mediante observación directa", "correct": false},
                {"text": "d) Asigna una puntuación general para todos los criterios", "correct": false}
            ]
        },
        {
            "question": "UD3 - Según la UD3, ¿qué instrumento permite medir actitudes mediante opciones graduadas?",
            "options": [
                {"text": "a) Escalas de Likert", "correct": true},
                {"text": "b) Lista de cotejo", "correct": false},
                {"text": "c) Escalas ponderadas", "correct": false},
                {"text": "d) Hoja de registro", "correct": false}
            ]
        },
        {
            "question": "UD3 - Según la UD3, ¿qué diferencia principal existe entre indicadores de desempeño e indicadores de resultado?",
            "options": [
                {"text": "a) Los indicadores de desempeño evalúan logros, mientras que los de resultado evalúan procesos", "correct": false},
                {"text": "b) Los indicadores de desempeño se enfocan en procesos y actividades, mientras que los de resultado se enfocan en los logros", "correct": true},
                {"text": "c) Ambos indicadores evalúan los mismos aspectos", "correct": false},
                {"text": "d) Los indicadores de resultado solo se usan en teleformación", "correct": false}
            ]
        },
        {
            "question": "UD3 - El documento que permite a la persona docente observar y anotar comportamientos o actitudes específicas del alumnado durante una actividad es...",
            "options": [
                {"text": "a) Escala de Likert", "correct": false},
                {"text": "b) Hoja de registro", "correct": true},
                {"text": "c) Hoja de calificación", "correct": false},
                {"text": "d) Escala de valoración", "correct": false}
            ]
        },
        {
            "question": "UD3 - ¿Cuál es un ejemplo de adaptación al medio en pruebas de teleformación?",
            "options": [
                {"text": "a) Tíring de documentación presencial", "correct": false},
                {"text": "b) Uso de papel y lápiz", "correct": false},
                {"text": "c) Observación directa del alumnado", "correct": false},
                {"text": "d) Vídeos de simulación", "correct": true}
            ]
        },
        {
            "question": "UD3 - Según los apuntes de la UD3, ¿Qué elemento NO contiene las instrucciones de realización específicas de una prueba final práctica?",
            "options": [
                {"text": "a) Tareas concretas", "correct": false},
                {"text": "b) Valor de cada apartado", "correct": true},
                {"text": "c) Duración", "correct": false},
                {"text": "d) Espacio de respuesta", "correct": false}
            ]
        },
        {
            "question": "UD3 - ¿Cuál NO es un tipo de escala de calificación?",
            "options": [
                {"text": "a) Evaluativa", "correct": true},
                {"text": "b) Numérica", "correct": false},
                {"text": "c) Descriptiva", "correct": false},
                {"text": "d) Ponderada", "correct": false}
            ]
        },
        {
            "question": "UD3 - En la redacción de indicadores de desempeño, ¿qué elementos deben incluirse en orden?",
            "options": [
                {"text": "a) Objeto, acción y condición", "correct": false},
                {"text": "b) Logros, resultados y evidencias", "correct": false},
                {"text": "c) Acción, objeto y condición", "correct": true},
                {"text": "d) Condición, objeto y acción", "correct": false}
            ]
        },
            {
                "question": "UD4 - ¿Cuál es la principal diferencia entre una técnica y un instrumento de evaluación?",
                "options": [
                    {"text": "a) El instrumento es cualitativo y la técnica es cuantitativa", "correct": false},
                    {"text": "b) Son términos equivalentes y pueden usarse indistintamente", "correct": false},
                    {"text": "c) La técnica indica el método de evaluación, mientras que el instrumento es la herramienta específica", "correct": true},
                    {"text": "d) El instrumento define el procedimiento general y la técnica lo concreta", "correct": false}
                ]
            },
            {
                "question": "UD4 - Según los apuntes de la UD4, aquellas que se centran en la comprensión y análisis de experiencias y percepciones del alumnado son...",
                "options": [
                    {"text": "a) Técnicas cuantitativas", "correct": false},
                    {"text": "b) Técnicas para conocer la satisfacción", "correct": false},
                    {"text": "c) Técnicas diagnósticas", "correct": false},
                    {"text": "d) Técnicas cualitativas", "correct": true}
                ]
            },
            {
                "question": "UD4 - ¿Cuál de las siguientes técnicas se utiliza para evaluar la transferencia del aprendizaje al ámbito laboral?",
                "options": [
                    {"text": "a) Exámenes teórico prácticos", "correct": false},
                    {"text": "b) Pruebas de opción múltiple", "correct": false},
                    {"text": "c) Entrevistas a empleadores/as", "correct": true},
                    {"text": "d) Encuestas de satisfacción", "correct": false}
                ]
            },
            {
                "question": "UD4 - Según la normativa, ¿qué servicios tiene que tener la plataforma de formación?",
                "options": [
                    {"text": "a) Soporte técnico, respuesta en 48 horas máximo, sección FAQ, agente virtual", "correct": false},
                    {"text": "b) Soporte técnico, respuesta en 48 horas máximo, manual de utilización, sección FAQ", "correct": true},
                    {"text": "c) Soporte técnico, respuesta en 24 horas máximo, manual de utilización, sección FAQ", "correct": false},
                    {"text": "d) Soporte técnico, respuesta en 48 horas máximo, manual de utilización, sección de consulta inmediata por agente virtual", "correct": false}
                ]
            },
            {
                "question": "UD4 - Según los apuntes de la UD4, ¿qué elemento clave NO tienen las hojas de seguimiento?",
                "options": [
                    {"text": "a) Observaciones sobre dificultades", "correct": false},
                    {"text": "b) Unión del alumno/a", "correct": false},
                    {"text": "c) Perfil sociolaboral", "correct": true},
                    {"text": "d) Actividades realizadas y pendientes", "correct": false}
                ]
            },
            {
                "question": "UD4 - Según los apuntes de la UD4, es un instrumento estructurado con preguntas diseñadas para recopilar información específica sobre la formación...",
                "options": [
                    {"text": "a) Hoja de seguimiento", "correct": false},
                    {"text": "b) Hoja de registro", "correct": false},
                    {"text": "c) Cuestionario", "correct": true},
                    {"text": "d) Escala de Likert", "correct": false}
                ]
            },
            {
                "question": "UD4 - ¿Cuál es una característica de los criterios de evaluación?",
                "options": [
                    {"text": "a) Medibles", "correct": false},
                    {"text": "b) Relevantes", "correct": false},
                    {"text": "c) Todas son correctas", "correct": true},
                    {"text": "d) Claros", "correct": false}
                ]
            },
            {
                "question": "UD4 - Según la normativa, ¿qué característica del Plan de seguimiento se vincula con que se permita una evaluación en diferentes fases del proceso formativo?",
                "options": [
                    {"text": "a) Continuidad", "correct": true},
                    {"text": "b) Flexibilidad", "correct": false},
                    {"text": "c) Sistematizado", "correct": false},
                    {"text": "d) Participación", "correct": false}
                ]
            },
            {
                "question": "UD4 - Según la UD4, ¿Cuál de los siguientes NO es un tipo de indicador de evaluación?",
                "options": [
                    {"text": "a) Indicadores de ejecución", "correct": true},
                    {"text": "b) Indicadores de proceso", "correct": false},
                    {"text": "c) Indicadores de resultado", "correct": false},
                    {"text": "d) Indicadores de impacto", "correct": false}
                ]
            },
            {
                "question": "UD4 - Según la normativa, ¿cuál NO es una obligación de las entidades de formación respecto a los planes de seguimiento?",
                "options": [
                    {"text": "a) Someterse a controles y auditorías de calidad", "correct": false},
                    {"text": "b) Poseer la mejor herramienta para el seguimiento, sin dar pie a la obsolescencia virtual", "correct": true},
                    {"text": "c) Comunicar cambios a la Administración de la titularidad o forma jurídica", "correct": false},
                    {"text": "d) Colaborar con procesos de selección de participantes", "correct": false}
                ]
            }

]


function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = function(e) {
            const typedarray = new Uint8Array(e.target.result);
            pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                pdfDocument = pdf; // Guardamos el documento PDF
                document.getElementById('extractBtn').style.display = 'block'; // Mostramos el botón de extraer
            }).catch(error => {
                console.error('Error al leer el PDF:', error);
            });
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Por favor, sube un archivo PDF válido.');
    }
}

function extractQuestionsFromPDF() {
    if (!pdfDocument) {
        alert('Por favor, carga un PDF primero.');
        return;
    }

    let textPromises = [];
    for (let i = 1; i <= pdfDocument.numPages; i++) {
        textPromises.push(pdfDocument.getPage(i).then(page => page.getTextContent().then(textContent => {
            return textContent.items.map(item => item.str).join(' ');
        })));
    }

    Promise.all(textPromises).then(pagesText => {
        const fullText = pagesText.join(' ');
        parseJSON(fullText); // Llama a la función para analizar el JSON
        displayQuestion();
    }).catch(error => {
        console.error('Error al extraer texto del PDF:', error);
    });
}

function parseJSON(text) {
    try {
        questions = JSON.parse(text); // Analiza el texto como JSON
    } catch (error) {
        console.error('Error al analizar el JSON:', error);
        alert('No se pudo analizar el contenido del PDF como JSON.');
    }
}

function displayQuestion() {
    const output = document.getElementById('output');
    output.innerHTML = '';

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<p>${currentQuestion.question}</p>`;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        currentQuestion.options.forEach((option, index) => {
            const optionDiv = document.createElement('div'); // Crear un div para cada opción
            optionDiv.className = 'option';
            optionDiv.innerHTML = `
                <label>
                    <input type="radio" name="option" value="${index}">
                    ${option.text}
                </label>
            `;
            optionsDiv.appendChild(optionDiv); // Añadir el div de opción al contenedor de opciones
        });

        const checkButton = document.createElement('button');
        checkButton.innerText = 'Verificar Respuesta';
        checkButton.addEventListener('click', checkAnswer);

        output.appendChild(questionDiv);
        output.appendChild(optionsDiv);
        output.appendChild(checkButton);
    } else {
        output.innerHTML = `<p>Has completado el cuestionario. Tu puntuación final es: ${score} de ${questions.length}</p>`;
    }

    updateScoreDisplay(); // Actualiza el puntaje al mostrar la pregunta
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert('Por favor, selecciona una respuesta.');
        return;
    }

    const answerIndex = parseInt(selectedOption.value);
    const isCorrect = questions[currentQuestionIndex].options[answerIndex].correct;

    if (isCorrect) {
        score++;
        alert('¡Correcto!');
    } else {
        alert('Incorrecto. La respuesta correcta era: ' + questions[currentQuestionIndex].options.find(opt => opt.correct)?.text);
    }

    currentQuestionIndex++;
    updateScoreDisplay(); // Actualiza el puntaje después de cada respuesta
    displayQuestion(); // Muestra la siguiente pregunta
}

function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.innerHTML = `Puntuación: ${score} de ${questions.length}`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
}

function loadTheme3() {
    questions = evaluacion; // Cargar las preguntas del json
    shuffleArray(questions); // Mezclar las preguntas
    currentQuestionIndex = 0; // Reiniciar el índice de preguntas
    score = 0; // Reiniciar la puntuación
    updateScoreDisplay(); // Actualiza el puntaje al cargar el tema
    displayQuestion(); // Mostrar la primera pregunta
}
   