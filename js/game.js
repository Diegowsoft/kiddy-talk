// Game Module JavaScript

let currentGame = null;
let gameScore = 0;
let gameTimer = 0;
let gameLevel = 1;
let hintsRemaining = 3;
let gameInterval = null;
let gameData = {};

// Dados dos jogos
const gamesData = {
  memory: {
    title: "🧠 Jogo da Memória",
    description: "Encontre os pares de palavras!",
    cards: [
      { id: 1, word: "Cat", translation: "Gato", emoji: "🐱" },
      { id: 2, word: "Dog", translation: "Cachorro", emoji: "🐶" },
      { id: 3, word: "Bird", translation: "Pássaro", emoji: "🐦" },
      { id: 4, word: "Fish", translation: "Peixe", emoji: "🐠" },
      { id: 5, word: "Apple", translation: "Maçã", emoji: "🍎" },
      { id: 6, word: "Banana", translation: "Banana", emoji: "🍌" },
      { id: 7, word: "Red", translation: "Vermelho", emoji: "🔴" },
      { id: 8, word: "Blue", translation: "Azul", emoji: "🔵" },
      { id: 9, word: "Happy", translation: "Feliz", emoji: "😊" },
      { id: 10, word: "Sun", translation: "Sol", emoji: "☀️" }
    ]
  },
  wordmatch: {
    title: "🔤 Conecte as Palavras",
    description: "Conecte palavras em inglês com suas traduções!",
    pairs: [
      { english: "Hello", portuguese: "Olá", category: "greetings" },
      { english: "Goodbye", portuguese: "Tchau", category: "greetings" },
      { english: "Thank you", portuguese: "Obrigado", category: "greetings" },
      { english: "Mother", portuguese: "Mãe", category: "family" },
      { english: "Father", portuguese: "Pai", category: "family" },
      { english: "Sister", portuguese: "Irmã", category: "family" },
      { english: "House", portuguese: "Casa", category: "objects" },
      { english: "Car", portuguese: "Carro", category: "objects" },
      { english: "Book", portuguese: "Livro", category: "objects" },
      { english: "Water", portuguese: "Água", category: "objects" }
    ]
  },
  quiz: {
    title: "❓ Quiz Divertido",
    description: "Responda perguntas sobre inglês!",
    questions: [
      {
        question: "Como se diz 'Gato' em inglês?",
        options: ["Cat", "Dog", "Bird", "Fish"],
        correct: 0,
        emoji: "🐱"
      },
      {
        question: "Qual é a tradução de 'Hello'?",
        options: ["Tchau", "Obrigado", "Olá", "Por favor"],
        correct: 2,
        emoji: "👋"
      },
      {
        question: "Como se diz 'Vermelho' em inglês?",
        options: ["Blue", "Green", "Yellow", "Red"],
        correct: 3,
        emoji: "🔴"
      },
      {
        question: "Qual número é 'Five' em português?",
        options: ["Três", "Quatro", "Cinco", "Seis"],
        correct: 2,
        emoji: "5️⃣"
      },
      {
        question: "Como se diz 'Obrigado' em inglês?",
        options: ["Please", "Sorry", "Thank you", "Excuse me"],
        correct: 2,
        emoji: "🙏"
      },
      {
        question: "Qual é a tradução de 'Apple'?",
        options: ["Banana", "Maçã", "Laranja", "Uva"],
        correct: 1,
        emoji: "🍎"
      },
      {
        question: "Como se diz 'Escola' em inglês?",
        options: ["House", "School", "Park", "Store"],
        correct: 1,
        emoji: "🏫"
      },
      {
        question: "Qual é a tradução de 'Good morning'?",
        options: ["Boa tarde", "Boa noite", "Bom dia", "Boa sorte"],
        correct: 2,
        emoji: "🌅"
      }
    ]
  }
};

