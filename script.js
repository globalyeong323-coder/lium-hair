/* =========================================================
   LIUM HAIR — 예약 문의 폼 / 스크롤 효과
   ---------------------------------------------------------
   [예약 문의를 이메일로 받고 싶다면]
   https://formspree.io 에서 무료 가입 → 폼을 만들면
   https://formspree.io/f/xxxxxxx 형태의 주소가 나옵니다.
   그 주소를 아래 FORM_ENDPOINT 따옴표 안에 붙여 넣으세요.

   비워 두면: 모바일에서는 문자 앱이 내용이 채워진 채로 열리고,
              PC에서는 내용이 복사되어 문자/전화 안내가 나옵니다.
   ========================================================= */
const FORM_ENDPOINT = "";
const SHOP_PHONE = "01044766657";

document.addEventListener("DOMContentLoaded", () => {
  /* 등장 애니메이션 */
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("in"));
  }

  /* 예약 폼 */
  const form = document.getElementById("reserve-form");
  if (!form) return;
  const status = form.querySelector(".form-status");
  const dateInput = form.querySelector("#r-date");

  // 오늘 이전 날짜 선택 막기
  const t = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  // 날짜 칸 어디를 눌러도 달력 열기
  const openPicker = () => { try { dateInput.showPicker(); } catch {} };
  dateInput.addEventListener("click", openPicker);
  dateInput.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPicker(); } });

  dateInput.min = `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;

  // 연락처 자동 하이픈
  const tel = form.querySelector("#r-phone");
  tel.addEventListener("input", () => {
    const d = tel.value.replace(/\D/g, "").slice(0, 11);
    tel.value = d.length < 4 ? d : d.length < 8 ? `${d.slice(0, 3)}-${d.slice(3)}` : `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
  });

  const say = (msg) => { status.textContent = msg; };

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.name.trim()) return say("이름을 입력해 주세요.");
    if (data.phone.replace(/\D/g, "").length < 10) return say("연락처를 정확히 입력해 주세요.");
    if (!data.service) return say("희망 시술을 선택해 주세요.");

    const text =
      `[리움헤어 예약 문의]\n` +
      `이름: ${data.name}\n연락처: ${data.phone}\n` +
      `희망 시술: ${data.service}\n` +
      `희망 날짜: ${data.date || "미정"} / 시간: ${data.time || "미정"}\n` +
      (data.email ? `이메일: ${data.email}\n` : "") +
      (data.message ? `문의 내용: ${data.message}` : "");

    // 1) Formspree 등 폼 주소가 있으면 그쪽으로 전송
    if (FORM_ENDPOINT) {
      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      say("보내는 중입니다…");
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error();
        form.reset();
        say("예약 문의가 접수되었습니다. 확인 후 연락드릴게요.");
      } catch {
        say("전송에 실패했어요. 전화(010-4476-6657)로 문의해 주세요.");
      } finally {
        btn.disabled = false;
      }
      return;
    }

    // 2) 폼 주소가 없으면: 모바일은 문자 앱, PC는 복사
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      location.href = `sms:${SHOP_PHONE}?&body=${encodeURIComponent(text)}`;
      say("문자 앱에서 전송 버튼을 눌러 주세요.");
    } else {
      try { await navigator.clipboard.writeText(text); } catch {}
      say("문의 내용이 복사되었습니다. 010-4476-6657로 문자 또는 전화 주세요.");
    }
  });
});
