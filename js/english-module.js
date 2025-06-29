// English Module JavaScript

let currentLesson = null;
let currentStep = 0;
let lessonSteps = [];

// Dados das lições
const lessonsData = {
  colors: {
    title: "🎨 Cores (Colors)",
    steps: [
      {
        type: "vocabulary",
        title: "Aprenda as Cores",
        items: [
          { word: "Red", translation: "Vermelho", color: "#FF0000", emoji: "🔴" },
          { word: "Blue", translation: "Azul", color: "#0000FF", emoji: "🔵" },
          { word: "Green", translation: "Verde", color: "#00FF00", emoji: "🟢" },
          { word: "Yellow", translation: "Amarelo", color: "#FFFF00", emoji: "🟡" },
          { word: "Orange", translation: "Laranja", color: "#FFA500", emoji: "🟠" },
          { word: "Purple", translation: "Roxo", color: "#800080", emoji: "🟣" }
        ]
      },
      {
        type: "practice",
        title: "Pratique as Cores",
        question: "Qual é a cor em inglês?",
        exercises: [
          { question: "🔴", answer: "red", options: ["red", "blue", "green"] },
          { question: "🔵", answer: "blue", options: ["red", "blue", "yellow"] },
          { question: "🟢", answer: "green", options: ["green", "purple", "orange"] },
          { question: "🟡", answer: "yellow", options: ["yellow", "red", "blue"] }
        ]
      }
    ]
  },
  numbers: {
    title: "🔢 Números (Numbers)",
    steps: [
      {
        type: "vocabulary",
        title: "Aprenda os Números",
        items: [
          { word: "One", translation: "Um", number: "1", emoji: "1️⃣" },
          { word: "Two", translation: "Dois", number: "2", emoji: "2️⃣" },
          { word: "Three", translation: "Três", number: "3", emoji: "3️⃣" },
          { word: "Four", translation: "Quatro", number: "4", emoji: "4️⃣" },
          { word: "Five", translation: "Cinco", number: "5", emoji: "5️⃣" },
          { word: "Six", translation: "Seis", number: "6", emoji: "6️⃣" },
          { word: "Seven", translation: "Sete", number: "7", emoji: "7️⃣" },
          { word: "Eight", translation: "Oito", number: "8", emoji: "8️⃣" },
          { word: "Nine", translation: "Nove", number: "9", emoji: "9️⃣" },
          { word: "Ten", translation: "Dez", number: "10", emoji: "🔟" }
        ]
      },
      {
        type: "practice",
        title: "Pratique os Números",
        question: "Qual é o número em inglês?",
        exercises: [
          { question: "1️⃣", answer: "one", options: ["one", "two", "three"] },
          { question: "5️⃣", answer: "five", options: ["four", "five", "six"] },
          { question: "🔟", answer: "ten", options: ["eight", "nine", "ten"] },
          { question: "3️⃣", answer: "three", options: ["two", "three", "four"] }
        ]
      }
    ]
  },
  animals: {
    title: "🐶 Animais (Animals)",
    steps: [
      {
        type: "vocabulary",
        title: "Aprenda os Animais",
        items: [
          { word: "Dog", translation: "Cachorro", emoji: "🐶" },
          { word: "Cat", translation: "Gato", emoji: "🐱" },
          { word: "Bird", translation: "Pássaro", emoji: "🐦" },
          { word: "Fish", translation: "Peixe", emoji: "🐠" },
          { word: "Rabbit", translation: "Coelho", emoji: "🐰" },
          { word: "Bear", translation: "Urso", emoji: "🐻" }
        ]
      },
      {
        type: "practice",
        title: "Pratique os Animais",
        question: "Qual é o animal em inglês?",
        exercises: [
          { question: "🐶", answer: "dog", options: ["dog", "cat", "bird"] },
          { question: "🐱", answer: "cat", options: ["cat", "fish", "rabbit"] },
          { question: "🐦", answer: "bird", options: ["bird", "bear", "dog"] },
          { question: "🐠", answer: "fish", options: ["fish", "cat", "rabbit"] }
        ]
      }
    ]
  },
  family: {
    title: "👨‍👩‍👧‍👦 Família (Family)",
    steps: [
      {
        type: "vocabulary",
        title: "Aprenda sobre a Família",
        items: [
          { word: "Mother", translation: "Mãe", emoji: "👩" },
          { word: "Father", translation: "Pai", emoji: "👨" },
          { word: "Sister", translation: "Irmã", emoji: "👧" },
          { word: "Brother", translation: "Irmão", emoji: "👦" },
          { word: "Grandmother", translation: "Avó", emoji: "👵" },
          { word: "Grandfather", translation: "Avô", emoji: "👴" }
        ]
      },
      {
        type: "practice",
        title: "Pratique Família",
        question: "Quem é em inglês?",
        exercises: [
          { question: "👩", answer: "mother", options: ["mother", "father", "sister"] },
          { question: "👨", answer: "father", options: ["father", "brother", "grandfather"] },
          { question: "👧", answer: "sister", options: ["sister", "mother", "grandmother"] },
          { question: "👦", answer: "brother", options: ["brother", "father", "grandfather"] }
        ]
      }
    ]
  },
  food: {
    title: "🍎 Comida (Food)",
    steps: [
      {
        type: "vocabulary",
        title: "Aprenda sobre Comida",
        items: [
          { word: "Apple", translation: "Maçã", emoji: "🍎" },
          { word: "Banana", translation: "Banana", emoji: "🍌" },
          { word: "Orange", translation: "Laranja", emoji: "🍊" },
          { word: "Bread", translation: "Pão", emoji: "🍞" },
          { word: "Milk", translation: "Leite", emoji: "🥛" },
          { word: "Cake", translation: "Bolo", emoji: "🎂" }
        ]
      },
      {
        type: "practice",
        title: "Pratique Comida",
        question: "Qual é a comida em inglês?",
        exercises: [
          { question: "🍎", answer: "apple", options: ["apple", "orange", "banana"] },
          { question: "🍌", answer: "banana", options: ["banana", "bread", "cake"] },
          { question: "🍊", answer: "orange", options: ["orange", "apple", "milk"] },
          { question: "🍞", answer: "bread", options: ["bread", "cake", "banana"] }
        ]
      }
    ]
  },
  greetings: {
    title: "👋 Cumprimentos (Greetings)",
    steps: [
      {
        type: "vocabulary",
        title: "Aprenda Cumprimentos",
        items: [
          { word: "Hello", translation: "Olá", emoji: "👋" },
          { word: "Goodbye", translation: "Tchau", emoji: "👋" },
          { word: "Good Morning", translation: "Bom Dia", emoji: "🌅" },
          { word: "Good Night", translation: "Boa Noite", emoji: "🌙" },
          { word: "Thank You", translation: "Obrigado", emoji: "🙏" },
          { word: "Please", translation: "Por Favor", emoji: "🙏" }
        ]
      },
      {
        type: "practice",
        title: "Pratique Cumprimentos",
        question: "Como se diz em inglês?",
        exercises: [
          { question: "👋 Olá", answer: "hello", options: ["hello", "goodbye", "thank you"] },
          { question: "🌅 Bom Dia", answer: "good morning", options: ["good morning", "good night", "hello"] },
          { question: "🙏 Obrigado", answer: "thank you", options: ["thank you", "please", "goodbye"] },
          { question: "🌙 Boa Noite", answer: "good night", options: ["good night", "good morning", "hello"] }
        ]
      }
    ]
  }
};

