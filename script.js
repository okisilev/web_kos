// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Инициализация всех функций
    initNavbar();
    initSmoothScrolling();
    initAnimations();
    initFormHandling();
    initParticles();
    initCounters();
    
    // Функция инициализации навигации
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        // Изменение навигации при скролле
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
        
        // Мобильное меню
        if (navToggle) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
        
        // Закрытие мобильного меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Плавная прокрутка к секциям
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Учитываем высоту навигации
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Анимации при скролле
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);
        
        // Наблюдаем за элементами с data-aos
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // Обработка формы
    function initFormHandling() {
        const form = document.querySelector('.contact-form');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Получаем данные формы
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Простая валидация
                if (!data.name || !data.email || !data.service || !data.message) {
                    showNotification('Пожалуйста, заполните все поля', 'error');
                    return;
                }
                
                // Имитация отправки
                showNotification('Заявка отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
                form.reset();
            });
        }
    }
    
    // Создание частиц в фоне
    function initParticles() {
        const particlesContainer = document.querySelector('.particles');
        
        if (particlesContainer) {
            // Создаем дополнительные частицы
            for (let i = 0; i < 20; i++) {
                createParticle(particlesContainer);
            }
        }
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
        `;
        
        container.appendChild(particle);
    }
    
    // Анимация счетчиков
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent);
                    const duration = 2000; // 2 секунды
                    const step = target / (duration / 16); // 60 FPS
                    let current = 0;
                    
                    const timer = setInterval(function() {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
                    }, 16);
                    
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
    
    // Уведомления
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Стили для уведомления
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Цвета в зависимости от типа
        if (type === 'success') {
            notification.style.background = '#10b981';
        } else if (type === 'error') {
            notification.style.background = '#ef4444';
        } else {
            notification.style.background = '#3b82f6';
        }
        
        document.body.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Скрываем через 5 секунд
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    // Дополнительные анимации для кнопок
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function() {
            // Эффект пульсации при клике
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Анимация для карточек услуг
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Параллакс эффект для фона
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.particles');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Анимация для технологий
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('tech-animate');
    });
    
    // Обработка кликов по плавающим карточкам
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        card.addEventListener('click', function() {
            const service = this.querySelector('span').textContent;
            showNotification(`Вы выбрали услугу: ${service}`, 'info');
            
            // Плавная прокрутка к секции услуг
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Добавляем курсор pointer
        card.style.cursor = 'pointer';
    });
    
    // Обработка кликов по карточкам решений
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Не срабатывает при клике на ссылки
            if (e.target.closest('.solution-link')) {
                return;
            }
            
            const title = this.querySelector('h3').textContent;
            showNotification(`Подробнее о проекте: ${title}`, 'info');
        });
    });
    
    // Обработка ссылок в карточках решений
    const solutionLinks = document.querySelectorAll('.solution-link');
    solutionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Проверяем, есть ли реальная ссылка
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const linkType = this.textContent.trim();
                const projectTitle = this.closest('.solution-card').querySelector('h3').textContent;
                showNotification(`Переход к ${linkType} проекта: ${projectTitle}`, 'success');
                
                // Открываем ссылку в новой вкладке
                window.open(href, '_blank');
            } else {
                // Если ссылка не указана, показываем уведомление
                const projectTitle = this.closest('.solution-card').querySelector('h3').textContent;
                showNotification(`Ссылка для проекта "${projectTitle}" пока не добавлена`, 'info');
            }
        });
    });
    
    // Добавляем CSS анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .tech-animate {
            animation: techFloat 0.6s ease forwards;
            opacity: 0;
            transform: translateY(20px);
        }
        
        @keyframes techFloat {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        /* Дополнительные анимации */
        @keyframes rainbow-text {
            0% { color: #ff0000; }
            16.666% { color: #ff8000; }
            33.333% { color: #ffff00; }
            50% { color: #00ff00; }
            66.666% { color: #0080ff; }
            83.333% { color: #8000ff; }
            100% { color: #ff0000; }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        .shake-animation {
            animation: shake 0.5s ease-in-out;
        }
        
        .heartbeat-animation {
            animation: heartbeat 1s ease-in-out;
        }
        
        .rainbow-text {
            animation: rainbow-text 3s linear infinite;
        }
    `;
    document.head.appendChild(style);
    
    // Инициализация ленивой загрузки изображений (если будут добавлены)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Добавляем эффект печатания для заголовка
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Запускаем эффект печатания для подзаголовка
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        setTimeout(() => {
            const originalText = heroSubtitle.textContent;
            typeWriter(heroSubtitle, originalText, 50);
        }, 2000);
    }
    
    // Интерактивные анимации
    function addInteractiveAnimations() {
        // Анимация при клике на элементы
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('service-card') || 
                e.target.closest('.service-card')) {
                const card = e.target.closest('.service-card');
                card.classList.add('shake-animation');
                setTimeout(() => card.classList.remove('shake-animation'), 500);
            }
        });
        
        // Анимация при наведении на заголовки
        const titles = document.querySelectorAll('h1, h2, h3');
        titles.forEach(title => {
            title.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
                this.style.transform = 'scale(1.05)';
            });
            
            title.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Анимация для иконок при клике
        const icons = document.querySelectorAll('.service-icon i, .contact-icon i');
        icons.forEach(icon => {
            icon.addEventListener('click', function() {
                this.classList.add('heartbeat-animation');
                setTimeout(() => this.classList.remove('heartbeat-animation'), 1000);
            });
        });
        
        // Случайные анимации для плавающих карточек
        setInterval(() => {
            const cards = document.querySelectorAll('.floating-card');
            const randomCard = cards[Math.floor(Math.random() * cards.length)];
            randomCard.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                randomCard.style.transform = '';
            }, 500);
        }, 3000);
        
        // Анимация для кнопок при фокусе
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('focus', function() {
                this.classList.add('rainbow-text');
            });
            
            button.addEventListener('blur', function() {
                this.classList.remove('rainbow-text');
            });
        });
        
        // Анимация для полей формы
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    }
    
    // Запускаем интерактивные анимации
    addInteractiveAnimations();
    
    console.log('IT Solutions website initialized successfully! 🚀');
});

// Добавляем глобальные функции для внешнего использования
window.ITSolutions = {
    showNotification: function(message, type) {
        // Функция для показа уведомлений извне
        const notification = document.createElement('div');
        notification.className = `notification notification-${type || 'info'}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    },
    
    scrollToSection: function(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}; 