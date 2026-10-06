// ---- Hero Slideshow ----
let slides = document.querySelectorAll('.slide');
let current = 0;
if (slides.length) {
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 5000);
}

// ---- Mobile Menu ----
function toggleMenu() {
    document.querySelector('nav').classList.toggle('open');
}

// ---- Booking Modal ----
function bookNow() {
    document.getElementById('bookingModal').style.display = 'block';
}
function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}
function submitBooking(e) {
    e.preventDefault();
    alert('✅ Booking confirmed! We will email you shortly.');
    closeModal();
}

// ---- Availability Check ----
function checkAvailability(e) {
    e.preventDefault();
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    if (new Date(checkout) <= new Date(checkin)) {
        alert('⚠️ Check-out date must be after check-in.');
        return;
    }
    alert('🔎 Searching availability... We found rooms for you!');
}

// ---- Newsletter ----
function subscribe(e) {
    e.preventDefault();
    alert('📩 Thank you for subscribing to Restoreland!');
    e.target.reset();
}

// ---- Scroll to Rooms ----
function scrollToRooms() {
    document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
}

// ---- Back to Top ----
window.addEventListener('scroll', () => {
    document.getElementById('backToTop').style.display =
        window.scrollY > 400 ? 'block' : 'none';
});
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
// ---- Animated Stats Counter (runs when visible) ----
const counters = document.querySelectorAll('.counter');
const speed = 200;

function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = target / speed;
    const update = () => {
        count += increment;
        if (count < target) {
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(update);
        } else {
            counter.innerText = target + '+';
        }
    };
    update();
}

// Trigger when stats section enters viewport
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(animateCounter);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    observer.observe(statsSection);
}
// ===== CONTACT FORM VALIDATION =====
function sendMessage(e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');
    const status = document.getElementById('formStatus');

    // Reset errors
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
    document.querySelectorAll('.error').forEach(e => e.textContent = '');
    status.textContent = '';

    let valid = true;

    if (name.value.trim().length < 2) {
        showError('name', 'Please enter your full name.');
        valid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        showError('email', 'Please enter a valid email address.');
        valid = false;
    }
    if (!subject.value) {
        showError('subject', 'Please choose a subject.');
        valid = false;
    }
    if (message.value.trim().length < 10) {
        showError('message', 'Message must be at least 10 characters.');
        valid = false;
    }
    if (!consent.checked) {
        status.textContent = '⚠️ Please agree to be contacted.';
        status.style.color = '#e74c3c';
        valid = false;
    }

    if (!valid) return false;

    // Simulate send
    status.textContent = '✅ Thank you! Your message has been sent. We will reply shortly.';
    status.style.color = '#27ae60';
    document.getElementById('contactForm').reset();
    return false;
}

function showError(fieldId, msg) {
    const input = document.getElementById(fieldId);
    const group = input.closest('.form-group');
    group.classList.add('error');
    const errorSpan = group.querySelector('.error');
    if (errorSpan) errorSpan.textContent = msg;
}

// ===== FAQ TOGGLE =====
function toggleFaq(btn) {
    const item = btn.parentElement;
    // Close others (optional)
    document.querySelectorAll('.faq-item').forEach(i => {
        if (i !== item) i.classList.remove('open');
    });
    item.classList.toggle('open');
}
// ===== MENU TABS =====
function showMenu(panelId, btn) {
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(panelId).classList.add('active');
    btn.classList.add('active');
}

