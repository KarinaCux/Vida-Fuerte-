const topicSelect = document.getElementById("topic");
const langSelect = document.getElementById("lang");
const orgList = document.getElementById("orgList");
const scriptBox = document.getElementById("scriptBox");
const copyBtn = document.getElementById("copyBtn");
// In a real app, this would come from an API or database
// ORGS should have: name, url, topic, and notes (1-2 sentences about what they do or offer)
const ORGS = [
  {
    name: "AIDS Healthcare Foundation (AHF)",
    url: "https://www.aidshealth.org/",
    topic: "hiv",
    notes:
      "Provides HIV/AIDS medical care, prevention, and advocacy focused on underserved communities."
  },

  {
    name: "American Society of Addiction Medicine (ASAM)",
    url: "https://www.asam.org/",
    topic: "access",
    notes:
      "Addiction medicine education, advocacy, and clinical resources to improve access to treatment and care."
  },

  {
    name: "NHeLP (National Health Law Program)",
    url: "https://healthlaw.org/",
    topic: "access",
    notes: "Legal + policy support for Medicaid access and health equity."
  },

  {
    name: "Black Mamas Matter Alliance",
    url: "https://blackmamasmatter.org/",
    topic: "maternal",
    notes: "Maternal health equity and advocacy for Black communities."
  },

  {
    name: "Informed Immigrant",
    url: "https://www.informedimmigrant.com/",
    topic: "immigrant",
    notes: "Know-your-rights + immigrant resources and guidance."
  },

 
  {
    name: "Painted Brain, Inc.",
    url: "https://www.paintedbrain.org/",
    topic: "mental",
    notes:
      "Uses art and media to build community and mental health awareness; promotes recovery and social change."
  },

  {
    name: "NAMI (Mental Health)",
    url: "https://www.nami.org/",
    topic: "mental",
    notes: "Support, education, and local chapters for mental health."
  },

  {
    name: "Disability Rights California",
    url: "https://www.disabilityrightsca.org/",
    topic: "disability",
    notes: "Accessibility + disability legal rights in California."
  },

  {
    name: "Deaf Queer Resource Center",
    url: "https://www.deafqueer.org/",
    topic: "disability",
    notes: "Work focus: Health — Deaf / Hearing Impaired community resources and support."
  },

  {
    name: "Special Olympics Southern California, Inc.",
    url: "https://sosc.org/",
    topic: "disability",
    notes:
      "Sports training + competition for children and adults with intellectual disabilities; fosters fitness, courage, and friendship."
  }
];

