describe('Автотесты для системы ProfTeam (Вариант 4)', () => {

  const baseUrl = 'https://dev.profteam.su';

  // ==========================================
  // 1. МОДУЛЬ АВТОРИЗАЦИИ
  // ==========================================
  describe('Модуль Авторизация', () => {
      beforeEach(() => {
          cy.log('Переход на страницу входа');
          cy.visit(`${baseUrl}/login`);
      });

      it('Позитивный сценарий: Успешная авторизация', () => {
          cy.log('Ввод корректных учетных данных');
          cy.get('input[name="username"]').type('testerStudent'); // Замени локатор логина
          cy.get('input[name="password"]').type('Password1');     // Замени локатор пароля
          
          cy.log('Клик по кнопке Войти');
          cy.get('button[type="submit"]').click();                // Замени локатор кнопки

          cy.log('Проверка успешного входа (переход в профиль)');
          cy.url().should('include', '/profile');
          // Проверяем, что на странице появилось имя пользователя
          cy.get('.profile-user-name').should('contain', 'testerStudent'); // Замени локатор
      });

      it('Негативный сценарий: Ввод неверного пароля', () => {
          cy.log('Ввод неверного пароля');
          cy.get('input[name="username"]').type('testerStudent');
          cy.get('input[name="password"]').type('WrongPass123!');
          cy.get('button[type="submit"]').click();

          cy.log('Проверка появления сообщения об ошибке');
          // Проверяем, что элемент с ошибкой существует и видим
          cy.get('.error-message').should('be.visible');           // Замени локатор ошибки
      });
  });

  // ==========================================
  // 2. МОДУЛЬ РЕГИСТРАЦИИ И РОЛЕЙ
  // ==========================================
  describe('Модуль Регистрация', () => {
      beforeEach(() => {
          cy.visit(`${baseUrl}/register`);
      });

      it('Позитивный сценарий: Успешная регистрация', () => {
          // Генерируем уникальное имя, чтобы тест не падал при повторном запуске
          const uniqueUser = `student_${Date.now()}`; 

          cy.get('input[name="email"]').type(`${uniqueUser}@test.ru`);
          cy.get('input[name="username"]').type(uniqueUser);
          cy.get('input[name="password"]').type('Password123!');
          cy.get('input[name="password_confirmation"]').type('Password123!');
          cy.get('button[type="submit"]').click();

          cy.log('Проверка сообщения об успешной регистрации');
          cy.get('.success-message').should('be.visible');         // Замени локатор
      });

      it('Негативный сценарий: Регистрация с уже занятым логином', () => {
          cy.get('input[name="email"]').type('testerStudent@test.ru');
          cy.get('input[name="username"]').type('testerStudent'); // Используем логин из задания
          cy.get('input[name="password"]').type('Password123!');
          cy.get('input[name="password_confirmation"]').type('Password123!');
          cy.get('button[type="submit"]').click();

          cy.log('Проверка сообщения об ошибке уникальности');
          cy.get('.field-error').should('contain', 'уже существует'); // Замени локатор
      });

      it('Позитивный сценарий: Добавление роли студента', () => {
          // Сначала логинимся под тестовым аккаунтом
          cy.visit(`${baseUrl}/login`);
          cy.get('input[name="username"]').type('testerStudent');
          cy.get('input[name="password"]').type('Password1');
          cy.get('button[type="submit"]').click();

          cy.log('Переход в настройки ролей');
          cy.visit(`${baseUrl}/profile/roles`);

          cy.log('Выбор и добавление роли "Студент"');
          cy.get('button.add-role-student').click();               // Замени локатор кнопки добавления
          
          cy.log('Проверка успешного добавления роли');
          cy.get('.active-roles-list').should('contain', 'Студент'); // Замени локатор списка ролей
      });
  });

  // ==========================================
  // 3. МОДУЛЬ ЗАЯВОК (Роль Работодателя и УЗ)
  // ==========================================
  describe('Модуль Заявки', () => {
      beforeEach(() => {
          // Логинимся перед каждой подачей заявки
          cy.visit(`${baseUrl}/login`);
          cy.get('input[name="username"]').type('testerStudent');
          cy.get('input[name="password"]').type('Password1');
          cy.get('button[type="submit"]').click();
          cy.wait(1000); // Небольшое ожидание загрузки сессии
          cy.visit(`${baseUrl}/requests/new`); // URL страницы создания заявки (уточни на сайте)
      });

      it('Позитивный сценарий: Подача заявки на роль Работодателя', () => {
          cy.log('Заполнение формы работодателя');
          cy.get('select[name="role_type"]').select('Работодатель'); // Выбор из выпадающего списка
          cy.get('input[name="company_name"]').type('ООО Технологии');
          cy.get('input[name="inn"]').type('1234567890');
          cy.get('button.submit-request').click();

          cy.log('Проверка успешной отправки заявки');
          cy.get('.alert-success').should('contain', 'Заявка отправлена'); 
      });

      it('Негативный сценарий: Отправка пустой заявки', () => {
          cy.log('Попытка отправить пустую форму');
          cy.get('select[name="role_type"]').select('Работодатель');
          cy.get('button.submit-request').click();

          cy.log('Проверка срабатывания валидации полей');
          cy.get('.validation-error').should('be.visible'); // Проверяем, что поля подсветились красным
      });

      it('Позитивный сценарий: Подача заявки на Учебное заведение', () => {
          cy.log('Заполнение формы учебного заведения');
          cy.get('select[name="role_type"]').select('Учебное заведение');
          cy.get('input[name="institution_name"]').type('Политехнический Университет');
          cy.get('button.submit-request').click();

          cy.log('Проверка успешной отправки заявки');
          cy.get('.alert-success').should('contain', 'Заявка отправлена');
      });
  });

  // ==========================================
  // 4. МОДУЛЬ ЛИЧНЫЙ КАБИНЕТ (УВЕДОМЛЕНИЯ)
  // ==========================================
  describe('Модуль Личный кабинет: Уведомления', () => {
      beforeEach(() => {
          cy.visit(`${baseUrl}/login`);
          cy.get('input[name="username"]').type('testerStudent');
          cy.get('input[name="password"]').type('Password1');
          cy.get('button[type="submit"]').click();
      });

      it('Позитивный сценарий: Просмотр списка уведомлений', () => {
          cy.log('Переход в раздел уведомлений');
          cy.visit(`${baseUrl}/profile/notifications`); // Уточни URL уведомлений
          
          cy.log('Проверка отображения списка');
          cy.get('.notifications-list').should('be.visible'); // Контейнер с уведомлениями
      });

      it('Позитивный сценарий: Прочтение уведомления', () => {
          cy.visit(`${baseUrl}/profile/notifications`);
          
          cy.log('Клик по первому непрочитанному уведомлению');
          // Находим первое уведомление с классом "непрочитано" и кликаем
          cy.get('.notification-item.unread').first().click(); 

          cy.log('Проверка, что статус изменился');
          // После клика класс "unread" должен исчезнуть
          cy.get('.notification-item').first().should('not.have.class', 'unread');
      });

      it('Негативный сценарий: Попытка открыть несуществующее уведомление', () => {
          cy.log('Переход по прямому URL на ID несуществующего уведомления');
          cy.visit(`${baseUrl}/profile/notifications/999999999`, { failOnStatusCode: false });
          
          cy.log('Проверка отображения заглушки "Не найдено"');
          // Сервер должен вернуть страницу 404 или текст об ошибке
          cy.get('body').should('contain', 'не найдено');
      });
  });
});