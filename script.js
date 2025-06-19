// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Login Modal
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');

loginBtn?.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
    setTimeout(() => {
        document.querySelector('#loginModal > div').classList.remove('scale-95', 'opacity-0');
    }, 10);
});

closeLoginModal.addEventListener('click', () => {
    document.querySelector('#loginModal > div').classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        loginModal.classList.add('hidden');
    }, 300);
});

// Mobile menu items - in case you want to add click handlers
const mobileMenuItems = document.querySelectorAll('#mobileMenu a');
mobileMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Booking Steps Navigation
const nextStep1 = document.getElementById('nextStep1');
const nextStep2 = document.getElementById('nextStep2');
const nextStep3 = document.getElementById('nextStep3');
const nextStep4 = document.getElementById('nextStep4');

const backStep2 = document.getElementById('backStep2');
const backStep3 = document.getElementById('backStep3');
const backStep4 = document.getElementById('backStep4');
const backStep5 = document.getElementById('backStep5');

const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const step4 = document.getElementById('step4');
const step5 = document.getElementById('step5');
const step6 = document.getElementById('step6');

nextStep1?.addEventListener('click', () => {
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
});

nextStep2?.addEventListener('click', () => {
    step2.classList.add('hidden');
    step3.classList.remove('hidden');
});

nextStep3?.addEventListener('click', () => {
    step3.classList.add('hidden');
    step4.classList.remove('hidden');
});

nextStep4?.addEventListener('click', () => {
    // Validate form
    const nameInput = document.getElementById('customerName');
    const emailInput = document.getElementById('customerEmail');
    const phoneInput = document.getElementById('customerPhone');
    const policyCheck = document.getElementById('policyCheck');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    
    let isValid = true;
    
    if (!nameInput.value.trim()) {
        nameError.classList.remove('hidden');
        nameInput.classList.add('input-error');
        isValid = false;
    } else {
        nameError.classList.add('hidden');
        nameInput.classList.remove('input-error');
    }
    
    if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
        emailError.classList.remove('hidden');
        emailInput.classList.add('input-error');
        isValid = false;
    } else {
        emailError.classList.add('hidden');
        emailInput.classList.remove('input-error');
    }
    
    if (!phoneInput.value.trim() || phoneInput.value.length < 11) {
        phoneError.classList.remove('hidden');
        phoneInput.classList.add('input-error');
        isValid = false;
    } else {
        phoneError.classList.add('hidden');
        phoneInput.classList.remove('input-error');
    }
    
    if (!policyCheck.checked) {
        policyCheck.classList.add('input-error');
        isValid = false;
    } else {
        policyCheck.classList.remove('input-error');
    }
    
    if (isValid) {
        step4.classList.add('hidden');
        step5.classList.remove('hidden');
    }
});

backStep2?.addEventListener('click', () => {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
});

backStep3?.addEventListener('click', () => {
    step3.classList.add('hidden');
    step2.classList.remove('hidden');
});

backStep4?.addEventListener('click', () => {
    step4.classList.add('hidden');
    step3.classList.remove('hidden');
});

backStep5?.addEventListener('click', () => {
    step5.classList.add('hidden');
    step4.classList.remove('hidden');
});

// Simulate payment processing
const confirmPayment = document.getElementById('confirmPayment');
const paymentText = document.getElementById('paymentText');
const paymentLoader = document.getElementById('paymentLoader');

confirmPayment?.addEventListener('click', () => {
    paymentText.classList.add('hidden');
    paymentLoader.classList.remove('hidden');
    
    setTimeout(() => {
        step5.classList.add('hidden');
        step6.classList.remove('hidden');
    }, 2000);
});

// Book Now buttons trigger the booking section
const bookNowBtn = document.getElementById('bookNowBtn');
const heroBookBtn = document.getElementById('heroBookBtn');
const bookingSection = document.getElementById('booking');

const scrollToBooking = () => {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
    
    // Auto-select the first service
    setTimeout(() => {
        const serviceItems = document.querySelectorAll('.service-card');
        if (serviceItems.length > 0) {
            serviceItems[0].click();
        }
    }, 1000);
};

bookNowBtn?.addEventListener('click', scrollToBooking);
heroBookBtn?.addEventListener('click', scrollToBooking);

// Service selection
const serviceItems = document.querySelectorAll('.service-card');
serviceItems.forEach(item => {
    item.addEventListener('click', function() {
        serviceItems.forEach(i => i.classList.remove('selected-service'));
        this.classList.add('selected-service');
    });
});