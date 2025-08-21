// Telegram Mini App JavaScript
let tg = window.Telegram.WebApp;

// Инициализация Telegram Web App
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем Telegram Web App
    tg.ready();
    
    // Настраиваем тему
    setupTheme();
    
    // Настраиваем главную кнопку
    setupMainButton();
    
    // Инициализируем анимации
    initAnimations();
    
    // Настраиваем обработчики событий
    setupEventHandlers();
});

// Настройка темы
function setupTheme() {
    // Применяем тему Telegram
    document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#000000');
    document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#999999');
    document.documentElement.style.setProperty('--tg-theme-link-color', tg.themeParams.link_color || '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', tg.themeParams.secondary_bg_color || '#f1f1f1');
}

// Настройка главной кнопки
function setupMainButton() {
    tg.MainButton.setText('Начать проект');
    tg.MainButton.onClick(function() {
        startProject();
    });
}

// Инициализация анимаций
function initAnimations() {
    // Анимация появления элементов
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Наблюдаем за карточками
    document.querySelectorAll('.service-card, .solution-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Настройка обработчиков событий
function setupEventHandlers() {
    // Обработка скролла для главной кнопки
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }
    });
}

// Данные услуг
const servicesData = {
    website: {
        title: 'Создание сайтов',
        description: 'Современные веб-сайты с адаптивным дизайном, SEO-оптимизацией и высокой производительностью. Создаем сайты любой сложности от лендингов до крупных порталов.',
        features: [
            'Адаптивный дизайн для всех устройств',
            'SEO-оптимизация для поисковых систем',
            'Быстрая загрузка и высокая производительность',
            'CMS система для управления контентом',
            'Интеграция с CRM и аналитикой',
            'Техническая поддержка и обновления'
        ],
        price: 'от 50,000 ₽'
    },
    bot: {
        title: 'Telegram боты',
        description: 'Умные боты для автоматизации коммуникации, продаж и обслуживания клиентов. Интеграция с платежными системами и внешними сервисами.',
        features: [
            'Автоматические ответы и обработка запросов',
            'Интеграция с платежными системами',
            'Система геолокации и доставки',
            'Реферальная система и промокоды',
            'Аналитика и отчеты',
            'Интеграция с CRM и базами данных'
        ],
        price: 'от 30,000 ₽'
    },
    automation: {
        title: 'Автоматизация',
        description: 'Автоматизация рутинных процессов для повышения эффективности бизнеса. Скрипты, API интеграции и планировщики задач.',
        features: [
            'Автоматические скрипты и макросы',
            'API интеграции с внешними сервисами',
            'Планировщики задач и отчетов',
            'Мониторинг систем и уведомления',
            'Обработка данных и аналитика',
            'Интеграция с облачными сервисами'
        ],
        price: 'от 25,000 ₽'
    },
    servers: {
        title: 'Обслуживание серверов',
        description: 'Профессиональное обслуживание серверов и рабочих мест для стабильной работы. Мониторинг, резервное копирование и безопасность.',
        features: [
            'Мониторинг серверов и сервисов',
            'Резервное копирование данных',
            'Настройка безопасности и файрволов',
            'Регулярные обновления и патчи',
            'Техническая поддержка 24/7',
            'Оптимизация производительности'
        ],
        price: 'от 15,000 ₽/мес'
    },
    office: {
        title: 'Обслуживание орг.техники',
        description: 'Комплексное обслуживание и ремонт оргтехники для бесперебойной работы офиса. Принтеры, МФУ, сканеры и заправка картриджей.',
        features: [
            'Обслуживание принтеров и МФУ',
            'Ремонт сканеров и копиров',
            'Заправка и восстановление картриджей',
            'Профилактическое обслуживание',
            'Поставка расходных материалов',
            'Выезд специалиста на место'
        ],
        price: 'от 5,000 ₽/мес'
    },
    crypto: {
        title: 'Crypto услуги',
        description: 'Комплексные услуги в сфере криптовалют и майнинга для вашего бизнеса. Безопасные сделки и профессиональные консультации.',
        features: [
            'Покупка и продажа USDT',
            'Продажа майнингового оборудования',
            'Консультации по криптовалютам',
            'Безопасные сделки и эскроу',
            'Техническая поддержка',
            'Обучение и консультации'
        ],
        price: 'По договоренности'
    }
};

// Показать информацию об услуге
function showService(serviceType) {
    const service = servicesData[serviceType];
    if (!service) return;

    // Заполняем модальное окно
    document.getElementById('modalTitle').textContent = service.title;
    document.getElementById('modalDescription').textContent = service.description;
    document.getElementById('modalPrice').textContent = service.price;

    // Заполняем список функций
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    service.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    // Показываем модальное окно
    const modal = document.getElementById('serviceModal');
    modal.classList.add('show');

    // Показываем главную кнопку
    tg.MainButton.setText('Заказать ' + service.title);
    tg.MainButton.show();

    // Отправляем аналитику
    tg.sendData(JSON.stringify({
        action: 'view_service',
        service: serviceType
    }));
}

// Закрыть модальное окно
function closeModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('show');
    
    // Скрываем главную кнопку
    tg.MainButton.hide();
}

// Связаться с нами
function contactUs() {
    // Открываем чат с поддержкой
    tg.openTelegramLink('https://t.me/itsolutions_support');
    
    // Отправляем аналитику
    tg.sendData(JSON.stringify({
        action: 'contact_us',
        method: 'telegram'
    }));
}

// Начать проект
function startProject() {
    // Показываем форму заказа или переходим к чату
    const modal = document.getElementById('serviceModal');
    if (modal.classList.contains('show')) {
        // Если открыто модальное окно с услугой
        orderService();
    } else {
        // Иначе открываем чат для обсуждения проекта
        tg.openTelegramLink('https://t.me/itsolutions_support?start=project');
        
        // Отправляем аналитику
        tg.sendData(JSON.stringify({
            action: 'start_project',
            source: 'main_button'
        }));
    }
}

// Заказать услугу
function orderService() {
    const modalTitle = document.getElementById('modalTitle').textContent;
    
    // Открываем чат с указанием услуги
    tg.openTelegramLink(`https://t.me/itsolutions_support?start=order_${modalTitle.toLowerCase().replace(/\s+/g, '_')}`);
    
    // Закрываем модальное окно
    closeModal();
    
    // Отправляем аналитику
    tg.sendData(JSON.stringify({
        action: 'order_service',
        service: modalTitle
    }));
}

// Обработка кликов по карточкам решений
document.addEventListener('click', function(e) {
    if (e.target.closest('.solution-card')) {
        const card = e.target.closest('.solution-card');
        const title = card.querySelector('h3').textContent;
        
        // Отправляем аналитику
        tg.sendData(JSON.stringify({
            action: 'view_solution',
            solution: title
        }));
        
        // Показываем уведомление
        tg.showAlert(`Подробнее о проекте: ${title}`);
    }
});

// Обработка скролла для плавной прокрутки
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация счетчиков
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
        }, 16);
    });
}

// Запускаем анимацию счетчиков при появлении
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

document.querySelector('.hero-stats').forEach(stat => {
    statsObserver.observe(stat);
});

// Обработка закрытия модального окна по клику вне его
document.getElementById('serviceModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Обработка клавиши Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Отправка аналитики при загрузке
tg.sendData(JSON.stringify({
    action: 'app_opened',
    user_id: tg.initDataUnsafe?.user?.id,
    platform: tg.platform
}));

console.log('Telegram Mini App initialized successfully! 🚀'); 