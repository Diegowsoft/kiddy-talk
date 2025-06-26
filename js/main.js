// Kiddy Talk Website - JavaScript Principal

// Função para alternar menu mobile
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('hidden');
  }
}

// Função para tocar sons (placeholder para futuras implementações)
function playSound(soundName) {
  console.log(`Playing sound: ${soundName}`);
  // Aqui seria implementada a lógica de áudio
}

// Função para animações de entrada
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

// Função para feedback visual em cliques
function addClickFeedback() {
  const interactiveElements = document.querySelectorAll('.interactive, .btn-kiddy, .card');
  
  interactiveElements.forEach(element => {
    element.addEventListener('click', function(e) {
      // Criar efeito ripple
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Função para salvar progresso no localStorage
function saveProgress(module, lesson, score) {
  const progress = JSON.parse(localStorage.getItem('kiddyTalkProgress') || '{}');
  if (!progress[module]) {
    progress[module] = {};
  }
  progress[module][lesson] = {
    completed: true,
    score: score,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('kiddyTalkProgress', JSON.stringify(progress));
}

// Função para carregar progresso
function loadProgress(module, lesson) {
  const progress = JSON.parse(localStorage.getItem('kiddyTalkProgress') || '{}');
  return progress[module] && progress[module][lesson] ? progress[module][lesson] : null;
}

// Função para mostrar notificações
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;
  
  // Adicionar estilos inline para a notificação
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : '#FF6835'};
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Remover automaticamente após 3 segundos
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 3000);
}

// Função para validar formulários
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('input[required], select[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  });
  
  return isValid;
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar animações
  animateOnScroll();
  
  // Adicionar feedback de clique
  addClickFeedback();
  
  // Fechar menu mobile ao clicar fora
  document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = e.target.closest('button');
    
    if (mobileMenu && !mobileMenu.contains(e.target) && !menuButton) {
      mobileMenu.classList.add('hidden');
    }
  });
  
  // Adicionar estilos CSS para notificações e ripple
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .error {
      border: 2px solid #FF6835 !important;
      background-color: #FFE6E6 !important;
    }
    
    .notification-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    
    .notification-content button {
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
      padding: 0;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;
  document.head.appendChild(style);
});

// Exportar funções para uso em outras páginas
window.KiddyTalk = {
  toggleMobileMenu,
  playSound,
  saveProgress,
  loadProgress,
  showNotification,
  validateForm
};

