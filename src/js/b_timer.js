/*
 */
// #region timer
const timers = document.querySelectorAll(".timer");

class Timer {
  timers = [];
  timerName = "localTimer";
  timerDeadline = this.getTimerDeadlineFromNow(1);

  constructor() {
    this.setTimers(".b_timer");
    this.launchTimers();
  }
  setTimers(timerClass) {
    this.timers = [...document.querySelectorAll(timerClass)];
  }
  getTimers() {
    return this.timers;
  }
  launchTimers() {
    this.isTimerNull() ? this.setDeadline(this.timerDeadline) : false;

    this.getTimers().forEach((timer) => {
      timer.classList.add("timer--init");
      this.updateClock();
      setInterval(this.updateClock.bind(this), 1000);
      // const timeinterval = setInterval(this.updateClock(timer), 1000);
    });
  }

  updateClock() {
    let { hoursTotal, minutes, seconds, total } = this.getTimeRemaining(
      this.getDeadline()
    );

    let left = this.getLeadingZeroTime(hoursTotal);
    let center = this.getLeadingZeroTime(minutes);
    let right = this.getLeadingZeroTime(seconds);
    let timerSpan = [left, center, right];

    this.getTimers().forEach((timer) => {
      this.getTimerSections(timer).forEach((section, i) => {
        [...section.querySelectorAll(".timer__digit")].forEach(
          (digit, index) => {
            digit.innerText = total >= 0 ? timerSpan[i][index] : "0";
          }
        );
      });
      if (total <= 0) {
        // clearInterval(timeinterval);
        this.onTimerExpire();
      }
    });
  }

  getTimerSections(timer) {
    let sectionLeft = timer.querySelector(".timer__left");
    let sectionCenter = timer.querySelector(".timer__center");
    let sectionRight = timer.querySelector(".timer__right");
    let timerSections = [sectionLeft, sectionCenter, sectionRight];
    return timerSections;
  }
  getLeadingZeroTime(time) {
    return ("0" + time).slice(-2);
  }

  setDeadline(deadline) {
    const newDeadline = new Date(Date.parse(new Date()) + deadline);
    localStorage.setItem(this.timerName, newDeadline);
    return newDeadline;
  }
  getDeadline() {
    return localStorage.getItem(this.timerName);
  }
  isTimerNull() {
    return localStorage.getItem(this.timerName) == null;
  }

  // var deadline = new Date(Date.parse(new Date()) + 10 * 1000); // for endless timer

  getTimerDeadlineFromNow(hours, isDaysInTimer = false) {
    const milliseconds = 1000;
    const seconds = 60;
    const minutes = 60;
    return hours * minutes * seconds * milliseconds;
  }
  // if ([...timers].length > 0) {
  getTimeRemaining(deadline) {
    let t = Date.parse(deadline) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    let hoursTotal = Math.floor(t / (1000 * 60 * 60));

    const ticks = {
      total: t,
      days,
      hours,
      hoursTotal,
      minutes,
      seconds,
    };
    return ticks;
  }

  onTimerExpire() {
    // clock.style.opacity = "0";
  }

  // }
}
const b_Timer = new Timer();

window.b_timer = b_Timer;
// #endregion timer
