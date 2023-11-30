(function () {
    // Маска для телефона
    $('#phone').mask('+7 999 999 99 99');

    // Устанавливаем курсор после 4 символа в инпуте - "+7 ("
    $('#phone').on('click', function () {
        let that = this;

        // Задержка нужна для корректной работы во всех браузерах
        setTimeout(function () {
            that.selectionStart = that.selectionEnd = 4;
        }, 0);
    });

    // Конвертируем введенное число во float при потере фокуса
    $('#turnover').on('blur', function () {
        const num = parseFloat(this.value);
        this.value = isNaN(num) ? '' : num.toFixed(2);
    });

    $('#form').on('submit', (event) => {
        event.preventDefault();

        let isFormValid = true;

        $('#form :input').each(function () {
            const id = $(this).attr('id');
            const value = $(this).val();

            const validRes = validateField(id, value);

            if (!validRes.isValid) {
                isFormValid = false;
                setError($(this), validRes);
            } else {
                setError($(this));
            }
        });

        if (isFormValid) {
            createNotify();
        }
    });

    const validateRules = [
        {id: 'name', required: true, pattern: /.+/},
        {id: 'email', required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/},
        {id: 'phone', required: true, pattern: /^\+7 \d{3} \d{3} \d{2} \d{2}$/},
        {id: 'turnover', required: true, pattern: /^-?\d+(\.\d+)?$/},
        {id: 'industry', required: true},
    ];

    function validateField(id, value) {
        const rule = validateRules.find(item => item.id === id);

        if (!rule) return {isValid: true};

        if (rule.required && value.trim() === '') {
            return {
                isValid: false,
                error: 'Это поле обязательно для заполнения'
            };
        }

        if (rule.pattern && !rule.pattern.test(value)) {
            return {
                isValid: false,
                error: 'Неверный формат данных'
            };
        }

        return {
            isValid: true
        };
    }

    function setError(field, status = null) {
        const errorClass = 'form__input--invalid';
        const errorEl = field.next();
        const errorMessage = status ? status.error : '';

        if (status && !status.isValid) {
            field.addClass(errorClass);
        } else {
            field.removeClass(errorClass);
        }

        errorEl.text(errorMessage);
    }

    function createNotify() {
        const notify = $('<div>', {
            'class': 'notify notify--success',
            'text': 'Спасибо! Ваша заявка принята!',
            'click': function () {
                notify.remove();
            }
        });

        setTimeout(() => {
            notify.remove();
        }, 3000)

        $('#notify').append(notify);
    }

})();
