(function () {
      const roles = [
        'Pelajar & Web Developer Pemula',
        'Penggemar Teknologi',
        'Frontend Learner',
        'Siswa SMK Maarif Walisongo Kajoran'
      ];

      const el = document.getElementById('bkmRoleText');
      if (!el) return;

      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const TYPE_SPEED = 70;
      const DELETE_SPEED = 35;
      const HOLD_TIME = 1400;
      const GAP_TIME = 300;

      function tick() {
        const current = roles[roleIndex];

        if (!deleting) {
          charIndex++;
          el.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            return setTimeout(tick, HOLD_TIME);
          }
          return setTimeout(tick, TYPE_SPEED);
        }

        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          return setTimeout(tick, GAP_TIME);
        }
        return setTimeout(tick, DELETE_SPEED);
      }

      tick();
    })();
