export function formatVisitorMessage(data) {
  return `
${getEventTitle(data.event)}

🌍 <b>Country:</b> ${data.country}
🏙️ <b>City:</b> ${data.city}
🏢 <b>ISP:</b> ${data.isp}

💻 <b>OS:</b> ${data.os}
🌐 <b>Browser:</b> ${data.browser}

📱 <b>Device:</b> ${data.device}

🗣️ <b>Language:</b> ${data.language}

📄 <b>Page:</b> ${data.page}

🔗 <b>Referrer:</b> ${data.referrer}

🆔 <b>Session:</b>
<code>${data.session}</code>
`.trim();
}

function getEventTitle(event) {
  const titles = {
    page_view: "🚀 New Portfolio Visitor",
    project_view: "📂 Project Viewed",
    github_click: "⭐ GitHub Click",
    linkedin_click: "💼 LinkedIn Click",
    cv_download: "📄 CV Download",
    contact_submit: "📨 New Message",
  };

  return titles[event] || "📊 Portfolio Event";
}