// ===== TABLE RESERVATION =====
function reserveTable(e) {
    e.preventDefault();
    const form = document.getElementById('reservationForm');
    const status = document.getElementById('resStatus');

    // Reset errors
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
    form.querySelectorAll('.error').forEach(el => el.textContent = '');
    status.textContent = '';

    let valid = true;
    const check = (id, condition, msg) => {
        if (!condition) {
            const input = document.getElementById(id);
            const group = input.closest('.form-group');
            group.classList.add('error');
            group.querySelector('.error').textContent = msg;
            valid = false;
        }
    };

    const name = document.getElementById('resName').value.trim();
    const email = document.getElementById('resEmail').value.trim();
    const phone = document.getElementById('resPhone').value.trim();
    const restaurant = document.getElementById('resRestaurant').value;
    const date = document.getElementById('resDate').value;
    const time = document.getElementById('resTime').value;
    const guests = document.getElementById('resGuests').value;

    check('resName', name.length >= 2, 'Please enter your name.');
    check('resEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 'Enter a valid email.');
    check('resPhone', phone.length >= 7, 'Enter a valid phone.');
    check('resRestaurant', restaurant, 'Choose a restaurant.');
    check('resDate', date, 'Choose a date.');
    check('resTime', time, 'Choose a time.');
    check('resGuests', guests, 'Select number of guests.');

    if (!valid) return false;

    status.textContent = `✅ Table reserved at ${restaurant} for ${guests} guest(s) on ${date} at ${time}. Confirmation sent to ${email}.`;
    status.style.color = '#27ae60';
    form.reset();
    return false;
}

// ===== SCROLL TO RESERVATION =====
function scrollToReservation() {
    document.querySelector('.reservation-section').scrollIntoView({ behavior: 'smooth' });
}
// ===== OFFER FILTER =====
function filterOffers(category, btn) {
    const cards = document.querySelectorAll('.offer-card');
    const noOffers = document.getElementById('noOffers');
    let visible = 0;

    cards.forEach(card => {
        const match = category === 'all' || card.dataset.category === category;
        card.style.display = match ? 'flex' : 'none';
        if (match) visible++;
    });

    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    noOffers.style.display = visible === 0 ? 'block' : 'none';
}

// ===== COUNTDOWN TIMER =====
// Set target: 7 days from page load (or set a fixed date)
function startCountdown(targetDate) {
    const target = new Date(targetDate).getTime();

    function update() {
        const now = new Date().getTime();
        const diff = target - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

// Start countdown to a fixed date (example: 31 Dec 2026)
if (document.getElementById('countdown')) {
    startCountdown('2026-12-31T23:59:59');
}

// ===== JOIN REWARDS =====
function joinRewards() {
    alert('🎉 Welcome to Restoreland Rewards! Check your email for details.');
}
// ===== ROOM FILTER =====
function filterRooms(category, btn) {
    const cards = document.querySelectorAll('.room-card');
    const noRooms = document.getElementById('noRooms');
    let visible = 0;

    cards.forEach(card => {
        const match = category === 'all' || card.dataset.category === category;
        card.style.display = match ? 'flex' : 'none';
        if (match) visible++;
    });

    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    noRooms.style.display = visible === 0 ? 'block' : 'none';
}

// ===== ROOM DETAILS MODAL =====
let currentRoom = { name: '', price: 0 };

function openRoomModal(name, price, img, desc) {
    currentRoom = { name, price };
    document.getElementById('modalTitle').textContent = name;
    document.getElementById('modalPrice').textContent = 'KSh ' + price.toLocaleString();
    document.getElementById('modalImg').src = img;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('roomModal').style.display = 'block';
}

function closeRoomModal() {
    document.getElementById('roomModal').style.display = 'none';
}

function bookRoom() {
    closeRoomModal();
    document.getElementById('bookingRoom').value = currentRoom.name;
    document.getElementById('bookingModal').style.display = 'block';
}

// ===== CLOSE MODALS WHEN CLICKING OUTSIDE =====
window.addEventListener('click', (e) => {
    const roomModal = document.getElementById('roomModal');
    const bookingModal = document.getElementById('bookingModal');
    if (e.target === roomModal) closeRoomModal();
    if (e.target === bookingModal) closeModal();
});
!function (v) { v.fn.floatingWhatsApp = function (e) { var t, a, i = v.extend({ phone: "", message: "", size: "72px", backgroundColor: "#25D366", position: "left", popupMessage: "", showPopup: !1, showOnIE: !0, autoOpenTimeout: 0, headerColor: "#128C7E", headerTitle: "WhatsApp Chat", zIndex: 0, buttonImage: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 800 800" width="800" height="800"><defs><clipPath id="_clipPath_A3g8G5hPEGG2L0B6hFCxamU4cc8rfqzQ"><rect width="800" height="800"/></clipPath></defs><g clip-path="url(#_clipPath_A3g8G5hPEGG2L0B6hFCxamU4cc8rfqzQ)"><g><path d=" M 787.59 800 L 12.41 800 C 5.556 800 0 793.332 0 785.108 L 0 14.892 C 0 6.667 5.556 0 12.41 0 L 787.59 0 C 794.444 0 800 6.667 800 14.892 L 800 785.108 C 800 793.332 794.444 800 787.59 800 Z " fill="rgb(37,211,102)"/></g><g><path d=" M 508.558 450.429 C 502.67 447.483 473.723 433.24 468.325 431.273 C 462.929 429.308 459.003 428.328 455.078 434.22 C 451.153 440.114 439.869 453.377 436.434 457.307 C 433 461.236 429.565 461.729 423.677 458.78 C 417.79 455.834 398.818 449.617 376.328 429.556 C 358.825 413.943 347.008 394.663 343.574 388.768 C 340.139 382.873 343.207 379.687 346.155 376.752 C 348.804 374.113 352.044 369.874 354.987 366.436 C 357.931 362.999 358.912 360.541 360.875 356.614 C 362.837 352.683 361.857 349.246 360.383 346.299 C 358.912 343.352 347.136 314.369 342.231 302.579 C 337.451 291.099 332.597 292.654 328.983 292.472 C 325.552 292.301 321.622 292.265 317.698 292.265 C 313.773 292.265 307.394 293.739 301.996 299.632 C 296.6 305.527 281.389 319.772 281.389 348.752 C 281.389 377.735 302.487 405.731 305.431 409.661 C 308.376 413.592 346.949 473.062 406.015 498.566 C 420.062 504.634 431.03 508.256 439.581 510.969 C 453.685 515.451 466.521 514.818 476.666 513.302 C 487.978 511.613 511.502 499.06 516.409 485.307 C 521.315 471.55 521.315 459.762 519.842 457.307 C 518.371 454.851 514.446 453.377 508.558 450.429 Z  M 401.126 597.117 L 401.047 597.117 C 365.902 597.104 331.431 587.661 301.36 569.817 L 294.208 565.572 L 220.08 585.017 L 239.866 512.743 L 235.21 505.332 C 215.604 474.149 205.248 438.108 205.264 401.1 C 205.307 293.113 293.17 205.257 401.204 205.257 C 453.518 205.275 502.693 225.674 539.673 262.696 C 576.651 299.716 597.004 348.925 596.983 401.258 C 596.939 509.254 509.078 597.117 401.126 597.117 Z  M 567.816 234.565 C 523.327 190.024 464.161 165.484 401.124 165.458 C 271.24 165.458 165.529 271.161 165.477 401.085 C 165.46 442.617 176.311 483.154 196.932 518.892 L 163.502 641 L 288.421 608.232 C 322.839 627.005 361.591 636.901 401.03 636.913 L 401.126 636.913 L 401.127 636.913 C 530.998 636.913 636.717 531.2 636.77 401.274 C 636.794 338.309 612.306 279.105 567.816 234.565" fill-rule="evenodd" fill="rgb(255,255,255)"/></g></g></svg>' }, e), o = (t = !1, a = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) && (t = !0), t); this.addClass("floating-wpp"); var n, s = v(document.createElement("div")), p = v(document.createElement("div")), l = v(document.createElement("div")), c = v(document.createElement("div")), d = v(document.createElement("div")), m = v(document.createElement("div")), r = v(document.createElement("div")); if (p.addClass("floating-wpp-button-image"), s.addClass("floating-wpp-button").append(v(i.buttonImage)).css({ width: i.size, height: i.size, "background-color": i.backgroundColor }), (!(0 <= (n = window.navigator.userAgent).indexOf("MSIE") || n.match(/Trident.*rv\:11\./)) || i.showOnIE) && s.append(p).appendTo(this), s.on("click", function () { o && i.showPopup ? u() : C() }), i.showPopup) { var g = v(document.createElement("textarea")), h = v(document.createElement("strong")), w = v('<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 20 18" width="20" height="18"><defs><clipPath id="_clipPath_fgX00hLzP9PnAfCkGQoSPsYB7aEGkj1G"><rect width="20" height="18"/></clipPath></defs><g clip-path="url(#_clipPath_fgX00hLzP9PnAfCkGQoSPsYB7aEGkj1G)"><path d=" M 0 0 L 0 7.813 L 16 9 L 0 10.188 L 0 18 L 20 9 L 0 0 Z " fill="rgb(46,46,46)"/></g></svg>'); function u() { l.hasClass("active") || (l.addClass("active"), g.focus()) } l.addClass("floating-wpp-popup"), c.addClass("floating-wpp-head"), d.addClass("floating-wpp-message"), r.addClass("floating-wpp-input-message"), m.addClass("floating-wpp-btn-send"), d.text(i.popupMessage), g.val(i.message), i.popupMessage || d.hide(), c.append("<span>" + i.headerTitle + "</span>", h).css("background-color", i.headerColor), m.append(w), r.append(g, m), h.addClass("close").html("&times;"), l.append(c, d, r).appendTo(this), d.click(function () { }), h.click(function () { }), c.click(function () { l.removeClass("active") }), g.keypress(function (e) { i.message = v(this).val(), 13 != e.keyCode || e.shiftKey || o || (e.preventDefault(), m.click()) }), m.click(function () { i.message = g.val(), C() }), this.mouseenter(function () { u() }), 0 < i.autoOpenTimeout && setTimeout(function () { u() }, i.autoOpenTimeout) } function C() { var e = "http://"; e += o ? "api" : "web", e += ".whatsapp.com/send?phone=" + i.phone + "&text=" + encodeURI(i.message), window.open(e) } i.zIndex && v(this).css("z-index", i.zIndex), "right" === i.position && (this.css({ left: "auto", right: "15px" }), l.css("right", "0")) } }(jQuery);