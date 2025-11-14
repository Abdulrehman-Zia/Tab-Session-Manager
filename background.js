chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "restoreSession") {
    restoreSession(msg.session);
  }
});

async function restoreSession(session) {
  const createdTabs = {};

  // 1. Restore grouped tabs
  for (const groupId in session.groups) {
    const group = session.groups[groupId];
    createdTabs[groupId] = [];

    for (const url of group.tabs) {
      const tab = await chrome.tabs.create({ url });
      createdTabs[groupId].push(tab.id);
    }

    const newGroupId = await chrome.tabs.group({ tabIds: createdTabs[groupId] });

    await chrome.tabGroups.update(newGroupId, {
      title: group.title,
      color: group.color,
      collapsed: group.collapsed
    });
  }

  // 2. Restore truly ungrouped tabs
  if (session.ungrouped) {
    for (const url of session.ungrouped) {
      await chrome.tabs.create({ url });
    }
  }
}
