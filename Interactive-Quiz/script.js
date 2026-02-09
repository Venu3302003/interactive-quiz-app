const quizData=[{question:"Which language runs in a web browser?",options:["Java","C","Python","JavaScript"],correct:3,explanation:"JavaScript runs in browsers."},{question:"What does CSS stand for?",options:["Central Style Sheets","Cascading Style Sheets","Computer Style Sheets","Creative Style System"],correct:1,explanation:"CSS = Cascading Style Sheets."},{question:"Which year was JavaScript launched?",options:["1996","1995","1994","None"],correct:1,explanation:"JS was created in 1995."},{question:"Which tag links JavaScript file?",options:["<script>","<js>","<javascript>","<link>"],correct:0,explanation:"Use the <script> tag."},{question:"HTML stands for?",options:["Hyper Tool Markup Language","Hyper Text Markup Language","Hyperlinks Text Marking Language","Home Tool Markup Language"],correct:1,explanation:"HTML = Hyper Text Markup Language."}];

let currentQuestion=0,userAnswers=new Array(quizData.length).fill(null),visitedQuestions=new Array(quizData.length).fill(false),flaggedQuestions=new Array(quizData.length).fill(false),questionTime=10,timer;

const clickSound=new Audio("click.mp3"),warningSound=new Audio("warning.mp3"),successSound=new Audio("success.mp3");

const quizContainer=document.getElementById("quiz"),resultBox=document.getElementById("result"),submitBtn=document.getElementById("submit-btn"),restartBtn=document.getElementById("restart-btn"),prevBtn=document.getElementById("prev-btn"),nextBtn=document.getElementById("next-btn"),progressBar=document.getElementById("progress-bar"),progressText=document.getElementById("progress-text"),timerDisplay=document.getElementById("timer"),startScreen=document.getElementById("start-screen"),startBtn=document.getElementById("start-btn"),quizBox=document.querySelector(".quiz-container"),themeBtn=document.getElementById("theme-toggle"),flagBtn=document.getElementById("flag-btn");

themeBtn.onclick=()=>document.body.classList.toggle("dark");
startBtn.onclick=()=>{startScreen.style.display="none";quizBox.style.display="block";loadQuestion();};

function startQuestionTimer(){let t=questionTime;timerDisplay.textContent=`Time Left: ${t}s`;clearInterval(timer);timer=setInterval(()=>{t--;timerDisplay.textContent=`Time Left: ${t}s`;if(t===3)warningSound.play();if(t<=0){clearInterval(timer);currentQuestion<quizData.length-1?(currentQuestion++,loadQuestion()):showResult();}},1000);}

function loadQuestion(){visitedQuestions[currentQuestion]=true;quizContainer.innerHTML="";const q=quizData[currentQuestion];const block=document.createElement("div");block.classList.add("question-block");block.innerHTML=`<h3>Q${currentQuestion+1}. ${q.question}</h3>`;q.options.forEach((opt,i)=>{const label=document.createElement("label");label.classList.add("option");const radio=document.createElement("input");radio.type="radio";radio.name="option";radio.value=i;if(userAnswers[currentQuestion]===i)radio.checked=true;radio.addEventListener("change",()=>{userAnswers[currentQuestion]=i;clickSound.play();renderQuestionNav();});label.appendChild(radio);label.append(opt);block.appendChild(label);});quizContainer.appendChild(block);updateProgress();renderQuestionNav();startQuestionTimer();}

function renderQuestionNav(){const nav=document.getElementById("question-nav");nav.innerHTML="";quizData.forEach((_,i)=>{const btn=document.createElement("div");btn.textContent=i+1;btn.classList.add("q-num");if(flaggedQuestions[i])btn.classList.add("flagged");else if(!visitedQuestions[i])btn.classList.add("not-visited");else if(userAnswers[i]!==null)btn.classList.add("answered");else btn.classList.add("unanswered");if(i===currentQuestion)btn.classList.add("active");btn.onclick=()=>{currentQuestion=i;loadQuestion();};nav.appendChild(btn);});}

flagBtn.onclick=()=>{flaggedQuestions[currentQuestion]=!flaggedQuestions[currentQuestion];renderQuestionNav();};

function updateProgress(){progressBar.style.width=((currentQuestion)/quizData.length)*100+"%";progressText.textContent=`Question ${currentQuestion+1} of ${quizData.length}`;}

nextBtn.onclick=()=>{if(currentQuestion<quizData.length-1){currentQuestion++;loadQuestion();}};
prevBtn.onclick=()=>{if(currentQuestion>0){currentQuestion--;loadQuestion();}};

function showResult(){clearInterval(timer);let score=0;quizData.forEach((q,i)=>{if(userAnswers[i]===q.correct)score++;});if(score===quizData.length)successSound.play();resultBox.style.display="block";resultBox.innerHTML=`<h3>You scored ${score} / ${quizData.length}</h3>`;submitBtn.disabled=true;prevBtn.disabled=true;nextBtn.disabled=true;restartBtn.style.display="block";}

restartBtn.onclick=()=>location.reload();
submitBtn.onclick=showResult;
