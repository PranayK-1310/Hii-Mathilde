/* ============================================================
  EDIT THIS: where the selections get sent.
  Replace with your real email address.
============================================================ */
const RECIPIENT_EMAIL = "khajindar.pranay@gmail.com";

/* ------------------------------------------------------------
  HOW THE "FREE EMAIL" PART WORKS (no server, no account needed)
  ------------------------------------------------------------
  This uses a "mailto:" link. When Mathilde clicks "Send it over",
  her own email app opens with the message already written and
  addressed to RECIPIENT_EMAIL above — she just has to hit send
  from her side. It's completely free and needs zero setup.

  WANT IT TO SEND AUTOMATICALLY, WITHOUT HER APP OPENING?
  You can swap in a free form backend like Formspree
  (https://formspree.io — free tier, no card needed):
    1. Make a free account, create a form, copy your endpoint
       URL (looks like https://formspree.io/f/xxxxxxx).
    2. Replace the whole `sendViaMailto(...)` call inside
       handleSubmit() below with:

        fetch("https://formspree.io/f/xxxxxxx", {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: formDataToSend
        }).then(() => showScreen("screen-thanks"));

       (formDataToSend is already built for you a few lines up.)
  ------------------------------------------------------------ */

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((el) => {
    el.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function sendViaMailto({ activities, date, note }) {
  const subject = "A few plans, whenever you're free 🍂";

  const lines = [];
  lines.push("Hi! Here's what I picked:");
  lines.push("");
  lines.push(
    activities.length
      ? "Activities: " + activities.join(", ")
      : "Activities: (none selected)"
  );
  lines.push("Preferred day: " + (date || "no preference yet"));
  if (note) {
    lines.push("");
    lines.push("Note: " + note);
  }

  const body = lines.join("\n");

  const mailtoLink =
    "mailto:" +
    encodeURIComponent(RECIPIENT_EMAIL) +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  window.location.href = mailtoLink;
}

function handleSubmit() {
  const checked = Array.from(
    document.querySelectorAll('input[name="activity"]:checked')
  ).map((el) => el.value);

  const date = document.getElementById("chosen-date").value;
  const note = document.getElementById("note").value.trim();

  if (checked.length === 0) {
    alert("Pick at least one activity first!");
    return;
  }

  sendViaMailto({ activities: checked, date, note });

  // Give the email app a moment to open, then show the thank-you screen.
  setTimeout(() => showScreen("screen-thanks"), 400);
}

document.getElementById("btn-to-activities").addEventListener("click", () => {
  showScreen("screen-plan");
});

document.getElementById("btn-submit").addEventListener("click", handleSubmit);
