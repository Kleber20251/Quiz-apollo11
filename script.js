const quizData = [
    {
        question: "Pregunta 1: Durante la Actividad Extravehicular (EVA) en la superficie lunar, ¿dónde instaló Neil Armstrong una de las cámaras?",
        options: [
            "A) En la escalera del Módulo Lunar (LM)¹.",
            "B) En el soporte RCU¹.",
            "C) En la bolsa de muestra de contingencia¹."
        ],
        correctAnswerIndex: 1, // B
        justification: "Por qué: La fuente¹ documenta la comunicación en la que Neil Armstrong dice: \"Camera installed on the RCU bracket.\" (Cámara instalada en el soporte RCU)¹."
    },
    {
        question: "Pregunta 2: Según los comentarios de la tripulación después de la EVA, ¿aproximadamente cuántas exposiciones se estimaron haber tomado con las cámaras de 70 milímetros en el Módulo de Comando (CM)?",
        options: [
            "A) Alrededor de 300³.",
            "B) Alrededor de mil³.",
            "C) Alrededor de mil trescientas³."
        ],
        correctAnswerIndex: 1, // B
        justification: "Por qué: La fuente³ registra que la tripulación calculó que habían expuesto \"some 300 in the LM and around a thousand in the Command Module\" (unas 300 [exposiciones] en el LM y alrededor de mil en el Módulo de Comando)³."
    },
    {
        question: "Pregunta 3: ¿Qué velocidad de cuadros por segundo estaba usando Buzz Aldrin para las cámaras configuradas durante la EVA?",
        options: [
            "A) 1 cuadro por minuto².",
            "B) 1 cuadro por segundo².",
            "C) 10 cuadros por segundo²."
        ],
        correctAnswerIndex: 1, // B
        justification: "Por qué: La fuente² recoge la comunicación de Buzz Aldrin diciendo: \"I have got the cameras on at one frame a second\" (He configurado las cámaras a un cuadro por segundo)²."
    },
    {
        question: "Pregunta 4: Houston solicitó específicamente una fotografía de qué artículo ubicado cerca del Experimento Sísmico Pasivo (PSE) durante la EVA?",
        options: [
            "A) Los paneles solares del PSE⁴....",
            "B) El nivel de burbuja del dispositivo de nivelación [9, 24, PAO en 9].",
            "C) La pata de aterrizaje del LM más cercana⁶."
        ],
        correctAnswerIndex: 1, // B
        justification: "Por qué: Las fuentes⁴ y⁵ documentan la solicitud de Houston a Buzz: \"If you're still in the vicinity of the PSE, could you get a photograph of the ball level? Over.\" (Si todavía estás cerca del PSE, ¿podrías tomar una fotografía del nivel de burbuja? Cambio.)⁴.... El locutor (PAO) aclara que el nivel de burbuja que discuten está en un dispositivo de nivelación en el monitor sísmico pasivo⁴."
    },
    {
        question: "Pregunta 5: Cuando Neil Armstrong estaba recolectando muestras para el contenedor de muestras documentadas, después de considerar que el área inicial cerca de la cámara de televisión pudo haber sido afectada por el escape del motor de descenso, ¿hacia dónde se dirigió?",
        options: [
            "A) Al área directamente debajo del motor de descenso¹....",
            "B) Al lado sur del LM, cerca de un cráter doble alargado⁸....",
            "C) A un cráter grande detrás del LM⁸...."
        ],
        correctAnswerIndex: 1, // B
        justification: "Por qué: Neil Armstrong explicó que, al recordar que el área inicial \"had been probably swept pretty well by the exhaust of the descent engine, so I crossed over to the southern side of the LM and took a number of samples from the area around the elongate double crater that we commented on\" (probablemente había sido barrida bastante bien por el escape del motor de descenso, así que crucé al lado sur del LM y tomé varias muestras del área alrededor del cráter doble alargado que comentamos)⁸...."
    },
    {
        question: "Pregunta 6: Según una actualización específica de la lista de verificación proporcionada por Houston, ¿dónde se indicaba que debía ubicarse el cargador de película de 16 milímetros?",
        options: [
            "A) Ventana número 01¹¹.",
            "B) Ventana número 04¹¹.",
            "C) Compartimento L3¹¹."
        ],
        correctAnswerIndex: 1, // B
        justification: "Por qué: Durante una revisión de la lista de verificación de entrada, la fuente¹¹ documenta la corrección: \"In compartment A 1 16 millimeter magazine will be located in window number 04 instead of 05.\" (En el compartimento A 1, el cargador de película de 16 milímetros estará ubicado en la ventana número 04 en lugar de la 05.)¹¹."
    },
    {
        question: "Pregunta 7: ¿Qué comentó el Piloto del Módulo de Comando (CMP), Michael Collins, sobre la vista de la Tierra y su estado con la fotografía desde el Módulo de Comando?",
        options: [
            "A) La Tierra se estaba haciendo más pequeña y estaba empacando la cámara¹².",
            "B) La Luna se estaba haciendo más grande y se le había acabado la película¹².",
            "C) La Tierra se estaba haciendo más grande, veían una luna creciente, y le quedaban cuatro exposiciones antes de empacar la cámara¹²."
        ],
        correctAnswerIndex: 2, // C
        justification: "Por qué: La fuente¹² registra las palabras del CMP: \"The Earth is really getting bigger up here and, of course, we see a crescent. We've been taking pictures and we have four exposures to go, and we'll take those and then pack the camera.\" (La Tierra realmente se está haciendo más grande aquí arriba y, por supuesto, vemos una luna creciente. Hemos estado tomando fotos y nos quedan cuatro exposiciones antes de empacar la cámara.)"
    }
];

