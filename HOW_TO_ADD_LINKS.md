# Как добавить реальные ссылки на проекты

## 🚀 Быстрый старт

1. **Откройте файл `index.html`**
2. **Найдите раздел "Готовые решения"** (примерно строка 230)
3. **Замените `href="#"` на реальные ссылки**

## 📝 Примеры ссылок

### Для веб-сайтов:
```html
<a href="https://your-website.com" target="_blank" class="solution-link">
    <i class="fas fa-external-link-alt"></i> Демо
</a>
```

### Для GitHub:
```html
<a href="https://github.com/yourusername/project-name" target="_blank" class="solution-link">
    <i class="fab fa-github"></i> Код
</a>
```

### Для Telegram ботов:
```html
<a href="https://t.me/your_bot_username" target="_blank" class="solution-link">
    <i class="fab fa-telegram"></i> Бот
</a>
```

### Для мобильных приложений:
```html
<a href="https://apps.apple.com/app/your-app" target="_blank" class="solution-link">
    <i class="fab fa-apple"></i> App Store
</a>
<a href="https://play.google.com/store/apps/details?id=com.yourapp" target="_blank" class="solution-link">
    <i class="fab fa-google-play"></i> Google Play
</a>
```

## 🎯 Типы ссылок для разных проектов

| Тип проекта | Демо ссылка | Код ссылка |
|-------------|-------------|------------|
| Веб-сайт | `https://your-site.com` | `https://github.com/username/project` |
| Telegram бот | `https://t.me/your_bot` | `https://github.com/username/bot` |
| Мобильное приложение | App Store/Google Play | `https://github.com/username/app` |
| Автоматизация | Документация/видео | `https://github.com/username/script` |
| Дашборд | `https://your-dashboard.com` | `https://github.com/username/dashboard` |

## ⚙️ Важные атрибуты

- `target="_blank"` - открывает ссылку в новой вкладке
- `rel="noopener noreferrer"` - для безопасности (опционально)

## 🔧 Если у вас нет реальных проектов

Можно использовать:
- **Демо-версии** на временных доменах
- **Скриншоты/видео** проектов
- **Описания** с деталями реализации
- **Ссылки на портфолио** с примерами работ

## 📱 Пример полной карточки с реальными ссылками

```html
<div class="solution-card" data-aos="flip-up">
    <div class="solution-image">
        <div class="solution-overlay">
            <div class="solution-links">
                <a href="https://my-website-demo.com" target="_blank" class="solution-link">
                    <i class="fas fa-external-link-alt"></i> Демо
                </a>
                <a href="https://github.com/myusername/my-website" target="_blank" class="solution-link">
                    <i class="fab fa-github"></i> Код
                </a>
            </div>
        </div>
        <div class="solution-category">Веб-сайт</div>
    </div>
    <div class="solution-content">
        <h3>Мой реальный проект</h3>
        <p>Описание вашего реального проекта</p>
        <div class="solution-tech">
            <span class="tech-tag">React</span>
            <span class="tech-tag">Node.js</span>
        </div>
    </div>
</div>
```

## ✅ Проверка

После добавления ссылок:
1. Сохраните файл
2. Обновите страницу в браузере
3. Нажмите на ссылки в карточках
4. Убедитесь, что они открываются в новой вкладке

## 🎨 Дополнительные иконки

Если нужно изменить иконки:
- `fa-external-link-alt` - внешняя ссылка
- `fa-github` - GitHub
- `fa-telegram` - Telegram
- `fa-apple` - App Store
- `fa-google-play` - Google Play
- `fa-file-alt` - документация
- `fa-chart-line` - дашборд
- `fa-video` - видео демо 