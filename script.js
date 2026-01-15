// --- Configuração das Datas ---
// Lembre-se: Mês em JS começa em 0 (Janeiro = 0, Dezembro = 11)

// Data para o Piauí (Exemplo: 01 de Março de 2026)
const datePiaui = new Date(2026, 2, 17,08, 00, 0); 

// Data para Caxias (Exemplo: 12 de Abril de 2026)
const dateCaxias = new Date(2026, 3, 12, 8, 0, 0);


// --- Inicialização da Tela ---
// Exibe as datas finais formatadas nos respectivos locais
document.getElementById('piaui-target-date').innerText = datePiaui.toLocaleString('pt-BR');
document.getElementById('caxias-target-date').innerText = dateCaxias.toLocaleString('pt-BR');


// --- Função Reutilizável de Cálculo ---
/**
 * Calcula a diferença e atualiza o HTML baseado em um prefixo.
 * @param {Date} targetDate - A data final do concurso.
 * @param {string} prefix - O prefixo do ID HTML (ex: 'piaui' ou 'caxias').
 */
function calculateAndDisplayTimer(targetDate, prefix) {
    const now = new Date();
    const diffInMs = targetDate - now;
    const timerContainer = document.getElementById(`${prefix}-timer`);

    if (diffInMs <= 0) {
        timerContainer.innerHTML = "<h3>As inscrições ou o concurso já começaram!</h3>";
        // Opcional: adicionar uma classe CSS para destacar que acabou
        timerContainer.classList.add('expired');
        return;
    }

    // Cálculos matemáticos de tempo
    let totalSeconds = Math.floor(diffInMs / 1000);
    let totalMinutes = Math.floor(totalSeconds / 60);
    let totalHours = Math.floor(totalMinutes / 60);
    let totalDays = Math.floor(totalHours / 24);

    // Cálculo aproximado de meses (média de 30.44 dias)
    const months = Math.floor(totalDays / 30.44);
    const remainingDaysAfterMonths = Math.floor(totalDays % 30.44);

    // Cálculo de semanas e dias restantes
    const weeks = Math.floor(remainingDaysAfterMonths / 7);
    const days = remainingDaysAfterMonths % 7;

    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    // Atualização do DOM usando Template Literals para selecionar os IDs corretos
    // O padStart(2, '0') garante que números menores que 10 tenham um zero à esquerda (ex: 09)
    document.getElementById(`${prefix}-months`).innerText = months.toString().padStart(2, '0');
    document.getElementById(`${prefix}-weeks`).innerText = weeks.toString().padStart(2, '0');
    document.getElementById(`${prefix}-days`).innerText = days.toString().padStart(2, '0');
    document.getElementById(`${prefix}-hours`).innerText = hours.toString().padStart(2, '0');
    document.getElementById(`${prefix}-minutes`).innerText = minutes.toString().padStart(2, '0');
    document.getElementById(`${prefix}-seconds`).innerText = seconds.toString().padStart(2, '0');
}


// --- Função Principal de Atualização ---
function updateAllTimers() {
    const now = new Date();
    // Atualiza a data de hoje geral no rodapé
    document.getElementById('today-date').innerText = now.toLocaleString('pt-BR');

    // Chama a função de cálculo para cada concurso individualmente
    calculateAndDisplayTimer(datePiaui, 'piaui');
    calculateAndDisplayTimer(dateCaxias, 'caxias');
}

// Inicia o intervalo de 1 segundo
setInterval(updateAllTimers, 1000);

// Chamada imediata para evitar delay na primeira carga
updateAllTimers();