// Conquistas disponíveis
const achievements = [
  { id: "first_game", name: "Primeiro Jogo", description: "Jogou pela primeira vez", emoji: "🎮", unlocked: false },
  { id: "memory_master", name: "Mestre da Memória", description: "Pontuou 500+ no jogo da memória", emoji: "🧠", unlocked: false },
  { id: "word_connector", name: "Conectador de Palavras", description: "Completou 10 conexões seguidas", emoji: "🔗", unlocked: false },
  { id: "quiz_champion", name: "Campeão do Quiz", description: "Acertou 8/8 no quiz", emoji: "🏆", unlocked: false },
  { id: "speed_demon", name: "Demônio da Velocidade", description: "Completou um jogo em menos de 30s", emoji: "⚡", unlocked: false },
  { id: "persistent", name: "Persistente", description: "Jogou 10 vezes", emoji: "💪", unlocked: false }
];

// Função para iniciar um jogo
function startGame(gameType) {
  currentGame = gameType;
  gameScore = 0;
  gameTimer = 0;
  gameLevel = 1;
  hintsRemaining = 3;
  
  // Configurar modal
  document.getElementById('game-title').textContent = gamesData[gameType].title;
  document.getElementById('game-score').textContent = '0';
  document.getElementById('game-timer').textContent = '00:00';
  document.getElementById('game-level').textContent = '1';
  document.getElementById('hints-count').textContent = '3';
  
  // Mostrar modal
  document.getElementById('game-modal').classList.remove('hidden');
  
  // Inicializar jogo específico
  if (gameType === 'memory') {
    initMemoryGame();
  } else if (gameType === 'wordmatch') {
    initWordMatchGame();
  } else if (gameType === 'quiz') {
    initQuizGame();
  }
  
  // Iniciar timer
  startGameTimer();
  
  // Marcar primeira jogada
  checkAchievement('first_game');
}

// Função para encerrar jogo
function endGame() {
  document.getElementById('game-modal').classList.add('hidden');
  
  if (gameInterval) {
    clearInterval(gameInterval);
  }
  
  // Salvar melhor pontuação
  saveBestScore(currentGame, gameScore);
  
  // Verificar conquistas
  checkGameAchievements();
  
  // Resetar variáveis
  currentGame = null;
  gameData = {};
}

// Função para inicializar jogo da memória
function initMemoryGame() {
  const cards = gamesData.memory.cards.slice(0, 6); // Usar apenas 6 pares
  const gameCards = [];
  
  // Criar pares de cartas
  cards.forEach(card => {
    gameCards.push({ ...card, type: 'word', id: card.id + '_word' });
    gameCards.push({ ...card, type: 'translation', id: card.id + '_translation' });
  });
  
  // Embaralhar cartas
  gameCards.sort(() => Math.random() - 0.5);
  
  gameData.cards = gameCards;
  gameData.flippedCards = [];
  gameData.matchedPairs = 0;
  gameData.totalPairs = cards.length;
  
  renderMemoryGame();
}

// Função para renderizar jogo da memória
function renderMemoryGame() {
  const content = document.getElementById('game-content');
  content.innerHTML = `
    <div class="text-center mb-6">
      <h3 class="text-2xl font-bold text-kiddy-dark mb-2">Encontre os Pares!</h3>
      <p class="text-gray-600">Clique nas cartas para encontrar as palavras em inglês e suas traduções</p>
      <div class="mt-4">
        <span class="text-lg font-semibold text-kiddy-blue">Pares encontrados: ${gameData.matchedPairs}/${gameData.totalPairs}</span>
      </div>
    </div>
    <div class="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      ${gameData.cards.map((card, index) => `
        <div class="memory-card card text-center cursor-pointer hover-scale ${card.matched ? 'matched' : ''} ${card.flipped ? 'flipped' : ''}" 
             data-index="${index}" onclick="flipMemoryCard(${index})">
          <div class="card-front">
            <div class="w-16 h-16 bg-kiddy-blue rounded-full flex items-center justify-center mx-auto mb-2">
              <span class="text-2xl">❓</span>
            </div>
            <p class="text-sm font-semibold">?</p>
          </div>
          <div class="card-back hidden">
            <div class="w-16 h-16 bg-kiddy-yellow rounded-full flex items-center justify-center mx-auto mb-2">
              <span class="text-2xl">${card.emoji}</span>
            </div>
            <p class="text-sm font-bold">${card.type === 'word' ? card.word : card.translation}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Função para virar carta da memória
function flipMemoryCard(index) {
  if (gameData.flippedCards.length >= 2 || gameData.cards[index].flipped || gameData.cards[index].matched) {
    return;
  }
  
  gameData.cards[index].flipped = true;
  gameData.flippedCards.push(index);
  
  const cardElement = document.querySelector(`[data-index="${index}"]`);
  cardElement.classList.add('flipped');
  cardElement.querySelector('.card-front').classList.add('hidden');
  cardElement.querySelector('.card-back').classList.remove('hidden');
  
  if (gameData.flippedCards.length === 2) {
    setTimeout(checkMemoryMatch, 1000);
  }
}

// Função para verificar match na memória
function checkMemoryMatch() {
  const [first, second] = gameData.flippedCards;
  const firstCard = gameData.cards[first];
  const secondCard = gameData.cards[second];
  
  if (firstCard.id.split('_')[0] === secondCard.id.split('_')[0] && firstCard.type !== secondCard.type) {
    // Match encontrado
    firstCard.matched = true;
    secondCard.matched = true;
    gameData.matchedPairs++;
    gameScore += 100;
    
    document.querySelector(`[data-index="${first}"]`).classList.add('matched');
    document.querySelector(`[data-index="${second}"]`).classList.add('matched');
    
    KiddyTalk.showNotification('🎉 Par encontrado! +100 pontos!', 'success');
    
    if (gameData.matchedPairs === gameData.totalPairs) {
      setTimeout(() => {
        KiddyTalk.showNotification('🏆 Parabéns! Você completou o jogo!', 'success');
        gameScore += 200; // Bônus por completar
        updateGameScore();
      }, 500);
    }
  } else {
    // Não é match, virar cartas de volta
    firstCard.flipped = false;
    secondCard.flipped = false;
    
    const firstElement = document.querySelector(`[data-index="${first}"]`);
    const secondElement = document.querySelector(`[data-index="${second}"]`);
    
    firstElement.classList.remove('flipped');
    secondElement.classList.remove('flipped');
    firstElement.querySelector('.card-front').classList.remove('hidden');
    firstElement.querySelector('.card-back').classList.add('hidden');
    secondElement.querySelector('.card-front').classList.remove('hidden');
    secondElement.querySelector('.card-back').classList.add('hidden');
  }
  
  gameData.flippedCards = [];
  updateGameScore();
  renderMemoryGame();
}

// Função para inicializar jogo de conectar palavras
function initWordMatchGame() {
  const pairs = gamesData.wordmatch.pairs.slice(0, 5); // Usar 5 pares
  gameData.pairs = pairs;
  gameData.selectedWords = [];
  gameData.matchedPairs = 0;
  gameData.totalPairs = pairs.length;
  
  renderWordMatchGame();
}

// Função para renderizar jogo de conectar palavras
function renderWordMatchGame() {
  const content = document.getElementById('game-content');
  const englishWords = [...gameData.pairs].sort(() => Math.random() - 0.5);
  const portugueseWords = [...gameData.pairs].sort(() => Math.random() - 0.5);
  
  content.innerHTML = `
    <div class="text-center mb-6">
      <h3 class="text-2xl font-bold text-kiddy-dark mb-2">Conecte as Palavras!</h3>
      <p class="text-gray-600">Clique em uma palavra em inglês e depois em sua tradução</p>
      <div class="mt-4">
        <span class="text-lg font-semibold text-kiddy-blue">Conexões: ${gameData.matchedPairs}/${gameData.totalPairs}</span>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div class="space-y-3">
        <h4 class="text-xl font-bold text-center text-kiddy-blue mb-4">English</h4>
        ${englishWords.map((pair, index) => `
          <div class="word-card card text-center cursor-pointer hover-scale ${pair.matched ? 'matched bg-kiddy-green text-white' : ''}" 
               data-word="${pair.english}" data-type="english" onclick="selectWord('${pair.english}', 'english')">
            <p class="font-bold text-lg">${pair.english}</p>
          </div>
        `).join('')}
      </div>
      <div class="space-y-3">
        <h4 class="text-xl font-bold text-center text-kiddy-orange mb-4">Português</h4>
        ${portugueseWords.map((pair, index) => `
          <div class="word-card card text-center cursor-pointer hover-scale ${pair.matched ? 'matched bg-kiddy-green text-white' : ''}" 
               data-word="${pair.portuguese}" data-type="portuguese" onclick="selectWord('${pair.portuguese}', 'portuguese')">
            <p class="font-bold text-lg">${pair.portuguese}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Função para selecionar palavra
function selectWord(word, type) {
  const wordElement = document.querySelector(`[data-word="${word}"][data-type="${type}"]`);
  
  if (wordElement.classList.contains('matched') || wordElement.classList.contains('selected')) {
    return;
  }
  
  // Remover seleção anterior do mesmo tipo
  document.querySelectorAll(`.word-card[data-type="${type}"].selected`).forEach(el => {
    el.classList.remove('selected', 'bg-kiddy-yellow');
  });
  
  wordElement.classList.add('selected', 'bg-kiddy-yellow');
  gameData.selectedWords = gameData.selectedWords.filter(w => w.type !== type);
  gameData.selectedWords.push({ word, type });
  
  if (gameData.selectedWords.length === 2) {
    setTimeout(checkWordMatch, 500);
  }
}

// Função para verificar match de palavras
function checkWordMatch() {
  const [english, portuguese] = gameData.selectedWords.sort((a, b) => a.type === 'english' ? -1 : 1);
  const pair = gameData.pairs.find(p => p.english === english.word && p.portuguese === portuguese.word);
  
  if (pair) {
    // Match encontrado
    pair.matched = true;
    gameData.matchedPairs++;
    gameScore += 150;
    
    const englishElement = document.querySelector(`[data-word="${english.word}"][data-type="english"]`);
    const portugueseElement = document.querySelector(`[data-word="${portuguese.word}"][data-type="portuguese"]`);
    
    englishElement.className = 'word-card card text-center matched bg-kiddy-green text-white';
    portugueseElement.className = 'word-card card text-center matched bg-kiddy-green text-white';
    
    KiddyTalk.showNotification('🎉 Conexão correta! +150 pontos!', 'success');
    
    if (gameData.matchedPairs === gameData.totalPairs) {
      setTimeout(() => {
        KiddyTalk.showNotification('🏆 Todas as palavras conectadas!', 'success');
        gameScore += 300; // Bônus por completar
        updateGameScore();
      }, 500);
    }
  } else {
    // Não é match
    document.querySelectorAll('.word-card.selected').forEach(el => {
      el.classList.remove('selected', 'bg-kiddy-yellow');
      el.classList.add('bg-kiddy-red', 'text-white');
    });
    
    setTimeout(() => {
      document.querySelectorAll('.word-card.bg-kiddy-red').forEach(el => {
        el.classList.remove('bg-kiddy-red', 'text-white');
      });
    }, 1000);
  }
  
  gameData.selectedWords = [];
  updateGameScore();
}

// Função para inicializar quiz
function initQuizGame() {
  gameData.questions = [...gamesData.quiz.questions].sort(() => Math.random() - 0.5);
  gameData.currentQuestion = 0;
  gameData.correctAnswers = 0;
  gameData.totalQuestions = gameData.questions.length;
  
  renderQuizGame();
}

// Função para renderizar quiz
function renderQuizGame() {
  if (gameData.currentQuestion >= gameData.totalQuestions) {
    showQuizResults();
    return;
  }
  
  const question = gameData.questions[gameData.currentQuestion];
  const content = document.getElementById('game-content');
  
  content.innerHTML = `
    <div class="text-center mb-8">
      <div class="text-6xl mb-4">${question.emoji}</div>
      <h3 class="text-2xl font-bold text-kiddy-dark mb-4">Pergunta ${gameData.currentQuestion + 1}/${gameData.totalQuestions}</h3>
      <p class="text-xl text-gray-700 mb-6">${question.question}</p>
      <div class="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div class="bg-kiddy-blue h-2 rounded-full transition-all duration-300" style="width: ${((gameData.currentQuestion + 1) / gameData.totalQuestions) * 100}%"></div>
      </div>
    </div>
    <div class="max-w-2xl mx-auto space-y-4">
      ${question.options.map((option, index) => `
        <button class="quiz-option w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-kiddy-blue hover:bg-kiddy-blue hover:bg-opacity-10 transition-all text-lg font-semibold" 
                onclick="selectQuizAnswer(${index})">
          ${String.fromCharCode(65 + index)}) ${option}
        </button>
      `).join('')}
    </div>
  `;
}

// Função para selecionar resposta do quiz
function selectQuizAnswer(selectedIndex) {
  const question = gameData.questions[gameData.currentQuestion];
  const options = document.querySelectorAll('.quiz-option');
  
  options.forEach((option, index) => {
    option.disabled = true;
    if (index === question.correct) {
      option.classList.add('bg-kiddy-green', 'text-white', 'border-kiddy-green');
    } else if (index === selectedIndex && selectedIndex !== question.correct) {
      option.classList.add('bg-kiddy-red', 'text-white', 'border-kiddy-red');
    }
  });
  
  if (selectedIndex === question.correct) {
    gameData.correctAnswers++;
    gameScore += 200;
    KiddyTalk.showNotification('🎉 Resposta correta! +200 pontos!', 'success');
  } else {
    KiddyTalk.showNotification('❌ Resposta incorreta. A correta é: ' + question.options[question.correct], 'error');
  }
  
  updateGameScore();
  
  setTimeout(() => {
    gameData.currentQuestion++;
    renderQuizGame();
  }, 2000);
}

// Função para mostrar resultados do quiz
function showQuizResults() {
  const content = document.getElementById('game-content');
  const percentage = Math.round((gameData.correctAnswers / gameData.totalQuestions) * 100);
  
  content.innerHTML = `
    <div class="text-center">
      <div class="text-8xl mb-6">🏆</div>
      <h3 class="text-3xl font-bold text-kiddy-dark mb-4">Quiz Completo!</h3>
      <div class="bg-kiddy-soft-white p-6 rounded-lg mb-6">
        <p class="text-2xl font-bold text-kiddy-blue mb-2">${gameData.correctAnswers}/${gameData.totalQuestions} Corretas</p>
        <p class="text-xl text-gray-600 mb-4">${percentage}% de Acerto</p>
        <p class="text-lg font-semibold text-kiddy-green">Pontuação Final: ${gameScore}</p>
      </div>
      <div class="text-lg">
        ${percentage >= 80 ? '🌟 Excelente trabalho!' : 
          percentage >= 60 ? '👍 Bom trabalho!' : 
          '💪 Continue praticando!'}
      </div>
    </div>
  `;
  
  if (gameData.correctAnswers === gameData.totalQuestions) {
    checkAchievement('quiz_champion');
  }
}

// Função para usar dica
function useHint() {
  if (hintsRemaining <= 0) {
    KiddyTalk.showNotification('Você não tem mais dicas disponíveis!', 'error');
    return;
  }
  
  hintsRemaining--;
  document.getElementById('hints-count').textContent = hintsRemaining;
  
  if (currentGame === 'memory') {
    // Mostrar brevemente um par não encontrado
    const unmatched = gameData.cards.filter(card => !card.matched);
    if (unmatched.length >= 2) {
      const pair = unmatched.find(card => 
        unmatched.some(other => 
          other.id.split('_')[0] === card.id.split('_')[0] && 
          other.type !== card.type
        )
      );
      if (pair) {
        const pairMatch = unmatched.find(card => 
          card.id.split('_')[0] === pair.id.split('_')[0] && 
          card.type !== pair.type
        );
        
        const index1 = gameData.cards.indexOf(pair);
        const index2 = gameData.cards.indexOf(pairMatch);
        
        flipMemoryCard(index1);
        flipMemoryCard(index2);
        
        setTimeout(() => {
          gameData.flippedCards = [];
          pair.flipped = false;
          pairMatch.flipped = false;
          renderMemoryGame();
        }, 2000);
      }
    }
  }
  
  KiddyTalk.showNotification('💡 Dica usada!', 'success');
}

// Função para reiniciar jogo
function restartGame() {
  if (currentGame) {
    startGame(currentGame);
  }
}

// Função para iniciar timer do jogo
function startGameTimer() {
  gameInterval = setInterval(() => {
    gameTimer++;
    const minutes = Math.floor(gameTimer / 60);
    const seconds = gameTimer % 60;
    document.getElementById('game-timer').textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

// Função para atualizar pontuação
function updateGameScore() {
  document.getElementById('game-score').textContent = gameScore;
}

// Função para salvar melhor pontuação
function saveBestScore(gameType, score) {
  const key = `${gameType}-best`;
  const currentBest = parseInt(localStorage.getItem(key) || '0');
  
  if (score > currentBest) {
    localStorage.setItem(key, score.toString());
    KiddyTalk.showNotification('🎉 Nova melhor pontuação!', 'success');
  }
  
  updateLeaderboard();
}

// Função para atualizar leaderboard
function updateLeaderboard() {
  document.getElementById('memory-best').textContent = localStorage.getItem('memory-best') || '0';
  document.getElementById('wordmatch-best').textContent = localStorage.getItem('wordmatch-best') || '0';
  document.getElementById('quiz-best').textContent = localStorage.getItem('quiz-best') || '0';
}

// Função para verificar conquista
function checkAchievement(achievementId) {
  const achievement = achievements.find(a => a.id === achievementId);
  if (achievement && !achievement.unlocked) {
    achievement.unlocked = true;
    localStorage.setItem('achievements', JSON.stringify(achievements));
    KiddyTalk.showNotification(`🎖️ Conquista desbloqueada: ${achievement.name}!`, 'success');
    renderAchievements();
  }
}

// Função para verificar conquistas do jogo
function checkGameAchievements() {
  if (gameScore >= 500 && currentGame === 'memory') {
    checkAchievement('memory_master');
  }
  
  if (gameTimer < 30) {
    checkAchievement('speed_demon');
  }
  
  // Incrementar contador de jogos
  const gamesPlayed = parseInt(localStorage.getItem('gamesPlayed') || '0') + 1;
  localStorage.setItem('gamesPlayed', gamesPlayed.toString());
  
  if (gamesPlayed >= 10) {
    checkAchievement('persistent');
  }
}

// Função para renderizar conquistas
function renderAchievements() {
  const grid = document.getElementById('achievements-grid');
  const savedAchievements = JSON.parse(localStorage.getItem('achievements') || '[]');
  
  // Atualizar estado das conquistas
  achievements.forEach(achievement => {
    const saved = savedAchievements.find(a => a.id === achievement.id);
    if (saved) {
      achievement.unlocked = saved.unlocked;
    }
  });
  
  grid.innerHTML = achievements.map(achievement => `
    <div class="achievement card text-center ${achievement.unlocked ? 'unlocked' : 'locked'}">
      <div class="text-4xl mb-2 ${achievement.unlocked ? '' : 'grayscale opacity-50'}">${achievement.emoji}</div>
      <h4 class="font-bold text-sm mb-1 ${achievement.unlocked ? 'text-kiddy-dark' : 'text-gray-400'}">${achievement.name}</h4>
      <p class="text-xs ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}">${achievement.description}</p>
      ${achievement.unlocked ? '<div class="text-xs text-kiddy-green font-bold mt-2">✓ Desbloqueada</div>' : ''}
    </div>
  `).join('');
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  updateLeaderboard();
  renderAchievements();
  
  // Adicionar estilos CSS para os jogos
  const style = document.createElement('style');
  style.textContent = `
    .memory-card {
      min-height: 120px;
      transition: transform 0.3s ease;
    }
    
    .memory-card.flipped {
      transform: rotateY(180deg);
    }
    
    .memory-card.matched {
      opacity: 0.7;
      transform: scale(0.95);
    }
    
    .word-card.selected {
      transform: scale(1.05);
    }
    
    .quiz-option:disabled {
      cursor: not-allowed;
    }
    
    .achievement.locked {
      opacity: 0.6;
    }
    
    .achievement.unlocked {
      border: 2px solid #4CAF50;
    }
  `;
  document.head.appendChild(style);
});

