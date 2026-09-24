document.addEventListener("DOMContentLoaded", () => {

  /* Tabs */
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove("is-active"));
      panels.forEach(panel => panel.classList.remove("is-active"));
      tab.classList.add("is-active");
      const targetPanel = document.getElementById(target);
      if (targetPanel) targetPanel.classList.add("is-active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /* Reading progress */
  const readingProgress = document.getElementById("readingProgress");

  function updateReadingProgress() {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (documentHeight <= 0) {
      readingProgress.style.width = "0%";
      return;
    }
    const progress = (scrollTop / documentHeight) * 100;
    readingProgress.style.width = Math.min(100, Math.max(0, progress)) + "%";
  }

  window.addEventListener("scroll", updateReadingProgress);
  updateReadingProgress();

  /* Study slides */
  const slides = Array.from(document.querySelectorAll(".slide"));
  const slideNum = document.getElementById("slideNum");
  const slideTotal = document.getElementById("slideTotal");
  const deckDots = document.getElementById("deckDots");
  const prevSlide = document.getElementById("prevSlide");
  const nextSlide = document.getElementById("nextSlide");

  let currentSlide = 0;
  slideTotal.textContent = slides.length;

  function createSlideDots() {
    deckDots.innerHTML = "";
    slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "deck-dot";
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.addEventListener("click", () => showSlide(index));
      deckDots.appendChild(dot);
    });
  }

  function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    currentSlide = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === currentSlide);
    });

    slideNum.textContent = currentSlide + 1;

    const dots = document.querySelectorAll(".deck-dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === currentSlide);
      dot.classList.toggle("is-done", i < currentSlide);
    });

    prevSlide.disabled = currentSlide === 0;
    nextSlide.disabled = currentSlide === slides.length - 1;

    window.scrollTo({
      top: document.querySelector(".deck").offsetTop - 20,
      behavior: "smooth"
    });
  }

  prevSlide.addEventListener("click", () => showSlide(currentSlide - 1));
  nextSlide.addEventListener("click", () => showSlide(currentSlide + 1));

  document.addEventListener("keydown", event => {
    const learnPanel = document.getElementById("learn");
    if (learnPanel && learnPanel.classList.contains("is-active")) {
      if (event.key === "ArrowRight") showSlide(currentSlide + 1);
      if (event.key === "ArrowLeft") showSlide(currentSlide - 1);
    }
  });

  createSlideDots();
  showSlide(0);

  /* ============================================================
     QUIZ DATA — 50 questions
     ============================================================ */
  const questions = [
    // --- POETRY (1-8) ---
    {
      tag: "Poetry",
      question: "A student writes a poem using the line 'The sky wept with me.' What literary device is used here, and is this an academic or non-academic text?",
      options: ["Personification; Non-academic", "Simile; Academic", "Metaphor; Academic", "Hyperbole; Non-academic"],
      answer: 0,
      explanation: "Giving human traits (weeping) to the sky is personification. Poetry is a non-academic text because its primary purpose is to evoke emotion and use figurative language, not to report objective facts."
    },
    {
      tag: "Poetry",
      question: "How does the structure of a poem typically differ from an academic research paper?",
      options: ["Poems use chapters; papers use stanzas", "Poems use lines and stanzas; papers use Introduction, Methodology, Results, Discussion", "Poems must have a thesis statement; papers must rhyme", "Both use exactly the same structure but different fonts"],
      answer: 1,
      explanation: "Poetry uses lines and stanzas with flexible forms (free verse, sonnet, etc.). Academic papers follow a rigid structure: Introduction, Methodology, Results, Discussion, Conclusion, and References."
    },
    {
      tag: "Poetry",
      question: "What is the primary purpose of a poem?",
      options: ["To report data objectively", "To entertain, evoke emotion, and explore ideas creatively", "To cite peer-reviewed sources", "To persuade policymakers with statistics"],
      answer: 1,
      explanation: "Poetry is a non-academic text. Its purpose is to evoke emotion, entertain, and explore ideas through creative and figurative language."
    },
    {
      tag: "Poetry",
      question: "Which of the following language features is most typical of poetry but rarely found in academic texts?",
      options: ["Technical jargon", "Figurative language like metaphors and similes", "Formal citations", "Objective data analysis"],
      answer: 1,
      explanation: "Figurative language (metaphors, similes, personification) is a hallmark of poetry and creative writing. Academic texts prioritize literal, precise, and objective language."
    },
    {
      tag: "Poetry",
      question: "Who is the typical intended audience for a poem?",
      options: ["Only scholars and researchers", "General readers, peers, or anyone seeking emotional connection", "Only the author themselves", "Government officials"],
      answer: 1,
      explanation: "Poetry is written for a broad audience, including general readers and peers, aiming to connect emotionally or creatively. Academic texts target scholars and professionals."
    },
    {
      tag: "Poetry",
      question: "A poem uses the phrase 'the economy is a fickle beast.' How does this language differ from an academic economics paper?",
      options: ["The poem uses technical jargon; the paper uses metaphors", "The poem uses figurative language; the paper uses precise, objective economic terminology", "Both use exactly the same language", "The paper uses emotional appeals; the poem uses data"],
      answer: 1,
      explanation: "The poem uses metaphor ('fickle beast') to convey a feeling about the economy. An academic paper would use precise terms like 'inflation rate,' 'GDP,' and 'market volatility' with objective analysis."
    },
    {
      tag: "Poetry",
      question: "In the context of non-academic texts, what does 'economy of language' mean in poetry?",
      options: ["Using the cheapest words possible", "Using as few words as possible to convey deep meaning", "Writing about money and finance", "Avoiding all adjectives"],
      answer: 1,
      explanation: "Poetry often uses 'economy of language,' meaning every word is carefully chosen to convey maximum meaning, emotion, or imagery with minimal words."
    },
    {
      tag: "Poetry",
      question: "Which of the following is a key characteristic of a non-academic text like a poem?",
      options: ["It must include a bibliography", "It follows a flexible structure and uses emotional/figurative language", "It always presents both sides of an argument objectively", "It requires peer review before publication"],
      answer: 1,
      explanation: "Non-academic texts like poetry are characterized by flexible structures, emotional language, and figurative devices, unlike the rigid, objective, evidence-based nature of academic texts."
    },

    // --- ESSAYS (9-16) ---
    {
      tag: "Essays",
      question: "An academic essay requires a clear thesis statement, supporting arguments, and citations. What is the primary purpose of this type of essay?",
      options: ["To entertain the reader with a personal story", "To inform, analyze, or argue a point using evidence", "To confuse the reader with complex jargon", "To sell a product"],
      answer: 1,
      explanation: "An academic essay aims to inform, analyze, or argue a point using logical reasoning and evidence (citations). Its purpose is not primarily to entertain but to persuade intellectually."
    },
    {
      tag: "Essays",
      question: "A student writes an essay titled 'Why I Love Summer Vacation.' It uses informal language, personal anecdotes, and emotional descriptions. What type of essay is this?",
      options: ["Academic Essay", "Personal/Non-Academic Essay", "Research Paper", "Book Review"],
      answer: 1,
      explanation: "This is a personal (non-academic) essay. It uses first-person, emotional language, and personal anecdotes, targeting a general audience for entertainment or sharing experience, not formal analysis."
    },
    {
      tag: "Essays",
      question: "How does the tone of an academic essay typically differ from a personal essay?",
      options: ["Academic essays are humorous; personal essays are serious", "Academic essays are formal and objective; personal essays are informal and emotional", "Academic essays use slang; personal essays use technical jargon", "Both use the same tone but different fonts"],
      answer: 1,
      explanation: "Academic essays maintain a formal, objective tone to present evidence logically. Personal essays use an informal, conversational, and emotional tone to connect with readers."
    },
    {
      tag: "Essays",
      question: "In an academic essay, what is the function of the thesis statement?",
      options: ["To summarize the entire essay in one paragraph", "To present the main argument or claim that the rest of the essay will support", "To provide a personal anecdote", "To list all the sources used"],
      answer: 1,
      explanation: "The thesis statement is usually found at the end of the introduction. It presents the main argument or claim that the body paragraphs will support with evidence."
    },
    {
      tag: "Essays",
      question: "A writer submits an essay to a scholarly journal. The essay evaluates the strengths and weaknesses of a newly published history book and cites other historians. What type of text is this?",
      options: ["Personal Narrative", "Book Review (Academic)", "Short Story", "Poem"],
      answer: 1,
      explanation: "This is an academic book review. It critically evaluates a scholarly work, cites other experts (historians), and targets an academic audience. It is analytical and formal."
    },
    {
      tag: "Essays",
      question: "Which of the following vocabulary choices would be most appropriate for an academic essay?",
      options: ["'The results were totally awesome and mind-blowing.'", "'The data indicates a significant correlation between the variables.'", "'I feel like this is kind of a bad idea, you know?'", "'It was a super sad story about a guy.'"],
      answer: 1,
      explanation: "Academic essays require formal, precise, and objective language. Option B uses formal vocabulary ('indicates,' 'significant correlation') suitable for an academic audience."
    },
    {
      tag: "Essays",
      question: "A non-academic essay might be found in which of the following publications?",
      options: ["A peer-reviewed medical journal", "A university dissertation database", "A lifestyle magazine or personal blog", "A government policy report"],
      answer: 2,
      explanation: "Non-academic essays are typically found in lifestyle magazines, blogs, and other popular media. The other options are platforms for academic writing."
    },
    {
      tag: "Essays",
      question: "Why is emotional appeal (pathos) generally avoided in academic essays?",
      options: ["Because academics don't have emotions", "Because academic writing prioritizes objective logic, evidence, and critical analysis over emotional manipulation", "Because it is too difficult to write", "Because it is against the law"],
      answer: 1,
      explanation: "Academic writing values objectivity, logical reasoning, and evidence-based arguments. While emotional appeals can be used, they are not the primary persuasive tool, unlike in non-academic persuasive writing."
    },

    // --- NOVELS & SHORT STORIES (17-24) ---
    {
      tag: "Novels & Short Stories",
      question: "Which of the following is a defining characteristic of a novel?",
      options: ["It follows a strict Introduction-Methodology-Results structure", "It is an extended fictional narrative exploring characters and plot", "It must include citations and a bibliography", "It uses technical jargon to explain scientific concepts"],
      answer: 1,
      explanation: "A novel is an extended fictional narrative. It focuses on characters, plot development, and varied pacing, making it a non-academic text designed for entertainment and exploration of themes."
    },
    {
      tag: "Novels & Short Stories",
      question: "How does the language in a short story typically differ from an academic journal article?",
      options: ["Short stories use formal, objective language; journal articles use figurative language", "Short stories use descriptive, figurative, voice-driven language; journal articles use objective, technical language", "Both use exactly the same vocabulary and structure", "Journal articles use dialogue; short stories use citations"],
      answer: 1,
      explanation: "Short stories use descriptive, figurative language and narrative voice to engage the reader. Journal articles use objective, technical language to report findings."
    },
    {
      tag: "Novels & Short Stories",
      question: "What is the primary purpose of a fictional short story?",
      options: ["To report research findings", "To entertain and provide an immersive narrative experience", "To argue a political point using statistics", "To provide instructions for assembling furniture"],
      answer: 1,
      explanation: "The primary purpose of a short story is to entertain, engage the reader through narrative, and often explore a theme or character development. It is a non-academic text."
    },
    {
      tag: "Novels & Short Stories",
      question: "A writer creates a text with chapters, plot development, varied pacing, and stylistic variety. This is an example of:",
      options: ["Academic Essay", "Novel (Non-Academic)", "Research Paper", "Poetry"],
      answer: 1,
      explanation: "These are the structural characteristics of a novel. Novels are flexible in structure (chapters, plot arcs) and use varied pacing and stylistic language, unlike rigid academic texts."
    },
    {
      tag: "Novels & Short Stories",
      question: "In a short story, the author writes: 'The old house groaned as the wind howled through its broken windows.' What type of language is this?",
      options: ["Technical jargon", "Figurative and descriptive language", "Objective and statistical", "Formal and citation-heavy"],
      answer: 1,
      explanation: "The use of personification ('house groaned,' 'wind howled') and descriptive imagery is typical of non-academic creative writing like short stories."
    },
    {
      tag: "Novels & Short Stories",
      question: "Which audience is primarily targeted by a novel?",
      options: ["Scholars and researchers", "General public seeking entertainment and narrative engagement", "Government policymakers", "Scientific peer reviewers"],
      answer: 1,
      explanation: "Novels target the general public. They are written to entertain, engage, and provide a narrative experience, unlike academic texts which target scholars and professionals."
    },
    {
      tag: "Novels & Short Stories",
      question: "How does the structure of a novel differ from the structure of an academic research paper?",
      options: ["Novels use Abstract, Methods, Results; papers use Chapters", "Novels use Chapters and Plot Development; papers use Introduction, Methodology, Results, Discussion", "Both use the exact same structure", "Novels must include a reference list; papers do not"],
      answer: 1,
      explanation: "Novels use flexible structures like chapters and plot arcs. Academic papers follow a rigid, standardized structure: Introduction, Methodology, Results, Discussion, Conclusion, References."
    },
    {
      tag: "Novels & Short Stories",
      question: "A book review on a popular blog evaluates a new fantasy novel, sharing the blogger's personal reaction and emotional experience. Is this an academic or non-academic text?",
      options: ["Academic, because it reviews a book", "Non-academic, because it is for a general audience, uses personal reaction, and is on a blog", "Academic, because it mentions the book's structure", "Non-academic, because it has no title"],
      answer: 1,
      explanation: "While it reviews a book, it is a non-academic text because it is published on a blog, uses personal/emotional reaction, and targets a general audience. An academic book review in a scholarly journal would be formal and analytical."
    },

    // --- ACADEMIC VS NON-ACADEMIC GENERAL (25-35) ---
    {
      tag: "Concept",
      question: "What is the primary purpose of an academic text?",
      options: ["To entertain the general public", "To inform, analyze, argue, or contribute new knowledge", "To share personal daily experiences", "To persuade using emotional appeals"],
      answer: 1,
      explanation: "The purpose of academic texts is to inform, analyze, argue, or report research. They are evidence-based and formal."
    },
    {
      tag: "Concept",
      question: "Who is the typical intended audience for a non-academic text?",
      options: ["Academic researchers and professionals", "Scholars and scientists", "General audiences with varying levels of knowledge", "University professors only"],
      answer: 2,
      explanation: "Non-academic texts target general audiences, peers, or the public, as opposed to the scholarly audience of academic texts."
    },
    {
      tag: "Concept",
      question: "Which of the following describes the language used in academic writing?",
      options: ["Informal, conversational, and emotional", "Formal, precise, technical, and objective", "Slang-based and humorous", "Flexible, poetic, and lyrical"],
      answer: 1,
      explanation: "Academic language is precise and often technical. It follows a standard structure and maintains an objective tone."
    },
    {
      tag: "Concept",
      question: "What does 'evidence-based' mean in the context of academic writing?",
      options: ["The writer shares their personal opinions and feelings", "The arguments are supported by data, citations, and research", "The text uses imagery and metaphors", "The writer uses persuasive emotional language"],
      answer: 1,
      explanation: "Academic texts are evidence-based, meaning they rely on data, citations from peer-reviewed journals, and objective analysis."
    },
    {
      tag: "Concept",
      question: "Which of the following is NOT a characteristic of academic writing?",
      options: ["Uses disciplined vocabulary", "Includes a clear thesis", "Relies heavily on emotional appeals", "Cites peer-reviewed sources"],
      answer: 2,
      explanation: "Academic writing relies on objective evidence and formal logic, not emotional appeals (which are typical of non-academic persuasive texts)."
    },
    {
      tag: "Concept",
      question: "How does the intended audience shape the way a text is written?",
      options: ["It determines the font size", "It dictates the level of formality, complexity, and vocabulary used", "It has no effect on the writing style", "It only affects the length of the text"],
      answer: 1,
      explanation: "The audience shapes the writing style. Academic texts use formal vocabulary for scholars, while non-academic texts use casual language for the general public."
    },
    {
      tag: "Concept",
      question: "Which of the following is an example of a non-academic text?",
      options: ["Dissertation", "Research paper", "Journal article", "Short story"],
      answer: 3,
      explanation: "Short stories are fictional narratives focused on characters, plot, and theme, making them non-academic. The others are academic."
    },
    {
      tag: "Concept",
      question: "What is the typical structure of an academic text?",
      options: ["Chapters, plot development, and varied pacing", "Lines and stanzas; figurative and rhythmic", "Introduction, background, methodology, results, discussion, and conclusion", "Flexible, depending on the format"],
      answer: 2,
      explanation: "Academic texts follow a standard structure, typically including introduction, methodology, results, discussion, and conclusion sections."
    },
    {
      tag: "Concept",
      question: "Why do non-academic texts often use figurative language?",
      options: ["To confuse the reader", "To entertain, engage, and evoke emotion", "To prove a scientific theory", "To cite academic sources"],
      answer: 1,
      explanation: "Figurative language (like metaphors and imagery) is used in non-academic texts to entertain, engage the audience, and evoke emotion."
    },
    {
      tag: "Concept",
      question: "A student writes a reflection paper about their summer vacation. This is an example of:",
      options: ["Academic text", "Non-academic text", "Research paper", "Book review"],
      answer: 1,
      explanation: "A personal reflection about a vacation is a personal narrative and emotional in tone, making it non-academic."
    },
    {
      tag: "Concept",
      question: "What determines which style of writing you should use?",
      options: ["The color of the paper", "The purpose and the intended audience", "The length of the text", "The time of day"],
      answer: 1,
      explanation: "The purpose (why you are writing) and the audience (who you are writing for) are the primary factors that determine whether you should use an academic or non-academic style."
    },

    // --- SCENARIOS & APPLICATION (36-50) ---
    {
      tag: "Scenario",
      question: "A writer publishes a blog post titled 'My Top 10 Travel Hacks for Europe'. This is an example of:",
      options: ["Academic text", "Non-academic text", "Research paper", "Book review"],
      answer: 1,
      explanation: "A blog post sharing travel hacks is informal, personal, and designed for a general audience, making it non-academic."
    },
    {
      tag: "Scenario",
      question: "A scientist submits a paper to a peer-reviewed journal detailing a new drug trial. What is the intended audience?",
      options: ["General public", "Friends and family", "Scholars and researchers", "Policymakers seeking entertainment"],
      answer: 2,
      explanation: "The audience for a peer-reviewed journal article is other scholars and researchers in that field."
    },
    {
      tag: "Scenario",
      question: "A student writes a poem about the feeling of standing in the rain after a long day. What is the primary purpose?",
      options: ["To analyze a book critically", "To evoke emotion and create imagery", "To report findings objectively", "To persuade policymakers with evidence"],
      answer: 1,
      explanation: "Poetry is a non-academic text primarily used to evoke emotion and paint a picture through imagery."
    },
    {
      tag: "Scenario",
      question: "A book review in a scholarly journal evaluates the strengths and weaknesses of a newly published history text, citing other historians' work. Which combination best describes this text?",
      options: ["Academic — purpose: critique; audience: scholars; tone: formal", "Non-academic — purpose: narrate; audience: peers; tone: emotive", "Non-academic — purpose: entertain; audience: general readers; tone: casual", "Academic — purpose: persuade; audience: policymakers; tone: lyrical"],
      answer: 0,
      explanation: "A scholarly book review evaluates (critiques) work for other scholars using a formal tone, making it academic."
    },
    {
      tag: "Scenario",
      question: "A student submits a paper with a clear thesis, three supporting arguments, and citations from peer-reviewed journals. What type of writing is this?",
      options: ["Academic — tone is conversational", "Non-academic — purpose is to entertain", "Non-academic — audience is general readers", "Academic — purpose is to argue with evidence"],
      answer: 3,
      explanation: "The presence of a thesis, arguments, and peer-reviewed citations indicates a formal, evidence-based academic text."
    },
    {
      tag: "Scenario",
      question: "A magazine article begins: 'Last summer, I traveled across Europe with nothing but a backpack and a journal. Here's what I learned about myself.' Which feature best identifies this text?",
      options: ["Academic — structure methodology", "Academic — formal analysis of travel data", "Non-academic — persuasive policy recommendation", "Non-academic — personal narrative and emotional tone"],
      answer: 3,
      explanation: "The use of 'I', personal reflection, and emotional learning indicates a non-academic personal narrative."
    },
    {
      tag: "Scenario",
      question: "A research paper reports: 'Data collected from 500 participants show a significant correlation between screen time and reduced sleep quality.' What is the intended audience?",
      options: ["Friends on social media", "Casual readers of novels", "Scholars and researchers", "General public seeking entertainment"],
      answer: 2,
      explanation: "Statistical data and formal reporting target an academic audience of scholars and researchers."
    },
    {
      tag: "Scenario",
      question: "An author writes a fictional novel exploring the theme of love in a futuristic society. The structure is flexible, using chapters and varied pacing. The language is lyrical and conversational. This is:",
      options: ["Academic", "Non-academic", "Research paper", "Essay"],
      answer: 1,
      explanation: "Novels are fictional narratives with flexible structures and conversational/lyrical language, making them non-academic."
    },
    {
      tag: "Scenario",
      question: "A university student writes an essay arguing for stricter environmental policies, citing scientific studies and government reports. This is:",
      options: ["Academic", "Non-academic", "Personal narrative", "Poem"],
      answer: 0,
      explanation: "The essay uses evidence (scientific studies, government reports) to argue a point, which is a hallmark of academic writing."
    },
    {
      tag: "Scenario",
      question: "A social media influencer posts a video script sharing their daily routine and favorite products. The primary purpose is to:",
      options: ["Inform with data", "Entertain and persuade", "Analyze a topic", "Report research findings"],
      answer: 1,
      explanation: "Influencer content is non-academic, aiming to entertain the audience and persuade them (often to buy products or engage)."
    },
    {
      tag: "Scenario",
      question: "A dissertation on economic theory uses formal, precise language and includes an introduction, methodology, results, discussion, and conclusion. This is an example of:",
      options: ["Non-academic text", "Academic text", "Short story", "Magazine article"],
      answer: 1,
      explanation: "Dissertations are formal academic texts following a strict structure and using precise language."
    },
    {
      tag: "Scenario",
      question: "A travel brochure uses descriptive language and emotional appeals to convince people to visit a tropical island. This is:",
      options: ["Academic — purpose: inform", "Non-academic — purpose: persuade", "Academic — purpose: analyze", "Non-academic — purpose: report"],
      answer: 1,
      explanation: "Brochures are non-academic texts that use emotional appeals and descriptive language to persuade a general audience."
    },
    {
      tag: "Scenario",
      question: "A text message to a friend saying 'Hey, running late for lunch, see you in 10!' is an example of:",
      options: ["Academic text", "Non-academic text", "Research paper", "Book review"],
      answer: 1,
      explanation: "Text messages are informal, conversational, and personal, making them non-academic."
    },
    {
      tag: "Scenario",
      question: "A scientific journal article on quantum physics uses technical vocabulary and objective reporting. This is:",
      options: ["Academic", "Non-academic", "Poetry", "Blog"],
      answer: 0,
      explanation: "Technical vocabulary and objective reporting are key characteristics of academic texts."
    },
    {
      tag: "Scenario",
      question: "A magazine article about a celebrity's lifestyle uses casual language and focuses on entertainment. This is:",
      options: ["Academic", "Non-academic", "Research paper", "Policy brief"],
      answer: 1,
      explanation: "The purpose is to entertain, and the audience is the general public, making it non-academic."
    }
  ];

  /* Quiz state */
  const qNum = document.getElementById("qNum");
  const streakDisplay = document.getElementById("streak");
  const scoreDisplay = document.getElementById("score");
  const barFill = document.getElementById("barFill");
  const questionCard = document.getElementById("questionCard");
  const qTag = document.getElementById("qTag");
  const qText = document.getElementById("qText");
  const optionsContainer = document.getElementById("options");
  const explain = document.getElementById("explain");
  const explainHead = document.getElementById("explainHead");
  const explainBody = document.getElementById("explainBody");
  const nextWrap = document.getElementById("nextWrap");
  const nextBtn = document.getElementById("nextBtn");
  const quizArea = document.getElementById("quizArea");
  const resultArea = document.getElementById("resultArea");
  const shuffleBtn = document.getElementById("shuffleBtn");

  let quizQuestions = [...questions];
  let currentQuestion = 0;
  let score = 0;
  let streak = 0;
  let answered = false;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function loadQuestion() {
    if (currentQuestion >= quizQuestions.length) {
      finishQuiz();
      return;
    }

    answered = false;
    const question = quizQuestions[currentQuestion];

    qNum.textContent = currentQuestion + 1;
    streakDisplay.textContent = streak;
    scoreDisplay.textContent = score;
    barFill.style.width = `${(currentQuestion / quizQuestions.length) * 100}%`;

    qTag.textContent = question.tag;
    qText.textContent = question.question;
    optionsContainer.innerHTML = "";

    explain.classList.remove("is-visible", "is-correct", "is-wrong");
    explainHead.textContent = "";
    explainBody.textContent = "";
    nextWrap.classList.remove("is-visible");

    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "opt";
      button.innerHTML = `
        <span class="letter">${String.fromCharCode(65 + index)}</span>
        <span>${option}</span>
      `;
      button.addEventListener("click", () => answerQuestion(index));
      optionsContainer.appendChild(button);
    });

    questionCard.style.animation = "none";
    void questionCard.offsetWidth;
    questionCard.style.animation = "";
  }

  function answerQuestion(selectedIndex) {
    if (answered) return;
    answered = true;

    const question = quizQuestions[currentQuestion];
    const optionButtons = optionsContainer.querySelectorAll(".opt");
    optionButtons.forEach(button => { button.disabled = true; });

    const selectedButton = optionButtons[selectedIndex];
    const correctButton = optionButtons[question.answer];

    if (selectedIndex === question.answer) {
      selectedButton.classList.add("correct");
      score++;
      streak++;
      explain.classList.add("is-visible", "is-correct");
      explainHead.textContent = "Correct!";
      explainBody.textContent = question.explanation;
    } else {
      selectedButton.classList.add("wrong");
      correctButton.classList.add("correct");
      streak = 0;
      explain.classList.add("is-visible", "is-wrong");
      explainHead.textContent = "Not quite.";
      explainBody.textContent =
        `Correct answer: ${question.options[question.answer]}\n\n${question.explanation}`;
    }

    streakDisplay.textContent = streak;
    scoreDisplay.textContent = score;
    nextWrap.classList.add("is-visible");

    nextBtn.textContent =
      currentQuestion === quizQuestions.length - 1
        ? "See results"
        : "Next question";
  }

  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    loadQuestion();
  });

  shuffleBtn.addEventListener("click", () => {
    shuffleBtn.classList.add("is-spinning");
    setTimeout(() => shuffleBtn.classList.remove("is-spinning"), 700);

    quizQuestions = shuffleArray([...questions]);
    currentQuestion = 0;
    score = 0;
    streak = 0;

    quizArea.hidden = false;
    resultArea.hidden = true;
    loadQuestion();
  });

  function finishQuiz() {
    const total = quizQuestions.length;
    const percentage = Math.round((score / total) * 100);
    let message;

    if (percentage >= 90) {
      message = "Excellent work! You have a strong grasp of Academic vs. Non-Academic texts.";
    } else if (percentage >= 80) {
      message = "Great job! You understand most of the important ideas.";
    } else if (percentage >= 75) {
      message = "Good work! A little more practice will strengthen your skills.";
    } else if (percentage >= 60) {
      message = "Keep practicing. Review the examples and try the quiz again.";
    } else {
      message = "Review the study notes carefully, then try the quiz again.";
    }

    quizArea.hidden = true;
    resultArea.hidden = false;

    resultArea.innerHTML = `
      <article class="card card-violet result-card">
        <h2>Quiz Complete</h2>
        <div class="result-score">${score}/${total}</div>
        <p class="result-msg">${message}</p>
        <p class="result-meta">
          Score: ${percentage}% &middot;
          Correct: ${score} &middot;
          Incorrect: ${total - score}
        </p>
        <div class="result-actions">
          <button class="btn" id="retryQuiz">Try Again</button>
          <button class="btn secondary" id="reviewNotes">Review Notes</button>
        </div>
      </article>
    `;

    barFill.style.width = "100%";
    launchConfetti();

    document.getElementById("retryQuiz").addEventListener("click", resetQuiz);
    document.getElementById("reviewNotes").addEventListener("click", () => {
      const learnTab = document.querySelector('[data-tab="learn"]');
      if (learnTab) learnTab.click();
    });
  }

  function resetQuiz() {
    quizQuestions = shuffleArray([...questions]);
    currentQuestion = 0;
    score = 0;
    streak = 0;
    quizArea.hidden = false;
    resultArea.hidden = true;
    loadQuestion();
  }

  loadQuestion();

  /* Simple Explanations (Replacing Formula Sheet) */
  const cheatSheet = document.getElementById("cheatSheet");
  const explanations = [
    { 
      title: "Purpose: Academic vs. Non-Academic", 
      content: "Academic texts aim to inform, analyze, argue, or contribute new knowledge using evidence. Non-academic texts aim to entertain, persuade, engage, or share personal experiences." 
    },
    { 
      title: "Audience: Who are you writing for?", 
      content: "Academic texts target scholars, professionals, and students who expect formal analysis. Non-academic texts target the general public or peers, requiring accessible and engaging language." 
    },
    { 
      title: "Language: Formal vs. Informal", 
      content: "Academic language is precise, technical, objective, and disciplined. Non-academic language is informal, conversational, emotional, and sometimes poetic or figurative." 
    },
    { 
      title: "Structure: Rigid vs. Flexible", 
      content: "Academic texts follow a strict structure (Introduction, Methods, Results, Discussion, Conclusion). Non-academic texts are flexible, depending on the format (chapters for novels, stanzas for poems, short paragraphs for blogs)." 
    },
    { 
      title: "Evidence: Citations vs. Personal Experience", 
      content: "Academic writing relies on data, citations from peer-reviewed journals, and objective facts. Non-academic writing relies on personal anecdotes, emotional appeals, and general observations." 
    },
    { 
      title: "Literature Types: Poetry", 
      content: "Poetry is non-academic. It uses lines and stanzas, figurative language (metaphors, similes), and rhythm to evoke emotion and explore ideas creatively." 
    },
    { 
      title: "Literature Types: Essays", 
      content: "Academic essays use a thesis, evidence, and formal language to argue a point. Personal (non-academic) essays use personal anecdotes, informal language, and emotional appeals." 
    },
    { 
      title: "Literature Types: Novels & Short Stories", 
      content: "These are non-academic fictional narratives. They use chapters/scenes, plot development, dialogue, and descriptive language to entertain and immerse the reader." 
    }
  ];

  explanations.forEach(item => {
    const div = document.createElement("article");
    div.className = "cheat-item";
    div.innerHTML = `
      <h4>${item.title}</h4>
      <p>${item.content}</p>
    `;
    cheatSheet.appendChild(div);
  });

  /* Glossary */
  const glossaryList = document.getElementById("glossaryList");
  const glossary = [
    { en: "Academic Text", enDef: "A formal, evidence-based mode of writing used to explain, analyze, argue, or report research.", fil: "Akademikong Teksto", filDef: "Pormal at nakabase sa ebidensyang pagsulat na ginagamit sa pagpapaliwanag, pagsusuri, o pag-uulat ng pananaliksik." },
    { en: "Non-Academic Text", enDef: "A more informal, audience-focused mode of writing used to entertain, persuade, or share personal experience.", fil: "Di-Akademikong Teksto", filDef: "Mas impormal at nakatuon sa madla na pagsulat na ginagamit sa paglibang, panghihikayat, o pagbabahagi ng karanasan." },
    { en: "Audience", enDef: "The intended readers of a text (e.g., scholars vs. general public).", fil: "Madla / Mambabasa", filDef: "Ang inaasahang mambabasa ng isang teksto (hal. iskolar vs. pangkalahatang publiko)." },
    { en: "Purpose", enDef: "The reason why a text is written (e.g., to inform, to entertain).", fil: "Layunin", filDef: "Ang dahilan kung bakit isinulat ang isang teksto (hal. magbigay-alam, maglibang)." },
    { en: "Tone", enDef: "The writer's attitude toward the subject (e.g., formal, objective, emotional).", fil: "Tono", filDef: "Saloobin ng manunulat sa paksa (hal. pormal, obhetibo, emosyonal)." },
    { en: "Thesis", enDef: "A clear statement that summarizes the main argument of an academic text.", fil: "Tesis", filDef: "Malinaw na pahayag na nagbubuod sa pangunahing argumento ng isang akademikong teksto." },
    { en: "Evidence-based", enDef: "Relying on data, facts, and citations rather than personal opinion.", fil: "Nakabase sa Ebidensya", filDef: "Umaasa sa datos, katotohanan, at sipi sa halip na personal na opinyon." },
    { en: "Objective", enDef: "Not influenced by personal feelings or opinions in considering and representing facts.", fil: "Obhetibo", filDef: "Hindi naaapektuhan ng personal na damdamin o opinyon sa paglalahad ng katotohanan." },
    { en: "Subjective", enDef: "Based on or influenced by personal feelings, tastes, or opinions.", fil: "Subhetibo", filDef: "Nakabase o naaapektuhan ng personal na damdamin, panlasa, o opinyon." },
    { en: "Jargon", enDef: "Special words or expressions that are used by a particular profession or group and are difficult for others to understand.", fil: "Jargon / Teknikal na Salita", filDef: "Mga espesyal na salita na ginagamit ng isang partikular na propesyon at mahirap intindihin ng iba." },
    { en: "Figurative Language", enDef: "Language that uses words or expressions with a meaning that is different from the literal interpretation (e.g., metaphors, similes).", fil: "Matalinghagang Salita", filDef: "Mga salitang may kahulugang hindi literal (hal. metapora, simili)." },
    { en: "Narrative", enDef: "A spoken or written account of connected events; a story.", fil: "Salaysay", filDef: "Isang pasalita o pasulat na salaysay ng magkakaugnay na mga pangyayari; isang kwento." }
  ];

  glossary.forEach(item => {
    const div = document.createElement("article");
    div.className = "gloss-item";
    div.innerHTML = `
      <div class="gloss-en">
        <span class="gloss-label">English</span>
        <div class="gloss-term">${item.en}</div>
        <div class="gloss-def">${item.enDef}</div>
      </div>
      <div class="gloss-fil">
        <span class="gloss-label">Filipino</span>
        <div class="gloss-term">${item.fil}</div>
        <div class="gloss-def">${item.filDef}</div>
      </div>
    `;
    glossaryList.appendChild(div);
  });

  /* Videos */
  const videoList = document.getElementById("videoList");
  const videos = [
    { lang: "EN", title: "Academic vs. Non-Academic Texts", channel: "English Writing Tutorials", description: "Learn the key differences in purpose, audience, tone, and structure between academic and non-academic writing.", url: "https://www.youtube.com/results?search_query=academic+vs+non-academic+texts" },
    { lang: "EN", title: "How to Write an Academic Essay", channel: "Study Hall", description: "A comprehensive guide on structuring formal academic writing with a thesis and evidence.", url: "https://www.youtube.com/results?search_query=how+to+write+an+academic+essay" },
    { lang: "EN", title: "Informal vs Formal English", channel: "English with Lucy", description: "Understand the difference between casual conversational language and formal academic vocabulary.", url: "https://www.youtube.com/results?search_query=formal+vs+informal+english" },
    { lang: "EN", title: "Elements of Poetry", channel: "Literary Devices", description: "Learn about figurative language, meter, and structure in poetry.", url: "https://www.youtube.com/results?search_query=elements+of+poetry" },
    { lang: "FIL", title: "Akademikong Pagsulat", channel: "YouTube Search", description: "Filipino-language tutorials on the characteristics of academic writing.", url: "https://www.youtube.com/results?search_query=akademikong+pagsulat" },
    { lang: "FIL", title: "Di-Akademikong Teksto", channel: "YouTube Search", description: "Search results for Filipino explanations and examples of non-academic texts.", url: "https://www.youtube.com/results?search_query=di-akademikong+teksto" }
  ];

  videos.forEach(video => {
    const div = document.createElement("article");
    div.className = "video-item";
    div.innerHTML = `
      <div class="video-thumb" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
      </div>
      <div class="video-body">
        <span class="video-lang ${video.lang === "EN" ? "en" : "fil"}">
          ${video.lang === "EN" ? "English" : "Filipino"}
        </span>
        <div class="video-title">${video.title}</div>
        <div class="video-channel">${video.channel}</div>
        <div class="video-desc">${video.description}</div>
        <a class="video-link" href="${video.url}" target="_blank" rel="noopener noreferrer">
          Watch on YouTube
          <svg viewBox="0 0 24 24">
            <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3z"></path>
            <path d="M5 5h5v2H7v10h10v-3h2v5H5V5z"></path>
          </svg>
        </a>
      </div>
    `;
    videoList.appendChild(div);
  });

  /* ============================================================
     Sources Carousel & Zoom Modal Functionality
     ============================================================ */
  
  // Carousel Button Scrolling
  function scrollCarousel(direction) {
    const container = document.getElementById('sourcesCarousel');
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }

  // Zoom Modal Logic
  const zoomModal = document.getElementById("zoomModal");
  const zoomImg = document.getElementById("zoomImg");
  const zoomClose = document.getElementById("zoomClose");
  const zoomPrev = document.getElementById("zoomPrev");
  const zoomNext = document.getElementById("zoomNext");
  
  const sourceImages = Array.from(document.querySelectorAll(".source-img"));
  let currentZoomIndex = 0;

  sourceImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentZoomIndex = index;
      openZoom();
    });
  });

  function openZoom() {
    const img = sourceImages[currentZoomIndex];
    zoomImg.src = img.src;
    zoomImg.alt = img.alt;
    zoomModal.classList.add("active");
  }

  function navigateZoom(direction) {
    currentZoomIndex = (currentZoomIndex + direction + sourceImages.length) % sourceImages.length;
    openZoom();
  }

  if (zoomPrev) zoomPrev.addEventListener("click", () => navigateZoom(-1));
  if (zoomNext) zoomNext.addEventListener("click", () => navigateZoom(1));

  function closeZoom() {
    zoomModal.classList.remove("active");
    setTimeout(() => { zoomImg.src = ""; }, 300);
  }

  zoomClose.addEventListener("click", closeZoom);
  zoomModal.addEventListener("click", (e) => {
    if (e.target === zoomModal) closeZoom();
  });

  // Swipe detection for modal
  let touchStartX = 0;
  let touchEndX = 0;

  zoomModal.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});

  zoomModal.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) navigateZoom(1); // Swipe left -> next
    if (touchEndX > touchStartX + 50) navigateZoom(-1); // Swipe right -> prev
  }, {passive: true});

  document.addEventListener("keydown", (e) => {
    if (zoomModal.classList.contains("active")) {
      if (e.key === "Escape") closeZoom();
      if (e.key === "ArrowRight") navigateZoom(1);
      if (e.key === "ArrowLeft") navigateZoom(-1);
    }
  });

  /* Sound toggle */
  const muteBtn = document.getElementById("muteBtn");
  let soundOn = true;
  muteBtn.addEventListener("click", () => {
    soundOn = !soundOn;
    muteBtn.textContent = soundOn ? "Sound: on" : "Sound: off";
  });

  /* Confetti */
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  let confettiPieces = [];
  let confettiAnimation = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function launchConfetti() {
    confettiPieces = [];
    for (let i = 0; i < 120; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.4,
        width: 6 + Math.random() * 7,
        height: 8 + Math.random() * 10,
        speedY: 2 + Math.random() * 4,
        speedX: -2 + Math.random() * 4,
        rotation: Math.random() * Math.PI,
        rotationSpeed: -0.08 + Math.random() * 0.16
      });
    }
    if (confettiAnimation) cancelAnimationFrame(confettiAnimation);
    animateConfetti();
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;
    const colors = ["#2563eb", "#0ea5e9", "#4f46e5", "#06b6d4", "#1e3a8a", "#334155"];

    confettiPieces.forEach(piece => {
      piece.y += piece.speedY;
      piece.x += piece.speedX;
      piece.rotation += piece.rotationSpeed;
      if (piece.y < canvas.height + 30) active = true;

      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation);
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
      ctx.restore();
    });

    if (active) {
      confettiAnimation = requestAnimationFrame(animateConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

});