// Função para iniciar uma lição
function startLesson(lessonName) {
  currentLesson = lessonName;
  currentStep = 0;
  lessonSteps = lessonsData[lessonName].steps;
  
  document.getElementById('lesson-title').textContent = lessonsData[lessonName].title;
  document.getElementById('lesson-modal').classList.remove('hidden');
  
  renderCurrentStep();
  updateLessonProgress();
}

// Função para fechar o modal da lição
function closeLessonModal() {
  document.getElementById('lesson-modal').classList.add('hidden');
  currentLesson = null;
  currentStep = 0;
}

// Função para renderizar o passo atual
function renderCurrentStep() {
  const step = lessonSteps[currentStep];
  const content = document.getElementById('lesson-content');
  
  if (step.type === 'vocabulary') {
    content.innerHTML = `
      <div class="text-center mb-6">
        <h3 class="text-2xl font-bold text-kiddy-dark mb-4">${step.title}</h3>
        <p class="text-gray-600">Clique nas palavras para ouvir a pronúncia</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${step.items.map(item => `
          <div class="vocabulary-card card text-center hover-scale interactive" onclick="speakWord('${item.word}')">
            <div class="text-6xl mb-3">${item.emoji}</div>
            <h4 class="text-xl font-bold text-kiddy-blue mb-2">${item.word}</h4>
            <p class="text-gray-600">${item.translation}</p>
            ${item.color ? `<div class="w-8 h-8 rounded-full mx-auto mt-2" style="background-color: ${item.color}"></div>` : ''}
            ${item.number ? `<div class="text-3xl font-bold text-kiddy-orange mt-2">${item.number}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  } else if (step.type === 'practice') {
    if (!step.currentExercise) step.currentExercise = 0;
    const exercise = step.exercises[step.currentExercise];
    
    content.innerHTML = `
      <div class="text-center mb-6">
        <h3 class="text-2xl font-bold text-kiddy-dark mb-4">${step.title}</h3>
        <p class="text-lg text-gray-600 mb-2">${step.question}</p>
        <div class="text-sm text-gray-500">Exercício ${step.currentExercise + 1} de ${step.exercises.length}</div>
      </div>
      <div class="max-w-md mx-auto">
        <div class="text-center mb-8">
          <div class="text-8xl mb-4">${exercise.question}</div>
        </div>
        <div class="space-y-3">
          ${exercise.options.map(option => `
            <button class="practice-option w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-kiddy-blue hover:bg-kiddy-blue hover:bg-opacity-10 transition-all" onclick="selectAnswer('${option}', '${exercise.answer}')">
              ${option}
            </button>
          `).join('')}
        </div>
        <div id="feedback" class="mt-6 text-center hidden"></div>
      </div>
    `;
  }
  
  updateNavigationButtons();
}

// Função para falar uma palavra (simulação)
function speakWord(word) {
  console.log(`Speaking: ${word}`);
  // Aqui seria implementada a funcionalidade de text-to-speech
  KiddyTalk.showNotification(`Falando: ${word}`, 'success');
}

// Função para selecionar resposta
function selectAnswer(selected, correct) {
  const feedback = document.getElementById('feedback');
  const options = document.querySelectorAll('.practice-option');
  
  options.forEach(option => {
    option.disabled = true;
    if (option.textContent.trim() === correct) {
      option.classList.add('bg-kiddy-green', 'text-white', 'border-kiddy-green');
    } else if (option.textContent.trim() === selected && selected !== correct) {
      option.classList.add('bg-kiddy-red', 'text-white', 'border-kiddy-red');
    }
  });
  
  feedback.classList.remove('hidden');
  if (selected === correct) {
    feedback.innerHTML = '<div class="text-kiddy-green text-xl font-bold">🎉 Correto! Muito bem!</div>';
    setTimeout(() => {
      nextPracticeExercise();
    }, 1500);
  } else {
    feedback.innerHTML = `<div class="text-kiddy-red text-xl font-bold">❌ Ops! A resposta correta é: ${correct}</div>`;
    setTimeout(() => {
      nextPracticeExercise();
    }, 2500);
  }
}

// Função para próximo exercício de prática
function nextPracticeExercise() {
  const step = lessonSteps[currentStep];
  step.currentExercise = (step.currentExercise || 0) + 1;
  
  if (step.currentExercise >= step.exercises.length) {
    // Exercícios concluídos, ir para próximo passo
    nextStep();
  } else {
    renderCurrentStep();
  }
}

// Função para próximo passo
function nextStep() {
  if (currentStep < lessonSteps.length - 1) {
    currentStep++;
    renderCurrentStep();
    updateLessonProgress();
  } else {
    // Lição completa
    document.getElementById('complete-btn').classList.remove('hidden');
    document.getElementById('next-btn').classList.add('hidden');
  }
}

// Função para passo anterior
function previousStep() {
  if (currentStep > 0) {
    currentStep--;
    renderCurrentStep();
    updateLessonProgress();
  }
}

// Função para completar lição
function completeLesson() {
  KiddyTalk.saveProgress('english', currentLesson, 100);
  KiddyTalk.showNotification('🎉 Parabéns! Lição concluída!', 'success');
  updateLessonStatus(currentLesson, 'completed');
  updateOverallProgress();
  closeLessonModal();
}

// Função para atualizar progresso da lição
function updateLessonProgress() {
  const progress = ((currentStep + 1) / lessonSteps.length) * 100;
  document.getElementById('lesson-progress').style.width = progress + '%';
}

// Função para atualizar botões de navegação
function updateNavigationButtons() {
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const completeBtn = document.getElementById('complete-btn');
  
  prevBtn.classList.toggle('hidden', currentStep === 0);
  
  if (currentStep === lessonSteps.length - 1) {
    nextBtn.classList.add('hidden');
    completeBtn.classList.remove('hidden');
  } else {
    nextBtn.classList.remove('hidden');
    completeBtn.classList.add('hidden');
  }
}

// Função para atualizar status da lição
function updateLessonStatus(lessonName, status) {
  const lessonCard = document.querySelector(`[data-lesson="${lessonName}"]`);
  const statusBadge = lessonCard.querySelector('.status-badge');
  
  if (status === 'completed') {
    statusBadge.textContent = 'Concluída';
    statusBadge.className = 'status-badge bg-kiddy-green text-white px-3 py-1 rounded-full text-sm';
    lessonCard.querySelector('button').textContent = 'Revisar Lição';
  }
}

// Função para atualizar progresso geral
function updateOverallProgress() {
  const completedLessons = Object.keys(lessonsData).filter(lesson => 
    KiddyTalk.loadProgress('english', lesson)
  ).length;
  
  const totalLessons = Object.keys(lessonsData).length;
  const progressPercentage = (completedLessons / totalLessons) * 100;
  
  document.getElementById('progress-bar').style.width = progressPercentage + '%';
  document.getElementById('progress-text').textContent = `${completedLessons}/${totalLessons} Lições Completas`;
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  // Carregar progresso salvo
  Object.keys(lessonsData).forEach(lessonName => {
    const progress = KiddyTalk.loadProgress('english', lessonName);
    if (progress && progress.completed) {
      updateLessonStatus(lessonName, 'completed');
    }
  });
  
  updateOverallProgress();
});

