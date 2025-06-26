// Conversation Module JavaScript

let currentCharacter = null;
let conversationStep = 0;
let conversationPoints = 0;

// Dados dos personagens
const charactersData = {
  teddy: {
    name: "Teddy Bear",
    emoji: "🐻",
    level: "Iniciante",
    personality: "amigável e paciente",
    topics: ["family", "greetings", "colors", "numbers"],
    responses: {
      greeting: [
        "Hello! I'm Teddy Bear! What's your name?",
        "Hi there! Nice to meet you!",
        "Hello friend! How are you today?"
      ],
      family: [
        "Tell me about your family! Do you have brothers or sisters?",
        "I love my teddy family! Who is in your family?",
        "Family is important! What's your mom's name?"
      ],
      colors: [
        "What's your favorite color? Mine is brown!",
        "I see many colors! Can you name a color you like?",
        "Colors are beautiful! What color is the sky?"
      ],
      goodbye: [
        "Goodbye! It was nice talking with you!",
        "See you later! Keep practicing English!",
        "Bye bye! You did great today!"
      ]
    }
  },
  emma: {
    name: "Little Emma",
    emoji: "👧",
    level: "Intermediário",
    personality: "curiosa e energética",
    topics: ["school", "games", "food", "animals"],
    responses: {
      greeting: [
        "Hi! I'm Emma! I love going to school and playing games!",
        "Hello! Do you like to play? I have many favorite games!",
        "Hi there! What grade are you in? I'm in second grade!"
      ],
      school: [
        "School is so fun! What's your favorite subject?",
        "I love learning new things at school! Do you like math or reading more?",
        "My teacher is really nice! Tell me about your school!"
      ],
      games: [
        "I love playing hide and seek! What games do you like?",
        "Do you like video games or outdoor games better?",
        "Playing with friends is the best! What's your favorite game?"
      ],
      goodbye: [
        "Bye! Let's play again soon!",
        "See you later! Thanks for playing with me!",
        "Goodbye! You're a great friend!"
      ]
    }
  },
  turtle: {
    name: "Wise Turtle",
    emoji: "🐢",
    level: "Avançado",
    personality: "sábio e reflexivo",
    topics: ["nature", "wisdom", "time", "learning"],
    responses: {
      greeting: [
        "Greetings, young learner! I am the Wise Turtle. What brings you here today?",
        "Hello! I have lived for many years and learned much. What would you like to discuss?",
        "Welcome! Patience and practice make perfect. How can I help you learn?"
      ],
      nature: [
        "Nature teaches us many things. What do you notice about the world around you?",
        "The trees, the sky, the ocean... they all have stories. What's your favorite part of nature?",
        "Every season brings changes. Which season do you enjoy most and why?"
      ],
      learning: [
        "Learning is a journey, not a destination. What new thing did you learn today?",
        "Questions are more important than answers sometimes. What questions do you have?",
        "Mistakes help us grow. Don't be afraid to try new words!"
      ],
      goodbye: [
        "Remember, slow and steady wins the race. Keep practicing!",
        "Farewell, young friend. May your learning journey be fruitful!",
        "Until we meet again, keep your curiosity alive!"
      ]
    }
  }
};

// Respostas rápidas por tópico
const quickResponsesByTopic = {
  greetings: ["Hello!", "Hi there!", "Good morning!", "How are you?"],
  family: ["I have a sister", "My mom is nice", "I love my family", "My dad is tall"],
  school: ["I like math", "School is fun", "My teacher is kind", "I have friends"],
  games: ["I like to play", "Games are fun", "Let's play together", "I enjoy puzzles"],
  colors: ["My favorite is blue", "I like red", "Colors are pretty", "Green is nice"],
  food: ["I like apples", "Pizza is good", "I'm hungry", "Food is yummy"],
  animals: ["I love dogs", "Cats are cute", "Birds can fly", "Fish swim well"],
  nature: ["Trees are tall", "The sky is blue", "I love flowers", "Nature is beautiful"]
};

// Função para iniciar conversação
function startConversation(characterName) {
  currentCharacter = charactersData[characterName];
  conversationStep = 0;
  conversationPoints = 0;
  
  // Configurar modal
  document.getElementById('character-name').textContent = currentCharacter.name;
  document.getElementById('character-emoji').textContent = currentCharacter.emoji;
  document.getElementById('character-status').textContent = `Nível: ${currentCharacter.level}`;
  
  // Limpar chat
  document.getElementById('chat-area').innerHTML = '';
  document.getElementById('message-input').value = '';
  
  // Mostrar modal
  document.getElementById('conversation-modal').classList.remove('hidden');
  
  // Iniciar conversa
  setTimeout(() => {
    addMessage(currentCharacter.responses.greeting[0], 'character');
    updateQuickResponses(['Hello!', 'Hi!', 'Good morning!', 'Nice to meet you!']);
  }, 500);
}

// Função para encerrar conversação
function endConversation() {
  document.getElementById('conversation-modal').classList.add('hidden');
  
  if (conversationStep > 3) {
    // Salvar progresso
    const currentProgress = JSON.parse(localStorage.getItem('conversationProgress') || '{}');
    currentProgress.totalConversations = (currentProgress.totalConversations || 0) + 1;
    currentProgress.totalPoints = (currentProgress.totalPoints || 0) + conversationPoints;
    localStorage.setItem('conversationProgress', JSON.stringify(currentProgress));
    
    KiddyTalk.showNotification(`🎉 Conversa completa! +${conversationPoints} pontos!`, 'success');
    updateProgressDisplay();
  }
  
  currentCharacter = null;
  conversationStep = 0;
}

