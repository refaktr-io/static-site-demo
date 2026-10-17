// Juniper Coffee: live "open now" status in San Francisco time, today's hours, and the header rule on scroll.
(function () {
  const HOURS = {            // minutes after midnight, Pacific time. 0 = Sunday.
    0: [450, 960], 1: [390, 900], 2: [390, 900], 3: [390, 900],
    4: [390, 900], 5: [390, 900], 6: [450, 960]
  };
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function sfNow() {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
    }).formatToParts(new Date());
    const get = t => parts.find(p => p.type === t).value;
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
  }

  function clock(m) {
    const h = Math.floor(m / 60), min = m % 60;
    const suffix = h >= 12 ? 'pm' : 'am';
    const h12 = ((h + 11) % 12) + 1;
    return min ? `${h12}:${String(min).padStart(2, '0')} ${suffix}` : `${h12} ${suffix}`;
  }

  function describe() {
    const { day, minutes } = sfNow();
    const [open, close] = HOURS[day];
    if (minutes >= open && minutes < close) return { open: true, text: `Open now until ${clock(close)}` };
    if (minutes < open) return { open: false, text: `Closed now, opens today at ${clock(open)}` };
    const next = (day + 1) % 7;
    return { open: false, text: `Closed now, opens tomorrow at ${clock(HOURS[next][0])}` };
  }

  function render() {
    const s = describe();
    document.querySelectorAll('[data-status]').forEach(el => {
      el.classList.toggle('is-open', s.open);
      el.classList.toggle('is-closed', !s.open);
      el.querySelector('[data-status-text]').textContent = s.text;
    });
    const { day } = sfNow();
    document.querySelectorAll('.hours tr').forEach(tr => {
      tr.classList.toggle('today', tr.dataset.days.split(',').includes(String(day)));
    });
  }

  render();
  setInterval(render, 60 * 1000);

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
