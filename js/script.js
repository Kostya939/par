function Util() {}
(Util.setAttributes = function (t, e) {
  for (var n in e) t.setAttribute(n, e[n]);
}),
  (function () {
    var t = function (t) {
      (this.element = t),
        (this.labels = this.element.getAttribute('data-labels')
          ? this.element.getAttribute('data-labels').split(',')
          : []),
        this.intervalId,
        this.setVisibleLabels(),
        (this.days = this.element.getElementsByClassName(
          'js-countdown__value--0'
        )[0]),
        (this.hours = this.element.getElementsByClassName(
          'js-countdown__value--1'
        )[0]),
        (this.mins = this.element.getElementsByClassName(
          'js-countdown__value--2'
        )[0]),
        (this.secs = this.element.getElementsByClassName(
          'js-countdown__value--3'
        )[0]),
        (this.endTime = this.getEndTime()),
        this.initCountDown();
    };

    t.prototype.setVisibleLabels = function () {
      (this.visibleLabels = this.element.getAttribute('data-visible-labels')
        ? this.element.getAttribute('data-visible-labels').split(',')
        : []),
        (this.visibleLabels = this.visibleLabels.map(function (t) {
          return t.trim();
        }));
    };

    t.prototype.getEndTime = function () {
      return this.element.getAttribute('data-timer')
        ? 1e3 * Number(this.element.getAttribute('data-timer')) +
            new Date().getTime()
        : this.element.getAttribute('data-countdown')
        ? Number(
            new Date(this.element.getAttribute('data-countdown')).getTime()
          )
        : void 0;
    };

    t.prototype.initCountDown = function () {
      var t = this;
      (this.intervalId = setInterval(function () {
        t.updateCountDown(!1);
      }, 1e3)),
        this.updateCountDown(!0);
    };

    t.prototype.updateCountDown = function (t) {
      var e = parseInt((this.endTime - new Date().getTime()) / 1e3),
        n = 0,
        i = 0,
        s = 0,
        a = 0;
      isNaN(e) || e < 0
        ? (clearInterval(this.intervalId), this.emitEndEvent())
        : ((n = parseInt(e / 86400)),
          (e %= 86400),
          (i = parseInt(e / 3600)),
          (e %= 3600),
          (s = parseInt(e / 60)),
          (e %= 60),
          (a = parseInt(e))),
        t &&
          0 == n &&
          this.visibleLabels.indexOf('d') < 0 &&
          (this.days.parentElement.style.display = 'none'),
        t &&
          0 == n &&
          0 == i &&
          this.visibleLabels.indexOf('h') < 0 &&
          (this.hours.parentElement.style.display = 'none'),
        t &&
          0 == n &&
          0 == i &&
          0 == s &&
          this.visibleLabels.indexOf('m') < 0 &&
          (this.mins.parentElement.style.display = 'none'),
        (this.days.textContent = n),
        (this.hours.textContent = this.getTimeFormat(i)),
        (this.mins.textContent = this.getTimeFormat(s)),
        (this.secs.textContent = this.getTimeFormat(a));
    };

    t.prototype.getTimeFormat = function (t) {
      return ('0' + t).slice(-2);
    };

    t.prototype.emitEndEvent = function (t) {
      var e = new CustomEvent('countDownFinished');
      this.element.dispatchEvent(e);
    };

    document.addEventListener('DOMContentLoaded', function (e) {
      var n = document.getElementsByClassName('js-countdown');
      if (n.length > 0)
        for (var i = 0; i < n.length; i++)
          !(function (e) {
            new t(n[e]);
          })(i);
    });
  })();
