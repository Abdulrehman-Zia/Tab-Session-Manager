document.addEventListener("DOMContentLoaded", loadSessions);

document.getElementById("saveBtn").onclick = saveSession;
document.getElementById("exportBtn").onclick = exportSessions;
document.getElementById("importBtn").onclick = importSessions;


// Save current tabs + tab groups + ungrouped tabs
async function saveSession() {
  const tabs = await chrome.tabs.query({});
  const groups = {};
  const ungrouped = [];

  // 1. Split tabs into groups and ungrouped
  for (const tab of tabs) {
    if (tab.groupId >= 0) {
      if (!groups[tab.groupId]) groups[tab.groupId] = { tabs: [] };
      groups[tab.groupId].tabs.push(tab.url);
    } else {
      ungrouped.push(tab.url);
    }
  }

  // 2. Fetch group metadata
  for (const gid in groups) {
    try {
      const info = await chrome.tabGroups.get(Number(gid));
      groups[gid].title = info.title;
      groups[gid].color = info.color;
      groups[gid].collapsed = info.collapsed;
    } catch {
      groups[gid].title = "";
      groups[gid].color = "grey";
      groups[gid].collapsed = false;
    }
  }

  // 3. Save session
  chrome.storage.local.get({ sessions: [] }, data => {
    data.sessions.push({
      name: new Date().toLocaleString(),
      groups,
      ungrouped
    });

    chrome.storage.local.set(data, loadSessions);
  });
}


// Load and render sessions
function loadSessions() {
  chrome.storage.local.get({ sessions: [] }, data => {
    const container = document.getElementById("sessionList");
    container.innerHTML = "";

    data.sessions.forEach((session, index) => {
      const div = document.createElement("div");
      div.className = "session";

      div.innerHTML = `
        <div class="session-title">${session.name}</div>
        <div class="session-btns">
          <button data-index="${index}" class="openSession">Open</button>
          <button data-index="${index}" class="deleteSession">Delete</button>
        </div>
      `;

      container.appendChild(div);
    });

    document.querySelectorAll(".openSession").forEach(btn =>
      btn.onclick = openSession
    );

    document.querySelectorAll(".deleteSession").forEach(btn =>
      btn.onclick = deleteSession
    );
  });
}


// Restore session
function openSession(event) {
  const index = Number(event.target.dataset.index);

  chrome.storage.local.get("sessions", data => {
    const session = data.sessions[index];
    chrome.runtime.sendMessage({ action: "restoreSession", session });
  });
}


// Delete session
function deleteSession(event) {
  const index = Number(event.target.dataset.index);

  chrome.storage.local.get("sessions", data => {
    data.sessions.splice(index, 1);
    chrome.storage.local.set(data, loadSessions);
  });
}


// Export all sessions to JSON
function exportSessions() {
  chrome.storage.local.get({ sessions: [] }, data => {
    const blob = new Blob([JSON.stringify(data.sessions, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download({
      url,
      filename: "tab_sessions_true_ungrouped.json",
      saveAs: true
    });
  });
}


// Import sessions from JSON
function importSessions() {
  const picker = document.createElement("input");
  picker.type = "file";
  picker.accept = "application/json";

  picker.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);

        chrome.storage.local.get({ sessions: [] }, data => {
          data.sessions = data.sessions.concat(imported);
          chrome.storage.local.set(data, loadSessions);
        });
      } catch {
        alert("Invalid JSON file.");
      }
    };

    reader.readAsText(file);
  };

  picker.click();
}
