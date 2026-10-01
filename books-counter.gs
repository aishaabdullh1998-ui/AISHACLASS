// كود عدّاد رفوف القرائي — يُلصق في script.google.com
const PIN = '1234'; // غيّري الرمز السري قبل النشر

function doGet(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    const props = PropertiesService.getScriptProperties();
    let n = Number(props.getProperty('BOOKS') || 0);
    const action = (e && e.parameter.action) || 'get';
    if (action !== 'get') {
      if (e.parameter.pin !== PIN) return out({ ok: false, count: n, error: 'pin' });
      if (action === 'add') n += 1;
      if (action === 'sub') n = Math.max(0, n - 1);
      if (action === 'set') n = Math.max(0, parseInt(e.parameter.n, 10) || 0);
      props.setProperty('BOOKS', String(n));
    }
    return out({ ok: true, count: n });
  } finally {
    lock.releaseLock();
  }
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
