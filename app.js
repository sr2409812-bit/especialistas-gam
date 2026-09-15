// ==========================================================================
// RED ESPECIALISTAS GAM — PERFORMANCE ENGINE (APP.JS)
// Multi-Vertical Lead Capture, Qualification & Dispatch Architecture
// ==========================================================================

const VERTICALS_CATALOG = {
  dental: {
    name: "Odontología Especializada",
    icon: "fa-tooth",
    heroTitle: "Especialistas en <span class='gradient-text'>Implantes & Estética Dental</span> en el GAM",
    heroSubtitle: "Conéctate directamente con clínicas odontológicas acreditadas en Escazú, Santa Ana, Curridabat y Sabana.",
    options: [
      { id: "implantes", title: "Implantes Dentales (Unitarios o Múltiples)", desc: "Reemplazo fijo y definitivo de piezas dentales perdidas" },
      { id: "estetica", title: "Diseño de Sonrisa & Carillas", desc: "Estética de alta gama, carillas de porcelana o resina" },
      { id: "ortodoncia", title: "Ortodoncia Invisible (Alineadores)", desc: "Corrección dental estética sin uso de brackets metálicos" },
      { id: "cordales", title: "Cirugía de Cordales / Maxilofacial", desc: "Extracción quirúrgica especializada con sedación disponible" }
    ]
  },
  mecanica: {
    name: "Cajas Automáticas & Diagnóstico",
    icon: "fa-gears",
    heroTitle: "Diagnóstico & Reparación de <span class='gradient-text'>Cajas Automáticas</span> en el GAM",
    heroSubtitle: "Talleres especializados con escáner computarizado para transmisiones CVT, DSG, Tiptronic y secuenciales.",
    options: [
      { id: "caja_reparacion", title: "Reparación General de Caja Automática", desc: "Solución a patinados, golpes al cambiar marcha o pérdida de tracción" },
      { id: "diagnostico_scanner", title: "Escaneo Computarizado & Fallas de Sensores", desc: "Diagnóstico electrónico con scanner oficial de la marca" },
      { id: "mantenimiento_atf", title: "Mantenimiento Preventivo & Cambio ATF/CVT", desc: "Reemplazo de fluido sintético y filtros de transmisión" },
      { id: "motor_inyeccion", title: "Reparación de Motor & Sistema de Inyección", desc: "Overhaul, calibración de inyectores y pérdida de potencia" }
    ]
  },
  veterinaria: {
    name: "Veterinarias & Urgencias 24H",
    icon: "fa-paw",
    heroTitle: "Hospitales Veterinarios con <span class='gradient-text'>Atención de Urgencias 24/7</span>",
    heroSubtitle: "Atención inmediata para perros y gatos con infraestructura de internamiento, quirófano y laboratorio.",
    options: [
      { id: "urgencia_critica", title: "Emergencia Médica Inmediata", desc: "Intoxicación, dificultad respiratoria, hemorragias o convulsiones" },
      { id: "cirugia_trauma", title: "Cirugía Especializada & Traumatología", desc: "Cirugías de tejidos blandos, fracturas o cesáreas de urgencia" },
      { id: "hospitalizacion_24h", title: "Hospitalización con Monitoreo 24 Horas", desc: "Cuidado intensivo con médico de guardia permanente" },
      { id: "diagnostico_imagen", title: "Estudios de Rayos X & Ultrasonido Urgente", desc: "Diagnóstico por imágenes para diagnóstico rápido" }
    ]
  },
  mudanzas: {
    name: "Mudanzas & Transporte Seguro",
    icon: "fa-truck-moving",
    heroTitle: "Servicio de <span class='gradient-text'>Mudanzas Seguras</span> en el GAM",
    heroSubtitle: "Camiones cerrados, personal de carga y protección especial para casas, condominios y oficinas.",
    options: [
      { id: "mudanza_casa", title: "Mudanza Residencial Completa", desc: "Traslado de casa completa con protección de muebles y línea blanca" },
      { id: "mudanza_condominio", title: "Traslado en Condominio / Torre", desc: "Cumplimiento de pólizas, horarios y uso de ascensores de carga" },
      { id: "mudanza_oficina", title: "Mudanza Corporativa / Oficinas", desc: "Mobiliario de oficina, servidores y archivos confidenciales" },
      { id: "transporte_express", title: "Flete Express de Muebles Pesados", desc: "Transporte rápido para 1 a 3 artículos de gran tamaño" }
    ]
  },
  hogar: {
    name: "Plomería & Fontanería Industrial",
    icon: "fa-wrench",
    heroTitle: "Fontaneros & <span class='gradient-text'>Destape de Cañerías Urgente</span>",
    heroSubtitle: "Técnicos certificados con sonda eléctrica y detección de fugas sin romper en el GAM.",
    options: [
      { id: "destape_sonda", title: "Destape de Cañerías con Sonda Eléctrica", desc: "Fregaderos, inodoros, cajas de registro y aguas negras" },
      { id: "fugas_ocultas", title: "Detección de Fugas de Agua Ocultas", desc: "Geófono y ultrasonido para hallar fugas sin dañar pisos" },
      { id: "bombas_tanques", title: "Instalación de Bombas de Agua & Tanques", desc: "Sistemas hidroneumáticos, presurizadores y tanques de reserva" },
      { id: "techos_canoas", title: "Reparación de Techos, Goteras & Canoas", desc: "Sellado de filtraciones urgentes y mantenimiento de bajantes" }
    ]
  }
};

