import { L } from "./site.mjs";

// Blog articles. Written from CodeGurex's verifiable experience; no invented prices,
// client results or statistics. Block types: ["p", text] ["h2", text] ["ul", [items]]
// ["ol", [items]] ["code", language, source] ["note", text] ["links", [[serviceOrWorkId, kind]]]

export const AUTHOR = {
  name: "Jose Alejandro Gutierrez Guerrero",
  role: L("CEO y fundador de CodeGurex", "CEO & Founder, CodeGurex"),
};

export const ARTICLES = [
  {
    id: "choose-software-company",
    slug: L("como-elegir-empresa-desarrollo-software-ecuador", "how-to-choose-a-software-development-company"),
    title: L("Cómo elegir una empresa de software en Ecuador", "How to choose a software development company"),
    h1: L(
      "Cómo elegir una empresa de desarrollo de software en Ecuador: 9 preguntas antes de firmar",
      "How to choose a software development company: 9 questions to ask before you sign",
    ),
    description: L(
      "Nueve preguntas para elegir una empresa de desarrollo de software en Ecuador: propiedad del código, seguridad, pruebas, soporte y señales de alerta.",
      "Nine questions to ask before hiring a software development company: code ownership, security, testing, support and the red flags to watch for.",
    ),
    published: "2026-11-15",
    topic: L("Desarrollo de software", "Software development"),
    related: [["service", "web-applications"], ["service", "saas-development"], ["work", "crm"]],
    body: [
      ["p", L(
        "Contratar software a medida es una decisión cara de revertir. Si el proveedor desaparece, si el código no es tuyo o si el sistema no protege los datos de tus clientes, el problema aparece meses después, cuando ya dependes de él. Estas son las preguntas que haríamos nosotros si estuviéramos del otro lado de la mesa.",
        "Commissioning custom software is an expensive decision to undo. If the provider disappears, if the code is not yours or if the system does not protect your customers' data, the problem shows up months later, when you already depend on it. These are the questions we would ask if we were on the other side of the table.",
      )],
      ["h2", L("1. ¿Han construido algo parecido y lo puedo ver?", "1. Have you built something similar, and can I see it?")],
      ["p", L(
        "Pide proyectos en uso, no capturas sueltas. Una demo pública, un sitio en producción o un repositorio dicen más que un logotipo en una presentación. Pregunta también qué parte hizo exactamente la empresa: no es lo mismo diseñar una pantalla que construir la base de datos, los permisos y el despliegue.",
        "Ask for projects in use, not loose screenshots. A public demo, a live site or a repository says more than a logo on a slide. Also ask what exactly the company built: designing a screen is not the same as building the database, the permissions and the deployment.",
      )],
      ["h2", L("2. ¿El código y las cuentas quedan a mi nombre?", "2. Will the code and accounts be in my name?")],
      ["p", L(
        "El repositorio, el dominio, la cuenta de hosting y la base de datos deberían pertenecer a tu empresa desde el primer día. Si el proveedor es dueño de todo, cambiar de equipo será casi imposible. Pídelo por escrito en la propuesta.",
        "The repository, domain, hosting account and database should belong to your company from day one. If the provider owns everything, changing teams will be almost impossible. Get it in writing in the proposal.",
      )],
      ["h2", L("3. ¿Cómo separan los datos de cada usuario o cliente?", "3. How do you separate each user's or customer's data?")],
      ["p", L(
        "Es la pregunta que más rápido distingue a un equipo con experiencia. La respuesta correcta no es “ocultamos los botones”: la autorización tiene que aplicarse en el servidor y, idealmente, en la propia base de datos, con mecanismos como Row Level Security en PostgreSQL. Si el sistema maneja datos de pacientes, ventas o pagos, esto no es opcional.",
        "This question separates experienced teams fastest. The right answer is not “we hide the buttons”: authorization must be enforced on the server and, ideally, in the database itself, with mechanisms such as Row Level Security in PostgreSQL. If the system handles patient, sales or payment data, this is not optional.",
      )],
      ["h2", L("4. ¿Qué pruebas hacen antes de publicar?", "4. What do you test before release?")],
      ["p", L(
        "Pregunta por pruebas automatizadas, no solo por “lo revisamos”. En proyectos serios se prueban los formularios, el inicio de sesión, los permisos y la accesibilidad, y esas pruebas se ejecutan cada vez que cambia el código.",
        "Ask about automated tests, not just “we check it”. Serious projects test forms, sign-in, permissions and accessibility, and those tests run every time the code changes.",
      )],
      ["h2", L("5. ¿Quién revisa la seguridad?", "5. Who reviews security?")],
      ["p", L(
        "Las cabeceras de seguridad, las contraseñas, los secretos y las dependencias desactualizadas son la causa de muchos incidentes. Una empresa que también hace evaluaciones de seguridad suele detectar estos fallos antes de publicar, porque sabe dónde buscarlos.",
        "Security headers, passwords, secrets and outdated dependencies cause many incidents. A company that also performs security assessments tends to catch these issues before release, because it knows where to look.",
      )],
      ["h2", L("6. ¿Cómo se divide el proyecto y cuándo veo avances?", "6. How is the project phased, and when do I see progress?")],
      ["p", L(
        "Desconfía de los proyectos que se entregan de una sola vez al final. Lo sano es trabajar por fases cortas, con un entorno de vista previa donde puedas probar y criterios de aceptación definidos antes de empezar cada fase.",
        "Be wary of projects delivered all at once at the end. A healthy project works in short phases, with a preview environment where you can test and acceptance criteria defined before each phase starts.",
      )],
      ["h2", L("7. ¿Qué pasa después de la entrega?", "7. What happens after delivery?")],
      ["p", L(
        "Todo sistema necesita ajustes cuando la gente empieza a usarlo. Pregunta por el soporte, por el tiempo de respuesta ante un fallo y por cómo se cobran las mejoras.",
        "Every system needs adjustments once people start using it. Ask about support, response time when something breaks and how improvements are billed.",
      )],
      ["h2", L("8. ¿Me explican las decisiones técnicas en lenguaje claro?", "8. Will you explain technical decisions in plain language?")],
      ["p", L(
        "No necesitas saber programar para tomar buenas decisiones, pero sí entender las opciones y sus costos. Si las respuestas siempre son vagas, la comunicación durante el proyecto también lo será.",
        "You do not need to code to make good decisions, but you do need to understand the options and their costs. If the answers are always vague, communication during the project will be too.",
      )],
      ["h2", L("9. ¿Qué no van a hacer?", "9. What will you not do?")],
      ["p", L(
        "Un buen proveedor sabe decir que no: que una función no vale la pena, que conviene usar una herramienta existente o que algo queda fuera del alcance. Esa honestidad suele ahorrar más dinero que cualquier descuento.",
        "A good provider knows how to say no: that a feature is not worth it, that an existing tool is a better fit or that something is out of scope. That honesty usually saves more money than any discount.",
      )],
      ["h2", L("Señales de alerta", "Red flags")],
      ["ul", [
        L("No pueden mostrar ningún proyecto en uso.", "They cannot show any project in use."),
        L("El código o el dominio quedan a nombre del proveedor.", "The code or domain stays in the provider's name."),
        L("No hay propuesta escrita con alcance y entregables.", "There is no written proposal with scope and deliverables."),
        L("Prometen “seguridad total” o resultados garantizados en Google.", "They promise “total security” or guaranteed Google rankings."),
        L("Piden contraseñas o accesos por chat sin un proceso definido.", "They ask for passwords or access over chat with no defined process."),
      ]],
      ["p", L(
        "En CodeGurex respondemos estas preguntas por escrito antes de empezar. Si estás evaluando un proyecto, podemos revisarlo contigo sin compromiso.",
        "At CodeGurex we answer these questions in writing before we start. If you are evaluating a project, we can review it with you, no strings attached.",
      )],
    ],
  },
  {
    id: "what-is-pentest",
    slug: L("que-es-un-pentest-web", "what-is-a-web-pentest"),
    title: L("Qué es un pentest web y cuándo lo necesitas", "What is a web pentest and when do you need one?"),
    h1: L("Qué es un pentest web y cuándo lo necesita tu empresa", "What is a web pentest, and when does your company need one?"),
    description: L(
      "Qué es un pentest web, en qué se diferencia de un escaneo automático, cómo es el proceso paso a paso, qué recibes al final y cuándo conviene hacerlo.",
      "What a web pentest is, how it differs from an automated scan, how the process works step by step, what you receive and when to schedule one.",
    ),
    published: "2026-11-15",
    topic: L("Ciberseguridad", "Cybersecurity"),
    related: [["service", "application-security"], ["service", "api-security"], ["work", "security-lab"]],
    body: [
      ["p", L(
        "Un pentest web —o prueba de penetración— es una evaluación autorizada en la que un especialista intenta encontrar fallos de seguridad explotables en tu aplicación, igual que lo haría un atacante, pero con permiso, con un alcance acordado y con el objetivo de que los corrijas antes de que alguien los aproveche.",
        "A web pentest — or penetration test — is an authorized assessment in which a specialist tries to find exploitable security flaws in your application the way an attacker would, but with permission, an agreed scope and the goal of having you fix them before anyone abuses them.",
      )],
      ["h2", L("Pentest no es lo mismo que un escaneo automático", "A pentest is not the same as an automated scan")],
      ["p", L(
        "Un escáner de vulnerabilidades revisa patrones conocidos y produce una lista larga, con muchos falsos positivos. Un pentest añade criterio humano: verifica qué hallazgos son reales, encadena fallos pequeños y, sobre todo, revisa la lógica de tu aplicación. Un escáner no sabe que un usuario no debería ver las facturas de otro; una persona sí.",
        "A vulnerability scanner checks known patterns and produces a long list with many false positives. A pentest adds human judgement: it verifies which findings are real, chains small issues together and, above all, reviews your application's logic. A scanner does not know that one user should not see another user's invoices; a person does.",
      )],
      ["h2", L("Qué se revisa en una aplicación web", "What gets reviewed in a web application")],
      ["ul", [
        L("Autenticación: inicio de sesión, recuperación de contraseña y doble factor.", "Authentication: sign-in, password recovery and multi-factor."),
        L("Sesiones: duración, cierre y robo de sesión.", "Sessions: lifetime, sign-out and session theft."),
        L("Control de acceso: si un usuario puede ver o modificar datos de otro cambiando un identificador.", "Access control: whether a user can view or change someone else's data by changing an identifier."),
        L("Validación de entradas: formularios, archivos subidos y parámetros.", "Input handling: forms, uploads and parameters."),
        L("Configuración: cabeceras de seguridad, HTTPS y errores que revelan información.", "Configuration: security headers, HTTPS and errors that leak information."),
        L("Dependencias y secretos expuestos.", "Dependencies and exposed secrets."),
      ]],
      ["p", L(
        "Como referencia se usan marcos públicos como OWASP Top 10 y OWASP ASVS, adaptados al alcance de cada proyecto.",
        "Public frameworks such as the OWASP Top 10 and OWASP ASVS are used as a reference, adapted to each project's scope.",
      )],
      ["h2", L("Cómo es el proceso", "How the process works")],
      ["ol", [
        L("Contexto: qué hace la aplicación, qué datos maneja y qué te preocupa.", "Context: what the application does, what data it handles and what worries you."),
        L("Alcance y autorización por escrito: qué se prueba, con qué cuentas y en qué ventana de tiempo.", "Scope and written authorization: what is tested, with which accounts and in which time window."),
        L("Evaluación: reconocimiento, pruebas manuales y verificación de cada hallazgo.", "Assessment: reconnaissance, manual testing and verification of every finding."),
        L("Priorización: cada fallo se ordena por exposición, impacto y esfuerzo de corrección.", "Prioritization: each flaw is ranked by exposure, impact and remediation effort."),
        L("Informe y, según el alcance, revalidación de las correcciones.", "Report and, depending on scope, revalidation of the fixes."),
      ]],
      ["h2", L("Qué recibes al final", "What you receive")],
      ["p", L(
        "Un informe útil no es un PDF de cien páginas. Para cada hallazgo debería incluir la evidencia, el componente afectado, la severidad, el impacto en el negocio y una recomendación concreta de corrección, además de un orden sugerido para atacarlos.",
        "A useful report is not a hundred-page PDF. For each finding it should include the evidence, the affected component, the severity, the business impact and a concrete fix, plus a suggested order for tackling them.",
      )],
      ["h2", L("Cuándo conviene hacerlo", "When to schedule one")],
      ["ul", [
        L("Antes de lanzar una aplicación que maneja datos de clientes, pacientes o pagos.", "Before launching an application that handles customer, patient or payment data."),
        L("Después de cambios grandes: nuevo sistema de inicio de sesión, nueva API, integración de IA.", "After major changes: a new sign-in system, a new API, an AI integration."),
        L("Cuando un cliente, inversionista o socio te pide evidencia de seguridad.", "When a customer, investor or partner asks for security evidence."),
        L("De forma periódica, si la aplicación es crítica para tu negocio.", "Periodically, if the application is critical to your business."),
      ]],
      ["note", L(
        "Un pentest solo se hace sobre sistemas propios o con autorización expresa del dueño. Probar sistemas ajenos sin permiso puede ser un delito.",
        "A pentest is only performed on systems you own or with the owner's explicit authorization. Testing other people's systems without permission can be a crime.",
      )],
    ],
  },
  {
    id: "supabase-rls",
    slug: L("row-level-security-supabase-saas", "supabase-row-level-security-saas"),
    title: L("Row Level Security en Supabase para un SaaS", "Supabase Row Level Security for multi-tenant SaaS"),
    h1: L(
      "Row Level Security en Supabase: cómo aislar los datos de cada cliente en un SaaS",
      "Supabase Row Level Security: how to isolate each customer's data in a SaaS",
    ),
    description: L(
      "Cómo usar Row Level Security en Supabase y PostgreSQL para que cada cliente de un SaaS vea solo sus datos, con políticas de ejemplo y cómo probarlas.",
      "How to use Row Level Security in Supabase and PostgreSQL so each SaaS customer only sees their own data, with example policies and how to test them.",
    ),
    published: "2026-11-15",
    topic: L("SaaS y bases de datos", "SaaS & databases"),
    related: [["service", "saas-development"], ["service", "api-security"], ["work", "prez"], ["work", "barbus"]],
    body: [
      ["p", L(
        "En un SaaS multi-tenant, muchas empresas comparten la misma base de datos. El error más grave que puede tener es que un cliente vea los datos de otro. En productos como BARBUS y PREZ resolvemos ese riesgo en la capa que no se puede saltar: la propia base de datos, con Row Level Security (RLS).",
        "In a multi-tenant SaaS, many companies share one database. The most serious bug it can have is one customer seeing another's data. In products such as BARBUS and PREZ we address that risk at the layer that cannot be bypassed: the database itself, using Row Level Security (RLS).",
      )],
      ["h2", L("Por qué no basta con filtrar en la aplicación", "Why filtering in the application is not enough")],
      ["p", L(
        "Si la única protección es un filtro en el código —“trae las citas de esta barbería”—, basta un endpoint olvidado o una consulta mal escrita para exponer todo. Con Supabase el riesgo es mayor, porque el navegador puede consultar la base de datos directamente a través de su API. Sin RLS, la clave pública da acceso a todas las filas.",
        "If the only protection is a filter in the code — “fetch this barbershop's appointments” — one forgotten endpoint or badly written query is enough to expose everything. With Supabase the risk is higher, because the browser can query the database directly through its API. Without RLS, the public key grants access to every row.",
      )],
      ["h2", L("El modelo: cada fila pertenece a una organización", "The model: every row belongs to an organization")],
      ["p", L(
        "La base es sencilla: cada tabla con datos de clientes tiene una columna que indica a qué organización pertenece, y una tabla de membresías relaciona a cada usuario con sus organizaciones.",
        "The foundation is simple: every table with customer data has a column saying which organization it belongs to, and a membership table links each user to their organizations.",
      )],
      ["code", "sql", `-- Each user can belong to one or more organizations
create table memberships (
  user_id uuid references auth.users not null,
  org_id  uuid references organizations not null,
  role    text not null default 'member',
  primary key (user_id, org_id)
);

create table appointments (
  id      uuid primary key default gen_random_uuid(),
  org_id  uuid references organizations not null,
  starts_at timestamptz not null
);

alter table appointments enable row level security;

-- Members can read their organization's rows
create policy "members read own org"
on appointments for select
to authenticated
using (
  org_id in (select org_id from memberships where user_id = (select auth.uid()))
);

-- Members can only insert rows into their own organization
create policy "members insert own org"
on appointments for insert
to authenticated
with check (
  org_id in (select org_id from memberships where user_id = (select auth.uid()))
);`],
      ["p", L(
        "Con RLS activado, una tabla sin políticas no devuelve nada: el acceso queda cerrado por defecto y cada permiso se abre de forma explícita. Escribir auth.uid() dentro de un select permite que PostgreSQL lo evalúe una sola vez por consulta, lo que mejora el rendimiento en tablas grandes.",
        "With RLS enabled, a table with no policies returns nothing: access is closed by default and every permission is opened explicitly. Wrapping auth.uid() in a select lets PostgreSQL evaluate it once per query, which improves performance on large tables.",
      )],
      ["h2", L("Errores comunes", "Common mistakes")],
      ["ul", [
        L("Activar RLS en unas tablas y olvidarlo en otras, sobre todo en tablas nuevas.", "Enabling RLS on some tables and forgetting others, especially new ones."),
        L("Escribir una política de lectura y ninguna para insertar o editar, o usar using donde hace falta with check.", "Writing a read policy but none for insert or update, or using using where with check is needed."),
        L("Permitir que el usuario edite su propio rol o su organización desde el navegador.", "Letting users edit their own role or organization from the browser."),
        L("Usar la clave de servicio (service role) en el frontend: esa clave ignora RLS.", "Using the service-role key in the frontend: that key bypasses RLS."),
        L("Confiar en el middleware para autorizar y no en la base de datos.", "Relying on middleware for authorization instead of the database."),
      ]],
      ["h2", L("Cómo probar que funciona", "How to prove it works")],
      ["p", L(
        "Una política que no se prueba es una suposición. En PREZ usamos pgTAP para escribir pruebas que se ejecutan contra la base de datos: un usuario de la organización A intenta leer, crear, editar y borrar datos de la organización B, y cada intento debe fallar. Esas pruebas corren en cada cambio, así una migración nueva no puede abrir un hueco sin que lo notemos.",
        "An untested policy is an assumption. In PREZ we use pgTAP to write tests that run against the database: a user from organization A tries to read, create, update and delete organization B's data, and every attempt must fail. Those tests run on every change, so a new migration cannot open a gap unnoticed.",
      )],
      ["p", L(
        "Además, Supabase ofrece un asesor de seguridad que avisa de tablas sin RLS y de funciones con permisos demasiado amplios. Vale la pena revisarlo antes de cada lanzamiento.",
        "Supabase also provides a security advisor that flags tables without RLS and functions with overly broad permissions. It is worth checking before every release.",
      )],
      ["note", L(
        "El código de este artículo es un ejemplo genérico para explicar el patrón. Cada producto necesita políticas diseñadas para su propio modelo de datos.",
        "The code in this article is a generic example to explain the pattern. Every product needs policies designed for its own data model.",
      )],
    ],
  },
  {
    id: "website-security-checklist",
    slug: L("checklist-seguridad-pagina-web", "website-security-checklist"),
    title: L("Checklist de seguridad para tu página web", "Website security checklist before launch"),
    h1: L(
      "Checklist de seguridad antes de lanzar tu página web: 12 puntos",
      "Website security checklist before launch: 12 points",
    ),
    description: L(
      "Doce controles de seguridad para revisar antes de publicar una página web: HTTPS, cabeceras, formularios, dependencias, copias de seguridad y más.",
      "Twelve security checks to run before publishing a website: HTTPS, security headers, forms, dependencies, backups, privacy and more.",
    ),
    published: "2026-11-15",
    topic: L("Ciberseguridad", "Cybersecurity"),
    related: [["service", "web-development"], ["service", "cloud-security"], ["work", "codegurex-com"]],
    body: [
      ["p", L(
        "Una página web corporativa parece de bajo riesgo, pero es la puerta de entrada de tu empresa: recibe datos de contacto, carga scripts de terceros y representa tu marca. Esta es la lista que aplicamos antes de publicar nuestros propios sitios, incluido codegurex.com.",
        "A corporate website looks low-risk, but it is your company's front door: it receives contact details, loads third-party scripts and represents your brand. This is the checklist we apply before publishing our own sites, including codegurex.com.",
      )],
      ["h2", L("Conexión y servidor", "Connection and server")],
      ["ol", [
        L("HTTPS en todas las páginas y redirección automática desde HTTP.", "HTTPS on every page, with an automatic redirect from HTTP."),
        L("HSTS activado, para que el navegador nunca vuelva a usar HTTP con tu dominio.", "HSTS enabled, so browsers never fall back to HTTP for your domain."),
        L("Una versión canónica del dominio (con o sin www) y la otra redirigida con 301.", "One canonical version of the domain (with or without www) and the other redirected with a 301."),
      ]],
      ["h2", L("Cabeceras de seguridad", "Security headers")],
      ["ol", [
        L("Content-Security-Policy: define desde dónde puede cargar scripts y estilos tu página. Es la defensa más fuerte contra la inyección de código.", "Content-Security-Policy: defines where your page may load scripts and styles from. It is the strongest defence against code injection."),
        L("X-Frame-Options o frame-ancestors, para que nadie incruste tu sitio dentro de otro y engañe a tus visitantes.", "X-Frame-Options or frame-ancestors, so nobody can embed your site inside another and trick your visitors."),
        L("X-Content-Type-Options, Referrer-Policy y Permissions-Policy, para reducir comportamientos innecesarios del navegador.", "X-Content-Type-Options, Referrer-Policy and Permissions-Policy, to reduce unnecessary browser behaviour."),
      ]],
      ["h2", L("Formularios y datos", "Forms and data")],
      ["ol", [
        L("Pide solo los datos que necesitas. Un formulario de contacto no necesita cédula ni dirección.", "Ask only for the data you need. A contact form does not need an ID number or a home address."),
        L("Valida los datos y protege el formulario contra el spam: un campo trampa (honeypot) y un límite de envíos ayudan mucho.", "Validate input and protect the form against spam: a honeypot field and a submission limit go a long way."),
        L("Publica una política de privacidad clara y pide consentimiento antes de activar analítica.", "Publish a clear privacy policy and ask for consent before enabling analytics."),
      ]],
      ["h2", L("Código y operación", "Code and operations")],
      ["ol", [
        L("Ninguna clave, token ni contraseña en el código público ni en el repositorio.", "No keys, tokens or passwords in public code or in the repository."),
        L("Dependencias actualizadas, sin plugins abandonados. Cuanto menos código de terceros, menos riesgo.", "Up-to-date dependencies and no abandoned plugins. The less third-party code, the lower the risk."),
        L("Copias de seguridad probadas: una copia que nunca se ha restaurado no es una copia confiable.", "Tested backups: a backup that has never been restored is not a reliable backup."),
      ]],
      ["h2", L("Cómo verificarlo tú mismo", "How to check it yourself")],
      ["p", L(
        "Abre las herramientas de desarrollo del navegador, ve a la pestaña Red, recarga la página y revisa las cabeceras de respuesta del documento. Si no ves Content-Security-Policy ni Strict-Transport-Security, tu sitio tiene trabajo pendiente. También puedes ejecutar Lighthouse desde Chrome para revisar buenas prácticas, accesibilidad y SEO en un solo informe.",
        "Open your browser's developer tools, go to the Network tab, reload the page and check the document's response headers. If you do not see Content-Security-Policy and Strict-Transport-Security, your site has work to do. You can also run Lighthouse from Chrome to review best practices, accessibility and SEO in one report.",
      )],
      ["p", L(
        "Si tu sitio ya está publicado y no sabes cómo está, podemos revisarlo: rendimiento, SEO técnico y seguridad en una sola evaluación.",
        "If your site is already live and you are not sure where it stands, we can review it: performance, technical SEO and security in one assessment.",
      )],
    ],
  },
];