function getScript(topic, lang) {
  const scripts = {
    en: {
      access: `Hi — my name is ____ and I live in ____.

I’m having trouble accessing healthcare (cost / insurance / long wait times / language access). This disproportionately impacts communities like mine.

Can you share:
1) Any low-cost or sliding-scale clinics near me
2) Steps to keep or regain coverage
3) A way to report barriers (language, discrimination, delays)

Thank you for the work you do.`,

      hiv: `Hi — my name is ____ and I live in ____.

I’m reaching out because access to HIV/AIDS prevention and treatment services is critical in my community, especially for underserved populations.

I’m looking for:
1) HIV testing and treatment resources near me
2) Prevention services (PrEP, education)
3) Advocacy opportunities to support equitable healthcare access

Thank you for your work supporting community health.`,

      immigrant: `Hi — my name is ____ and I live in ____.

I’m looking for immigrant-friendly healthcare resources and language-access support. Do you have:
1) Clinics/providers that offer interpretation
2) Know-your-rights guidance for care
3) Resources for people without insurance

Thank you.`,

      mental: `Hi — my name is ____ and I live in ____.

I’m trying to find mental health support that is affordable and culturally responsive. Can you share:
1) Local resources or hotlines
2) Low-cost counseling options
3) How to find providers who offer language access

Thank you.`,

      maternal: `Hi — my name is ____ and I live in ____.

I’m looking for maternal/reproductive health resources that are accessible and respectful. Can you share:
1) Low-cost care options
2) Patient rights and complaint resources
3) Community support programs

Thank you.`,

      disability: `Hi — my name is ____ and I live in ____.

I’m seeking accessible healthcare and disability-related support. Can you share:
1) Rights/resources for accessibility accommodations
2) Places to report barriers
3) Providers or clinics that are accessibility-friendly

Thank you.`
    },

    es: {
      access: `Hola — me llamo ____ y vivo en ____.

Estoy teniendo dificultades para acceder a servicios de salud (costo / seguro / largas esperas / idioma). Esto afecta de forma desproporcionada a comunidades como la mía.

¿Podrían compartir:
1) Clínicas de bajo costo o con tarifa ajustable cerca de mí
2) Pasos para mantener o recuperar cobertura
3) Una forma de reportar barreras (idioma, discriminación, demoras)

Gracias por su trabajo.`,

      hiv: `Hola — me llamo ____ y vivo en ____.

Me comunico porque el acceso a servicios de prevención y tratamiento del VIH/SIDA es fundamental en mi comunidad, especialmente para poblaciones desatendidas.

Busco:
1) Recursos locales para pruebas y tratamiento del VIH
2) Servicios de prevención (PrEP, educación)
3) Oportunidades de abogacía para apoyar el acceso equitativo a la salud

Gracias por su trabajo en favor de la salud comunitaria.`,

      immigrant: `Hola — me llamo ____ y vivo en ____.

Busco recursos de salud para inmigrantes y apoyo de acceso al idioma. ¿Tienen:
1) Clínicas/proveedores que ofrezcan interpretación
2) Guía de “conoce tus derechos” para recibir atención
3) Recursos para personas sin seguro

Gracias.`,

      mental: `Hola — me llamo ____ y vivo en ____.

Estoy buscando apoyo de salud mental que sea accesible y culturalmente respetuoso. ¿Podrían compartir:
1) Recursos locales o líneas de ayuda
2) Opciones de consejería de bajo costo
3) Cómo encontrar proveedores con acceso al idioma

Gracias.`,

      maternal: `Hola — me llamo ____ y vivo en ____.

Busco recursos de salud materna/reproductiva que sean accesibles y respetuosos. ¿Podrían compartir:
1) Opciones de atención de bajo costo
2) Derechos del paciente y cómo presentar quejas
3) Programas de apoyo comunitario

Gracias.`,

      disability: `Hola — me llamo ____ y vivo en ____.

Busco atención médica accesible y apoyo relacionado con discapacidad. ¿Podrían compartir:
1) Derechos/recursos para adaptaciones de accesibilidad
2) Dónde reportar barreras
3) Clínicas o proveedores con accesibilidad

Gracias.`
    }
  };

  // If user selects "All topics", default to access
  if (topic === "all") topic = "access";

  // If dropdown doesn't include HIV but org filter does, still be safe:
  if (!scripts[lang]) lang = "en";
  return (scripts[lang][topic] || scripts[lang].access);
}

function renderOrgs() {
  const t = topicSelect.value;
  const filtered = t === "all" ? ORGS : ORGS.filter((o) => o.topic === t);

  orgList.innerHTML = "";
  filtered.forEach((o) => {
    const item = document.createElement("div");
    item.className = "org-item";
    item.setAttribute("role", "listitem");
    item.innerHTML = `
      <a href="${o.url}" target="_blank" rel="noopener noreferrer"><b>${o.name}</b></a>
      <div class="small">${o.notes}</div>
    `;
    orgList.appendChild(item);
  });
}

function updateScript() {
  scriptBox.value = getScript(topicSelect.value, langSelect.value);
}

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(scriptBox.value);
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy message"), 900);
  } catch {
    alert("Copy failed — you can manually select and copy the text.");
  }
});

topicSelect.addEventListener("change", () => {
  renderOrgs();
  updateScript();
});

if (langSelect) {
  langSelect.addEventListener("change", updateScript);
}


renderOrgs();
updateScript();
