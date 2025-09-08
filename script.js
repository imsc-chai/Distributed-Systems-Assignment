
const makeSubmissionCounter = () => {
  let count = 0;
  return () => ++count; 
};
const nextSubmissionCount = makeSubmissionCounter();

const form = document.getElementById("blogForm");

const validateAndSubmit = (e) => {
  e.preventDefault();

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

  const errors = [];
  if (content.length <= 25) {
    errors.push("Blog content should be more than 25 characters");
  }
  if (!termsChecked) {
    errors.push("You must agree to the terms and conditions");
  }
  if (errors.length) {
    errors.forEach(msg => alert(msg)); 
    return; 
  }

  const dataObj = { title, author, email, content, category, termsChecked };
  const jsonString = JSON.stringify(dataObj);
  console.log("JSON string:", jsonString);

  const parsed = JSON.parse(jsonString);

  const { title: parsedTitle, email: parsedEmail } = parsed;
  console.log("Destructured → title:", parsedTitle, "email:", parsedEmail);

  const enhanced = { ...parsed, submissionDate: new Date().toISOString() };
  console.log("Enhanced object with submissionDate:", enhanced);

  const count = nextSubmissionCount();
  console.log("Successful submissions so far:", count);

  alert("Blog submitted successfully!");
  form.reset();
  titleEl.focus();
};

form.addEventListener("submit", (e) => validateAndSubmit(e));