// Application State
const state = {
  currentStep: 1,
  vertical: null,
  serviceId: null,
  serviceTitle: null,
  customNote: "",
  zone: null,
  urgency: null,
  leadName: "",
  leadPhone: ""
};

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  checkUrlParams();
});

// Check if incoming traffic has ?cat= parameter from Google Ads
function checkUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const cat = urlParams.get("cat");
  if (cat && VERTICALS_CATALOG[cat]) {
    selectVertical(cat);
  }
}

// Step 1: Select Vertical
function selectVertical(verticalKey) {
  state.vertical = verticalKey;
  const config = VERTICALS_CATALOG[verticalKey];

  // Update dynamic hero title & subtitle
  document.getElementById("dynamicTitle").innerHTML = config.heroTitle;
  document.getElementById("dynamicSubtitle").innerText = config.heroSubtitle;

  // Populate Step 2 options dynamically
  const container = document.getElementById("step2Options");
  container.innerHTML = "";

  config.options.forEach((opt, idx) => {
    const box = document.createElement("div");
    box.className = "option-box";
    box.onclick = () => selectServiceOption(box, opt.id, opt.title);
    box.innerHTML = `
      <div class="option-radio"></div>
      <div class="option-text">
        <h4>${opt.title}</h4>
        <p>${opt.desc}</p>
      </div>
    `;
    container.appendChild(box);
  });

  goToStep(2);
}

// Step 2: Select specific option
function selectServiceOption(element, optId, optTitle) {
  document.querySelectorAll(".option-box").forEach(b => b.classList.remove("selected"));
  element.classList.add("selected");
  state.serviceId = optId;
  state.serviceTitle = optTitle;
  document.getElementById("btnStep2Next").disabled = false;
}

// Step 3: Location & Urgency selection
function selectZone(element, zoneName) {
  document.querySelectorAll("#zoneChips .chip").forEach(c => c.classList.remove("selected"));
  element.classList.add("selected");
  state.zone = zoneName;
  validateStep3();
}

function selectUrgency(element, urgencyName) {
  document.querySelectorAll("#urgencyChips .chip").forEach(c => c.classList.remove("selected"));
  element.classList.add("selected");
  state.urgency = urgencyName;
  validateStep3();
}

function validateStep3() {
  const isValid = Boolean(state.zone && state.urgency);
  document.getElementById("btnStep3Next").disabled = !isValid;
}

// Phone formatting for Costa Rica (XXXX XXXX)
function formatPhoneCR(input) {
  let val = input.value.replace(/\D/g, "");
  if (val.length > 8) val = val.substring(0, 8);
  if (val.length > 4) {
    input.value = val.substring(0, 4) + " " + val.substring(4);
  } else {
    input.value = val;
  }
}

// Navigation between steps
function goToStep(stepNumber) {
  state.currentStep = stepNumber;

  // Hide all views
  document.querySelectorAll(".funnel-step-view").forEach(v => v.classList.remove("active"));

  // Show target view
  const targetView = document.getElementById(`step${stepNumber}View`);
  if (targetView) targetView.classList.add("active");

  // Update progress bar
  updateProgressBar(stepNumber);

  // Scroll to funnel card
  document.querySelector(".funnel-card").scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateProgressBar(current) {
  for (let i = 1; i <= 4; i++) {
    const indicator = document.getElementById(`stepIndicator${i}`);
    if (!indicator) continue;

    indicator.classList.remove("active", "completed");
    if (i < current) {
      indicator.classList.add("completed");
    } else if (i === current) {
      indicator.classList.add("active");
    }
  }

  for (let l = 1; l <= 3; l++) {
    const line = document.getElementById(`line${l}`);
    if (!line) continue;
    if (l < current) {
      line.classList.add("filled");
    } else {
      line.classList.remove("filled");
    }
  }
}

// Step 4: Submit Lead
function submitLead() {
  const nameInput = document.getElementById("leadName");
  const phoneInput = document.getElementById("leadPhone");
  const customNote = document.getElementById("customNoteInput").value.trim();

  const rawPhone = phoneInput.value.replace(/\D/g, "");

  if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
    alert("Por favor ingresa tu nombre completo para personalizar tu cotización.");
    nameInput.focus();
    return;
  }

  if (rawPhone.length < 8) {
    alert("Por favor ingresa un número de WhatsApp válido de Costa Rica (8 dígitos).");
    phoneInput.focus();
    return;
  }

  state.leadName = nameInput.value.trim();
  state.leadPhone = "+506 " + phoneInput.value.trim();
  state.customNote = customNote || "Sin comentarios adicionales";

  // Build Lead Record
  const leadId = "LEAD-" + Date.now().toString().slice(-6);
  const timestamp = new Date().toLocaleString("es-CR", { timeZone: "America/Costa_Rica" });

  const leadData = {
    id: leadId,
    timestamp: timestamp,
    vertical: VERTICALS_CATALOG[state.vertical].name,
    service: state.serviceTitle,
    zone: state.zone,
    urgency: state.urgency,
    note: state.customNote,
    name: state.leadName,
    phone: state.leadPhone,
    status: "QUALIFIED_HOT"
  };

  // Persist locally
  const savedLeads = JSON.parse(localStorage.getItem("gam_leads") || "[]");
  savedLeads.unshift(leadData);
  localStorage.setItem("gam_leads", JSON.stringify(savedLeads));

  // Render Confirmation Screen
  renderSuccessScreen(leadData);

  // Show Success View
  document.querySelectorAll(".funnel-step-view").forEach(v => v.classList.remove("active"));
  document.getElementById("stepSuccessView").classList.add("active");
  document.querySelector(".funnel-card").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSuccessScreen(lead) {
  const summaryContainer = document.getElementById("leadSummaryCard");
  summaryContainer.innerHTML = `
    <div class="summary-row">
      <span class="summary-label">Servicio Solicitado:</span>
      <span class="summary-val">${lead.service}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Zona de Preferencia:</span>
      <span class="summary-val">${lead.zone}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Urgencia:</span>
      <span class="summary-val">${lead.urgency}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Contacto Registrado:</span>
      <span class="summary-val">${lead.name} (${lead.phone})</span>
    </div>
  `;

  // Build B2B WhatsApp Lead Drop Text
  const b2bText = `🔔 NUEVA SOLICITUD DE CLIENTE CALIFICADO (RED ESPECIALISTAS GAM)
--------------------------------------------------
• Código: ${lead.id}
• Categoría: ${lead.vertical}
• Requerimiento: ${lead.service}
• Zona: ${lead.zone}
• Urgencia: ${lead.urgency}
• Detalle del caso: ${lead.note}
• Contacto directo: ${lead.name}
• WhatsApp: ${lead.phone}
--------------------------------------------------
👉 Prospecto entregado para atención y cotización inmediata.`;

  document.getElementById("b2bDropPreview").innerText = b2bText;
}

function copyLeadDrop() {
  const text = document.getElementById("b2bDropPreview").innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector(".btn-copy");
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-check"></i> ¡Copiado para WhatsApp!`;
    btn.style.background = "#10b981";
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = "var(--accent-blue)";
    }, 2500);
  });
}

function resetFunnel() {
  state.currentStep = 1;
  state.vertical = null;
  state.serviceId = null;
  state.serviceTitle = null;
  state.zone = null;
  state.urgency = null;
  document.getElementById("leadName").value = "";
  document.getElementById("leadPhone").value = "";
  document.getElementById("customNoteInput").value = "";
  goToStep(1);
}
