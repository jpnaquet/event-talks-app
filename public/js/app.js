document.addEventListener('DOMContentLoaded', () => {
  const scheduleElement = document.getElementById('schedule');
  const searchInput = document.getElementById('categorySearch');
  const clearBtn = document.getElementById('clearSearch');
  let talks = [];

  // Theme Toggle Logic
  const themeToggle = document.getElementById('themeToggle');
  
  // Check for saved theme
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    let theme = 'light';
    if (document.body.classList.contains('dark-mode')) {
      theme = 'dark';
      themeToggle.textContent = '☀️';
    } else {
      themeToggle.textContent = '🌙';
    }
    
    localStorage.setItem('theme', theme);
  });

  // Fetch data from the API
  const fetchSchedule = async () => {
    try {
      const response = await fetch('/api/talks');
      talks = await response.json();
      renderSchedule(talks);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      scheduleElement.innerHTML = '<div class="loading">Failed to load schedule. Please try again later.</div>';
    }
  };

  // Render the schedule to the DOM
  const renderSchedule = (items) => {
    scheduleElement.innerHTML = '';
    
    if (items.length === 0) {
      scheduleElement.innerHTML = '<div class="loading">No talks found for this category.</div>';
      return;
    }

    items.forEach(talk => {
      const card = document.createElement('div');
      card.className = `talk-card ${talk.isBreak ? 'break' : ''}`;
      
      const categoryTags = talk.category
        .map(cat => `<span class="category-tag">${cat}</span>`)
        .join('');

      card.innerHTML = `
        <div class="time-range">${talk.startTime} - ${talk.endTime} (${talk.duration})</div>
        <h2 class="talk-title">${talk.title}</h2>
        ${talk.speakers.length > 0 ? `<div class="speakers">by ${talk.speakers.join(' & ')}</div>` : ''}
        <div class="description">${talk.description}</div>
        <div class="categories">${categoryTags}</div>
      `;
      
      scheduleElement.appendChild(card);
    });
  };

  // Filter talks based on search input
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    clearBtn.style.display = searchTerm ? 'block' : 'none';

    if (!searchTerm) {
      renderSchedule(talks);
      return;
    }

    const filtered = talks.filter(talk => {
      // Allow searching by category, title, or speaker
      return talk.category.some(cat => cat.toLowerCase().includes(searchTerm)) ||
             talk.title.toLowerCase().includes(searchTerm) ||
             talk.speakers.some(speaker => speaker.toLowerCase().includes(searchTerm));
    });

    renderSchedule(filtered);
  });

  // Clear search functionality
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    renderSchedule(talks);
    searchInput.focus();
  });

  fetchSchedule();
});