// Função para adicionar mensagem ao chat
function addMessage(text, sender) {
  const chatArea = document.getElementById('chat-area');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender} mb-4 fade-in`;
  
  if (sender === 'character') {
    messageDiv.innerHTML = `
      <div class="flex items-start space-x-3">
        <div class="w-10 h-10 bg-kiddy-blue rounded-full flex items-center justify-center flex-shrink-0">
          <span class="text-lg">${currentCharacter.emoji}</span>
        </div>
        <div class="bg-white p-3 rounded-lg shadow-sm max-w-xs">
          <p class="text-gray-800">${text}</p>
        </div>
      </div>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="flex items-start space-x-3 justify-end">
        <div class="bg-kiddy-blue text-white p-3 rounded-lg shadow-sm max-w-xs">
          <p>${text}</p>
        </div>
        <div class="w-10 h-10 bg-kiddy-yellow rounded-full flex items-center justify-center flex-shrink-0">
          <span class="text-lg">😊</span>
        </div>
      </div>
    `;
  }
  
  chatArea.appendChild(messageDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}

// Função para enviar mensagem
function sendMessage() {
  const input = document.getElementById('message-input');
  const message = input.value.trim();
  
  if (message) {
    addMessage(message, 'user');
    input.value = '';
    conversationStep++;
    conversationPoints += 10;
    
    // Simular digitação do personagem
    setTimeout(() => {
      generateCharacterResponse(message);
    }, 1000 + Math.random() * 1000);
  }
}

// Função para gerar resposta do personagem
function generateCharacterResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  let response = "";
  let topic = "general";
  
  // Detectar tópico da mensagem
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('good')) {
    topic = "greeting";
  } else if (lowerMessage.includes('family') || lowerMessage.includes('mom') || lowerMessage.includes('dad') || lowerMessage.includes('sister') || lowerMessage.includes('brother')) {
    topic = "family";
  } else if (lowerMessage.includes('school') || lowerMessage.includes('teacher') || lowerMessage.includes('class') || lowerMessage.includes('learn')) {
    topic = "school";
  } else if (lowerMessage.includes('play') || lowerMessage.includes('game') || lowerMessage.includes('fun')) {
    topic = "games";
  } else if (lowerMessage.includes('color') || lowerMessage.includes('red') || lowerMessage.includes('blue') || lowerMessage.includes('green')) {
    topic = "colors";
  } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
    topic = "goodbye";
  }
  
  // Selecionar resposta baseada no tópico
  if (currentCharacter.responses[topic]) {
    const responses = currentCharacter.responses[topic];
    response = responses[Math.floor(Math.random() * responses.length)];
  } else {
    // Respostas genéricas
    const genericResponses = [
      "That's interesting! Tell me more!",
      "I understand! What else would you like to talk about?",
      "Great! Can you use that word in a sentence?",
      "Wonderful! You're doing so well with English!",
      "I see! What do you think about that?"
    ];
    response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
  }
  
  addMessage(response, 'character');
  
  // Atualizar respostas rápidas baseadas no tópico
  if (quickResponsesByTopic[topic]) {
    updateQuickResponses(quickResponsesByTopic[topic]);
  } else {
    updateQuickResponses(['Yes!', 'No, thanks', 'Tell me more', 'That\'s cool!']);
  }
  
  // Verificar se deve encerrar a conversa
  if (topic === "goodbye" || conversationStep > 10) {
    setTimeout(() => {
      addMessage("It was great talking with you! Keep practicing English!", 'character');
      setTimeout(() => {
        endConversation();
      }, 2000);
    }, 1500);
  }
}

// Função para atualizar respostas rápidas
function updateQuickResponses(responses) {
  const quickResponsesDiv = document.getElementById('quick-responses');
  quickResponsesDiv.innerHTML = '';
  
  responses.forEach(response => {
    const button = document.createElement('button');
    button.textContent = response;
    button.className = 'bg-gray-200 hover:bg-kiddy-blue hover:text-white px-3 py-1 rounded-full text-sm transition-all';
    button.onclick = () => {
      document.getElementById('message-input').value = response;
      sendMessage();
    };
    quickResponsesDiv.appendChild(button);
  });
}

// Função para lidar com tecla pressionada
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

// Função para atualizar display de progresso
function updateProgressDisplay() {
  const progress = JSON.parse(localStorage.getItem('conversationProgress') || '{}');
  
  document.getElementById('conversations-count').textContent = progress.totalConversations || 0;
  document.getElementById('points-count').textContent = progress.totalPoints || 0;
  
  // Determinar nível baseado nos pontos
  const points = progress.totalPoints || 0;
  let level = "Iniciante";
  if (points >= 500) level = "Avançado";
  else if (points >= 200) level = "Intermediário";
  
  document.getElementById('current-level').textContent = level;
}

// Função para usar resposta rápida
function useQuickResponse(response) {
  document.getElementById('message-input').value = response;
  sendMessage();
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  updateProgressDisplay();
  
  // Adicionar animação aos cards de personagens
  const characterCards = document.querySelectorAll('.character-card');
  characterCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('fade-in');
    }, index * 200);
  });
  
  // Adicionar efeito hover aos tópicos
  const topicCards = document.querySelectorAll('.topic-card');
  topicCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });
});

