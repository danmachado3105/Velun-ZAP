// Animated phone chat
  const chat = document.getElementById('chat');
  const script = [
    { side:'in',  text:'Oi, vocês abrem no sábado?' },
    { side:'out', text:'Oi! Sim, abrimos sábado das 9h às 14h 😊' },
    { side:'in',  text:'Quanto fica o pacote completo?' },
    { side:'out', text:'O pacote completo sai por R$120. Quer que eu já separe um horário?' },
    { side:'in',  text:'Quero sim! Amanhã de manhã' },
    { side:'out', text:'Fechado ✅ vou confirmar e te aviso em instantes' },
  ];

  function typeThenSend(msg){
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    if(msg.side === 'out'){
      chat.appendChild(typing);
      chat.scrollTop = chat.scrollHeight;
    }
    setTimeout(() => {
      if(msg.side === 'out' && typing.parentNode) typing.remove();
      const b = document.createElement('div');
      b.className = 'bubble ' + msg.side;
      b.textContent = msg.text;
      chat.appendChild(b);
      chat.scrollTop = chat.scrollHeight;
    }, msg.side === 'out' ? 1100 : 50);
  }

  function playScript(){
    chat.innerHTML = '';
    let t = 200;
    script.forEach((msg) => {
      const gap = msg.side === 'out' ? 1500 : 900;
      setTimeout(() => typeThenSend(msg), t);
      t += gap;
    });
    return t + 3000;
  }
  let cycle = playScript();
  setInterval(() => { cycle = playScript(); }, cycle + 2000);

  // Theme toggle
  const root = document.documentElement;
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(open => {
        open.classList.remove('open');
        open.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });