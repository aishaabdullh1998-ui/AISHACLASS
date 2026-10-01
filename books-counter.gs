// كود عدّاد رفوف القرائية وملاحظات المعلّمة — يُلصق في script.google.com
const PIN = '1234'; // غيّري الرمز السري قبل النشر

function doGet(e) {
  const p = (e && e.parameter) || {};
  const action = p.action || 'get';
  const props = PropertiesService.getScriptProperties();
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    let n = Number(props.getProperty('BOOKS') || 0);
    if (action !== 'get') {
      if (p.pin !== PIN) return out({ ok: false, error: 'pin' });
      if (action === 'add') n += 1;
      if (action === 'sub') n = Math.max(0, n - 1);
      if (action === 'set') n = Math.max(0, parseInt(p.n, 10) || 0);
      props.setProperty('BOOKS', String(n));
      if (action === 'note' && p.k && p.t) {
        const list = JSON.parse(props.getProperty('NOTE_' + p.k) || '[]');
        const d = Utilities.formatDate(new Date(), 'Asia/Muscat', 'yyyy/MM/dd');
        list.unshift({ d: d, t: String(p.t).slice(0, 1500) });
        props.setProperty('NOTE_' + p.k, JSON.stringify(list));
      }
      if (action === 'delnote' && p.k) {
        const list = JSON.parse(props.getProperty('NOTE_' + p.k) || '[]');
        list.splice(parseInt(p.i, 10), 1);
        props.setProperty('NOTE_' + p.k, JSON.stringify(list));
      }
    }
    const notes = {};
    const all = props.getProperties();
    Object.keys(all).forEach(function (key) {
      if (key.indexOf('NOTE_') === 0) notes[key.slice(5)] = JSON.parse(all[key]);
    });
    return out({ ok: true, count: n, notes: notes });
  } finally {
    lock.releaseLock();
  }
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
