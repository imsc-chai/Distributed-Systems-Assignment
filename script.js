// --- Closure to track successful submissions ---
const makeSubmissionCounter = () => {
  let count = 0;
  return () => ++count; // returns the next count each success
};
const nextSubmissionCount = makeSubmissionCounter();

const form = document.getElementById("blogForm");

// ---  Arrow function: validate + handle submit ---
const validateAndSubmit = (e) => {
  e.preventDefault();

  // Grab elements & values
  const titleEl = document.getElementById("title");
  const authorEl = document.getElementById("author");
  const emailEl = document.getElementById("email");
  const contentEl = document.getElementById("content");
  const categoryEl = document.getElementById("category");
  const termsEl = document.getElementById("terms");

  const title = titleEl.value.trim();
  const author = authorEl.value.trim();
  const email = emailEl.value.trim();
  const content = contentEl.value.trim();
  const category = categoryEl.value;
  const termsChecked = termsEl.checked;

  // --- Collect validation errors (shows both alerts if both fail) ---
  const errors = [];
  if (content.length <= 25) {
    errors.push("Blog content should be more than 25 characters");
  }
  if (!termsChecked) {
    errors.push("You must agree to the terms and conditions");
  }
  if (errors.length) {
    errors.forEach(msg => alert(msg)); 
    return; // stop submit flow
  }

  // --- Convert to JSON string and log ---
  const dataObj = { title, author, email, content, category, termsChecked };
  const jsonString = JSON.stringify(dataObj);
  console.log("JSON string:", jsonString);

  // --- Parse back ---
  const parsed = JSON.parse(jsonString);

  // --- Destructure title & email and log ---
  const { title: parsedTitle, email: parsedEmail } = parsed;
  console.log("Destructured → title:", parsedTitle, "email:", parsedEmail);

  // ---  Spread operator to add submissionDate and log ---
  const enhanced = { ...parsed, submissionDate: new Date().toISOString() };
  console.log("Enhanced object with submissionDate:", enhanced);

  // ---  Closure count ---
  const count = nextSubmissionCount();
  console.log("Successful submissions so far:", count);

  alert("Blog submitted successfully!");
  form.reset();
  titleEl.focus();
};

form.addEventListener("submit", (e) => validateAndSubmit(e));
