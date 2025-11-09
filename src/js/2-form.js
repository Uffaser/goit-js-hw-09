const feedbackFormEl = document.querySelector('.feedback-form');

function loadFromLS(key) {
    const stringifyData = localStorage.getItem(key);

    try {
        const value = JSON.parse(stringifyData);
        return value;
    } catch {
        return stringifyData;
    }
}

const formData = {
    email: '',
    message: '',
};

formData.email = loadFromLS('feedback-form-state')?.email || '';
formData.message = loadFromLS('feedback-form-state')?.message || '';

feedbackFormEl.elements.email.value = formData.email;
feedbackFormEl.elements.message.value = formData.message;

feedbackFormEl.addEventListener('input', e => {
    if (e.target.closest('[type=email]')) {
        formData.email = e.target.value;
    }

    if (e.target.closest('[name=message]')) {
        formData.message = e.target.value.trim();
    }

    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

feedbackFormEl.addEventListener('submit', e => {
    e.preventDefault();

    if (formData.email === '' || formData.message === '') {
        alert('Fill please all fields');
    } else {
        console.log(formData);
        formData.email = '';
        formData.message = '';
        localStorage.removeItem('feedback-form-state');
        feedbackFormEl.reset();
    }
});