const quizCardsContainer = document.getElementById('quiz-cards');
const quizCompleteMessage = document.getElementById('quiz-complete-message');
const totalAttemptsMessage = document.getElementById('total-attempts-message');
const classificationMessage = document.getElementById('classification-message');

let currentQuestionIndex = 0; // Start with the first question
const questionAttempts = {}; // Object to store attempts for each question { index: count }


function createCard(questionData, index) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    cardContainer.dataset.index = index; // Store the question index
    cardContainer.dataset.correctIndex = questionData.correctAnswerIndex;

    // Lock all cards initially except the first one
    if (index !== currentQuestionIndex) {
        cardContainer.classList.add('locked');
    }

    // Initialize attempts for this question
    questionAttempts[index] = 0;


    const card = document.createElement('div');
    card.classList.add('card');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.innerHTML = `
        <div class="card-content">
            <h2>${questionData.question}</h2>
            <div class="options">
                ${questionData.options.map((option, optIndex) =>
                    `<button data-index="${optIndex}">${option}</button>`
                ).join('')}
            </div>
        </div>
    `;

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.innerHTML = `
        <div class="result-area">
            <div class="result-indicator"></div>
            <p class="result-text"></p>
        </div>
        <div class="card-content justification"></div>
    `; // Justification is now inside card-content


    card.appendChild(cardFront);
    card.appendChild(cardBack);
    cardContainer.appendChild(card);

    return cardContainer;
}

function updateCardBack(cardBackElement, isCorrect, justificationText) {
    const resultIndicator = cardBackElement.querySelector('.result-indicator');
    const resultText = cardBackElement.querySelector('.result-text');
    const justificationArea = cardBackElement.querySelector('.justification');

    // Reset classes
    cardBackElement.classList.remove('correct', 'incorrect');
    // justificationArea.style.display = 'none'; // Managed by CSS class now

    if (isCorrect) {
        cardBackElement.classList.add('correct');
        resultIndicator.textContent = '✔';
        resultText.textContent = '¡Correcto!';
        justificationArea.textContent = justificationText;
        // CSS handles display: block for .card-back.correct .justification
    } else {
        cardBackElement.classList.add('incorrect');
        resultIndicator.textContent = '✖';
        resultText.textContent = 'Incorrecto';
        justificationArea.textContent = ''; // Clear justification for incorrect
        // CSS handles display: none for .card-back.incorrect .justification (or default)
    }
}

