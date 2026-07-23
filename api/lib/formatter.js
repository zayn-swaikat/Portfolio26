export function formatVisitorMessage(data) {
  return `
🚀 <b>New Portfolio Visitor</b>

🌍 <b>Country:</b> ${data.country}
🏙️ <b>City:</b> ${data.city}

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