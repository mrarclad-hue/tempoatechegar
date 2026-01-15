const datePiaui = new Date(2026, 2, 1, 8, 0, 0); 
const dateCaxias = new Date(2026, 3, 12, 8, 0, 0);

document.getElementById('piaui-target-date').innerText = datePiaui.toLocaleString('pt-BR');
document.getElementById('caxias-target-date').innerText = dateCaxias.toLocaleString('pt-BR');

function calculateAndDisplayTimer(targetDate, prefix) {
    const now = new Date();
    const diffInMs = targetDate - now;
    const timerContainer = document.getElementById(`${prefix}-timer`);

    if (diffInMs <= 0) {
        timerContainer.innerHTML = "<h3>As inscrições ou o concurso já começaram!</h3>";
        timerContainer.classList.add('expired');
        return;
    }

    let totalSeconds = Math.floor(diffInMs / 1000);
    let totalMinutes = Math.floor(totalSeconds / 60);
    let totalHours = Math.floor(totalMinutes / 60);
    let totalDays = Math.floor(totalHours / 24);

    const months = Math.floor(totalDays / 30.44);
    const remainingDaysAfterMonths = Math.floor(totalDays % 30.44);

    const weeks = Math.floor(remainingDaysAfterMonths / 7);
    const days = remainingDaysAfterMonths % 7;

    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    document.getElementById(`${prefix}-months`).innerText = months.toString().padStart(2, '0');
    document.getElementById(`${prefix}-weeks`).innerText = weeks.toString().padStart(2, '0');
    document.getElementById(`${prefix}-days`).innerText = days.toString().padStart(2, '0');
    document.getElementById(`${prefix}-hours`).innerText = hours.toString().padStart(2, '0');
    document.getElementById(`${prefix}-minutes`).innerText = minutes.toString().padStart(2, '0');
    document.getElementById(`${prefix}-seconds`).innerText = seconds.toString().padStart(2, '0');
}

function updateAllTimers() {
    const now = new Date();
    document.getElementById('today-date').innerText = now.toLocaleString('pt-BR');

    calculateAndDisplayTimer(datePiaui, 'piaui');
    calculateAndDisplayTimer(dateCaxias, 'caxias');
}

setInterval(updateAllTimers, 1000);
updateAllTimers();