function handleAnswer(event) {
    const clickedButton = event.target.closest('.options button');
    if (!clickedButton) return; // Exit if clicked element is not a button

    const cardContainer = clickedButton.closest('.card-container');
    const cardIndex = parseInt(cardContainer.dataset.index);

    // Only process clicks on the current unlocked question that hasn't been correctly answered
    if (cardIndex !== currentQuestionIndex || cardContainer.classList.contains('correct-answered')) {
         console.log("Ignorando click en tarjeta incorrecta o ya respondida correctamente.");
         return;
    }

     // If the card is already flipped showing an incorrect result, ignore clicks temporarily
     if (cardContainer.classList.contains('flipped') && cardContainer.classList.contains('showing-incorrect-result')) {
          console.log("Espera a que la tarjeta vuelva a voltear para intentarlo de nuevo.");
          return;
      }


    const card = cardContainer.querySelector('.card');
    const cardBack = cardContainer.querySelector('.card-back');
    const selectedAnswerIndex = parseInt(clickedButton.dataset.index);
    const correctAnswerIndex = parseInt(cardContainer.dataset.correctIndex);
    const questionData = quizData[cardIndex]; // Get data using card index

    const isCorrect = (selectedAnswerIndex === correctAnswerIndex);

    // Increment the attempt count for this question
    questionAttempts[cardIndex]++;
    console.log(`Question ${cardIndex}: Attempts = ${questionAttempts[cardIndex]}`);


    // Update the content on the back of the card
    updateCardBack(cardBack, isCorrect, questionData.justification);

    // Trigger the flip animation
    cardContainer.classList.add('flipped');


    if (isCorrect) {
        // Mark the card as permanently answered correctly
        cardContainer.classList.add('correct-answered');

        // Unlock the next question after a delay
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                const nextCardContainer = quizCardsContainer.querySelector(`.card-container[data-index="${currentQuestionIndex}"]`);
                if (nextCardContainer) {
                    nextCardContainer.classList.remove('locked');
                     console.log(`Pregunta ${currentQuestionIndex + 1} desbloqueada.`);
                }
            } else {
                // All questions answered
                displayQuizCompleteMessage();
            }
        }, 800); // Delay unlocking slightly after the flip starts (matches transition duration)

    } else {
        // Incorrect answer - Temporarily show result and flip back
        // Add a class to indicate it's showing an incorrect attempt result
         cardContainer.classList.add('showing-incorrect-result');

        // After a delay, flip the card back and remove the temporary state
        setTimeout(() => {
            cardContainer.classList.remove('flipped');
            cardContainer.classList.remove('showing-incorrect-result');
            // The options are still active, allowing another attempt
             console.log("Intentar de nuevo.");
        }, 1500); // Show incorrect result for 1.5 seconds
    }
}

function calculateTotalAttempts() {
    let total = 0;
    // Sum up attempts for each question index that exists in questionAttempts
    for (const index in questionAttempts) {
        if (questionAttempts.hasOwnProperty(index)) {
            total += questionAttempts[index];
        }
    }
    return total;
}

function getClassification(totalAttempts, totalQuestions) {
    const minAttempts = totalQuestions; // Getting every question right on the first try

    if (totalAttempts === minAttempts) {
        return "¡Excelente! Rendimiento perfecto en el primer intento.";
    } else if (totalAttempts <= minAttempts + Math.floor(totalQuestions * 0.5)) { // e.g., 7 questions, min=7, 0.5*7=3.5, <= 10 attempts
        return "¡Genial! Necesitaste muy pocos intentos adicionales.";
    } else if (totalAttempts <= minAttempts + totalQuestions) { // e.g., 7 questions, min=7, 7+7=14, <= 14 attempts
         return "¡Buen trabajo! Lograste responderlas todas.";
    } else {
        return "Sigue practicando para mejorar tu eficiencia.";
    }
}


function displayQuizCompleteMessage() {
    quizCardsContainer.classList.add('hidden'); // Hide cards container

    const totalAttempts = calculateTotalAttempts();
    const classification = getClassification(totalAttempts, quizData.length);

    totalAttemptsMessage.textContent = `Intentos totales: ${totalAttempts}`;
    classificationMessage.textContent = `Clasificación: ${classification}`;

    quizCompleteMessage.classList.remove('hidden'); // Show completion message
     console.log("Quiz Completado!");
     console.log(`Intentos totales: ${totalAttempts}`);
     console.log(`Clasificación: ${classification}`);
}


// Initialize the quiz
quizData.forEach((question, index) => {
    const cardElement = createCard(question, index);
    quizCardsContainer.appendChild(cardElement);
});

// Add event listener to the quiz container using event delegation
quizCardsContainer.addEventListener('click', handleAnswer);

// Make the first card clickable immediately (remove locked class)
const firstCard = quizCardsContainer.querySelector(`.card-container[data-index="0"]`);
if (firstCard) {
    firstCard.classList.remove('locked');
}