// Primary-location landing page (HQ city). One page only: no city-swapped doorway pages.
export const LOCAL_PAGE = {
  slug: L("desarrollo-de-software-manta", "software-development-ecuador"),
  title: L("Desarrollo de software y páginas web en Manta | CodeGurex", "Software development company in Ecuador | CodeGurex"),
  h1: L("Desarrollo de software y páginas web en Manta, Ecuador", "Software development company in Manta, Ecuador"),
  description: L(
    "Empresa de desarrollo de software, páginas web y ciberseguridad en Manta, Manabí. Sistemas que hoy usan negocios de Manta, con atención en todo Ecuador.",
    "Software development, web and cybersecurity company based in Manta, Ecuador. Systems used by local businesses, serving clients across Ecuador and abroad.",
  ),
  intro: L(
    "CodeGurex nació en Manta. Desde 2022 desarrollamos sistemas que negocios de la ciudad usan todos los días: la página web y el sistema de documentos de un consultorio médico, software de gestión para barberías y el CRM de ventas de un fabricante de productos de limpieza.",
    "CodeGurex was born in Manta, on Ecuador's Pacific coast. Since 2022 we have built systems that local businesses use every day: the website and document system of a medical practice, management software for barbershops and the sales CRM of a cleaning-products manufacturer.",
  ),
  sections: [
    [
      L("Qué hacemos para empresas de Manta y Manabí", "What we build for businesses in Ecuador"),
      L(
        "Páginas web corporativas que aparecen en Google y llevan a WhatsApp, sistemas para controlar ventas, inventario y caja, plataformas por suscripción y evaluaciones de seguridad para aplicaciones que manejan datos de clientes. Todo con el código a nombre de tu empresa.",
        "Corporate websites that rank on Google and lead to WhatsApp, systems to track sales, inventory and cash, subscription platforms and security assessments for applications handling customer data. Always with the code in your company's name.",
      ),
    ],
    [
      L("Por qué trabajar con una empresa local", "Why work with an Ecuadorian team"),
      L(
        "Conocemos cómo trabaja un negocio en la ciudad: el cliente escribe por WhatsApp, el fiado se anota en un cuaderno y el inventario vive en Excel. Diseñamos el software para esa realidad, en español y con atención directa del equipo que lo construye.",
        "We know how businesses here actually work: customers write on WhatsApp, store credit lives in a notebook and inventory lives in Excel. We design software for that reality, with direct access to the team that builds it, in Spanish or English and in a convenient time zone (GMT-5) for clients in the Americas.",
      ),
    ],
    [
      L("Más allá de Manta", "Beyond Manta"),
      L(
        "Trabajamos de forma remota con empresas de cualquier ciudad de Ecuador —Portoviejo, Guayaquil, Quito o Cuenca— y de otros países. Las reuniones son por videollamada y cada fase se revisa en un entorno de vista previa.",
        "We work remotely with companies anywhere in Ecuador and in other countries. Meetings happen over video calls and every phase is reviewed in a preview environment.",
      ),
    ],
  ],
  faq: [
    [L("¿Dónde está CodeGurex?", "Where is CodeGurex based?"), L("En Manta, provincia de Manabí, Ecuador. Atendemos de forma remota a clientes de todo el país y del exterior.", "In Manta, Manabí province, Ecuador. We serve clients remotely across the country and abroad.")],
    [L("¿Hacen páginas web para negocios pequeños de Manta?", "Do you build websites for small businesses?"), L("Sí. Hemos desarrollado la página web de un consultorio médico de Manta y sistemas para barberías y pequeños negocios. Ajustamos el alcance al tamaño y presupuesto de cada empresa.", "Yes. We have built the website of a medical practice in Manta and systems for barbershops and small businesses. We size the scope to each company's budget.")],
    [L("¿Puedo ver proyectos que hayan hecho en Manta?", "Can I see local projects?"), L("Sí. El sitio del Consultorio Médico Familiar ADULAM está publicado y su caso de estudio explica qué hicimos y cómo.", "Yes. The ADULAM family medical practice's website is live, and its case study explains what we built and how.")],
  ],
};
